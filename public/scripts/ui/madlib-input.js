(function( $ ){
  
  var MadlibInput = (function( $ ) {

    function MadlibInput( jqInput ) {
      if ( 
        !( jqInput.length === 1 ) || 
        !( jqInput instanceof $ ) || 
        !( jqInput.eq( 0 ).is( "input" ) ) ) {
        throw new TypeError( "Pass a jQuery collection containing 1 <input> element" );
      }

      this.originalInput = jqInput;
      this.madlibInput = $( this.buildHtml() );
      this.originalInput
        .hide()
        .after( this.madlibInput );

      this.madlibInput.on( "keyup", function( evt ) {
        this.originalInput
          .val( evt.target.innerHTML )
          .trigger( "input" );
      }.bind( this ));

      // http://jsfiddle.net/epinapala/WdeTM/4/
      // select text on focus
      // setTimeout let's you wait till after default (cursor at point) happens.
      this.madlibInput.on( "focus", function() {
        setTimeout( function() {        
          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents( this );
          selection.removeAllRanges();
          selection.addRange( range );
        }.bind( this ), 0 );
      });
    }

    MadlibInput.prototype.buildHtml = function() {
      var contents = this.originalInput.val() || this.originalInput.attr( "placeholder" );
      return [
        "<span class='madlib-input' contenteditable>",
        contents,
        "</span>" ].join( "\n" );
    };

    return MadlibInput;

  })( $ );
  
  $.fn.madlibInput = function() {
    return new MadlibInput( this );
  };

})( jQuery );