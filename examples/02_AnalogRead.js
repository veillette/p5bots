// Basic: Analog Read
// Diagram: diagrams/potentiometer

// Test analog read
let pinPotentiometer;
let potentiometerValue;
let potentiometerDiv;

let hueValue;
let hueDiv;

function setup() {
  createCanvas( 400, 400 );
  noStroke();
  colorMode(HSB);

  potentiometerValue = 0;
  hueValue = 0;
  hueDiv = createDiv();

  pinPotentiometer = board.pin( 0, 'ANALOG', 'INPUT' );
  pinPotentiometer.read(pinPotentiometerUpdated);
  potentiometerDiv = createDiv();
}

function draw() {
  background(128, 20, 220);

  fill(hueValue, 128, 128);
  ellipse(width/2, height/2, 100, 100);
}

function pinPotentiometerUpdated(value) {
  potentiometerValue = value;
  potentiometerDiv.html(`potentiometerValue: ${ potentiometerValue }`);


  hueValue = int(map(value, 0, 1023, 0, 255));
  hueDiv.html(`hueValue: ${ hueValue }`);
}
