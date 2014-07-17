"use strict";

var express = require( "express" );
var router = express.Router();

// stub for real db obj/methods
// db.find() and db.save() return promises
// our real db implementation will have promisified methods
var db = require( "../stubs/db" );
// var options = require( '../stubs/options-fixture' );
var places = require( '../modules/places.js' );

//any string after /plan/ in the incoming URL request becomes a property on req.params by that same name
router.get( "/:id", function( req, res ) {
  db.find( "plan", req.params.id )
  .then( function( plan ){
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
});

router.post( "/", function( req, res ) {
  var plan = req.body;
  //concatenate google places search -- could add additional translation between user intent and google search later
  var query = plan.hostWhat + ' near ' + plan.hostWhere;

  places( query )
  .then( function ( recommendations ) {
    //creating round object with recommendations and pushing to plan.rounds
    plan.rounds.push( {
      options: recommendations,
      votes: [],
      winner: null
    } );
    //saving plan to db
    return db.save( 'plan', plan );
  })
  .then( function ( result ) {
    console.log( result );
    res.send( result );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
  
});

module.exports = router;