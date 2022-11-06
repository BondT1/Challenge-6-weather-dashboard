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
var currentDate = moment().format('DD/M/YYYY');
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

                                    var weatherDetailsCurrent = ['Temp: ' + weatherInfo.current.temp + ' °F', 'Wind: ' + weatherInfo.current.wind_speed + ' MPH', 'Humidity: ' + weatherInfo.current.humidity + '%']
                                    
                                    for (var i = 0; i < weatherDetailsCurrent.length; i++) {
                                        var currentWeatherItem = $('<li></li>')
                                            .text(weatherDetailsCurrent[i])
                                        weatherNow.append(currentWeatherItem);    
                                    }

                                    weatherNow.append(currentHeading);
                                    currentHeading.append(iconEL);
                                    weatherNow.append(weatherListCurrent);
                                    $('five-forecast').before(weatherNow);

                                    

                                    // Five day forecast
                                    // Jquery for this container

                                    var fiveForecastHeader = $('<h2></h2>')
                                        .text("5-Day-Forecast:")
                                        .attr({id = 'five-forecast-header'})

                                    $('#weather-now').after(fiveForecastHeader)

                                    var fiveForecastArray = [];

                                    for (var i = 0; i < 5; i++) {
                                        let date = moment().add(i + 1, 'days').format('DD,M,YYYY');

                                        fiveForecastArray.push(date);
                                    }

                                    // weather cards

                                    for (var i = 0; i < fiveForecastArray.length; i++) {
                                        var weatherCard = $('<div></div>')
                                            addClass('card');

                                        var weatherCardMain = $('<div></div>')
                                            addClass('card-main');

                                        var cardH3 = $('<h3></h3>')
                                            addClass('card-h3')
                                            .text(fiveForecastArray[i]);

                                        var fiveIcon = weatherInfo.daily[i].weather[0].icon;

                                        var fiveIconEl = $('<img></img>')
                                            .attr({
                                                src: weatherIcon + fiveIcon + '.png',
                                                alt: 'Forecast Icon'
                                            });
                                        
                                        var weatherDetailsCurrent = ['Temp: ' + weatherInfo.current.temp + ' °F', 'Wind: ' + weatherInfo.current.wind_speed + ' MPH', 'Humidity: ' + weatherInfo.current.humidity + '%']
                                        var tempInfo = $('<p></p>')
                                            .text('Temp: ' + weatherInfo.daily[i].temp.max);
                                        
                                        var windInfo = $('<p></p>')
                                            .text('Wind: ' + weatherInfo.daily[i].wind_speed + 'MPH');
                                        
                                        var humidityInfo = $('<p></p>')
                                            .text('Humidity: ' + weatherInfo.daily[i].humidity + '%');

                                        fiveForecastEl.append(weatherCard);
                                        weatherCard.append(weatherCardMain);
                                        weatherCardMain.append(cardH3);
                                        weatherCardMain.append(fiveIconEl);
                                        weatherCardMain.append(tempInfo);
                                        weatherCardMain.append(windInfo);
                                        weatherCardMain.append(humidityInfo);
                                    }
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


