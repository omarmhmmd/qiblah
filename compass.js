//console.log(qiblah.bearing);
var five = require("johnny-five"),
  fsr, led;
pixel = require("node-pixel");
var qiblah = require("./qiblah");
var Omx = require('node-omxplayer');
var board = new five.Board();

var fps = 15;

// Touchpad Sensor
/*
});*/

board.on("ready", function() {
  var fsr = new five.Sensor({
    pin: "A0",
    freq: 1000
  });

  var light = new pixel.Strip({
      board: this,
      controller: "FIRMATA",
      strips: [ {pin: 5, length: 6}, {pin: 6, length: 16}, {pin: 7, length: 6}, ], // this is preferred form for definition
      gamma: 2.8, // set to a gamma that works nicely for WS2812
  });

  /**** START UP ****/
  console.log("RING");
  var colors = ["rgb(0,50,0)"];
  var current_colors = [0];
  var current_pos = [6];
  var executed = 0;
  var blinker = setInterval(function() {
    light.color("#000"); // blanks it out
    for (var i=0; i < current_pos.length; i++) {
        if (++current_pos[i] >= 22) {
            current_pos[i] = 6;
            executed++;
            if (++current_colors[i] >= colors.length) current_colors[i] = 0;
        }
        if (executed < 5) {
          var end = light.pixel(current_pos[i]).color(colors[current_colors[i]]);
          light.show();
        }
    }
  }, 1000/fps);

  fsr.scale([0, 255]).on("data", function() {
    if (this.scaled > 130) {
      var compass = new five.Compass({
        controller: "HMC5883L"
      });

      compass.on("change", function() {
        console.log(Math.floor(this.heading));
        //QIBLAH
        if (Math.floor(this.heading) < (qiblah.bearing + 5) && Math.floor(this.heading) > (qiblah.bearing - 5)) {
          console.log("qiblah: " + Math.floor(this.heading));
          light.color("rgb(0, 50, 0)");
          light.show();
          //var player = Omx("sounds/adhan.wav", 0);
        }

        //GO RIGHT
        else if (Math.floor(this.heading) < 360 && Math.floor(this.heading) > 199) {
          console.log("GO RIGHT");
          for (var i = 0; i < 22; i++) {
            var ringLeft = light.pixel(i).color("rgb(50,50,50)");
          }
          for (var i = 22; i < 28; i++) {
            light.pixel(i).color("rgb(50, 0, 0)");
          }
          light.show();
        }
        else if (Math.floor(this.heading) < (qiblah.bearing - 5)) {
          console.log("GO RIGHT");
          for (var i = 0; i < 22; i++) {
            var ringLeft = light.pixel(i).color("rgb(50,50,50)");
          }
          for (var i = 22; i < 28; i++) {
            light.pixel(i).color("rgb(50, 0, 0)");
          }
          light.show();
        }

        //GO LEFT
        else if (Math.floor(this.heading) < 199) {
          console.log("GO RIGHT");
          for (var i = 6; i < 28; i++) {
            var ringLeft = light.pixel(i).color("rgb(50,50,50)");
          }
          for (var i = 0; i < 6; i++) {
            light.pixel(i).color("rgb(50, 0, 0)");
          }
          light.show();
        }
        else if (Math.floor(this.heading) > (qiblah.bearing + 5)) {
          console.log("GO RIGHT");
          for (var i = 6; i < 28; i++) {
            var ringLeft = light.pixel(i).color("rgb(50,50,50)");
          }
          for (var i = 0; i < 6; i++) {
            light.pixel(i).color("rgb(50, 0, 0)");
          }
          light.show();
        }
      });
    }

    else {
      console.log(this.scaled);
    }
  });
});
