'use strict';

// 'require' calls to coref modules
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
  deadline: {}
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
  addDeadline: function( modelName, time, obj ) {
    console.log('inside addDeadline');
    return new Bluebird( function( resolve, reject ) {
      setTimeout( function() {
        if ( !validateDeadline( obj ) ) {
          console.log('bad request!');
          reject( BAD_REQUEST );
        }else{
          console.log('storing deadline to db!');
          if( !storage[ modelName ][ time ] ) storage[ modelName ][ time ] = [];
          storage[ modelName ][ time ].push( JSON.stringify( obj ) );
          console.log('added deadline to storage. storage: ', storage);
          resolve( obj );
        }
      }, DELAY );
    });
  },
  deleteDeadline: function( modelName, time ) {
    console.log('nothing here yet');
  }
};

module.exports = db;