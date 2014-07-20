var mongoose = require( 'mongoose' );

//retrieve our custom connection string from environmental variable set in Azure
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;

//connect to database
var db = mongoose.connect( connectionString );

//create schemas for our plan, vote, and deadline models
var PlanSchema = new mongoose.Schema( {
  hostName: String
  hostWho: [ String, String, String ],
  hostWhen: Date,
  hostWhat: String,
  hostWhere: String,
  createdAt: Date,
  finalVoteEnd: Date,
  rounds: [
    {
      options: [
        {
          optionName: String,
          votes: Number
        }, {}, {}
      ],
      winner: String, // starts null
      votes: [ VoteModel, VoteModel, VoteModel ],
      deadline: Number // created by server
    }, {}, {}
  ],
  id: String,
  attending: Number,

//created client-side in plan-model.js for VoteOptionsView but never sent to server:
  currentRoundNum: Number,
  currentRoundOptions: [
    {
      optionName: String,
    }, {}, {}[, {}, {}...]
  ],
}
});

var VoteSchema = new mongoose.Schema( {

});

var DeadlineSchema = new mongoose.Schema( {

});

module.exports = {
  PlanSchema: PlanSchema,
  VoteSchema: VoteSchema,
  DeadlineSchema: DeadlineSchema
}