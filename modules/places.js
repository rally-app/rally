var getPlaces = require( './get-places.js' );

module.exports = function( queryString ) {

  var places;

  getPlaces( queryString, function( error, results ) {
    
    if( error ) {
      console.log( 'Error in places.js: ', error );
    }

    places = JSON.parse(results).results;

    console.log(places);

  });

};
