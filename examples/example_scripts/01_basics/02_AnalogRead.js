// Basic: Analog Read
// Diagram: diagrams/potentiometer


// Board setup — you may need to change the port
var b = p5.board( 'COM3', 'arduino' );

// Test analog read
var p = b.pin( 0, 'ANALOG', 'INPUT' );
p.read( function( val ) {console.log( val );} );

function setup() {
  createCanvas( 300, 200 );

  var innerStr = '<p style="font-family:Arial;font-size:12px">';
  innerStr += 'Check out the console for readings</p>';

  createDiv( innerStr );
}
