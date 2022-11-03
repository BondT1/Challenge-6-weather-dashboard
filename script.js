var ApiKey = 'f4ec5dcff4823d5712d2cbe8b9348d8c';
var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
var coordinates = openWeatherUrl + city + '$appid' + ApiKey
var FormEL = $('#search-city');
var forecastEl = $('.forecast');
var cityEl = $('#city');
var fiveForecastEl = $('#five-forecast');
var HistoryEl = $('#history');
var currentDay = moment().format('M/DD/YYYY');
var searchHistoryArray = loadSearchHistory();


// Fetch weather data from API url

function fetchWeather() {
    fetch (coordinates) {
        then (function (coordinateResult) {
            if (coordinateResult.ok) {
                coordinateResult.json().then(function (data) {
                    var lon = data.coord.lon;
                    var lat = data.coord.lon;
                    var Apifetch = oneCallUrl + lat + '&lon=' + lon + '&appid=' + ApiKey + '&units=imperial';
                }
            }
        }
    }

}


