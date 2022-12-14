// import weather from "../data/current-weather.js";
import { formatDate, formatTemp } from "./utils/format-data.js";
import { weatherConditionsCodes } from "./constants.js";
import { getLatLon } from "./geolocation.js";
import { getCurrentWeather } from "./services/weather.js";

function setCurrentDate($el) {
  const date = new Date();
  const formattedDate = formatDate(date);
  $el.textContent = formattedDate;
}

function setCurrentCity($el, city) {
  $el.textContent = city;
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp);
}

function solarStatus(sunriseTime, sunsetTime) {
  const currentHours = new Date().getHours();
  const sunsetHours = sunsetTime.getHours();
  const sunriseHours = sunriseTime.getHours();
  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return "night";
  } else {
    return "morning";
  }
}

function setBackground($el, conditionCode, solarStatus) {
  const weatherType = weatherConditionsCodes[conditionCode];
  console.log(weatherType);
  const size = window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches
    ? "@2x"
    : "";

  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`;
}

function showCurrentWeather($app, $loader) {
  $app.hidden = false;
  $loader.hidden = true;
}

function configCurrentWeather(weather) {
  const $app = document.querySelector("#app");
  const $loading = document.querySelector("#loading");
  showCurrentWeather($app, $loading);

  const $currentWeatherDate = document.querySelector("#current-weather-date");
  setCurrentDate($currentWeatherDate);

  const $currentWeahterCity = document.querySelector("#current-weather-city");
  const city = weather.name;
  setCurrentCity($currentWeahterCity, city);

  const $currentWeahterTemp = document.querySelector("#current-weather-temp");
  const temp = weather.main.temp;
  setCurrentTemp($currentWeahterTemp, temp);
  const sunriseTime = new Date(weather.sys.sunrise * 1000 - 3.6e6);
  const sunsetTime = new Date(weather.sys.sunset * 1000 - 7.2e6);
  const conditionCode = String(weather.weather[0].id).charAt(0);
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime));
}
export default async function currentWeather() {
  const { lat, lon, isError } = await getLatLon();
  if (isError) return alert("Ha ocurrido un error hubicandote");
  const { isError: currentWeatherError, data: weather } =
    await getCurrentWeather(lat, lon);
  if (currentWeatherError)
    throw new Error("Oh ha ocurrido un error ubicandote");
  configCurrentWeather(weather);
}
