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
var secrets = require('../secrets.js');
var testPlan = require( '../stubs/plan-fixture.js' );

//retrieve our custom connection string from environmental variable set in Azure
var connectionString = secrets.MONGO_CONN || process.env.CUSTOMCONNSTR_MONGOLAB_URI; //replace with only process.env

var mongo = new Mongo ( connectionString, { auto_reconnect: true } );

//GET
var find = function( collectionName, id ) {
  console.log( 'Handling document id', id, 'find request in collection', collectionName );
  return new Bluebird( function( resolve, reject ) {
    mongo.find( collectionName, { id: id } )
    .then( function( plan ) {
      console.log( 'Success on document id', id, 'find:', JSON.stringify( plan ) );
      resolve( plan[0] ); //find returns an array
    })
    .catch( function( err ) {
      reject( NOT_FOUND, err );
    });
  })
};

//POST
var save = function( collectionName, obj ) {
  return new Bluebird( function( resolve, reject ) {
    var id = uniqueId();
    obj.id = id;
    mongo.insert( collectionName, obj )
    .then( function() {
      //confirm insert into database - without this future gets to plan with that ID fail - why?
      mongo.find( collectionName, {id: obj.id})
      .then( function( foundObj ) {
        console.log( 'Success on document id', obj.id, 'insert.' );
      })
      .catch( function( err ) {
        console.log( 'Failure on document id', obj.id, 'insert:', err );
      });
      resolve( obj );
    })
    .catch( function( err ) {
      reject( BAD_REQUEST, err );
    });
  });
};

  // PUT
  // update: function( modelName, id, obj ) {
  //   return new Bluebird( function( resolve, reject ) {
  //     var success = !!storage[ modelName ][ id ];
  //     setTimeout( function() {
  //       if ( success ) {
  //         storage[ modelName ][ id ] = JSON.stringify( obj );
  //         resolve( obj );
  //       } else {
  //         reject( NOT_FOUND );
  //       }
  //     }, DELAY );
  //   });
  // },

//PUT
var update = function( collectionName, id, obj ) {
  return new Bluebird( function( resolve, reject ) {
    mongo.findAndModify( collectionName, { id: id }, obj )
    .then( function( what ) {
      console.log( 'what returned from findAndModify: ', JSON.stringify( what ) );
    })
    .catch( function( err ) {
      reject( NOT_FOUND, err );
    })
  });
};
  
  // mongo.collection( 'plan' )
  // .then( function( collection ) {
  //   console.log( 'collection:', collection.collectionName );
  //   // mongo.insert( collection.collectionName, testPlan );
  //   mongo.remove( collection.collectionName, {hostWhat: 'drinks'});
  // })
  // .then( function( what )  {
  //   console.log( 'what is returned:', what );
  // })
  // .catch( function( err ) {
  //   console.log( 'err:', err );
  // });

module.exports = {
  find: find,
  save: save,
  // filter: filter,
  // findWhere: findWhere, // only used in vote-mixin, which isn't used in app
  update: update,
  // addDeadline: addDeadline,
  // expireDeadlines: expireDeadlines
};