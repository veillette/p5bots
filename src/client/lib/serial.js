var utils = require( './socket_utils.js' );
var socket = utils.socket;
var serialObj = {};

/**
 * Serial does not work along the same methods as Firmata-dependent
 * board funcs. It is therefore attached to the top-level p5 Object.
 *
 * @return {Object} Constructed serial instance
 */
var serial = function() {

  /**
   * Passes through data to a node-serialport instantiation
   * @param  {String} path   Port used
   * @param  {Object} config Config options, can use any listed
   *                         for node-serialport
   */
  serialObj.connect = function( path, config ) {
    socket.emit( 'serial init', {
      path: path,
      config: config
    } );
  };
  /**
   *
   * @param {function} cb
   */
  serialObj.read = function( cb ) {
    socket.emit( 'serial read' );
    socket.on( 'serial read return', function( data ) {
      serialObj.data = data;
      cb( data );
    } );
  };
  /**
   * Read-event aliases for the old-school among us.
   * @type {serialObj.read|*}
   */
  serialObj.readEvent = serialObj.read;
  serialObj.readData = function() {
    return this.data;
  };
  /**
   *
   * @param arg
   * @param {function} cb
   */
  serialObj.write = function( arg, cb ) {
    socket.emit( 'serial write', { arg: arg } );
    socket.on( 'serial write return', function( data ) {
      cb && cb( data );
    } );
  };
  /**
   *
   * @param {function} cb
   */
  serialObj.list = function( cb ) {
    socket.emit( 'serial list' );
    socket.on( 'serial list return', function( data ) {
      console.log( data );
      cb && cb( data.data ); // unwrap the data so the client doesn't need to
    } );
  };

  return serialObj;

};

module.exports = serial;
