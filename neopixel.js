var five = require("johnny-five");
pixel = require("node-pixel");
var board = new five.Board();
var Sound = require('node-aplay');

var music = new Sound('sound/adhan.wav');

var fps = 15;


music.play();



board.on("ready", function() {

  var strip = new pixel.Strip({
      board: this,
      controller: "FIRMATA",
      strips: [ {pin: 5, length: 6}, {pin: 6, length: 16}, {pin: 7, length: 6}, ], // this is preferred form for definition
      gamma: 2.8, // set to a gamma that works nicely for WS2812
  });

  strip.off();

  strip.on("ready", function() {

  ///LEFT
    console.log("LEFT");
    var colorLeft = ["#00ff00"];
    var current_colorsLeft = [0];
    var current_posLeft = [0];
    var blinkerLeft = setInterval(function() {
      strip.color("#000"); // blanks it out
      for (var i=0; i < current_posLeft.length; i++) {
          if (++current_posLeft[i] >= 6) {
              current_posLeft[i] = 0;
              if (++current_colorsLeft[i] >= colorLeft.length){
                current_colorsLeft[i] = 0;
              }
          }
          strip.pixel(current_posLeft[i]).color(colorLeft[current_colorsLeft[i]]);
      }
      strip.show();
    }, 1000/7.5);

    console.log("RING");
    var colors = ["#00ff00"];
    var current_colors = [0];
    var current_pos = [6];
    var ring = false;
    if (ring == false) {
      var blinker = setInterval(function() {
        strip.color("#000"); // blanks it out
        var i;
        for (i=0; i < current_pos.length; i++) {
            console.log(current_pos[i]);
            if (current_pos[i] == 21) {
              ring = true;
              console.log("true");
            }
            if (++current_pos[i] >= 22) {
                current_pos[i] = 6;
                if (++current_colors[i] >= colors.length) current_colors[i] = 0;
            }
            strip.pixel(current_pos[i]).color(colors[current_colors[i]]);

        }
        strip.show();
      }, 1000/fps);
    }
    else if (ring == true) {
      strip = null;
    }

  });

  /*//LEFT
  for (var i = 0; i < 6; i++) {
    light.pixel(i).color("rgb(50, 0, 0)");
  }
  var blinker = setInterval(function() {
    //RING
    for (var i = 6; i < 22; i++) {
      light.pixel(i).color("rgb(0, 0, 50)");
    }
      light.show();
  }, 1000/fps);
  //RIGHT
  for (var i = 22; i < 28; i++) {
    light.pixel(i).color("rgb(0, 50, 0)");
  }

  light.show();*/
});
