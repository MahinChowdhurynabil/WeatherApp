const API_KEY = `d80b2bf43716a2fea33d6f65110c2b19`;
const weatherData = document.querySelector(".resultData");
const cityName = document.querySelector(".cityInput");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityName.value.trim(); // Trim whitespace from the input for reliability
  console.log(cityValue);
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp); // Corrected spelling

    const description = data.weather[0].description;
    console.log(data.weather[0].description);

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)} °C`,
      `Humidity: ${data.main.humidity} %`,
      `Wind Speed: ${data.wind.speed} Km/h`,
    ];
    console.log(data);

    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherData.querySelector(".temp").textContent = `${temperature} °C`;
    weatherData.querySelector(".description").textContent = description;
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = ``;
    weatherData.querySelector(".temp").textContent = ``;
    weatherData.querySelector(".description").textContent = ``;
    weatherData.querySelector(".details").innerHTML = ``;

    weatherData.querySelector(
      ".description"
    ).innerHTML = `<div class="alert alert-danger" id="alart">
      <strong>Error!</strong> Failed to fetch weather data. Please try again later.
    </div>`;
  }
}
