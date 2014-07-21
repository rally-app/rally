var db = require( '../modules/mongodb.js' );
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

  console.log( 'added deadlines to rounds', plan.rounds );
};

//add round's deadline to time table in db with associated plan id and round number
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

var expireDeadlines = function( threshold ) {
  //initiated this function, which starts a timeout loop, from app.js
  //every minute check all round deadlines on table and close the ones that have expired
  threshold = threshold || moment().startOf( 'minute' );
  threshold.add( 'minute', 1 ); //server's time rounded up to next minute to match times in plan model
  console.log( 'minute + 1:', threshold );
  threshold.add( 'second', 1 ); //add 1 second so that can simply query database for $lt (less than) threshold
  console.log( 'second + 1:', threshold );
  
  var thresholdInMillis = threshold.unix();

  db.find( 'deadlines', { deadline: { $lt: threshold } } ) //expire deadline documents with deadline less than current threshold (now + 1 min + 1 sec)
  .then( function ( deadlinesToExpire ) {
    deadlinesToExpire.forEach( function( deadlineObj ) {
      db.find( 'plan', deadlineObj.id )
      .then( function( plan ) {
        plan = plan[0]; //mongo.find returns an array with results, of which we want the first (and only)
        closeRound( plan, deadlineObj.roundNum, function() {
          db.remove( 'deadlines', deadlineObj )
          .then( function( result ) {
            console.log( 'deleted from deadlines collection:', deadlineObj );
          })
          .catch( function( err ) {
            console.log ( 'failed to delete from deadlines collection:', deadlineObj, err );
          });
        });
      })
      .catch( function( err ) {
        console.log( 'failed to retrieve plan', deadlineObj.id, err );
      });
    });
  })
  .catch( function ( err ) {
    console.log( 'failed to expire deadlines: ', err );
  });

  //check for expired deadlines every minute
  setTimeout( function(){
    expireDeadlines(threshold);
  }, 60000 );
};

module.exports = {
  addRoundDeadlines: addRoundDeadlines,
  registerDeadlinesInDb: registerDeadlinesInDb,
  expireDeadlines: expireDeadlines
};
