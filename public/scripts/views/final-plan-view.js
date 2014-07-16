var hogan = window.Hogan;

window.FinalPlanView = Backbone.View.extend({

  tagName: 'div',

  className: 'finalPlanView',

  template: hogan.compile('<span id="plan">You\'re rallying with {{voteCount}} friends tonight at {{winner}}! See you there at {{hostWhen}}!</span>'),

  initialize: function(){
    this.render();
  },

  events: {
    // add buttons for map it, share it, make your own rally
  },

  render: function(){
    this.$el.html( this.template.render( this.model.attributes ) );
    return this;
  }

});