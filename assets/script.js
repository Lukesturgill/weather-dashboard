const cityNameInput = document.querySelector("#cityName");
const searchForm = document.querySelector("#searchForm");
const currentForecastUl = document.querySelector("#currentForecast #weatherConditions");
const currentForecastH3 = document.querySelector("#currentForecast h3");
const searchHistory = document.querySelector("#searchHistory");
const searchHistoryContainer = document.querySelector("#searchHistory .cardBody");
const dailyForecastContainer = document.querySelector("#dailyForecast");
const fiveDay = document.querySelector("#fiveDay");

// Use local storage to save previous searches
let searchHistory = JSON.parse(localStorage.getItem("searches"));

const callOpenWeather = (city) => {
    // Creates URL for initial API call to retrieve latitude and longitude of requested city
    const citySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=0656324568a33303c80afd015f0c27f8";

    // Initial fetch to retrieve lat + lng
    fetch(citySearch)
    .then(function (response) {
        // Handler if city is not found
        if (!response.ok) {
            currentForecastUl.innerHTML = "";
            currentForecastH3.textContent = "Try again.";
            const errorText = document.createElement("li");
            errorText.textContent = "City not found.";
            currentForecastUl.appendChild(errorText);
            dailyForecastContainer.innerHTML = "";
            fiveDay.classList.add("hidden");
        } else {
            // Converts API response into json object
            response.json()
        .then(function (data) {
            // Pulls city name into variable for later
            const cityName = data.name;
        });
    
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
        });
