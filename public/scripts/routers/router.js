Router = Backbone.Router.extend({

  Routes: {
    "/": "buildPlan",
    "/:id": "proposedPlan",
    "/:id/round/:roundNum": "voteOptionsView"
  },

  buildPlan: function() {
    var planModel = new PlanModel();
    var buildPlanView = new BuildPlanView({ model: planModel });
  },

  //Renders a view for invitees to accept the invitaion to rally
  proposedPlan: function( id ) {
    var planModel = new PlanModel();
    planModel.fetch( id: id );
    var proposedPlanView = new ProposedPlanView({ model: planModel });
  },

  //Renders a view for the first round of voting
  voteOptions: function(id, round) {
    var planModel = new PlanModel();
    planModel.fetch( id: id );
    var voteOptionsView = new VoteOptionsView({ model: planModel });
  }
  
})
