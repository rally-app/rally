//San Francisco: 37.7577,-122.4376
// https://map.googleapis.com/maps/api/place/textSearch/json?

var https  = require( 'https' );
var searchUrl = require( './places-url.js' );

module.exports = function( queryString ) {

  var queryURL = searchUrl( queryString );

  

};
