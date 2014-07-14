// var Hogan = require( "hogan" );

window.BuildPlanView = Backbone.View.extend({

  template: '<div class="buildPlan"><p>I want to <input type="text" name="hostWhat" placeholder="eat/drink" value="drink"></input>near <input type="text" name="hostWhere" placeholder="location" value="downtown sf"></input> at <input type="text" name="hostWhen" placeholder="time" value="today 7:00pm"></input> with <input type="text" name="hostWho" placeholder="these people" value="Nick, Jared"></input>.</p><button type="button" class="createEvent">Check Mark Image</button><button type="reset" class="clear">Clear</button></div>',

  initialize: function() {
    this.render();
    $( "body" ).append( this.$el );
  },

  events: {
    'click .createEvent': 'createEvent',
    'click .clear': 'render'
  },

  createEvent: function(e) {
    e && e.preventDefault();

    //Sets the planModel host values equal to the form inputs
    this.model.set('hostWhat', this.$el.find('[name="hostWhat"]').val());
    this.model.set('hostWhere', this.$el.find('[name="hostWhere"]').val());
    this.model.set('hostWhen', this.$el.find('[name="hostWhen"]').val());
    this.model.set('hostWho', this.$el.find('[name="hostWho"]').val());

    //Saves the planModel host values to the db then navigate to the first round vote page.
    this.model.save().then( function( response ) {
      console.log( response );
      this.router.navigate( '/' + this.model.get('id') + '/' + round + '/' + this.model.get('currentRound'), trigger: true );
    });
  },

  render: function() {
    this.$el.html( _.template( this.template )(this.model.attributes) );
    return this;
  }

});