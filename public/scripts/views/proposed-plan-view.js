var hogan = window.Hogan;

window.ProposedPlanView = Backbone.View.extend({

  template: hogan.compile([ '<div class="proposedPlan">',
    '<p>{{ hostName }} wants to {{ hostWhat }} near {{ hostWhere }} at {{ hostWhen }}.</p>',
    '<button type="button" class="attending">Check Mark Image</button>',
    '<button type="button" class="notAttending">No can do</button></div>' ].join( "" )),

  initialize: function() {
    this.render();
  },

  events: {
    'click .attending': 'attending',
    'click .notAttending': 'notAttending'
  },

  attending: function(e) {
    e && e.preventDefault();
    //**todo
    //send info to db indicating an invitation acceptance
    
    //this will be the route for the first vote view
    //this.router.navigate('route goes here', { trigger: true })
  },

  notAttending: function(e) {
    e && e.preventDefault();
    //**todo
    //send info to db indicating an invitaion deny

    //this will be the route for the invite deny view
    //this.router.navigate('route goes here', { trigger: true })
  },

  render: function() {
    this.$el.html( this.template( this.model.attributes ));
    return this;
  }
})