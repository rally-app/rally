"use strict";

var db = require( "../stubs/db" );

function getPlan( req, res ) {
  db.find( "plan", req.params.id )
  .then( function( plan ){
    console.log( plan );
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
}

function postPlan( req, res ) {
  db.save( "plan", req.body )
  .then( function( plan ) {
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
}

module.exports = [
  {
    method: "get",
    url: "/:id",
    handler: getPlan
  }, {
    method: "post",
    url: "/",
    handler: postPlan
  }
];