'use strict';

// just a stub. returns a random choice's index.
module.exports = function( plan, round, votes ) {
  var targetRound = plan.rounds[ round ];
  return targetRound.options[ Math.floor( Math.random() * targetRound.options.length ) ];
};