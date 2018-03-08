// Variable Resistor: Potentiometer
// Diagram: diagrams/potentiometer

// Board setup — you may need to change the port
var b = p5.board( 'COM3', 'arduino' );

// Test Read & Threshold
var pmeter;

function setup() {
  createCanvas( 300, 200 );

  var innerStr = '<p style="font-family:Arial;font-size:12px">';
  innerStr += 'See for readings &nbsp; | &nbsp;';
  innerStr += 'Open the console and press any key to test threshold </p>';

  createDiv( innerStr );


  pmeter = b.pin( 0, 'VRES' );
  pmeter.read( function( val ) {
    clear();
    text( val, 100, 100 );
  } );

  pmeter.range( [ 10, 400 ] );
  pmeter.threshold( 600 );

}

function draw() {

}

function keyPressed() {
  console.log( typeof pmeter.val );
  console.log( 'is over?', pmeter.val, pmeter.overThreshold() );
}
