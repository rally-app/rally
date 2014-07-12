"use strict";

var express = require( "express" );
var router = express.Router();

// stub for real db obj/method
var db = require( "../stubs/db" );

router.get( "/:id", function( req, res ) {
  db.find( req.params.id )
  .then( function( plan ){
    res.send( plan );
  })
  .catch( function() {
    res.send( "Plan not found." );
  });
});

router.post( "/", function( req, res ) {
  res.send( "Caught POST to /plan" );
});

module.exports = router;