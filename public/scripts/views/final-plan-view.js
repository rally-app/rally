var hogan = window.Hogan;

window.FinalPlanView = Backbone.View.extend({

  tagName: 'div',

  className: 'finalPlanView',

  template: hogan.compile( ['<span id="plan">You\'re rallying at {{winner.name}}! See you there {{hostWhen}}!</span>'
              // '<div id="buttons">',
                //buttons for map it, share it, make your own rally
              // '</div>',
              ].join( '\n' ) ),


  initialize: function(){
    this.render();
  },

  events: {
    // add buttons for map it, share it, make your own rally
  },

  render: function(){

    var templateAttributes = {
      winner: this.model.get( 'rounds' )[0].winner.option,
      hostWhen: moment( this.model.get( 'hostWhen' ) ).calendar()
    }

    this.$el.html( this.template.render( templateAttributes ) );
    return this;
  }

});