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

var registerDeadlinesInDb = function( plan ) {
  //add round's deadline to time table in db with associated plan id and round number
  plan.rounds.forEach( function( round, roundNum ){
    var deadlineObj = {
      id: plan.id,
      roundNum: roundNum + 1
    }
    db.addDeadline( 'time', round.deadline, deadlineObj )
    .then( function( plan ){
      console.log('added to db: ', plan);
    })
    .catch( function(statusCode) {
      console.log('failed to add to db: ', statusCode);
    });
  });
};

var closeDeadlines = function() {
  //initiate 'startTimer': setInterval function from another module
    //every minute check all round deadlines on table and close the ones that expired
};

module.exports = {
  addRoundDeadlines: addRoundDeadlines,
  registerDeadlinesInDb: registerDeadlinesInDb,
  closeDeadlines: closeDeadlines
};