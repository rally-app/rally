var VoteOptionsView = Backbone.View.extend(){

  tagName: 'div',
  
  template: ['<div>
                <span>Great! Where to?</span>
                <div id="rec1-container">
                  <span id="rec1-title">{{ title }}</span>
                  <span id="rec1-description"></span>
                  <span id="rec1-cost"></span><span id="rec1-rating"></span>
                  <button id="priority">
                </div>
                <div id="rec2-container">
                  <span id="rec2-title"></span>
                  <span id="rec2-description"></span>
                  <span id="rec2-cost"></span><span id="rec2-rating"></span>
                </div>
                <div id="rec3-container">
                  <span id="rec3-title"></span>
                  <span id="rec3-description"></span>
                  <span id="rec3-cost"></span><span id="rec3-rating"></span>
                  </span>
                </div>
              </div>'].join(''),

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