// var Hogan = require( "hogan" );
var hogan = window.Hogan;

window.BuildPlanView = Backbone.View.extend({

  template: hogan.compile( [ '<div class="buildPlan">',
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
    '<button type="reset" class="clear">Clear</button></div>' ].join("") ),



  initialize: function() {
    this.render();
    $( "body" ).append( this.$el );
  },

  events: {
    'click .createEvent': 'createEvent',
    'click .clear': 'render'
  },

  createEvent: function( e ) {
    if( e ) {
       e.preventDefault();
     }

    //Sets the planModel host values equal to the form inputs
    this.model.set( 'hostWho', this.parseInvites( this.$el.find( '[name="hostWho"]' ).val() ) );
    this.model.set( 'hostName', this.$el.find('[name="hostName"]' ).val() );
    this.model.set( 'hostWhat', this.$el.find('[name="hostWhat"]' ).val() );
    this.model.set( 'hostWhere', this.$el.find('[name="hostWhere"]' ).val() );
    this.model.set( 'hostWhen', this.$el.find('[name="hostWhen"]' ).val() );

    // this.model.set( 'currentRound', 1 );

    //Saves the planModel host values to the db then navigate to the first round vote page.
    var self = this;
    this.model.save().then( function( response ) {
      console.log( response );
      router.navigate( '/' + self.model.get( 'id' ) + '/' + 'round' + '/' + self.model.get( 'currentRound' ), { trigger: true } );
    });
  },

  //Remove all spaces and split email entries into an array of emails.
  parseInvites: function(emailString) {
    return emailString.replace( /\s/g, '' ).split( ',' );
  },

  render: function() {
    this.$el.html( this.template.render( this.model.attributes ) );
    return this;
  }

});