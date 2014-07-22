var https  = require( 'https' );
var searchUrl = require( './places-url.js' );
var Promise = require('bluebird');


module.exports = function( queryString ) {

  return new Promise( function( resolve, reject ) { 

    if ( process.env.DEV ) {
      resolve( JSON.stringify( require( '../stubs/places-fixture.json' ) ) );
      return
    }

    https.get( searchUrl( queryString ), function( response ) {
      
      var string = '';
      
      response.on( 'data', function( chunk ) {
        string += chunk;
       });

      response.on( 'end', function() {
        resolve( string );
      });

    }).on( 'error', function( e ) {
      console.log( 'Error in request to google places api: ', e );
      reject( e );
    });
  });

};