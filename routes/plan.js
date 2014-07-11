var express = require( "express" );
var router = express.Router();

router.get( "/:id", function( req, res ) {
  res.send( "Caught GET to /plan/" + req.params.id );
});

router.post( "/", function( req, res ) {
  res.send( "Caught POST to /plan" );
});

module.exports = router;