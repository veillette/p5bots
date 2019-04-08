// Basic: Flex Sensor

// this is basically the same setup as 02_AnalogRead, but a slightly
// different wiring diagram and mapping from voltage to hue
//
// more info: https://learn.sparkfun.com/tutorials/flex-sensor-hookup-guide/all


let pinFlexSensor;
let flexSensorValue;
let flexSensorDiv;

let hueValue;
let hueDiv;

// the lowest and highest raw values we get from the flex sensor -
// see the discussion at the bottom of pinFlexSensorUpdated()
let lowest = 825;
let lowestDiv;
let highest = 875;
let highestDiv;

function setup() {
  createCanvas( 400, 400 );
  noStroke();
  colorMode(HSB);

  flexSensorValue = 0;
  hueValue = 0;
  hueDiv = createDiv();

  pinFlexSensor = board.pin( 0, 'ANALOG', 'INPUT' );
  pinFlexSensor.read(pinFlexSensorUpdated);
  flexSensorDiv = createDiv();

  lowestDiv = createDiv();
  highestDiv = createDiv();
}

function draw() {
  background(128, 20, 220);

  fill(hueValue, 128, 128);
  ellipse(width/2, height/2, 100, 100);
}

function pinFlexSensorUpdated(value) {
  flexSensorValue = value;
  flexSensorDiv.html(`flexSensorValue: ${ flexSensorValue }`);

  if (value < lowest) {
    lowest = value;
    lowestDiv.html(`lowest: ${ lowest }`);
  }

  if (value > highest) {
    highest = value;
    highestDiv.html(`highest: ${ highest }`);
  }

  // The flex sensor does not go from 0-1023 like a potentiometer, so
  // we adjust the mapping when we calculate to get more effective
  // range out of it. The range is dynamically calculated, but in a
  // real application you would probably want to set these to fixed
  // values.
  hueValue = int(map(value, lowest, highest, 0, 255));
  hueDiv.html(`hueValue: ${ hueValue }`);
}
