
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
    $( 'body' ).empty();
    var planModel = new PlanModel();
    var buildPlanView = new BuildPlanView({ model: planModel });
    $( 'body' ).append( buildPlanView.$el );
  },

  //Renders a view for invitees to accept the invitaion to rally
  //TODO: will need some session logic to redirect to either vote options or vote confirmed if user has voted on this round.
  proposedPlan: function( id ) {
    $( 'body' ).empty();
    var planModel = new PlanModel({ id: id });
    
    planModel.fetch().then( function(){
      var proposedPlanView = new ProposedPlanView({ model: planModel });
      $( 'body' ).append( proposedPlanView.$el );
    });

  },

  //Renders a view for the first round of voting
  //TODO: will need some session logic to redirect to vote confirmed if user has voted on this round.
  voteOptions: function( id ) {
    $( 'body' ).empty();
    var planModel = new PlanModel({ id: id });

    planModel.fetch().then( function(){
      var voteOptionsView = new VoteOptionsView({ model: planModel });
      $( 'body' ).append( voteOptionsView.$el );
    });

  },

  //Renders the voteComfirmed view to indicate a state of waiting for group decision.
  voteConfirmed: function( id ) {
    $( 'body' ).empty();
    var planModel = new PlanModel({ id: id });

    planModel.fetch().then( function(){
      //voteConfirmedView is currently unaffected by planModel, but will eventually utilize it.
      var voteConfirmedView = new VoteConfirmedView({ model: planModel });
      $( 'body' ).append( voteConfirmedView.$el );
    });

  },

  finalizedPlan: function( id ) {
    $( 'body' ).empty();
    var planModel = new PlanModel({ id: id });

    planModel.fetch().then( function(){
      var finalizedPlanView = new FinalizedPlanView({ model: planModel });
      $( 'body' ).append( finalizedPlanView.$el );
    });

  }
  
});
