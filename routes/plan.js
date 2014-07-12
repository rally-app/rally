"use strict";

var express = require( "express" );
var router = express.Router();
var qs = require( "querystring" );

// stub for real db obj/method
var db = require( "../stubs/db" );

router.get( "/:id", function( req, res ) {
  db.find( req.params.id )
  .then( function( plan ){
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( 404 );
  });
});

router.post( "/", function( req, res ) {
  db.save( req.body )
  .then( function( plan ) {
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( 403 );
  });

});

module.exports = router;