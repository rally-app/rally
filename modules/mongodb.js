// var MongoClient = require( 'mongodb' ).MongoClient;
var Mongo = require( 'mongo-gyro' );
var Bluebird = require( 'bluebird' );

// require calls to scripts
var uniqueId = require( '../stubs/uid.js' );
var validateDeadline = require('../stubs/validate-deadline');

// constants for this file
var NOT_FOUND = 404;
var BAD_REQUEST = 400;
var DELAY = 100;

//temporary
var testPlan = require( '../stubs/plan-fixture.js' );

//retrieve our custom connection string from environmental variable set in Azure
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;

var mongo = new Mongo ( connectionString, { auto_reconnect: true } );

//GET
var find = function( collectionName, id ) {
  console.log( 'Handling document id', id, 'find request in collection', collectionName );
  return mongo.find( collectionName, { id: id } );
};

//POST
//saves plan and vote models to respective collections
var save = function( collectionName, obj ) {
  return new Bluebird( function( resolve, reject ) {
    var id = uniqueId();
    obj.id = id;
    mongo.insert( collectionName, obj )
    .then( function() {
      //confirm insert into database - without this future gets to plan with that ID fail - why?
      mongo.find( collectionName, {id: obj.id})
      .then( function( foundObj ) {
        console.log( 'Insert successful on document id', obj.id );
      })
      .catch( function( err ) {
        console.log( 'Insert failed on document id', obj.id, err );
      });
      resolve( obj );
    })
    .catch( function( err ) {
      reject( BAD_REQUEST, err );
    });
  });
};

//PUT
var update = function( collectionName, id, obj ) {
  console.log( 'updating database at collection:', collectionName, ', id:', id, ', votes:', obj.rounds[0].votes );
  return mongo.findAndModify( collectionName, { id: id }, obj );
};

module.exports = {
  find: find,
  save: save,
  // filter: filter,
  // findWhere: findWhere, // only used in vote-mixin, which isn't used in app
  update: update,
  // addDeadline: addDeadline,
  // expireDeadlines: expireDeadlines
};
