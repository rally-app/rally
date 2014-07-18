var hogan = window.Hogan;

window.RoundExpiredView = Backbone.View.extend({

  template: hogan.compile( [
    '<div class="roundExpired">',
      '<p>You have already voted on this round. Stay tuned for a link to the Rally point!</p>',
    '</div>'
  ].join( "" ) ),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template.render() );
    return this;
  }

});