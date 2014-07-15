"use strict";

// 'require' calls to coref modules
// none

// require calls to installed modules
var Bluebird = require( "bluebird" );

// require calls to scripts
var validatePlan = require( "./validate-plan" );
var uniqueId = require( "./uid.js" );
var planFixture = require( "./plan-fixture.js" );

// constants for this file
var NOT_FOUND = 404;
var BAD_REQUEST = 400;
var DELAY = 100;

// variables for this file
var storage = {
  plan: {
    "mvp-plan": planFixture
  },
  vote: {}
};

var matches = function( against, obj ) {
  var key;
  for ( key in against ) {
    if ( against[ key ] !== obj[ key ] ) {
      return false;
    }
  }
  return true;
};

var db = {
  // GET
  find: function( model, id ) {
    return new Bluebird( function( resolve, reject ) {
      var plan = storage[ model ][ id ];
      setTimeout( function(){
        if ( plan ) {
          resolve( storage[ model ][ id ] );
        } else {
          reject( NOT_FOUND );
        }
      }, DELAY );
    });
  },
  findWhere: function( model, obj ) {
    var results = [];
    var i = 0;
    var currentModel;
    while ( i < storage[ model ].length ) {
      currentModel = storage[ model ][ i ];
      if ( matches( obj, currentModel ) ) {
        results.push( currentModel ) ;
      }
      i++;
    }
    return new Bluebird( function( resolve ) {
      setTimeout( function() {
        resolve( results );
      }, DELAY );
    });
  },
  // POST
  save: function( model, obj ) {
    return new Bluebird( function( resolve, reject ) {
      if ( !validatePlan( obj ) ) {
        reject( BAD_REQUEST );
      }
      var id = uniqueId();
      obj.id = id;
      storage[ model ][ id ] = JSON.stringify( obj );
      setTimeout( function() {
        resolve( obj );
      }, DELAY );
    });
  }
};

module.exports = db;