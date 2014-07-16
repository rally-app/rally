"use strict";

var express = require( "express" );
var router = express.Router();

// stub for real db obj/methods
// db.find() and db.save() return promises
// our real db implementation will have promisified methods
var db = require( "../stubs/db" );
var options = require( '../stubs/options-fixture' );

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

  // 1.) Issue a google request.
  // 2.) When it completes, add the results to this plan's options
  // 3.) Save the updated plan to the database.

  // add options to plan before save
  plan.rounds.push( options );

  // make google request
  // .then( results ) {
  //   plan.push( results )
  //   return plan.save()
  // }
  // .then( model ) {
  //   res.send( model )
  // }
  
  db.save( "plan", req.body )
  .then( function( plan ) {
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
});

module.exports = router;