VoteConfirmedView = Backbone.View.extend({

  template: ['<div class="voteConfirmed">
      <p> 
        Great! We\'ll let you know when the group reaches a decision.
      </p>
    </div>'].join(''),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
})