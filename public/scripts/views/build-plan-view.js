// var Hogan = require( "hogan" );
var hogan = window.Hogan;

window.BuildPlanView = Backbone.View.extend({

  template: hogan.compile( [ '<div class="buildPlan">',
    '<p>',
      '<input type="text" name="hostName" placeholder="Full Name"></input> want to ',
      '<select name="hostWhat">',
        '<option value="bars">drink</option>',
        '<option value="restaurants">eat</option>',
      '</select> near ',
      '<input type="text" name="hostWhere" placeholder="location"></input> at ',
      '<input type="time" name="hostWhen"></input> with ',
      '<input type="text" name="hostWho" placeholder="these people" value="Nick, Jared"></input>.',
      'Let\'s figure this out in ',
      '<select name="finalVoteEnd">',
        '<option value="5">5</option>',
        '<option value="15">15</option>',
        '<option value="30">30</option>',
      '</select>',
      ' minutes.',
    '</p>',
    '<button type="button" class="createEvent">Check Mark Image</button>',
    '<button type="reset" class="clear">Clear</button></div>' ].join("") ),



  initialize: function() {
    this.render();
  },

  events: {
    'click .createEvent': 'createEvent',
    'click .clear': 'render'
  },

  createEvent: function( e ) {
    if( e ) {
       e.preventDefault();
     }

    var when = this.$el.find( '[name="hostWhen"]' ).val();
    var end = this.$el.find( '[name="finalVoteEnd"]' ).val();
    var who = this.$el.find( '[name="hostWho"]' ).val();

    //Sets the planModel host values equal to the form inputs
    this.model.set( 'hostWho', this.parseInvites( who ) );
    this.model.set( 'hostName', this.$el.find( '[name="hostName"]' ).val() );
    this.model.set( 'hostWhat', this.$el.find( '[name="hostWhat"]' ).val() );
    this.model.set( 'hostWhere', this.$el.find( '[name="hostWhere"]' ).val() );
    this.model.set( 'hostWhen',  this.makeWhen( when ) );
    this.model.set( 'finalVoteEnd',  this.makeEnd( end ) );

    //Saves the planModel host values to the db then navigate to the first round vote page.
    var self = this;
    this.model.save().then( function( response ) {
      router.navigate( '/' + self.model.get( 'id' ) + '/round/' + self.model.get( 'currentRoundNum' ), { trigger: true } );
    });
  },

  makeWhen: function( time ) {
    var now = moment();
    var hr = time.slice( 0, 2 );
    var min = time.slice( 3, 5 );

    now.hours(hr);
    now.minutes(min);
    now.seconds(00);

    return now;
  },

  makeEnd: function( minutes ) {
    var now = moment();
    now.add( 'minutes', minutes );

    return now;
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