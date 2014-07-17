var calculateWinner = require( './calculate-winner' );
var sendEmails = require( './send-emails' );

module.exports = function( plan, roundNumber ) {
  var winner = calculateWinner( plan, roundNumber );
  plan.rounds[ roundNumber ].winner = winner;
  sendEmails( plan, roundNumber );
};