// var Hogan = require( "hogan" );
var hogan = window.Hogan;

window.BuildPlanView = Backbone.View.extend({

  template: hogan.compile(['<div class="buildPlan">',
    '<p>',
      '<input type="text" name="hostName" placeholder="Full Name"></input> want to ',
      '<select name="hostWhat">',
        '<option value="drink">drink</option>',
        '<option value="eat">eat</option>',
      '</select> near ',
      '<input type="text" name="hostWhere" placeholder="location"></input> at ',
      '<input type="time" name="hostWhen"></input> with ',
      '<input type="text" name="hostWho" placeholder="these people" value="Nick, Jared"></input>.',
    '</p>',
    '<button type="button" class="createEvent">Check Mark Image</button>',
    '<button type="reset" class="clear">Clear</button></div>'].join("")),



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
    this.model.set( 'hostWho', parseInvites(this.$el.find('[name="hostWho"]' ).val()));
    this.model.set( 'hostName', this.$el.find('[name="hostName"]' ).val());
    this.model.set( 'hostWhat', this.$el.find('[name="hostWhat"]' ).val());
    this.model.set( 'hostWhere', this.$el.find('[name="hostWhere"]' ).val());
    this.model.set( 'hostWhen', this.$el.find('[name="hostWhen"]' ).val());

    //Saves the planModel host values to the db then navigate to the first round vote page.
    this.model.save().then( function( response ) {
      console.log( response );
      this.router.navigate( '/' + this.model.get( 'id' ) + '/' + round + '/' + this.model.get( 'currentRound' ), trigger: true );
    });
  },

  parseInvites: function(emailString) {
    return emailString.replace( /\s/g, '' ).split( ',' );
  },

  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  }

});