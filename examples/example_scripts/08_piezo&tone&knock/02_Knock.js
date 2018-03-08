// Piezo: Knock
// Diagram: diagrams/knock

// Board setup — you may need to change the port
var b = p5.board('COM3', 'arduino');

// Get ready to knock
var k;

function setup() {

 createCanvas(300, 200);

 var innerStr = '<p style="font-family:Arial;font-size:12px">'
 innerStr += 'Check out log to see values</p>';

 createDiv(innerStr);

 k = b.pin(0, 'KNOCK'); // Can also set mode to 'PIEZO'
 k.threshold(200);
 k.read();
}

function draw() {
  console.log('Value:', k.val,
              'threshold:', k.threshold,
              'overThreshold?:', k.overThreshold());
}
