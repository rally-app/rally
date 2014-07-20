// no longer using this db since we created our mongo db

'use strict';

// 'require' calls to core modules
// none

// require calls to installed modules
var Bluebird = require( 'bluebird' );

// require calls to scripts
var validatePlan = require( './validate-plan' );
var uniqueId = require( './uid.js' );
var planFixture = require( './plan-fixture.js' );
var validateDeadline = require('./validate-deadline');

// constants for this file
var NOT_FOUND = 404;
var BAD_REQUEST = 400;
var DELAY = 100;

// variables for this file
var storage = {
  plan: {
    'mvp-plan': planFixture
  },
  vote: {},
  deadlines: {}
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
  find: function( modelName, id ) {
    return new Bluebird( function( resolve, reject ) {
      var plan = storage[ modelName ][ id ];
      setTimeout( function(){
        if ( plan ) {
          resolve( JSON.parse( storage[ modelName ][ id ] ) );
        } else {
          reject( NOT_FOUND );
        }
      }, DELAY );
    });
  },
  filter: function( modelName, fn ) {
    var results = Object.keys( storage[ modelName ] ).reduce( function( acc, key ) {
      var model = storage[ modelName ][ key ];
      if ( fn( model, key ) ) {
        acc.push( model );
      }
      return acc;
    }, [] );
    return new Bluebird( function( resolve ) {
      setTimeout( function() {
        resolve( results );
      }, DELAY );
    });
  },
  findWhere: function( modelName, obj ) {
    return this.filter( modelName, matches.bind( null, obj ) );
  },
  // POST
  save: function( modelName, obj ) {
    return new Bluebird( function( resolve, reject ) {
      if ( !validatePlan( obj ) ) {
        reject( BAD_REQUEST );
      }
      var id = uniqueId();
      obj.id = id;
      storage[ modelName ][ id ] = JSON.stringify( obj );
      setTimeout( function() {
        resolve( obj );
      }, DELAY );
    });
  },
  // PUT
  update: function( modelName, id, obj ) {
    return new Bluebird( function( resolve, reject ) {
      var success = !!storage[ modelName ][ id ];
      setTimeout( function() {
        if ( success ) {
          storage[ modelName ][ id ] = JSON.stringify( obj );
          resolve( obj );
        } else {
          reject( NOT_FOUND );
        }
      }, DELAY );
    });
  },
  //for pushing deadlines to database
  addDeadline: function( deadline, obj ) {
    return new Bluebird( function( resolve, reject ) {
      setTimeout( function() {
        if ( !validateDeadline( obj ) ) {
          reject( BAD_REQUEST );
        }else{
          if ( !storage.deadlines[ deadline ] ) storage.deadlines[ deadline ] = [];
          storage.deadlines[ deadline ].push( JSON.stringify( obj ) );
          resolve( obj );
        }
      }, DELAY );
    });
  },
  expireDeadlines: function( deadline ) {
    return new Bluebird( function( resolve, reject ) { //what to reject on?
      setTimeout( function() {
        var deadlinesToExpire = storage.deadlines[ deadline ];
        if ( !deadlinesToExpire ){
          resolve( [] );
        } else {
          delete storage.deadlines[ deadline ];
          resolve( deadlinesToExpire );
        }
      }, DELAY );
    });
  }
};

module.exports = db;