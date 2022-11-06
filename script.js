// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var ApiKey = 'f4ec5dcff4823d5712d2cbe8b9348d8c';
var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
var coordinates = openWeatherUrl + city + '$appid' + ApiKey
var formEL = $('#search-city');
var currentDate = moment().format('M/DD/YYYY');
var forecastEl = $('.forecast');
var historyArray = loadSearchHistory();
var historyEl = $('#history');
var cityEl = $('#city');
var fiveForecastEl = $('#five-forecast');
var weatherIcon = 'http://openweathermap.org/img/wn/';


// Fetch weather data from API url

function fetchWeather() {
    fetch (coordinates) {
        then (function (coordinateResult) {
            if (coordinateResult.ok) {
                coordinateResult.json().then(function (data) {
                    var lon = data.coord.lon;
                    var lat = data.coord.lon;
                    var apiFetch = oneCallUrl + lat + '&lon=' + lon + '&appid=' + ApiKey + '&units=imperial';

                    fetch(apiFetch)
                        .then(function (weatherResult) {
                            if (weatherResult.ok) {
                                weatherResult.json().then(function (weatherInfo) {

                                    // current day
                                    var weatherNow = $('<div></div>')
                                    .attr({ id: weather-now})

                                    var icon = weatherResult.current.weather[0].Icon
                                    var cityIcon = weatherIcon + icon + '.png';
                                    var iconEL = $('<img><img>')
                                        .attr({ id: 'weather-current-icon',
                                                src: cityIcon,
                                                alt: 'Icon for weather'});

                                    var currentHeading = $('<h2></h2>')
                                        .text(city + ' (' + currentDate + ')');

                                    var weatherListCurrent = $('<ul></ul>');

                                    var weatherDetailsCurrent = ['Temp: ' + weatherData.current.temp + ' °F', 'Wind: ' + weatherData.current.wind_speed + ' MPH', 'Humidity: ' + weatherData.current.humidity + '%']
                                    
                                    for (var i = 0; i < weatherDetailsCurrent.length; i++) {
                                        var currentWeatherList = $('<li></li>')
                                            .text(weatherDetailsCurrent[i])
                                        weatherNow.append(currentWeatherList);    
                                    }

                                    weatherNow.append(currentHeading);
                                    currentHeading.append(iconEL);
                                    weatherNow.append(currentWeatherList);
                                    $('five-forecast').before(weatherNow);

                                    
                                    // need to continue with this 

                                    




                                })
                            }
                        })
                }
            }
        }
    }

}

// local storage

function saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(HistoryArray));    
}

function insertLocalStorage() {
    var historyArray = JSON.parse(localStorage.getItem('history'));

    // citySearch: []

    for (var i = 0; i < historyArray.citySearch.length; i++) {
        history(historyArray.citySearch[i]);
    }

    return historyArray;
}

// history buttons
function history(city) {
    var HistoryButton = $('<button></button>')
        .addClass('btn')
        .text(city)
        .on('click', function () {
            $('weather-now').remove

        })


}




// $('#search-button').on('click', function () {

// })


