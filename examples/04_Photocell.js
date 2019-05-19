// Basic: Photocell
// more info: https://learn.adafruit.com/photocells

let pinLed;

let pinPhotocell;
let photocellValue;
let photocellDiv;

let hueValue;
let hueDiv;

// the lowest and highest raw values we get from the photocell -
// see the discussion at the bottom of pinPhotocellUpdated()
let lowest = 15;
let lowestDiv;
let highest = 0;
let highestDiv;

function setup() {
  createCanvas( 400, 400 );
  noStroke();
  colorMode(HSB);

  photocellValue = 0;
  hueValue = 0;
  hueDiv = createDiv();

  pinLed = board.pin( 3, 'PWM', 'OUTPUT');

  pinPhotocell = board.pin( 0, 'ANALOG', 'INPUT' );
  pinPhotocell.read(pinPhotocellUpdated);
  photocellDiv = createDiv();

  lowestDiv = createDiv();
  highestDiv = createDiv();
}

function draw() {
  background(128, 20, 220);

  fill(hueValue, 128, 128);
  ellipse(width/2, height/2, 100, 100);
}

function pinPhotocellUpdated(value) {
  photocellValue = value;
  photocellDiv.html(`photocellValue: ${ photocellValue }`);

  if (value < lowest) {
    lowest = value;
    lowestDiv.html(`lowest: ${ lowest }`);
  }

  if (value > highest) {
    highest = value;
    highestDiv.html(`highest: ${ highest }`);
  }

  // The photocell does not go from 0-1023 like a potentiometer, so
  // we adjust the mapping when we calculate to get more effective
  // range out of it. The range is dynamically calculated, but in a
  // real application you would probably want to set these to fixed
  // values.
  hueValue = int(map(value, lowest, highest, 0, 255));
  hueDiv.html(`hueValue: ${ hueValue }`);

  let pwmValue = 255 - int(map(value, lowest, highest, 0, 255));
  pinLed.write(pwmValue);
}
