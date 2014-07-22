var getPlaces = require( './get-places.js' );
var randomPlaces = require( './random-places.js' );

module.exports = function( queryString ) {

  return getPlaces( queryString ).then( function( results ) {

    var places = JSON.parse(results).results;

    return randomPlaces( places );
  })
  .catch( function( err ) {
    console.log( err );
  });

};
