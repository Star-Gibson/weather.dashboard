//Global Variables
var searchCity = $('#searchCity');
var cityDisplay = $('.cityDisplay')
var currentTemp = $('.currentTemp');
var currentHumidity = $('.currentHumidity');
var currentWind = $('.currentWind');
var currentUV = $('.currentUV');

//Variable for Local Stroage Array: Empty Initially: 
var storedCities = JSON.parse(localStorage.getItem("weatherCities")) || [];



//Variables for APIkey and queryURL
var APIkey = '73d970a47a40b0d93cf860e762bf7aee';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + APIkey;

//Current Weather Data
function Retrieve() {

    searchCity = $("#searchCity").val().split(' ').join('+')
    //Storing Searched Cities into Local Storage: 
    storedCities.push(searchCity);
    localStorage.getItem("weatherCities", JSON.stringify(storedCities));
    //Variables for APIkey and queryURL: Initial Call
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
    fiveDayRetrieve();
})

function fiveDayRetrieve() {

    searchCity = $("#searchCity").val().split(' ').join('+')
    //Variables for APIkey and queryURL: Initial Call
    var APIkey = "73d970a47a40b0d93cf860e762bf7aee";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            $.ajax({
                url:`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${APIkey}`,

            }).then(function (response_two) {
                console.log(response_two);
                for (i = 0; i < 5; i++) {
                    var position = response_two.list[i];

                    document.querySelector("#cards").innerHTML +=
                        `<div class = 'card col-2 bg-primary'>
                    <div class="card-body">
                    <h3 class="card-title date1"><small>Date: ${position.dt_txt}</small></h3>
                    <p><img class ='miniWeather1'><small>Icon: <img src = "http://openweathermap.org/img/w/${position.weather[0].icon}.png"/></small></p>
                    <p class="card-text temp1"><small>Temp: ${Math.floor(((position.main.temp) - 273.15) * 1.8 + 32) + "℉"}</small></p>
                    <p class="card-text humidity1"><small>Humidity: ${position.main.humidity + "%"}</small></p>
                    </div>
                    </div>`
                }
            });



        });
}
