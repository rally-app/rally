'use strict';

var db = require( '../stubs/db' );
var options = require( '../stubs/options-fixture' );

function getPlan( req, res ) {
  db.find( 'plan', req.params.id )
  .then( function( plan ){
    console.log( plan );
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
}

function postPlan( req, res ) {
  var plan = req.body;

  // add options to plan before save
  [].push.apply( plan.options, options );
  
  db.save( 'plan', plan )
  .then( function( plan ) {
    res.send( plan );
  })
  .catch( function( statusCode ) {
    res.send( statusCode );
  });
}

module.exports = [
  {
    method: 'get',
    url: '/:id',
    handler: getPlan
  }, {
    method: 'post',
    url: '/',
    handler: postPlan
  }
];