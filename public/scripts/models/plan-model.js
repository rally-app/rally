window.PlanModel = Backbone.Model.extend({
  urlRoot: "/plan/",

  initialize: function() {
    this.on( "reset", this.setCurrentRound.bind( this ) );
  },

  setCurrentRound: function() {
    var rounds = this.get( "rounds" );
    var index = (function() {
      for ( var i = 0; i < rounds.length; i++ ) {
        if ( rounds[i].winner === null ) {
          return i;
        }
      }
      return -1;
    })();
    this.set( "currentRoundNum", index + 1 );
    this.set( "currentRoundOptions", rounds[ index ].options );
  }

});