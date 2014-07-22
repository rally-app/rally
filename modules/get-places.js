var https  = require( 'https' );
var searchUrl = require( './places-url.js' );
var Promise = require('bluebird');


module.exports = function( queryString ) {


  return new Promise( function( resolve, reject ) { 
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

    // // hacky solution for using fixture data instead of using a bunch of Places API calls
    // // comment out from https.get to here to use this hacky solution
    // var placesFixture = require( '../stubs/places-fixture.json' );
    // resolve( JSON.stringify( placesFixture ) );
  });

};