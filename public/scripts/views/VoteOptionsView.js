var VoteOptionsView = Backbone.View.extend(){

  tagName: 'div',
  
  template: ['<span id="affirmation">Great! Where to?</span>
              <div id="options">
                <div id="rec1-container">
                  <input id="priority" type="button" value="Option 1" onclick="setPriority(1)">
                </div>
                <div id="rec2-container">
                  <input id="priority" type="button" value="Option 2" onclick="setPriority(2)">
                </div>
                <div id="rec3-container">
                  <input id="priority" type="button" value="Option 3" onclick="setPriority(3)">
                </div>
              </div>
              <div id="vote">
                <input id="submitVote" type="button" value="Vote!" onclick="submitVote()">
              </div>
              <div id="counters">
                <span id="rally-eta">{{ ??? }}</span>
                <span id="round-number">{{ currentRound + '/' + rounds.length }}</span>
                <span id="round-deadline">{{ ??? }}</span>
              </div>



              '].join(''),

  initialize: function(){

  },

  events: {
    // 'change': 
  },

  render: function(){
    return $el;
  },

  controller: {

  }

};

                  // <span id="rec1-title">{{ title }}</span>
                  // <span id="rec1-description"></span>
                  // <span id="rec1-cost"></span><span id="rec1-rating"></span>