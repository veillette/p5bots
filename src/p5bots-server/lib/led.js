exports.blink = function blink( board, socket ) {
  socket.on( 'blink', function( data ) {
    var ledPin = data.pin;
    var ledOn = true;
    var length = data.length || 500;

    board.pinMode( ledPin, board.MODES.OUTPUT );

    var blinkID = setInterval( function() {
      if ( ledOn ) {
        board.digitalWrite( ledPin, board.HIGH );
      }
      else {
        board.digitalWrite( ledPin, board.LOW );
      }

      ledOn = !ledOn;

    }, length );

    socket.on( 'blink' + data.id + ' cancel', function( data ) {
      clearInterval( blinkID );
    } );

    socket.on( 'blink cancel', function() {
      clearInterval( blinkID );
    } );
  } );
};

exports.fade = function fade( board, socket ) {
  socket.on( 'fade', function( data ) {
    board.pinMode( data.pin, board.MODES.PWM );

    var time = data.time;
    var start = data.start;
    var stop = data.stop;
    var inc = data.inc;
    var steps = time / inc;
    var span = Math.abs( start - stop );
    var vps = span / steps;
    var mult = stop > start ? 1 : -1;
    var val = start;


    function nextVal( a, b ) {
      return a + mult * b;
    }

    function setStep( num ) {
      setTimeout( function() {
        board.analogWrite( data.pin, val );
        val = nextVal( val, vps );
      }, num * inc );
    }

    for ( var i = 0; i <= steps; i++ ) {
      setStep( i );
    }
  } );
};
