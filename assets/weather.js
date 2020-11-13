//Global Variables
var searchCity = $('#searchCity');
var cityDisplay = $('.cityDisplay')
var currentTemp = $('.currentTemp');
var currentHumidity = $('.currentHumidity');
var currentWind = $('.currentWind');
var currentUV = $('.currentUV');


//Variables for APIkey and queryURL
var APIkey = '73d970a47a40b0d93cf860e762bf7aee';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + APIkey;

//Current Weather Data
function Retrieve() {

    searchCity = $("#searchCity").val().split(' ').join('+')
    var APIkey = "73d970a47a40b0d93cf860e762bf7aee";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var temperature = Math.floor(((response.main.temp) - 273.15) * 1.8 + 32)

            cityDisplay.text(response.name + ' - ' + moment().format("MM/Do/YYYY") + ' icon')
            currentTemp.text("Temperature: " + temperature + "℉")
            currentHumidity.text("Humidity: " + response.main.humidity + "%")
            currentWind.text("Wind speed: " + response.wind.speed + " mph")
        });
}

$('#searchBtn').on('click', function (event) {
    event.preventDefault();
    Retrieve();
    //Add 5 day retrieval
})

