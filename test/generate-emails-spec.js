var plan = require( './fixtures/plan-with-votes.js' );

var calculateWinner = require( '../modules/calculate-winner' );
var send = require( '../modules/send-emails.js' );

calculateWinner( plan, 0 );

send( plan, 0 )
  .then( function( responses ) {
    console.log( "success" );
    console.log( responses );
  }).catch( function( errors ) {
    console.log( errors );
  });