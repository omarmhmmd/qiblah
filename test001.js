var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var compass = new five.Compass({
    controller: "HMC5883L"
  });

  compass.on("change", function() {
    console.log("change");
    console.log("  heading : ", Math.floor(this.heading));
    console.log("  bearing : ", this.bearing.name);
    console.log("--------------------------------------");
  });

  compass.on("data", function() {
    console.log("  heading : ", Math.floor(this.heading));
    console.log("  bearing : ", this.bearing.name);
    console.log("--------------------------------------");
  });
});

/*var lsm303 = require('lsm303');
var ls  = new lsm303();

var headingTemp = {};

var mag = ls.magnetometer();
var magIntervalCounter = 1;

var five = require("johnny-five");
var Raspi = require("raspi-io");

var board = new five.Board({
  io: new Raspi()
});

// Use this setOffset function to enter in resultant x, y, z
// values from calibration
mag.setOffset(-26, 44, 0);

var magIntervalObj = board.on("ready", function() {
  setInterval(function() {
		// Returns heading in degrees from 0-360
		mag.readHeading(function(err, heading){
      var led = new five.Led("P1-13");
			if(err){
				console.log("Error reading Magnetometer Heading : " + err);
			}
			if (heading) {
				headingTemp = heading;
			}
      if (heading > 290 && heading < 300) {
        console.log("light");
        led.on();
      }
      else {
        console.log("no light");
        led.off();
      }
		});

		magIntervalCounter++;
		if (magIntervalCounter == 5000) {
			clearInterval(magIntervalObj)
		}
		console.log(headingTemp);
  }, 500);
});*/
