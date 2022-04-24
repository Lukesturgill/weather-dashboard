const cityNameInput = document.querySelector("#cityName");
const searchForm = document.querySelector("#searchForm");
const currentForecastUl = document.querySelector("#currentForecast #weatherConditions");
const currentForecastH3 = document.querySelector("#currentForecast h3");
const searchHistory = document.querySelector("#searchHistory");
const searchHistoryContainer = document.querySelector("#searchHistory .cardBody");
const dailyForecastContainer = document.querySelector("#dailyForecast");
const fiveDay = document.querySelector("#fiveDay");

// Use local storage to save previous searches
//let searchHistory = JSON.parse(localStorage.getItem("searches"));

const localCityArray = []; 

const callOpenWeatherApi = (city) => {
    // Creates URL for initial API call to retrieve latitude and longitude of requested city
    const citySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b06c8666b0489ca67a5e17b0b7bfba15";

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
    }
    })
}

    // Creates URL for oneCall OpenWeather API from latitude and longitude of previous OpenWeather call
    const createOcUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=21.44&lon=-75.04&appid=b06c8666b0489ca67a5e17b0b7bfba15";
            
    // Fetch to retrive current and daily weather info
    fetch(createOcUrl)
    .then(function (response) {
        if (response.ok) {
            // Converts API response into json object
            response.json()
    .then(function (data) {
        // Creates icon to display current weather status
        const icon = ("<img src='https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Weather icon'>");

        // Displays city name and weather icon
        currentForecastH3.innerHTML = cityName + icon;

        const listItems = [];
        
        // Clears any existing list items from previous searches
        currentForecastUl.innerHTML = "";

         // Creates four list items to hold current weather
          for (let i = 0; i < 4; i++) {
        const li = document.createElement("li");
        li.classList.add("mb-2");
        listItems.push(li);
         }
        

         // Populates contents of list items with properties of json object
            listItems[0].innerHTML = "Temperature: " + Math.floor(data.current.temp) + " &deg;F" ;
            listItems[1].textContent = "Humidity: " + data.current.humidity + "%";
            listItems[2].textContent = "Wind Speed: " + Math.floor(data.current.wind_speed) + " MPH";

        // Store in variable to condense logic statements and rounds down
            const uvi = Math.floor(data.current.uvi);

        // Evaluation to populate UV Index color based on value
            if (uvi <= 2) {
            listItems[3].innerHTML = `UV Index: <button class="btn btn-info uv">${uvi}</button>`;
            } else if (uvi > 2 && uvi <= 5) {
            listItems[3].innerHTML = `UV Index: <button class="btn btn-success uv">${uvi}</button>`;
            } else if (uvi > 5 && uvi <= 8) {
            listItems[3].innerHTML = `UV Index: <button class="btn btn-warning uv">${uvi}</button>`;
            } else {
            listItems[3].innerHTML = `UV Index: <button class="btn btn-danger uv">${uvi}</button>`;
            }

         // Appends each updated list item to specified ul
         listItems.forEach(li => {
             currentForecastUl.append(li);
          })

         let dailyWeatherArray = [];

         // Clears existing cards for 5-Day Forecast container
         dailyForecastContainer.innerHTML = "";

         // Loop to populate cards for next 5 days with information from daily openCall property
            for (let i = 0; i < 5; i++) {
              const dailyDiv = document.createElement("div");
              // Populates forecast data for each card. Uses index number + 1 to advance moment.js call from current date by one day (pulls dates for next 5 days after today)
              dailyDiv.innerHTML = `
             <div class="p-2 m-2 card bg-info text-white">
                  <ul id="conditions">
                        <li><img src='https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png' alt="Weather icon" class="mx-auto"></li>
                     <li>Temp: ${Math.floor(data.daily[i].temp.day)} &deg;F</li>
                     <li>Humidity: ${data.daily[i].humidity}%</li>
                  </ul>
              </div>`;

               // Pushes card into dailyWeatherArray to then be appended to container
               dailyWeatherArray.push(dailyDiv);
         }
          // Removes .hidden class to now display in case previous search resulted in error
          fiveDay.classList.remove("hidden");

           // Appends cards stored in dailyWeatherArray to container
          dailyWeatherArray.forEach(card => {
              dailyForecastContainer.appendChild(card);
             })
             // Not called under searchForm event listener to ensure search parameter returns result first
             updateLocalStorage(cityName);
          })
        }
    });
  


    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
    
         // Removes white space from both ends of search term
     let searchValue = cityNameInput.value.trim("");

     // Handler if user submits form with blank field
     if (searchValue === "") {
    currentForecastH3.textContent = "Please enter a city!";
    currentForecastUl.innerHTML = "";
    dailyForecastContainer.innerHTML = "";
    // Hides 5-day forecast if API won't be called
    fiveDay.classList.add("hidden");
     } else {
    // Calls API to fetch provided value
    callOpenWeatherApi(searchValue);
    // Clears text in input
    cityNameInput.value = "";
     }
    });
  
