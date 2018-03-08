// Basic: Digital Read
// Diagram: diagrams/simple_button

// Board setup — you may need to change the port
var b = p5.board( 'COM3', 'arduino' );

// Test digital read
var p = b.pin( 9, 'DIGITAL', 'INPUT' );
p.read( function( val ) {console.log( val );} );

function setup() {

  var innerStr = '<p style="font-family:Arial;font-size:12px">';
  innerStr += 'Check out the console for readings</p>';

  createDiv( innerStr );
}
