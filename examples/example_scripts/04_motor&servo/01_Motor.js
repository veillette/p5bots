// Motor: Motor
// Diagram: diagrams/motor

// Board setup — you may need to change the port
var b = p5.board( 'COM3', 'arduino' );

// Test motor functionality
var motor;

function setup() {
  motor = b.pin( 9, 'MOTOR' );

  createCanvas( 300, 200 );

  var innerStr = '<p style="font-family:Arial;font-size:12px">'
  innerStr += '<b>&larr;</b> Motor on &nbsp; | &nbsp;';
  innerStr += '<b>&rarr;</b> Motor off &nbsp; | &nbsp;';
  innerStr += '<b>&uarr;</b> motor.write(100) </p>';

  createDiv( innerStr );
}

function keyPressed() {
  if ( keyCode === LEFT_ARROW ) {
    motor.on();
  }
  else if ( keyCode === RIGHT_ARROW ) {
    motor.off();
  }
  else if ( keyCode === UP_ARROW ) {
    motor.write( 100 );
  }
}
