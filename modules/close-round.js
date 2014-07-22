var calculateWinner = require( './calculate-winner' );
var sendEmails = require( './send-emails' );
var db = require( './mongodb.js' );

module.exports = function( plan, roundNumber ) {
  var winner = calculateWinner( plan, roundNumber );
  plan.rounds[ roundNumber ].winner = winner;
  db.update( 'plan', plan.id, plan )
  .then( function( plan ) {
    console.log( 'closing rounds[0] from', plan.id );
    sendEmails( plan, roundNumber + 1 );
  })
  .catch( function( err ) {
    console.log( 'failed to close rounds', err );
  });
};
