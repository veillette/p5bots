// Basic: Digital Read

let led;
let pinButton;

let onColor;
let offColor;

let buttonOn = false;


// Test digital read
function setup() {
  // set pin 14 to digital input mode
  pinButton = board.pin( 14, 'DIGITAL', 'INPUT' );

  // call the pinButtonPressed whenever we get a new value read from pin 14
  pinButton.read(pinButtonPressed);

  // set up the built-in LED on pin 13 so we can get some feedback on
  // the button press
  led = board.pin( 13, 'LED' );

  createCanvas(400, 400);
  noStroke();

  onColor = color(255, 128, 128);
  offColor = color(128, 255, 128);
}

function draw() {
  background(220);

  if (buttonOn) {
    fill(onColor);
    led.on();
  } else {
    fill(offColor);
    led.off();
  }

  ellipse(width/2, height/2, 200, 200);
}

function pinButtonPressed(val) {
  console.log(val);

  // just checking val works because zero is considered `false` in
  // javascript boolean tests
  if (val) {
    buttonOn = true;
  } else {
    buttonOn = false;
  }
}
