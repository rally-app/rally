
var PlanModel = window.PlanModel;
var BuildPlanView = window.BuildPlanView;
var ProposedPlanView = window.ProposedPlanView;
var VoteOptionsView = window.VoteOptionsView;
var VoteConfirmedView = window.VoteConfirmedView;
var FinalizedPlanView = window.FinalizedPlanView;


window.Router = Backbone.Router.extend({

  routes: {
    "": "buildPlan",
    ":id": "proposedPlan",
    ":id/round/:roundNum": "voteOptions",
    ":id/round/:roundNum/voted": "voteConfirmed",
    ":id/result": "finalizedPlan"
  },

  buildPlan: function() {
    var planModel = new PlanModel();
    var buildPlanView = new BuildPlanView({ model: planModel });
  },

  //Renders a view for invitees to accept the invitaion to rally
  //TODO: will need some session logic to redirect to either vote options or vote confirmed if user has voted on this round.
  proposedPlan: function( id ) {
    var planModel = new PlanModel();
    planModel.fetch({ id: id });
    var proposedPlanView = new ProposedPlanView({ model: planModel });
  },

  //Renders a view for the first round of voting
  //TODO: will need some session logic to redirect to vote confirmed if user has voted on this round.
  voteOptions: function( id, round ) {
    var planModel = new PlanModel();
    planModel.fetch({ id: id });
    var voteOptionsView = new VoteOptionsView({ model: planModel });
  },

  //Renders the voteComfirmed view to indicate a state of waiting for group decision.
  voteConfirmed: function() {
    var planModel = new PlanModel();
    var voteConfirmedView = new VoteConfirmedView({ model: planModel });
  },

  finalizedPlan: function( id ) {
    var planModel = new PlandModel();
    planModel.fetch({ id: id });
    var finalizedPlanView = new FinalizedPlanView({ model: planModel });
  }
  
});
