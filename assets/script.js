// DECLARE OUR VARIABLES
const APIKey = "166a433c57516f51dfab1f7edaed8413";

// Search Bar Event
// Calls on function handleSearchRequest when something is submited.
$('.input-group-append').on('click', '#searchBtn', handleSearchRequest)

// For the recent searches we want to pull from our localStorage and have it loaded on the screen upon viewing the site.
let recentSearches = localStorage.getItem('Cities') || [];
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
    // handle5DayForecast(searchRequest)
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
        // We are going to store the city searched for after they have searched for a valid city.
        localStorage.setItem('Cities', response.name)
        // Display the City Name in the cityId ID.
        $('#cityId').text(response.name + response.weather.icon)
        // Display the response temperature in the temperature ID.
        // First we need to change the temp from K to F
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $('#temperature').text('Temperature: ' + tempF.toFixed(2) + '°F')
        // Display the humidity in the humidity ID.
        $('#humidity').text('Humidity: ' + response.main.humidity + '%')
    })

}
