var https  = require( 'https' );
var searchUrl = require( './places-url.js' );

module.exports = function( queryString, callback ) {

  https.get( searchUrl( queryString ), function( response ) {
    
    var string;
    
    response.on( 'data', function( chunk ) {
      string += chunk;
     });

    response.on( 'end', function() {
      callback( null, string );
    })

  }).on( 'error', function( e ) {
    console.log( 'Error in request to google places api: ', e );
    callback( e );
  });


};