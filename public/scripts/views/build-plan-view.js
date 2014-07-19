// var Hogan = require( "hogan" );
var hogan = window.Hogan;

window.BuildPlanView = Backbone.View.extend({

  template: hogan.compile( [ '<div class="buildPlan">',
    '<p>',
      'My name is <input class="madlib-input" type="text" name="hostName" placeholder="Full Name" value="Nicholas Henry">.',
    '</p>',
    '<p>',
      'I want to ',
      '<select name="hostWhat">',
        '<option value="bars">drink</option>',
        '<option value="restaurants">eat</option>',
      '</select> near ',
      '<input class="madlib-input" type="text" name="hostWhere" placeholder="location" value="the Presidio"> at ',
      '<input class="madlib-input" type="time" name="hostWhen" value="21:30"> with ',
      '<input class="madlib-input" type="text" name="hostWho" placeholder="emails of friends" value="Mike,Jared">.',
    '</p>',
    '<p>',
      'Let\'s finalize this rally within the next ',
      '<select name="finalVoteEnd">',
        '<option value="5">5</option>',
        '<option value="15">15</option>',
        '<option value="30">30</option>',
      '</select>',
      ' minutes.',
    '</p>',
    '<button type="button" id="createPlan">Checkmark Image</button>',
    '<button type="reset" id="clearPlan">Clear</button></div>' ].join("") ),

  initialize: function() {
    // save references to the inputs once so we don't have to perform mutliple $() selections
    this.render();
    this._inputs = this.$el.find( "input[type='text']" );
    this._selects = this.$el.find( "select" );
    this._$hostWhen = this.$el.find( '[name="hostWhen"]' );
    this._$hostWho = this.$el.find( '[name="hostWho"]' );
    this._$hostWhat = this.$el.find( '[name="hostWhat"]' );
    this._$hostWhere = this.$el.find( '[name="hostWhere"]' );
    this._$hostName = this.$el.find( '[name="hostName"]' );
    this._$finalVoteEnd = this.$el.find( '[name="finalVoteEnd"]' );
  },

  events: {
    'click #createPlan': 'createPlan',
    'click #clearPlan': 'render'
  },

  getValues: function() {
    return {
      hostWho: this.parseInvites( this._$hostWho.val() ),
      hostName: this._$hostName.val(),
      hostWhat: this._$hostWhat.val(),
      hostWhere: this._$hostWhere.val(),
      hostWhen: this.makeWhen( this._$hostWhen.val() ),
      finalVoteEnd: this.makeEnd( this._$finalVoteEnd.val() )
    };
  },

  createPlan: function( evt ) {
    if ( evt ) {
       evt.preventDefault();
    }
    var model = this.model;
    var values = this.getValues();
    $.extend( values, {
      createdAt: moment().startOf( 'minute' ).add( 'minutes', 1 ),
      attending: 1
    });
    model.set( values );
    
    model.save().then( function( response ) {
      router.navigate( '/' + model.get( 'id' ) + '/round/' + model.get( 'currentRoundNum' ), 
        { trigger: true } 
      );
    });
  },

  makeWhen: function( time ) {
    var now = moment();
    var hr = time.slice( 0, 2 );
    var min = time.slice( 3, 5 );
    now.hours( hr );
    now.minutes( min );
    now.seconds( 00 );
    return now;
  },

  makeEnd: function( minutes ) {
    var now = moment().startOf( 'minute' ).add( 'minutes', 1 ); //round to nearest minute and add 1 to remain relative to createdAt
    now.add( 'minutes', minutes );

    return now;
  },

  //Remove all spaces and split email entries into an array of emails.
  parseInvites: function(emailString) {
    return emailString.replace( /\s/g, '' ).split( ',' );
  },

  madlib: function() {
    this._selects.map( function() {
      $( this ).madlibSelect();
    });
    this._inputs.map( function() {
      $( this ).madlibInput();
    });
  },

  render: function() {
    this.$el.html( this.template.render( this.model.attributes ) );
    setTimeout( this.madlib.bind( this ), 0 );
    return this;
  }

});