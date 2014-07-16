var getPlaces = require( './get-places.js' );

module.exports = function( queryString ) {

  return getPlaces( queryString ).then( function( results ) {

    var places = JSON.parse(results).results;
    var options = [];

    for( var i = 0; i < 3; i++ ) {
      options.push( places[i] );
    }

    return options;
  });

};
