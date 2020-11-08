// DECLARE OUR VARIABLES
const APIKey = "166a433c57516f51dfab1f7edaed8413";

// Search Bar Event
// Calls on function handleSearchRequest when something is submited.
$('.input-group-append').on('click', '#searchBtn', handleSearchRequest)

// For the recent searches we want to pull from our localStorage and have it loaded on the screen upon viewing the site.
let recentSearches = localStorage.getItem('Cities') || [];
for (let cityIndex = 0; cityIndex < localStorage.length; cityIndex++) {
    let cityList = $('<li>').addClass('list-group-item').text(recentSearches)
    $('#recentSearches').append(cityList)
}


function handleSearchRequest(e) {
    e.preventDefault()

    // LET searchRequest equal the text in the input search bar.
    let searchRequest = $('#searchInput').val()
    // THEN store the value into our localStorage.
    localStorage.setItem('Cities', searchRequest)

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + searchRequest + "&appid=" + APIKey;

    handleForecastInfo(searchRequest, queryURL)
    // handle5DayForecast(searchRequest)
}

function handleForecastInfo(searchRequest, queryURL) {

}
