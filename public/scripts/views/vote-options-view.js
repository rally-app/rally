var hogan = window.Hogan;

// TODO: browserify
// this should be a require-able module
var bindAll = function( objectWithMethods, objectToBindTo ) {
  var boundMethods = {};
  Object.keys( objectWithMethods ).forEach( function( methodName ) {
    var originalMethod = objectWithMethods[ methodName ];
    if ( typeof originalMethod === 'function' ) {
      boundMethods[ methodName ] = originalMethod.bind( objectToBindTo );
    }
  });
  return boundMethods;
};

window.VoteOptionsView = Backbone.View.extend({

  tagName: 'div',

  className: 'voteOptionsView',

  template: hogan.compile([
    '<ul class="priority-list">',
      '{{#currentRoundOptions}}',
        '<li class="option priority-item" data-value="{{name}}" data-index="{{index}}">',
          '<span class="option--name">{{name}}</span>',
          '<span class="option--price">{{price_level}}</span>',
          '<span class="option--rating">{{rating}}</span>',
        '</li>',
      '{{/currentRoundOptions}}',
      '</ul>',
      '<div class="actions-wrapper">',
        '<button id="submitVote" type="button">Vote</button>',
      '</div>'].join( '\n' )),

  initialize: function(){
    this.render();
    // this.model.on( 'change', this.render.bind( this ) ); // ??? remove this once we ascertain the order of fetch
    this._voteModel = new window.VoteModel({
      planId: this.model.get( 'id' ),
      userVotes: [],
      currentRoundNum: this.model.get( 'currentRoundNum' )
    });
    this._priorityCount = 0;

    this.controller = bindAll( this.controller, this );
  },

  events: {
    'click .priority-item': function( event ){
      var $target = $( event.currentTarget );
      if ( !$target.is( ".priority-item--disabled" ) ) {
        this._priorityCount += 1;
        $target.addClass( "priority-item--disabled" );
        $target.attr( "data-order", this._priorityCount );
        this.controller.setPriority( +$target.data( "index" ) );
      }
    },
    'click #submitVote': function(event){
      $(event.currentTarget).attr( 'disabled', 'disabled' );
      this.controller.submitVote();
    }
  },

  render: function(){
    this.$el.html( this.template.render( this.model.attributes ) );
    return this;
  },

  controller: {
    setPriority: function( option ){
      var userVotes = this._voteModel.get( 'userVotes' );
      userVotes.push( option );
      this._voteModel.set( 'userVotes', userVotes );
      var currentRoundOptions = this.model.get( 'currentRoundOptions' );
      if( userVotes.length === currentRoundOptions.length ) {
        console.log( 'submitting...' );
        $( '#submitVote' ).trigger( 'click' );
      }
    },

    submitVote: function(){
      var model = this.model;
      this._voteModel.save().then( function( response ) {
        router.navigate( 
          '/' + model.get( 'id' ) +
          '/round/' + model.get( 'currentRoundNum' ) +
          ( response.expired ? '/expired' : '/voted' ),
          { trigger: true }
        );
      });
    }

  }

});
