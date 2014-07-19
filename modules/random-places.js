

module.exports = function( places ) {

  var options = 3;
  var results = [];

  // Choose the first 15 results from Google Places API
  places = places.slice( 0, 14 );
  
  // Generate a random indicee based on the length of the places array
  var choose = function( length ){
    return Math.floor( Math.random() * length );
  };
  
  // Pick 3 random places from the places array
  for( var i=0; i < options; i++ ) {
    results.push( places.splice( choose( places.length ), 1 )[0] );
  }
  
  // Return an array of 3 chosen places
  return results;

};