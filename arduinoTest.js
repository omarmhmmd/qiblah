///dev/ttyACM0

var five = require("johnny-five"),
  fsr, led;
var boardDuino = new five.Board({
  port: "/dev/ttyACM0"
});


var pressurePad = boardDuino.on("ready", function() {
  // Create a new `fsr` hardware instance.
  fsr = new five.Sensor({
    pin: "A0",
    freq: 1000
  });

  led = new five.Led(13);

  // Scale the sensor's value to the LED's brightness range
  fsr.scale([0, 255]).on("data", function() {

    // set the led's brightness based on force
    // applied to force sensitive resistor
    console.log(this.scaled);

    if (this.scaled > 200) {
      led.on();
    }
    else
      led.off();

  });
});
