function Model( query ) {
  this.hostWho = query.hostWho;
  this.hostWhen = query.hostWhen;
  this.hostWhat = query.hostWhat;
  this.hostWhere = query.hostWhere;
  this.createdAt = new Date();
}

// this method is a stub for async get from db
// remove when implementing db get
Model.find = function( id ) {
  var db = require( "../stubs/db" );
  return db.find( id );
};

// this method is a stub for async save to db
// remove when implementing db save
Model.prototype.save = function() {
  var db = require( "../stubs/db" );
  return db.save( this );
};