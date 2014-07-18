( function( $ ) {
  "use strict";

  var MadlibSelect = (function( $ ){

    function MadlibSelect( jqSelect ) {
      if ( jqSelect.length !== 1 || !( jqSelect instanceof $ ) || !jqSelect.eq( 0 ).is( "select" ) ) {
        throw new TypeError( "Pass a jQuery collection containing 1 <select> element" );
      }
      this.originalSelect = jqSelect;
      this.madlibSelect = $( this.buildHtml() );
      this._selected = this.madlibSelect.find( ".madlib-select--selected" );
      this._options = this.madlibSelect.find( ".madlib-select--options" );
      
      this.originalSelect
        .hide()
        .after( this.madlibSelect );

      this.madlibSelect
        .on( "click", ".madlib-select--option", function( evt ) {
          this.changeSelected( evt.target );
        }.bind( this ) )
        .on( "click", function() {
          this._options.fadeToggle( 200 );
        }.bind( this ) );
    }

    MadlibSelect.prototype.buildHtml = function() {
      var options = this.originalSelect.find( "option" ).map( function() {
        var str = "";
        str += "<span class='madlib-select--option' data-value='" + this.value + "'>";
        str += this.innerHTML;
        str += "</span>";
        return str;
      })
      .get()
      .join( "\n" );

    var selected = 
      "<span class='madlib-select--selected'>" +
      this.originalSelect.find( ":selected" ).html() +
      "</span>";

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
      this.originalSelect.find( "option[value='" + val + "']" ).prop( "selected" , true );
      this.originalSelect.trigger( "change" );
    };

    return MadlibSelect;

  })( $ );

  $.fn.madlibSelect = function() {
    return new MadlibSelect( this );
  };

})( jQuery );