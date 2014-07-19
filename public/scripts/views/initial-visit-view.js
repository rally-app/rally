'use strict';

var hogan = window.Hogan;
var $ = window.jQuery;

var InitialVisitView = window.InitialVisitView = Backbone.View.extend({
  template: hogan.compile([
    '<div class="initialVisit">',
      '<h2 class="view-title">Welcome to Rally!</h2>',
      '<p class="view-subtitle">Looks like it\'s your first visit. Please enter your name and email address to get started</p>',
      '<input id="ivv-name" placeholder="Name">',
      '<input id="ivv-email" placeholder="Email">',
      '<button id="ivv-done">Done</button>',
    '</div>'
  ].join( '\n' ) ),

  initialize: function() {
    this.render();
  },

  events: {
    'click #ivv-done': 'saveUserData'
  },

  saveUserData: function() {
    window.localStorage.setItem( 'rallyUser', JSON.stringify({
      name: this.nameInput.val(),
      email: this.emailInput.val()
    }));
  },

  render: function() {
    this.$el.empty().append( this.template.render( {} ) );
    this.emailInput = this.$( '#ivv-email' );
    this.nameInput = this.$( '#ivv-name' );
    return this;
  }

});

// module.exports = InitialVisitView;