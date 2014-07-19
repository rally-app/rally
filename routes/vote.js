'use strict';

var express = require( 'express' );
var router = express.Router();

var db = require( '../stubs/db' );
var closeRound = require( '../modules/close-round.js' );
var voteAlgorithm = require( '../stubs/vote-algorithm' );

router.post( '/', function( req, res ) {
  var vote;
  // save a record of the vote, then find the matching plan
  db.save( 'vote', req.body )
  .then( function( savedVote ) {
    vote = savedVote;
    return db.find( 'plan', vote.planId );
  })
  // add the vote to the plan and update the plan in the database
  .then( function( plan ) {
    var currentRound = vote.currentRoundNum - 1;
    // Check if the session lastVote is the current round
    if( req.session.lastVote === currentRound ) {
      // return an object with expired set to true
      res.send({
        expired: true 
      });
      // return plan;
    } else {
      // set the session last vote equal to the current round
      req.session.lastVote = currentRound;
      // add the vote tp the plan and update the plan in the database
      plan.rounds[ currentRound ].votes.push( vote );
      return db.update( 'plan', plan.id, plan );
    }
  })
  // check if this round is done and close it if so.
  // respond with the updated plan
  .then( function( plan ) {
    if ( plan.rounds[ vote.currentRoundNum - 1 ].votes.length === plan.hostWho.length + 1 ) {
      closeRound( plan, vote.currentRoundNum - 1 );
    }
    res.send( plan );
  })
  // failed somewhere, send back the status code
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
});

module.exports = router;