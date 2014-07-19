( function( $ ) {
  "use strict";

  var TRANSITION_DURATION = 200; // ms

  var body = $( "body" );

  var MadlibSelect = (function( $ ){

    function MadlibSelect( jqSelect ) {
      if ( jqSelect.length !== 1 || !( jqSelect instanceof $ ) || !jqSelect.eq( 0 ).is( "select" ) ) {
        throw new TypeError( "Pass a jQuery collection containing 1 <select> element" );
      }
      this.originalSelect = jqSelect;
      this.madlibSelect = $( this.buildHtml() );
      this._selected = this.madlibSelect.find( ".madlib-select--selected" );
      this._options = this.madlibSelect.find( ".madlib-select--options" );
      this.optionsVisibile  = false;

      this.originalSelect
        .hide()
        .after( this.madlibSelect );

      this.madlibSelect
        .on( "click", ".madlib-select--option", function( evt ) {
          this.changeSelected( evt.target );
        }.bind( this ) )
        .on( "click", function( evt ) {
          var method;
          evt.stopPropagation();
          this.optionsVisibile = !this.optionsVisibile;
          method = ( this.optionsVisibile ? "show" : "hide" ) + "Options";
          this[ method ]();
        }.bind( this ) );

      body.on( "click", function() {
        if ( this.optionsVisibile ) {
          this.optionsVisibile = false;
          this.hideOptions();
        }
      }.bind( this ) );

    }

    MadlibSelect.prototype.buildHtml = function() {
      var options = this.originalSelect.find( "option" ).map( function() {
        return [
          "<span class='madlib-select--option' data-value='" + this.value + "'>",
            this.innerHTML,
          "</span>"
        ].join( "\n" );
      })
      .get()
      .join( "\n" );

      var selected = [
        "<span class='madlib-select--selected'>",
          this.originalSelect.find( ":selected" ).html(),
        "</span>"
      ].join( "\n" );

      return [
        "<span class='madlib-select'>",
          selected,
          "<span class='madlib-select--options'>",
            options,
          "</span>",
        "</span>" 
      ].join( "\n" );
    };

    MadlibSelect.prototype.changeSelected = function( newSelected ) {
      var val = $( newSelected ).attr( "data-value" );
      var html = $( newSelected ).html();
      this._selected.html( html );
      this.originalSelect
        .find( "option[value='" + val + "']" )
        .prop( "selected" , true )
        .end()
        .trigger( "change" );
    };

    MadlibSelect.prototype.showOptions = function() {
      this._options.fadeIn( TRANSITION_DURATION );
    };

    MadlibSelect.prototype.hideOptions = function() {
      this._options.fadeOut( TRANSITION_DURATION );
    };

    return MadlibSelect;

  })( $ );

  // Doesn't support jQuery-style chaining.
  // Save a ref to the returned MadlibSelect instance to use it directly.
  $.fn.madlibSelect = function() {
    return new MadlibSelect( this );
  };

})( jQuery );