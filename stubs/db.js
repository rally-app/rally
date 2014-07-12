var Promise = require( "bluebird" );

var validatePlan = require( "./validate-plan" );
var uniqueId = require( "./uid.js" );

var storage = {
  "mvp-plan": {
    key: "Initial value."
  }
};

var db = {
  save: function( obj ) {
    return new Promise( function( resolve, reject ) {
      if ( !validatePlan( obj ) ) {
        reject( 403 );
      }
      var id = uniqueId();
      storage[id] = JSON.stringify( obj );
      setTimeout( function() {
        resolve({ id: id, planData: obj });
      }, 500 );
    });
  },
  find: function( key ) {
    return new Promise( function( resolve, reject ) {
      var plan = storage[ key ];
      setTimeout( function(){
        if ( plan ) {
          resolve( storage[ key ] );
        } else {
          reject();
        }
      }, 500 );
    });
  }
};

module.exports = db;