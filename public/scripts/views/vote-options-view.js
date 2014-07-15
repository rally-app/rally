var hogan = window.Hogan;

window.VoteOptionsView = Backbone.View.extend({

  tagName: 'div',

  className: 'voteOptionsView',

  template: hogan.compile( ['<span id="affirmation">Great! Where to?</span>',
              '<div id="options">',
                '{{#currentRoundOptions}}',
                '<input class="priority" type="button" value="{{optionName}}">',
                  //'<span id="rec1-title">{{title}}</span>', //modify when decide on final recommendation properties to display
                  //'<span id="rec1-description"></span>',
                  //'<span id="rec1-cost"></span><span id="rec1-rating"></span>',
                '{{/currentRoundOptions}}',
              '</div>',
              '<div id="vote">',
                '<input id="submitVote" type="button" value="Vote!">',
              '</div>',
              // '<div id="counters">',
              //   '<span id="rally-eta">{{ ??? }}</span>',
              //   '<span id="round-number">{{ currentRound + '/' + rounds.length }}</span>',
              //   '<span id="round-deadline">{{ ??? }}</span>',
              // '</div>',
              ].join('\n') ),

  initialize: function(){
    this.render();
    this._voteModel = new window.VoteModel({
      planId: this.model.get( 'id' ),
      userVotes: [],
      currentRoundNum: this.model.get( 'currentRoundNum' )
    });
    $( 'body' ).append( this.$el ); // ??? shouldn't this be appended in a master app view or maybe router?
  },

  events: {
    'click .priority': function(event){
      event.preventDefault();
      $(event.currentTarget).attr( 'disabled', 'disabled' );
      this.controller.setPriority.call( this, event.currentTarget.value );
    },
    'click #submitVote': function(event){
      event.preventDefault();
      this.controller.submitVote.call( this );
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
      if( userVotes.length === currentRoundOptions.length ){
        $( '#submitVote' ).trigger( 'click' );
      }
    },

    submitVote: function(){
      this._voteModel.save();
      this.$el.remove();
      new VoteConfirmedView( { model: window._planModel } ); // ??? should this go here? seems like tight coupling
    }

  }

});

// questions
  // localRound - stored in local storage, instead of rounds[0]
  // will there be a separate tracking of each user and the round they require? or via local storage?
  // mustache is logic-less, so need rounds in currentRound (and currentRoundNum for later)
    // reconsider VoteModel for this view's model!
  // instantiating sub-views in app view or even router? how to balance tight coupling vs master brain

// notes
  // MUST NOT put spaces in mustaches like {{ asdf }} bc will not parse correctly - lost a couple of hours on this
