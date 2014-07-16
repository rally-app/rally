var expect = require( 'chai' ).expect;

var calculateWinner = require( '../modules/calculate-winner' );
var plan = require( './fixtures/plan-with-votes.js' );

describe( 'calculateWinner()', function() {
  it( 'is a function', function() {
    expect( calculateWinner ).to.be.a( 'function' );
  });
  it( 'calculates the winning option', function() {
    var winner = calculateWinner( plan, 0 );
    expect( winner ).to.be.an( 'object' );
    expect( winner.option.optionName ).to.equal( 'Lightning' );
  });
});