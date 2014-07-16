var url = require( 'url' );
var secrets = require( '../secrets.js' );

module.exports = function( queryString ) {

  var query = { 
    query: queryString,
    key: secrets.GOOGLE_API_KEY
  };

  var searchUrl = url.parse(url.format({
    protocol: 'https',
    hostname: 'maps.googleapis.com',
    //May eventually want to make pathname less specific at textSearch (i.e. use nearbySearch or radarSearch)
    pathname: 'maps/api/place/textsearch/json',
    query: query
  }));

  return searchUrl;

};