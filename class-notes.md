## Install Software
1. Download and install the [Arduino IDE](https://www.arduino.cc/en/Main/Software)
2. Open the Arduino IDE
3. Download and install [Teensyduino](https://www.pjrc.com/teensy/td_download.html)

### Set up the Arduino IDE
1. Set the board type in the Arduino IDE by selecting `Tools > Board > Teensy 3.2/3.1`
5. Set the board USB mode in the Arduino IDE by selecting `Tools > USB Type > Serial`
6. Set the serial port in the Arduino IDE

### Get Your Teensy Ready

1. Upload `File > Examples > Firmata > StandardFirmata` to your board.
3. Write down the port your board is using; you will need it in your sketch.


### Command line fu

List your serial ports:
```
ls -l /dev/cu.*
```

### Run the server

```bash
    # install Node Version Manager (nvm)
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
    
    # install node version v10
    nvm install v10 --lts
    
   cd src/p5bots-server
   node ./app.js
```
