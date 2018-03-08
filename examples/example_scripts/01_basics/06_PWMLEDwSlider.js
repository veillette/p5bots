// Basic: PWM LED + Slider
// Diagram: diagrams/led

// Board setup — you may need to change the port
var b = p5.board( 'COM3', 'arduino' );

// PWM Slider

var slider, pin;

function setup() {
  slider = createSlider( 0, 255, 150 );
  slider.position = ( 10, 10 );
  pin = b.pin( 9, 'PWM', 'OUTPUT' );

}

function draw() {
  var val = slider.value();
  pin.write( val );
}
