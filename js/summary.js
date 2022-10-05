import { createDOM } from "./utils/dom.js";
import { formatHumidity, formatTemp, formatWind } from "./utils/format-date.js";

export function sumaryTimeTemplate({ tempMax, tempMin, wind, humidity }, id) {
  return `
  <div class="dayWeather-summary" data-id="summary-${id.index}${id.indexWeather}">
  <p>Máx: <span>${tempMax}</span></p>
  <p>Mín: <span>${tempMin}</span></p>
  <p>Viento: <span>${wind}</span></p>
  <p>Humedad: <span>${humidity}</span></p>
  </div>
  `;
}
// export function createSummaryTime() {
//   return createDOM(sumaryTimeTemplate());
// }
export function createSummaryTime(weather, id) {
  const tempMax = formatTemp(weather.main.temp_max);
  const tempMin = formatTemp(weather.main.temp_min);
  const wind = formatWind(weather.wind.speed);
  const humidity = formatHumidity(weather.main.humidity);

  const config = {
    tempMax,
    tempMin,
    wind,
    humidity,
  };

  const $content = createDOM(sumaryTimeTemplate(config, id));

  if (id.indexWeather > 0) {
    $content.classList.add("is-hidden");
  }

  return $content;
}
