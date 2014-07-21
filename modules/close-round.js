var calculateWinner = require( './calculate-winner' );
var sendEmails = require( './send-emails' );
var db = require( './mongodb.js' );

module.exports = function( plan, roundNumber, callback ) {
  var winner = calculateWinner( plan, roundNumber );
  plan.rounds[ roundNumber ].winner = winner;
  db.update( 'plan', plan.id, plan )
  .then( function( plan ) {
    sendEmails( plan, roundNumber + 1 );
    callback(); //used by expireDeadlines to make sure we only expire deadlines if closing rounds is successful
  })
  .catch( function( err ) {
    console.log( 'failed to close rounds', err );
  });
};
