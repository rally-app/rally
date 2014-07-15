var express = require( 'express' );
var path = require( 'path' );
var session = require( 'express-session' );
var favicon = require( 'static-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );

// when running in development mode, the app should accept cross-origin requests for easier testing.
// var cors = require( 'cors' );
// app.use( function() {
//   if ( app.get( 'env' ) === 'development' ) {
//      // CORS!!!
//   }   
// })


// var indexRoute = require( './routes/index' );
var planRoute = require( './routes/plan' );

var app = express();

// view engine setup
app.set( 'views', path.join(__dirname, 'views' ));
app.set( 'view engine', 'jade' );

app.use( favicon());
app.use( session({ 
  secret: 'rallyApp',
  saveUninitialized: 'true', 
  resave: 'true'
}));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// serving index.html statically from public
// app.use( '/', function( req, res ) {

// });

app.use( '/plan', planRoute );

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get( 'env' ) === 'development' ) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render( 'error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render( 'error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
