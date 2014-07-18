var db = require( '../stubs/db' );
var closeRound = require( '../modules/close-round' );
var moment = require( 'moment' );

var addRoundDeadlines = function( plan ) {
  //add round.deadline per round (in milliseconds since Unix epoch) based on rounds.length
  var createdAtMillis = new Date( plan.createdAt ).valueOf();
  var finalVoteEndMillis = new Date( plan.finalVoteEnd ).valueOf();
  var roundInterval = ( finalVoteEndMillis - createdAtMillis ) / plan.rounds.length;

  plan.rounds.forEach( function( round, roundNum ){
    var roundDeadlineMillis = createdAtMillis + ( roundInterval * ( roundNum + 1 ) );
    round.deadline = roundDeadlineMillis;
    //would also registerDeadlinesInDb here if we already had the UID, but that is generated at db.save, so at least this saves one trip to the database
  });
};

//add round's deadline to time table in db with associated plan id and round number
var registerDeadlinesInDb = function( plan ) {
  var deadlineObj = {
    id: plan.id,
  }
  plan.rounds.forEach( function( round, roundNum ){
    deadlineObj.roundNum = roundNum + 1;
    db.addDeadline( round.deadline, deadlineObj )
    .then( function( plan ){
      console.log('added to db: ', 'deadline', round.deadline, plan);
    })
    .catch( function(statusCode) {
      console.log('failed to add to db: ', statusCode);
    });
  });
};

var expireDeadlines = function( threshold ) {
  //initiate 'startTimer': setInterval function from another module
    //every minute check all round deadlines on table and close the ones that expired
  threshold = threshold || moment().startOf( 'minute' );
  threshold.add( 'minute', 1 ); //server's time will be rounded up to next minute to match times in plan model
  
  var thresholdInMillis = new Date(threshold).valueOf();

  db.expireDeadlines( thresholdInMillis )
  .then( function ( deadlinesToExpire ) {
    deadlinesToExpire.forEach( function( deadlineObj ) {
      db.find( 'plan', deadlineObj.id )
      .then( function( plan ) {
        closeRound( plan, deadlineObj.roundNum );
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