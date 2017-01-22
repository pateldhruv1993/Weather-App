// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require('electron').ipcRenderer;
var request = require("request");


var weatherAppName = "WeatherApp";
var weatherAPIKey = "ac227c1e34322afc4342d9a7c15607c5";


getWeatherData("Canada", "Brampton");


function getWeatherData(countryOrState, city) {

    var apiUrl = "http://api.wunderground.com/api/a3577f9fbb7af416/conditions/q/" + countryOrState + "/" + city + ".json";

    request({
        url: apiUrl,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            try {
                var location = body.current_observation.display_location.full;
                console.log(location);
                var tempC = body.current_observation.temp_c;
                console.log(tempC);
                var tempF = body.current_observation.temp_f;
                console.log(tempF);
                document.getElementById("weatherTemp").innerText = tempC + "° C";
                document.getElementById("weatherLocation").innerText = location;

            } catch (err) {
                console.log("Something went wrong while getting data out of json for: " + countryOrState + "," + city);
                console.log(body);
            }
        } else {
            console.log("Something went wrong while trying to get the weather info for: " + countryOrState + "," + city);
        }
    });

}