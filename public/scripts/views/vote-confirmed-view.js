var hogan = window.Hogan;


window.VoteConfirmedView = Backbone.View.extend({

  template: hogan.compile( '<div class="voteConfirmed"><p> Great! We\'ll let you know when the group reaches a decision.</p></div>' ),

  initialize: function() {
    this.render();
    $( 'body' ).append( this.$el );
  },

  render: function() {
    this.$el.html( this.template.render( this.model.attributes ));
    return this;
  }
});