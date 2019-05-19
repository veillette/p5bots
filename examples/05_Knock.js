// Piezo: Knock
// Diagram: diagrams/knock

// Get ready to knock
let piezoPin;
let threshold = 200;
let isKnock = false;
let knockTimeout = 0;

function setup() {

  createCanvas( 300, 200 );

  let innerStr = '<p style="font-family:Arial;font-size:12px">';
  innerStr += 'Check out log to see values</p>';

  createDiv( innerStr );

  piezoPin = board.pin( 0, 'ANALOG', 'INPUT' );
  piezoPin.read(didKnock);
}

function draw() {
  background(220);

  // check if out knock trigger has timed out
  if (millis() >= knockTimeout) {
    isKnock = false;
  }

  if (isKnock) {
    fill(128);
    ellipse(width/2, height/2, 200, 200);
  }
}

function didKnock(value) {
  isKnock = (value > threshold);

  // set a timestamp 5 seconds in the future to turn off drawing
  knockTimeout = millis() + 5000;

  console.log( 'Value:', value,
    'threshold:', threshold,
    'overThreshold?:', isKnock );
}
