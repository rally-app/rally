window.PlanModel = Backbone.Model.extend({
  urlRoot: '/plan/',

  initialize: function() {
    this.set( 'rounds', []);
    this.on( 'sync', function(){
      if ( this.get( 'rounds' ).length ) {
        this.setCurrentRound();
        this.setOptionIndices();
      }
    }, this);
  },

  setCurrentRound: function() {
    var rounds = this.get( 'rounds' );
    var index = (function() {
      for ( var i = 0; i < rounds.length; i++ ) {
        if ( rounds[i].winner === null ) {
          return i;
        }
      }
      return -1;
    })();
    this.set( 'currentRoundNum', index + 1 );
    this.set( 'currentRoundOptions', rounds[ index ].options );
  },

  setOptionIndices: function() {
    var currentRoundOptions = this.get( 'currentRoundOptions' );
    for( var i = 0; i < currentRoundOptions.length; i++ ){
      currentRoundOptions[i].index = i;
      console.log(i, currentRoundOptions); //left in to demonstrate that these methods are being called twice for some reason
    }
  }

});