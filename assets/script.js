// DECLARE OUR VARIABLES
const APIKey = "166a433c57516f51dfab1f7edaed8413";
const date = moment().format('l')

// Search Bar Event
// Calls on function handleSearchRequest when something is submited.
$('.input-group-append').on('click', '#searchBtn', handleSearchRequest)

// For the recent searches we want to pull from our localStorage and have it loaded on the screen upon viewing the site.
let citiesSearched = []
let recentSearches = localStorage.getItem('City');
for (let cityIndex = 0; cityIndex < localStorage.length; cityIndex++) {
    let cityList = $('<li>').addClass('list-group-item').text(recentSearches)
    // cityList.addClass()
    $('#recentSearches').append(cityList)
}


function handleSearchRequest(e) {
    e.preventDefault()

    // LET searchRequest equal the text in the input search bar.
    let searchRequest = $('#searchInput').val() 

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + searchRequest + "&appid=" + APIKey;

    handleForecastInfo(queryURL)
    handle5DayForecast(searchRequest)
    handleStorage(queryURL)
}

// For handling all the forecast info we have this function that will create and append the info in our HTML.
function handleForecastInfo(queryURL) {

    // FIRST we need to make ajax call to GET the information we are seeking.
    $.ajax({
        url: queryURL,
        method: "GET"
      })

    // THEN we are going to push our 'response into a function which is going to create and display our information for the requested city.
    .then(function(response) {
        // DECLARE our variable for the UV index which going to use a different URL.
        let uvURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&appid=' + APIKey

        // then set a variable for the icon we want to display with the dashboard.
        let weatherIcon = ($('<img>').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`))
        // let weatherIcon = ($('<img>').attr('src', response.weather.icon))

        // Display the City Name in the cityId ID.
        $('#cityId').text(response.name + ' (' + date + ') ')
        $('#cityId').append(weatherIcon.addClass('bg-dark rounded'))
        // Display the response temperature in the temperature ID.
        // First we need to change the temp from K to F
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $('#temperature').text('Temperature: ' + tempF.toFixed(2) + '°F')
        // Display the humidity in the humidity ID.
        $('#humidity').text('Humidity: ' + response.main.humidity + '%')
        // Display the wind speed in the windSpeed ID.
        $('#windSpeed').text('Wind Speed: ' + response.wind.speed + ' MPH')

        // TO display the UV index we are going to need to pull from the uvURL data that we made from the top.
        $.ajax({
            url: uvURL,
            method: "GET"
        })

        // THEN we are going to display the text and color code it depending on the UV Scale.
        .then(function(response) {
            // Display the UV Index in the uvIndex ID.
            $('#uvIndex').text(response.value)

            if (response.value <= 3) {
                $('#uvIndex').addClass('bg-success text-white p-1 rounded')
            }

            else if (response.value > 3 && response.value < 7) {
                $('#uvIndex').addClass('bg-warning text-white p-1 rounded')
            }

            if (response.value >= 7) {
                $('#uvIndex').addClass('bg-danger text-white p-1 rounded')
            }
        })
    })
}

function handle5DayForecast(searchRequest) {
    const weeklyForecast = `api.openweathermap.org/data/2.5/forecast?q=${searchRequest}&appid=${APIKey}`

    console.log(weeklyForecast)
}

function handleStorage(queryURL) {

}