const API_KEY = "5906dfda41e9d0d3369301bfe66407e5";

const temperatureDataContainer = document.querySelector(
    ".temperature-container > .temperature-data"
);
const windSpeedDataContainer = document.querySelector(
    ".windspeed-container > .windspeed-data"
);
const humidityDataContainer = document.querySelector(
    ".humidity-container > .humidity-data"
);

const cityIdContainer = document.querySelector(".cityid-container > input");

const cityNameContainer = document.querySelector(".cityname-container > input");

function getWeatherData(cityName, cityId) {
    let url;
    const weatherData = {};

    if (!cityId) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`;
    }

    return fetch(url)
        .then((result) => {
            if (!result.ok) {
                throw new Error("Invalid request");
            }
            return result.json();
        })
        .then((json) => {
            const temperature = json.main.temp;
            const windSpeed = json.wind.speed;
            const humidity = json.main.humidity;
            weatherData["temperature"] = temperature;
            weatherData["windSpeed"] = windSpeed;
            weatherData["humidity"] = humidity;
            return weatherData;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function showWeather() {
    const inputType = document.querySelector(
        "input[name = 'searchmethod']:checked"
    ).id;
    if (inputType === "citybyname") {
        const cityName = cityNameContainer.value;
        const { temperature, windSpeed, humidity } = await getWeatherData(
            cityName
        );
        temperatureDataContainer.textContent = temperature;
        windSpeedDataContainer.textContent = windSpeed;
        humidityDataContainer.textContent = humidity;
    } else if (inputType === "citybyid") {
        const cityId = cityIdContainer.value;
        const { temperature, windSpeed, humidity } = await getWeatherData(
            null,
            cityId
        );
        temperatureDataContainer.textContent = temperature;
        windSpeedDataContainer.textContent = windSpeed;
        humidityDataContainer.textContent = humidity;
    }
}

function resetForm() {
    const cityBynameChooser = document.querySelector(
        ".cityname-chooser > input"
    );
    cityBynameChooser.checked = true;
    cityNameContainer.value = "";
    cityIdContainer.value = "";
    temperatureDataContainer.textContent = "";
    windSpeedDataContainer.textContent = "";
    humidityDataContainer.textContent = "";
}

const getWeatherButton = document.querySelector("button[type = 'submit']");
const cancelButton = document.querySelector("button[type = 'reset']");

getWeatherButton.addEventListener("click", showWeather);
cancelButton.addEventListener("click", resetForm);
