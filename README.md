## 06-Weather-Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

Live URL: https://taanibravo.github.io/06-Weather-Dashboard/

## Directory
    1. Visual Example
    2. User Story
    3. Criteria
    4. My Journey
    5. Resources

## Visual Example
![Alt Text](https://media.giphy.com/media/nS8TCTapsByBEzTDix/giphy.gif)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## My Journey
```
I started this assignment just diving head first because we has already done a school day activity with the Open Weather Map API so I felt familiar and ready to push through this assignment by the time I got working on it. 

My main issues came with the localStorage and getting the key to be the same but different values. First attempts had me overwriting the city I was pushing into my arrays so there was only ever one city.It was a bit tricky for me as my knowledge of local storage was lackluster but after this assignment I have a strong understanding of how it works and why JSON is so essential. The other assignments where I created new keys for each value I felt didn't give me this full perspective.
```

## Resources
```
* https://getbootstrap.com/docs/4.1/
* https://api.jquery.com/
* https://stackoverflow.com/
* https://momentjs.com/
* https://openweathermap.org/api
```
