module.exports = function( plan, roundNumber ) {

  var targetRound = plan.rounds[ roundNumber ];

  var weightingAlgorithm = function( i, total ) {
    return total - i;
  };

  var tally = targetRound.options.map( function( optionObj ) {
    return {
      votes: 0,
      option: optionObj
    };
  });

  targetRound.votes.forEach( function( voteObj ) {
    voteObj.userVotes.forEach( function( choiceIndex, preference ) {
      var weightedVote = weightingAlgorithm( preference, tally.length );
      tally[ choiceIndex ].votes += weightedVote;
    });
  });

  return tally.sort( function( a, b ) {
    return a.votes - b.votes;
  })[0];

};