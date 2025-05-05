let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let celsiusTemperature = null;
let forecastTemperature = [];

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function searchCity(city) {
    let apiKey = "a3o950fc274379347b6a44aft08a3cb0";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(updateWeatherInfo);

    let forecastApiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(forecastApiURL).then(displayForecast);
}

function updateWeatherInfo(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.temperature.current;

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" class="weather-app-icon" />`;
}

function displayForecast(response) {
    let forecastElement = document.querySelector(".weather-forecast-container");
    let forecast = response.data.daily;
    let forecastHTML = "";

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    forecast.forEach(function (day, index) {
        if (index < 5) {
            let date = new Date(day.time * 1000);
            let dayName = days[date.getDay()];

            forecastTemperature[index] = {
                max: day.temperature.maximum,
                min: day.temperature.minimum,
            };

            forecastHTML += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${dayName}</div>
                    <div class="weather-forecast-icon">
                        <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
                    </div>
                    <div class="weather-forecast-temps">
                        <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°</span>
                        <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°</span>
                    </div>
                </div>`;
        }
    });

    forecastElement.innerHTML = forecastHTML;
}

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;

    let forecastElements = document.querySelectorAll(".weather-forecast-temps");
    forecastElements.forEach(function (temp, index) {
        let maxTemp = (forecastTemperature[index].max * 9) / 5 + 32;
        let minTemp = (forecastTemperature[index].min * 9) / 5 + 32;
        temp.innerHTML = `
            <span class="weather-forecast-temp-min">${Math.round(minTemp)}°F</span>
            <span class="weather-forecast-temp-max">${Math.round(maxTemp)}°F</span>`;
    });
}

function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

    let forecastElements = document.querySelectorAll(".weather-forecast-temps");
    forecastElements.forEach(function (temp, index) {
        let maxTemp = forecastTemperature[index].max;
        let minTemp = forecastTemperature[index].min;
        temp.innerHTML = `
            <span class="weather-forecast-temp-min">${Math.round(minTemp)}°C</span>
            <span class="weather-forecast-temp-max">${Math.round(maxTemp)}°C</span>`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let celsiusLink = document.querySelector("#celsius-link");
    let fahrenheitLink = document.querySelector("#fahrenheit-link");

    celsiusLink.addEventListener("click", convertToCelsius);
    fahrenheitLink.addEventListener("click", convertToFahrenheit);

    searchCity("London"); // Default city
});

