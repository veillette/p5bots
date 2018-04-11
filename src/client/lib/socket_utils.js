var socket = io.connect( 'http://localhost:8000/sensors' );
socket.on( 'error', function( err ) {
  console.log( err );
} );

var utils = {

  /**
   *
   * @param port
   * @param type
   */
  boardInit: function( port, type ) {
    // Board should always immediately fire
    socket.emit( 'board object', {
      board: type,
      port
    } );
  },

  // Set by p5.board
  board: undefined,

  /**
   * Workhorse function establishes default read & write for all
   * pins that don't override
   *
   * @param  {Object} pin    Base pin instance
   * @param  {String} [mode] Explicit mode override
   * @return {Object}        Mutated pin
   */
  constructFuncs: function( pin, mode ) {

    var mode = mode || pin.mode; // jshint ignore:line

    /**
     *
     * @param data
     */
    function setVal( data ) {
      // Callbacks set in socketGen for generic read
      // & in special constructors for special
      this.readcb && this.readcb( data.val );
      this.val = data.val;

      utils.readTests[ this.special ] &&
      utils.readTests[ this.special ].call( this, data.val );
    }

    /**
     *
     * @param arg
     * @returns {function} nextRead
     */
    pin.read = function( arg ) {
      var fire = utils.socketGen( mode, 'read', pin );
      utils.dispatch( fire, arg );
      socket.on( 'return val' + pin.pin, setVal.bind( this ) );
      return function nextRead( arg ) { fire( arg ); };
    };

    /**
     *
     * @param arg
     * @returns {function} nextWrite
     */
    pin.write = function( arg ) {
      var fire = utils.socketGen( mode, 'write', pin );
      utils.dispatch( fire, arg );
      return function nextWrite( arg ) { fire( arg ); };
    };

    return pin;
  },

  /**
   *
   * @param {function} fn
   * @param arg
   */
  dispatch: function( fn, arg ) {
    this.board.ready ?
    fn( arg )
      : this.board.eventQ.push( { func: fn, args: [ arg ] } );
  },

  /**
   *
   * @param {Object} pin
   * @param {string} mode
   * @param {string} direction  - valid values are input | output
   * @returns {function} emitPin
   */
  pinInit: function( pin, mode, direction ) {
    return function emitPin() {
      socket.emit( 'pin object', {
        pin,
        mode: mode.toLowerCase(),
        direction: direction.toLowerCase()
      } );
    };
  },

  /**
   * This is where we put tests for special callbacks, from
   * special modes. Used by setVal() in constructFuncs.
   *
   * @type {Object}
   */
  readTests: {

    /**
     *
     * @param {number} val - valid values are 0 and 1
     */
    button: function buttonTests( val ) {
      if ( val === 1 ) {
        this.pressedOnce = true;
        this.buttonPressedcb && this.buttonPressedcb();
        this.timeout = this.buttonHeldcb ? this.buttonHeldcb() : false;
      }
      else if ( val === 0 ) {
        this.pressedOnce && this.buttonReleasedcb && this.buttonReleasedcb();
        this.timeout && clearTimeout( this.timeout );
      }
    },

    /**
     *
     * @param {number} val - temperature
     */
    temp: function tempSettings( val ) {
      var conversions = {
        'CtoF': function( value ) {
          return value * 1.8 + 32;
        },
        'CtoK': function( value ) {
          return value + 273.15;
        }
      };

      this.C = ( ( val * ( ( this._voltsIn * 1000 ) / 1024 ) ) - 500 ) / 10;
      this.F = conversions.CtoF( this.C );
      this.K = conversions.CtoK( this.C );
    },

    vres: function vresTests( val ) {
      this.readRange && this.readRange();
    }
  },

  socket,

  /**
   * Generates generic read and write funcs and emits
   * across the socket
   *
   * @param  {String} kind      digital | analog
   * @param  {String} direction input | output
   * @param  {Object} pin       Object pin
   *
   */
  socketGen: function( kind, direction, pin ) {
    function titleCase( str ) {
      return str.charAt( 0 ).toUpperCase() + str.substring( 1 );
    }

    return function action( arg ) {
      if ( direction === 'read' ) {
        pin.readcb = arg;
      }
      socket.emit( 'action', {
        action: kind + titleCase( direction ),
        pin: pin.pin,
        type: direction,
        arg
      } );
    };
  }

};

module.exports = utils;
