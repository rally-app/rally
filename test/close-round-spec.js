var expect = require( 'chai' ).expect;

var closeRound = require( '../modules/close-round' );
var plan = require( './fixtures/plan-with-votes.js' );

describe( 'closeRound()', function() {
  it( 'should add the round\'s winner to the plan\'s round object', function() {
    var ROUND = 0;
    expect( plan.rounds[ ROUND ].winner ).to.equal( null );
    closeRound( plan, 0 );
    expect( plan.rounds[ ROUND ].winner ).to.be.an( 'object' );
  });
});