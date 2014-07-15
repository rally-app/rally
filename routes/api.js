var express = require( "express" )
var router = express.Router();

var routeMixins = [
  require( './plan-mixin' ),
  require( './vote-mixin' ),
];

var BASE_ROUTE = "/api"

routeMixins.forEach( function( routes ) {
  routes.forEach( function( routeObj ) {
    router[ routeObj.method ]( BASE_ROUTE + routeObj.url, routeObj.handler );
  });
});

module.exports = router;