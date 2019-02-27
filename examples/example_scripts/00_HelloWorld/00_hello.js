// set this to your USB port - you can get this information in the Arduino app under Tools > Port
// or from Terminal, you can type:
//    $ ls -l /dev/cu.*
// to see a list of your ports
var b = p5.board( '/dev/cu.usbmodem5423051', 'arduino' );
var led;

function setup() {
  createCanvas(400, 400);
  led = b.pin( 14, 'LED' );
}

function draw() {
  background(220);
  ellipse(width/2, height/2, width/2, width/2);
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
