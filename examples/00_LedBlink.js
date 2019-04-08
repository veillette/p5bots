// `board` is defined in board.js

var led;

function setup() {
  createCanvas(400, 400);
  led = board.pin( 14, 'LED' );
}

function draw() {
  background(220);
}

function keyPressed() {
  if ( keyCode === LEFT_ARROW ) {
    led.on();
    console.log( 'on' );
  }
  else if ( keyCode === RIGHT_ARROW ) {
    led.off();
    console.log( 'off' );
  }
  else if ( keyCode === UP_ARROW ) {
    led.blink();
    console.log( 'blink' );
  }
  else if ( keyCode === DOWN_ARROW ) {
    led.noBlink();
    console.log( 'no blink' );
  }
}
