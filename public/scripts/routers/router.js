
var PlanModel = window.PlanModel;
var BuildPlanView = window.BuildPlanView;
var ProposedPlanView = window.ProposedPlanView;
var VoteOptionsView = window.VoteOptionsView;
var VoteConfirmedView = window.VoteConfirmedView;
var FinalizedPlanView = window.FinalizedPlanView;
var RoundExpiredView = window.RoundExpiredView;

var appWrapper = $( "#app" );
appWrapper.loadingView = function() {
  this.html( "<h2>Loading!</h2>" );
};

window.Router = Backbone.Router.extend({

  routes: {
    "": "buildPlan",
    ":id": "proposedPlan",
    ":id/round/:roundNum": "voteOptions",
    ":id/round/:roundNum/voted": "voteConfirmed",
    ":id/round/:roundNum/expired": "roundExpired",
    ":id/result": "finalizedPlan"
  },

  buildPlan: function() {
    appWrapper.loadingView();
    var planModel = new PlanModel();
    var buildPlanView = new BuildPlanView({ model: planModel });
    appWrapper.html( buildPlanView.$el );
    appWrapper.currentView = buildPlanView;
  },

  //Renders a view for invitees to accept the invitaion to rally
  //TODO: will need some session logic to redirect to either vote options or vote confirmed if user has voted on this round.
  proposedPlan: function( id ) {
    appWrapper.loadingView();
    var planModel = new PlanModel({ id: id });
    planModel.fetch().then( function(){
      var proposedPlanView = new ProposedPlanView({ model: planModel });
      appWrapper.html( proposedPlanView.$el );
    });

  },

  //Renders a view for the first round of voting
  //TODO: will need some session logic to redirect to vote confirmed if user has voted on this round.
  voteOptions: function( id ) {
    appWrapper.loadingView();
    var planModel = new PlanModel({ id: id });
    planModel.fetch().then( function(){
      var voteOptionsView = new VoteOptionsView({ model: planModel });
      console.log( planModel );
      appWrapper.html( voteOptionsView.$el );
    });

  },

  //Renders the voteComfirmed view to indicate a state of waiting for group decision.
  voteConfirmed: function( id ) {
    appWrapper.loadingView();
    var planModel = new PlanModel({ id: id });
    planModel.fetch().then( function(){
      //voteConfirmedView is currently unaffected by planModel, but will eventually utilize it.
      var voteConfirmedView = new VoteConfirmedView({ model: planModel });
      appWrapper.html( voteConfirmedView.$el );
    });

  },

  roundExpired: function( id ) {
    appWrapper.loadingView();
    var planModel = new PlanModel({ id: id });
    planModel.fetch().then( function() {
      var roundExpiredView = new RoundExpiredView({ model: planModel });
      appWrapper.html( roundExpiredView.$el );
    })
  },

  finalizedPlan: function( id ) {
    appWrapper.loadingView();
    var planModel = new PlanModel({ id: id });
    planModel.fetch().then( function(){
      var finalPlanView = new FinalPlanView({ model: planModel });
      appWrapper.html( finalPlanView.$el );
    });

  }
  
});
