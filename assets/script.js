// DECLARE OUR VARIABLES
const APIKey = "166a433c57516f51dfab1f7edaed8413";
const date = moment().format('l')

// Search Bar Event
// Calls on function handleSearchRequest when something is submited.
$('#container').on('click', '#searchBtn', handleSearchRequest)

//  WHEN the user clicks on the recent searches then we want to push that into our input so they can search that city again.
$('#recentSearches').on('click', '.list-group-item-action', function(e) {
    e.preventDefault()

    $('#searchInput').val($(this).text()).css('textTransform', 'capitalize')
})

// For the recent searches we want to pull from our localStorage and have it loaded on the screen upon viewing the site.
let searchHistory = JSON.parse(localStorage.getItem('City')) || [];

for (let cityIndex = 0; cityIndex < searchHistory.length; cityIndex++) {

    // To remove the duplicate searches from the list we are going to use the new Set method and apply the localstorage list to a new array dupCitiesRemoved.
    const dupCitiesRemoved = Array.from(new Set(searchHistory.filter(Boolean)))
    let cityList = $('<button>').addClass('btn text-left border-bottom').attr('id', 'searchBtn').text(dupCitiesRemoved[cityIndex]).css('textTransform', 'capitalize')

    $('#recentSearches').append(cityList)
}

function handleSearchRequest(e) {
    e.preventDefault()

    // LET searchRequest equal the text in the input search bar.
    let searchRequest = $('#searchInput').val() || $(this).text()

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + searchRequest + "&appid=" + APIKey;

    handleForecastInfo(queryURL)
    handle5DayForecast(searchRequest)
    handleStorage(searchRequest)
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

        // then set a variable for the icon we want to display with the dashboard.
        let weatherIcon = ($('<img>').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`))
        // let weatherIcon = ($('<img>').attr('src', response.weather.icon))

        // Display the City Name in the cityId ID.
        $('#cityId').text(response.name + ' (' + date + ') ')
        $('#cityId').append(weatherIcon.addClass('bg-primary rounded'))
        // Display the response temperature in the temperature ID.
        // First we need to change the temp from K to F
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $('#temperature').text('Temperature: ' + tempF.toFixed(0) + '°F')
        // Display the humidity in the humidity ID.
        $('#humidity').text('Humidity: ' + response.main.humidity + '%')
        // Display the wind speed in the windSpeed ID.
        $('#windSpeed').text('Wind Speed: ' + response.wind.speed + ' MPH')

        // DECLARE our variable for the UV index which going to use a different URL.
        let uvURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&appid=' + APIKey

        // TO display the UV index we are going to need to pull from the uvURL data that we made.
        $.ajax({
            url: uvURL,
            method: "GET"
        })

        // THEN we are going to display the text and color code it depending on the UV Scale.
        .then(function(response) {
            // Display the UV Index in the uvIndex ID.
            $('#uvIndex').text(response.value)
            // IF the value is less than 3 the background will be green
            if (response.value <= 3) {
                $('#uvIndex').addClass('bg-success text-white p-1 rounded')
            }
            // ELSE IF the value is 4-7 the background will be yellow.
            else if (response.value > 3 && response.value <= 7) {
                $('#uvIndex').addClass('bg-warning text-white p-1 rounded')
            }
            // ELSE IF the value is greater than 7 the background will be red.
            else if (response.value > 7) {
                $('#uvIndex').addClass('bg-danger text-white p-1 rounded')
            }
        })
    })
}

function handle5DayForecast(searchRequest) {
    // DECLARE our variable for the 5 day forecast url
    const weeklyForecast = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${searchRequest}&cnt=6&appid=${APIKey}`
    // THEN create our ajax call
    $.ajax({
        url: weeklyForecast,
        method: "GET"
    })
    // THEN we need to create and display our 5 day forecast.
    .then(function(response) {
        // FOR each of the days on the dash board we will create for loop to create them all in the least amount of code. 
        for (let dayIndex = 1; dayIndex < 6; dayIndex++) {
            let dayInfo = response.list

            let tempF = (dayInfo[dayIndex].temp.day - 273.15) * 1.80 + 32;
            //  We start with pulling the next 5 dates from momentJS and displaying them in the card titles.
            $(`#day${dayIndex}title`).text(moment().add(dayIndex, 'd').format('l'))
            // THEN we display the icons that we want for each of the responses. 
            // $(`#weatherIcon${dayIndex}`).append(weeklyIcon)
            $(`#icon${dayIndex}`).attr('src', `http://openweathermap.org/img/wn/${dayInfo[dayIndex - 1].weather[0].icon}.png`)
            // NEXT is the Temperature and Humidity
            $(`#weeklyTemp${dayIndex}`).text('Temp: ' + tempF.toFixed(0) + '°F')

            $(`#weeklyHumidity${dayIndex}`).text('Humidity: ' + dayInfo[dayIndex].humidity + '%')

        }
    })
}

function handleStorage(searchRequest) {

    searchHistory.push(searchRequest)
    localStorage.setItem('City', JSON.stringify(searchHistory))

}
