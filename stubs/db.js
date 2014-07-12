var Promise = require( "bluebird" );

var storage = {
  "mvp-plan": {
    key: "val"
  }
};

var db = {
  save: function( obj ) {
    var id = Math.random().toString( 36 ).slice( 2 );
    storage[id] = JSON.stringify( obj );
    return new Promise( function( resolve, reject ) {
      setTimeout( function() {
        resolve( id );
      }, 100 );
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
      }, 100 );
    });
  }
};

module.exports = db;