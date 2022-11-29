import { createDom } from "./utils/dom.js";
import { formatDate, formatSpeed, formatTemp } from "././utils/format-data.js";

export function periodTimeTemplate({
  temp,
  date,
  icon,
  description,
  index,
  id,
}) {
  return `
        <li class="dayWeather-item" id=clima-${index}${id}>
        <span class="dayWeather-time">${date}</span>
        <img
          class="dayWeather-icon" heigth="48" width"48"
          src="https://openweathermap.org/img/wn/${icon}@2x.png"
          alt="${description}"
          rain=""
        />
        <span class="dayWeather-temp">${temp}</span>
      </li>
  `;
}

export function createPeriodTime(weather, index, id) {
  const dateOptions = {
    hour: "numeric",
    hour12: true,
  };
  const temp = formatTemp(weather.main.temp);
  const date = formatDate(new Date(weather.dt * 1000), dateOptions);
  const config = {
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    index,
    id,
  };
  return createDom(periodTimeTemplate(config));
}

export function periodHourTemplate({
  tempMax,
  tempMin,
  humidity,
  speed,
  index,
  id,
}) {
  return `
  <div class="daySummary-item" aria-labelledby=clima-${index}${id}>
      <div class="dayWeather-summary ">        
          <span class="daySummary">Máx: ${tempMax}</span>
          <span class="daySummary">Mín: ${tempMin}</span>
      </div>
      <div class="dayWeather-summary">
          <span class="daySummary">Viento: ${speed}</span>
          <span class="daySummary">Humedad: ${humidity}</span>
      </div>
      </div>
  `;
}
export function createPeriodHour(weather, index, id) {
  const tempMax = formatTemp(weather.main.temp_max);
  const tempMin = formatTemp(weather.main.temp_min);
  const humidity = formatTemp(weather.main.humidity);
  const speed = formatSpeed(weather.wind.speed);
  const configuracion = {
    tempMax,
    tempMin,
    humidity,
    speed,
    index,
    id,
  };
  return periodHourTemplate(configuracion);
}
