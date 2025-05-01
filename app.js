let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);

    console.log(searchInput.value);
}



function searchCity(city) {
    let apiKey = "a3o950fc274379347b6a44aft08a3cb0";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiURL).then(updateWeatherInfo);

    console.log(apiURL);
}

function updateWeatherInfo(response) {
    console.log(response.data.condition.description);

    let temperatureElement = document.querySelector("#temperature");
    let celsiusTemperature = response.data.temperature.current; 
    let cityElement = document.querySelector("#city");
    temperatureElement.innerHTML = Math.round(celsiusTemperature) + `°C`;
    let descriptionElement = document.querySelector("#description");

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed}km/h`;

    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);

    timeElement.innerHTML = date.getHours();
    timeElement.innerHTML = `${date.getDay()}, ${date.getHours()} : ${date.getMinutes()}`;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function Capitalizing(){
    let description = response.data.condition.description;
    description = description
    .split("")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

    descriptionElement.innerHTML =  description;

    
}

function formatDate(date){

    let minutes = date.getMinutes();
    let hours = date.getHours()
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];
    const ampen = hours >= 12 ? `PM` : `Am`;
    hours = hours % 12;
    hours = hours ? hours : 12;

    if(minutes < 10){
        minutes =`0${minutes}`;
    }

    return `${days}, ${hours}: ${minutes}`;

}

searchCity("London");

let forecast = document.querySelector("#forecast");

forecast.innerHTML =
`<div class="weather-forecast-day">
    <div class="weather-forecast-date"> ${day} </div>
        <div class="weather-forecast-icon"></div>
            <div class="weather-forecast-temps">
            <span class="weather-forecast-temp-max"> 19° </span>
        </div>
</div>`;

function displayForecast(response) {
    let forecastElement = document.querySelector(".weather-forecast-container");
    let forecast = response.data.daily; // Assuming the API provides a 'daily' array for the forecast
    let forecastHTML = "";

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    forecast.forEach(function (day, index) {
        if (index < 5) { // Limit to 5 days
            let date = new Date(day.time * 1000); // Convert timestamp to date
            let dayName = days[date.getDay()]; // Get the day name

            forecastHTML += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${dayName}</div>
                    <div class="weather-forecast-icon">
                        <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
                    </div>
                    <div class="weather-forecast-temps">
                        <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°</span>
                        <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>`;
        }
    });

    forecastElement.innerHTML = forecastHTML;
}

function getCurrentLocation(event){
    event.preventDefault();

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(retrievePosition, handleError);
    }else{
        alert("Geolocation is not supported by your browser");
    }
}

function retrievePosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey ="a3o950fc274347n6a44ft08a3cb0";
    let apiURL = `http://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}$units= axios(apiUrl).then(displayForecast)`;

    axios.get(apiURL).then(updateWeatherInfo);
}

function handleError(error) {
    alert("Unable to retrieve your location. PLease check your browser settings");
}

const locationButton = document.querySelector("location-button");
locationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;
let forecastTemperature = [];

celsiusLink.classList.remove("active");
celsiusLink.classList.add("inactive");
fahrenheitLink.classList.remove("inactive");
fahrenheitLink.classList.add("active");

forecast.forEach(function (day,index){
    if(index < 5){

        let date = new Date(day.time * 1000);
        let dayName = days[date.getDay()];

        forecastTemperature.push({
            max: day.temperature.maximum,
            min: day.temperature.minimum,
        });
    }
});

function convertToFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    let forecastElement = document.querySelectorAll("weather-forecast-temps");
    forecastElement.forEach(function (temp, index) {
        let maxTemp = (temp.max * 9/5) + 32;
        let minTemp = (temp.min * 9/5) + 32;
        forecastElements[index].innerHTML = `
        <span class="weather-forecast-temp-max">${Math.round(maxTemp)}°F</span>
        <span class="weather-forecast-temp-min">${Math.round(minTemp)}°F</span>`;
    });
}

