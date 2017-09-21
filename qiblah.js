var getJSON = require('get-json')
var p = require("phin");
var jsonp = require("jsonp");
var is = require("is-node");

var userLat;
var userLon;

var mecca = {
  lat: toRadians(21.3891),
  lon: toRadians(39.8579),
};

var bearing;
var finalBearing;

getJSON('http://ip-api.com/json', function(error, data) {
  //console.log(JSON.stringify(data, null, 2));
  console.log("City: " + data.city);
  userLat = data.lat;
  console.log("Lat: " + userLat);
  userLon = data.lon
  console.log("Lon: " + userLon);
  finalBearing = getBearing(toRadians(userLat), toRadians(userLon), mecca.lat, mecca.lon);
  module.exports.bearing = finalBearing;
  if (finalBearing < 0) {
    console.log("Bearing: " + finalBearing + " / West of North");
  }
  else {
    console.log("Bearing: " + finalBearing + " / East of North");
  }
});

function getBearing(lat1, lon1, lat2, lon2) {
  var y = Math.sin(lon2-lon1) * Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);
  var brng = Math.atan2(y, x);
  return toDegrees(brng);
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
