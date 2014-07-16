module.exports = function( plan, roundNumber ) {

  var targetRound = plan.rounds[ roundNumber ];

  var weightingAlgorithm = function( prefOrder, totalChoices ) {
    return totalChoices - prefOrder;
  };

  var tally = targetRound.options.map( function( optionObj ) {
    return {
      votes: 0,
      option: optionObj
    };
  });

  targetRound.votes.forEach( function( voteObj ) {
    voteObj.userVotes.forEach( function( optionIndex, preference ) {
      var weightedVote = weightingAlgorithm( preference, tally.length );
      tally[ optionIndex ].votes += weightedVote;
    });
  });

  tally.sort( function( a, b ) {
    return b.votes - a.votes;
  });

  return tally[0];

};