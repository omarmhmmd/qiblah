var five = require("johnny-five"),
  fsr, led;
var boardDuino = new five.Board({
  port: "/dev/ttyACM0"
});


var pressurePad = boardDuino.on("ready", function() {
  var fsr = new five.Sensor({
    pin: "A0",
    freq: 1000
  });

  fsr.scale([0, 255]).on("data", function() {
    if (this.scaled > 100) {
      console.log(this.scaled + " light");
    }
    else {
      console.log(this.scaled);
    }
  });
});
