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
      this._voteModel.save()
      .then( function( response ) {
        console.log('server response after submitVote: ', response);
        this.$el.remove();
 //might change the following if we change model to VoteModel
        router.navigate( '/' + this.model.get( 'id' ) + '/round/' + this.model.get( 'currentRoundNum' ) + '/voted', { trigger: true } );
      });
    }

  }

});
