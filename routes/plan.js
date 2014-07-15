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
    console.log( "PLAN:" );
    console.log( plan );
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
});

router.post( "/", function( req, res ) {

  var plan = req.body;
  // add options to plan before save
  [].push.apply( plan.rounds, options );
  
  db.save( "plan", req.body )
  .then( function( plan ) {
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
});

module.exports = router;