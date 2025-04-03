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
    let temperature = response.data.temperature.current; 
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature) + `°C`;
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
    .map(word => word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

    descriptionElement.innerHTML =  description;

    
}

function formatDate(date){
    let day = date.getDay();

    if(minutes < 10){
        minutes =`0${minutes}`;
    }

    let minutes = date.getMinutes();
    let hours = date.getHours();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    timeElement.innerHTML = formatDate(date);

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

displayForecast(){
    let forecast = document.querySelector("#forecast");

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let forecastHTML = "";

    days.forEach(function(day)
        forecastHTML = 
            `<div class"weather-forecast-day">`);

        forecast.innerHTML = forecastHTML;
}



