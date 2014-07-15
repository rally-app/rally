'use strict';

var express = require( 'express' );
var router = express.Router();

var db = require( '../stubs/db' );
var voteAlgorithm = require( '../stubs/vote-algorithm' );

router.post( '/', function( req, res ) {
  var postedVote = req.body;
  db.save( 'vote', postedVote )
  .then( function( vote ) {
    return db.find( 'plan', vote.planId );
  })
  .then( function( plan ) {
    // get the round from the plan object
    var currentRound = plan.rounds[ postedVote.currentRound ]
    // increment the vote count
    currentRound.totalVotes += 1;
    // check if all guests have voted
    if ( currentRound.totalVotes === plan.hostWho.length ) {
      // find votes that have planId === plan.id
      db.findWhere( "vote", { planId: plan.id }).then( function( votes ) {
        // get the winning option's index
        var winnerIndex = voteAlgorithm( plan, postedVote.currentRound, votes );
        res.send( plan.options[ winnerIndex ] );
      });
    } else {
      res.send( "Vote received. Waiting for more votes." );
    }
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
});

module.exports = router;