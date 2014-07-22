var hogan = window.Hogan;

window.ProposedPlanView = Backbone.View.extend({

  template: hogan.compile( [ '<div class="proposedPlan">',
    '<p>{{ name }} wants to {{ what }} with you near {{ where }} {{ when }}.</br>Are you in?</p>',
    '<button type="button" class="attending">Check Mark Image</button>',
    '<button type="button" class="notAttending">No can do</button></div>' ].join( "" ) ),

  initialize: function() {
    this.render();
  },

  events: {
    'click .attending': 'attending',
    'click .notAttending': 'notAttending'
  },

  attending: function( e ) {
    if( e ) {
       e.preventDefault();
     }

    //save the model then navigate to the first round of voting
    var self = this;
    // this.model.save().then( function( response ) {
      // if( response.expired === true ){
        router.navigate( 
        '/' + self.model.get( 'id' ) + 
        '/round/' + self.model.get( 'currentRoundNum' ),
        // ( response.expired ? '/expired': '' ), 
        { trigger: true } );
      // } else {
      //   router.navigate( '/' + self.model.get( 'id' ) + '/round/' + self.model.get( 'currentRoundNum' ), { trigger: true } );
      // }
    // });
  },

  notAttending: function( e ) {
    if( e ) {
       e.preventDefault();
     }
    //**todo
    //send info to db indicating an invitaion deny

    //this will be the route for the invite deny view
    //this.router.navigate('route goes here', { trigger: true })
  },

  render: function() {
    var proposed = {
      name: this.model.get( 'hostName' ),
      what: ( this.model.get( 'hostWhat' ) === 'bars' ? 'get drinks' : 'eat' ),
      where: this.model.get( 'hostWhere' ),
      when: moment( this.model.get( 'hostWhen' ) ).calendar().toLowerCase()
    };

    this.$el.html( this.template.render( proposed ));
    return this;
  }
});