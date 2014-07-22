var db = require( '../modules/mongodb.js' );
var Bluebird = require( 'bluebird' );
var closeRound = require( '../modules/close-round' );
var moment = require( 'moment' );

var addRoundDeadlines = function( plan ) {
  //add round.deadline per round (in milliseconds since Unix epoch) based on rounds.length
  var createdAtMillis = moment( plan.createdAt ).unix();
  var finalVoteEndMillis = moment( plan.finalVoteEnd ).unix();
  var roundInterval = ( finalVoteEndMillis - createdAtMillis ) / plan.rounds.length;

  plan.rounds.forEach( function( round, roundNum ){
    var roundDeadlineMillis = createdAtMillis + ( roundInterval * ( roundNum + 1 ) );
    round.deadline = roundDeadlineMillis;
    //would also registerDeadlinesInDb here if we already had the UID, but that is generated at db.save, so at least this saves one trip to the database
  });

};

//create a deadline document (object) for each incoming round and insert into deadlines table with corresponding plan id and round number
var registerDeadlinesInDb = function( plan ) {
  plan.rounds.forEach( function( round, roundNum ){
    var deadlineObj = {
      deadline: round.deadline,
      id: plan.id,
      roundNum: roundNum + 1,
    };    
    db.save( 'deadlines', deadlineObj )
    .then( function( deadlineObj ){
      console.log('added to deadlines collection:', deadlineObj);
    })
    .catch( function(statusCode) {
      console.log('failed to add to deadlines collection: ', statusCode);
    });
  });
};

//expire all round deadlines less than the current time threshold every minute; initiated from app.js
var expireDeadlines = function() {
  var thresholdInMillis = moment().startOf( 'minute' ).add( 'minutes', 1 ).unix(); //server's time rounded up to next minute to match times in plan model
  
  console.log( 'thresholdInMillis', thresholdInMillis );

  var savedDeadlines;

  db.find( 'deadlines', { deadline: { $lte: thresholdInMillis } } ) //expire deadline documents with deadline less than or equal to threshold
  .then( function ( deadlinesToExpire ) {
    console.log( 'deadlinesToExpire', deadlinesToExpire );

    savedDeadlines = deadlinesToExpire;

    //returns an array of arrays of plan objects
    Bluebird.map( deadlinesToExpire, function( deadlineObj ) {
      console.log( 'deadlineObj retrieved', deadlineObj.id, deadlineObj );
      return db.find( 'plan', deadlineObj.id );
    })
    //with each plan object, close its round; round[0] for now but should be refactored to allow for multiple rounds of voting
    .then( function( plans ) {
      console.log( 'what map returns:', plans );
      // plans = plans[0]; //mongo.find within Bluebird.map returns an array of arrays of plans, of which we want each object inside each subarray
      plans.forEach( function( plan, i ) {
        console.log( 'about to try to close plan', i, ':', plan[i] );
        closeRound( plan[i], 0 ); //previously second arg was deadlineObj.roundNum but couldn't figure out how to get the corresponding deadlineObj via promise chain
        return Bluebird.each( savedDeadlines, function( deadlineObj ) {
          db.remove( 'deadlines', deadlineObj )
        });
      });
    })
    .then( function( result ) {
      console.log( 'deleted deadline from deadlines collection' );
    })
    .catch( function( err ) {
      console.log ( 'failed to delete from deadlines collection:', err );
    });
  })
  .catch( function ( err ) {
    console.log( 'failed to expire deadlines: ', err );
  });
};

module.exports = {
  addRoundDeadlines: addRoundDeadlines,
  registerDeadlinesInDb: registerDeadlinesInDb,
  expireDeadlines: expireDeadlines
};
