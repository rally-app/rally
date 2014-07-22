// var Hogan = require( "hogan" );
var hogan = window.Hogan;

window.BuildPlanView = Backbone.View.extend({

  template: hogan.compile( [ '<div class="buildPlan">',
    // '<p>',
    //   'My name is <input class="madlib-input" type="text" name="hostName" placeholder="Full Name" value="Nicholas Henry">.',
    // '</p>',
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
        '<option value="1">1 minute</option>',
        '<option value="5" selected>5 minutes</option>',
        '<option value="15">15 minutes</option>',
        '<option value="30">30 minutes</option>',
        '<option value="60">1 hour</option>',
        '<option value="180">3 hours</option>',
        '<option value="500">5 hours</option>',
      '</select>',
      '.',
    '</p>',
    '<div class="actions">',
      '<button class="warning lg" id="clearPlan"><i class="fa fa-minus-circle"></i></button>',
      '<button class="good lg" id="createPlan"><i class="fa fa-check-circle-o"></i></button>',
    '</div>'
  ].join("") ),

  initialize: function() {
    this.render();
  },

  events: {
    'click #createPlan': 'createPlan',
    'click #clearPlan': 'render'
  },

  getValues: function() {
    return {
      hostWho: this.getWho(),
      hostName: this.localName(),
      hostWhat: this._$hostWhat.val(),
      hostWhere: this._$hostWhere.val(),
      hostWhen: this.makeWhen( this._$hostWhen.val() ),
      finalVoteEnd: this.makeEnd( this._$finalVoteEnd.val() )
    };
  },

  //Remove all spaces and split email entries into an array of emails.
  parseInvites: function(emailString) {
    return emailString.replace( /\s/g, '' ).split( ',' );
  },
  
  //Gets all invited emails
  getWho: function() {
    //adds locally stored host email to invited emails
    var hostEmail = JSON.parse( window.localStorage.getItem( 'rallyUser' ) ).email;
    var invitees = this.parseInvites( this._$hostWho.val() )
    invitees.push( hostEmail );
    return invitees;
  },
  
  // gets host name from local storage
  localName: function() {
    return JSON.parse( window.localStorage.getItem( 'rallyUser' ) ).name;
  },

  createPlan: function( evt ) {
    if ( evt ) {
       evt.preventDefault();
    }
    var model = this.model;
    var values = this.getValues();

    $.extend( values, {
      createdAt: moment().startOf( 'minute' ).add( 'minutes', 1 ), //round up to next minute for facility with expireDeadlines()
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
    //round up to nearest minute and add 1 to remain relative to createdAt
    return moment().startOf( 'minute' ).add( 'minutes', minutes ).add( 'minutes', 1 );
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
    // this hocus-pocus ensures the madlibs are built before the html is displayed
    // (prevents jarring repaint after render)
    var domTree = $( this.template.render( this.model.attributes) );

    // cache refs to stuff we need here
    // not gonna be able to do it in @initialize bc new elements get rendered each time
    this._inputs = domTree.find( "input[type='text']" );
    this._selects = domTree.find( "select" );
    this._$hostWhen = domTree.find( '[name="hostWhen"]' );
    this._$hostWho = domTree.find( '[name="hostWho"]' );
    this._$hostWhat = domTree.find( '[name="hostWhat"]' );
    this._$hostWhere = domTree.find( '[name="hostWhere"]' );
    this._$hostName = domTree.find( '[name="hostName"]' );
    this._$finalVoteEnd = domTree.find( '[name="finalVoteEnd"]' );
    
    this.madlib();
    this.$el.empty().append( domTree );

    return this;
  }

});