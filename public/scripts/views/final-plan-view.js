var hogan = window.Hogan;

window.FinalPlanView = Backbone.View.extend({

  tagName: 'div',

  className: 'finalPlanView',

  template: hogan.compile( ['<span id="plan">You\'re rallying at {{winner.name}}! See you there {{hostWhen}}!</span>',
              '<div id="buttons">',
              // double slash below makes it so address is automatically destination
              '<a href="http://google.com/maps/dir//{{winner.formatted_address}}" target=new>Get directions!</a>',
                // buttons for map it, share it, make your own rally
              '</div>',
              ].join( '\n' ) ),


  initialize: function(){
    console.log( this.model.attributes );
    this.render();
  },

  events: {
    // add buttons for map it, share it, make your own rally
  },

  render: function(){

    var templateAttributes = {
      winner: this.model.get( 'rounds' )[0].winner.option,
      hostWhen: moment( this.model.get( 'hostWhen' ) ).calendar().toLowerCase()
    }

    this.$el.html( this.template.render( templateAttributes ) );
    return this;
  }

});