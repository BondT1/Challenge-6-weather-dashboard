var openWeatherApiKey = 'f4ec5dcff4823d5712d2cbe8b9348d8c';
var openWeatherCoordinatesUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
var userFormEL = $('#search-city');
var forecastEl = $('.forecast');
var cityInputEl = $('#city');
var fiveDayEl = $('#five-forecast');
var searchHistoryEl = $('#history');
var currentDay = moment().format('M/DD/YYYY');
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
var searchHistoryArray = loadSearchHistory();



