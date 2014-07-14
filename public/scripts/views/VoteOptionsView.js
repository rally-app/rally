var VoteOptionsView = Backbone.View.extend(){

// var VoteModel = Backbone.Model.extend({
//   planId: String,
//   userVotes: []
// });

  tagName: 'div',
  
  template: ['<span id="affirmation">Great! Where to?</span>
              <div id="options">
                <input class="priority" type="button" value="{{ #rounds[currentRound].options }}{{ optionName }}{{ /rounds[currentRound].options }}">
              </div>
              <div id="vote">
                <input id="submitVote" type="button" value="Vote!">
              </div>
              <div id="counters">
                <span id="rally-eta">{{ ??? }}</span>
                <span id="round-number">{{ currentRound + '/' + rounds.length }}</span>
                <span id="round-deadline">{{ ??? }}</span>
              </div>'].join(''),

  initialize: function(){
    this.render();
  },

  events: {
    'click .priority': 'controller.setPriority',
    'click #submitVote': 'controller.submitVote' 
  },

  render: function(){
    this.$el.children.detach();
    this.$el.html(this.template.compile(this.model.attributes));
    return $el;
  },

  controller: {
    setPriority: function(num){
      var userVotes = this.model.get('userVotes');
      uservotes.push(/* find element that called event, optionName or index */);
      this.model.set('userVotes', userVotes);
      if( userVotes.length === this.model.get('rounds').length ){
        this.model.trigger('click #submitVote');
      }
    },

    submitVote: function(){
      this.model.save();
    }

  }

};

// questions
// localRound - stored in local storage, instead of rounds[0]

                  // <span id="rec1-title">{{ title }}</span>
                  // <span id="rec1-description"></span>
                  // <span id="rec1-cost"></span><span id="rec1-rating"></span>