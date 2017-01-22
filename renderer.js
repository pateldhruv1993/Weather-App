// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require('electron').ipcRenderer;
var request = require("request");


var weatherAppName = "WeatherApp";
var weatherAPIKey = "ac227c1e34322afc4342d9a7c15607c5";

var settingsFormStatus = 1;
var maxPossibleHeight = 77;
var city = "Brampton";
var countryOrState = "Ontario";

setInterval(getWeatherData, 90000);

document.getElementById("settingsButton").addEventListener("click", function () {
    console.log("click event listener called!");
    var elem = document.getElementById("locationForm");
    var id = setInterval(frame, 3);
    var height = 0;
    var status = settingsFormStatus;
    if (settingsFormStatus == -1) {
        height = maxPossibleHeight;
        settingsFormStatus = 1;

        // Get new city and countryOrState values
        city = document.getElementById("cityField").value;
        countryOrState = document.getElementById("countryOrStateField").value;
        getWeatherData(city,countryOrState);
    } else {
        settingsFormStatus = -1;
    }
    
    function frame() {
        if (height == maxPossibleHeight && status == 1) {
            clearInterval(id);
        }
        else if (height == 0 && status == -1) {
            clearInterval(id);
        }
        else {
            if (status == 1) {
                height++;
            } else {
                height--;
            }
            document.getElementById("locationForm").style.height = height + 'px';
        }
    }
});


function getWeatherData() {

    var apiUrl = "http://api.wunderground.com/api/a3577f9fbb7af416/conditions/q/" + countryOrState + "/" + city + ".json";
    console.log(apiUrl);

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
                var iconName = body.current_observation.icon;
                console.log(tempF);
                document.getElementById("weatherIcon").src = "./resources/" + iconName + ".png";
                document.getElementById("weatherTemp").innerText = tempC + " °C";
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

