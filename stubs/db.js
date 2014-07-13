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

// variables for this file
var storage = {
  // pre-populate in-memory storage with a single plan object.
  "mvp-plan": planFixture
};

var db = {
  save: function( obj ) {
    return new Bluebird( function( resolve, reject ) {
      if ( !validatePlan( obj ) ) {
        reject( BAD_REQUEST );
      }
      var id = uniqueId();
      obj.id = id;
      storage[id] = JSON.stringify( obj );
      setTimeout( function() {
        resolve( plan );
      }, 500 );
    });
  },
  find: function( key ) {
    return new Bluebird( function( resolve, reject ) {
      var plan = storage[ key ];
      setTimeout( function(){
        if ( plan ) {
          resolve( storage[ key ] );
        } else {
          reject( NOT_FOUND );
        }
      }, 500 );
    });
  }
};

module.exports = db;