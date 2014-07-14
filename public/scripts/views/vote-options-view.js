var hogan = window.Hogan;

var VoteOptionsView = Backbone.View.extend({

  tagName: 'div',

  template: hogan.compile(['<span id="affirmation">Great! Where to?</span>',
              '<div id="options">',
                '{{ #rounds[currentRound].options }}<input class="priority" type="button" value="{{ optionName }}">{{ /rounds[currentRound].options }}',
              '</div>',
              '<div id="vote">',
                '<input id="submitVote" type="button" value="Vote!">',
              '</div>',
              // '<div id="counters">',
              //   '<span id="rally-eta">{{ ??? }}</span>',
              //   '<span id="round-number">{{ currentRound + '/' + rounds.length }}</span>',
              //   '<span id="round-deadline">{{ ??? }}</span>',
              // '</div>',
              ].join('\n')),

  initialize: function(){
    this.render();
    this._voteModel = new window.VoteModel({
      planId: this.model.get('id'),
      userVotes: [],
      currentRound: this.model.get('currentRound')
    });
  },

  events: {
    'click .priority': function(){
      this.controller.setPriority.call(this)
    },
    'click #submitVote': 'submitVote' 
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  controller: {
    setPriority: function(num){
      var userVotes = this._voteModel.get('userVotes');
      userVotes.push(findEventTarget().optionName);
      this._voteModel.set('userVotes', userVotes);
      if( userVotes.length === this.model.get('rounds').length ){
        this.model.trigger('click #submitVote');
      }
    },

    submitVote: function(){
      this._voteModel.save();
    }

  }

});

// questions
// localRound - stored in local storage, instead of rounds[0]

                  // <span id="rec1-title">{{ title }}</span>
                  // <span id="rec1-description"></span>
                  // <span id="rec1-cost"></span><span id="rec1-rating"></span>