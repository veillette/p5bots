var utils = require( './socket_utils.js' );

/**
 * Adds led-specific methods to pin object. Called via special.
 *
 * @param  {Object} pin
 * @return {Object} mutated pin
 */
function led( pin ) {
  utils.dispatch( utils.pinInit( pin.pin, pin.mode, pin.direction ) );
  utils.constructFuncs( pin );

  pin.on = function() {

    function ledOn() {
      utils.socket.emit( 'blink cancel', {
        pin: this.pin
      });

      if ( this.mode !== 'pwm' ) {
        this.write( 'HIGH' );
      }
      else {
        this.write( 255 );
      }
    }

    utils.dispatch( ledOn.bind( this ) );

  };

  pin.off = function() {

    function ledOff() {
      utils.socket.emit( 'blink cancel', {
        pin: this.pin
      });

      if ( this.mode !== 'pwm' ) {
        this.write( 'LOW' );
      }
      else {
        this.write( 0 );
      }
    }

    utils.dispatch( ledOff.bind( this ) );

  };

  /**
   * Prepares and emits the fade event. The actual math is
   * taken care of in the server LED file.
   *
   * @param  {Number} start             Initial PWM value
   * @param  {Number} stop              End PWM value
   * @param  {Number} [totalTime=3000]  Total time for fade, in ms
   * @param  {Number} [increment=200]   Time taken for each step, in ms
   *
   */
  pin.fade = function( start, stop, totalTime, increment ) {

    function ledFade() {
      utils.socket.emit( 'blink cancel', {
        pin: this.pin
      });

      this.mode = 'pwm';

      var totalTime = totalTime || 3000;
      var inc = increment || 200;
      utils.socket.emit( 'fade', {
        pin: this.pin,
        start,
        stop,
        time: totalTime,
        inc
      });
    }

    utils.dispatch( ledFade.bind( this ) );

  };

  pin.blink = function( length ) {

    function ledBlink() {
      utils.socket.emit( 'blink', {
        pin: this.pin,
        length
      } );
    }

    utils.dispatch( ledBlink.bind( this ) );

  };

  pin.noBlink = function() {

    function ledNoBlink() {
      utils.socket.emit( 'blink cancel', {
        pin: this.pin
      });
    };

    utils.dispatch( ledNoBlink.bind( this ) );

  };

  return pin;

}

module.exports = led;
