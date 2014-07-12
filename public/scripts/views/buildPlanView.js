BuildPlanView = Backbone.View.extend({

  template: ['<div class="buildPlan">
      <p> 
        I want to <input type="text" name="hostWhat" placeholder="eat/drink"></input>
        near <input type="text" name="hostWhere" placeholder="location"></input> at 
        <input type="date" name="hostWhen" placeholder="time"></input> with
        <input type="text" name="hostWho" placeholder="these people"></input>.
      </p>
      <button type="button" class="createEvent">Check Mark Image</button>
      <button type="reset" class="clear">Clear</button>
    </div>'].join(''),

  initialize: function() {
    this.render();
  },

  events: {
    'click .createEvent': 'createEvent',
    'click .clear': 'render'
  },

  createEvent: function() {

    this.model.set('hostWhat', this.$el.find('[name="hostWhat"').val()),
    this.model.set('hostWhat', this.$el.find('[name="hostWhere"]').val()),
    this.model.set('hostWhat', this.$el.find('[name="hostWhen"]').val()),
    this.model.set('hostWhat', this.$el.find('[name="hostWho"]').val()),

  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  };

});