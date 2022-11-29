import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js";
import { formatWeekList } from "./utils/format-data.js";
import { createDom } from "./utils/dom.js";
import { createPeriodTime, createPeriodHour } from "./period-time.js";
import { tabHour } from "./weather-hour.js";
import draggable from "./draggble.js";

function tabPanelTemplate(id) {
  return `
      <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
            <div class="dayWeather" id="dayWeather-${id}">
              <ul class="dayWeather-list" id="dayWeather-list-${id}">
              </ul>
            </div>
            <div class="dayWeather2" id="dayWeather2-${id}">
              <div class="dayWeather-list2" id="dayWeather-list2-${id}">
              </div>
            </div>
          </div>
  `;
}

function createTapPanel(id) {
  const $panel = createDom(tabPanelTemplate(id));
  if (id > 0) {
    $panel.hidden = true;
  }
  return $panel;
}

function createTapSubHour(weather, index, id) {
  const $hour = createDom(createPeriodHour(weather, index, id));
  if (id > 0) {
    $hour.hidden = true;
  }
  return $hour;
}

function configWeeklyWeather(weekList) {
  const $tabs = document.querySelector(".tabs");
  weekList.forEach((day, index) => {
    const $panel = createTapPanel(index);
    $tabs.append($panel);
    day.forEach((weather, indexWeather) => {
      $panel
        .querySelector(".dayWeather-list")
        .append(createPeriodTime(weather, index, indexWeather));
    });
    day.forEach((weather, indexed) => {
      $panel
        .querySelector(".dayWeather-list2")
        .append(createTapSubHour(weather, index, indexed));
    });
  });
}

export default async function weeklyWeather() {
  const $container = document.querySelector(".weeklyWeather");
  const { lat, lon, isError } = await getLatLon();
  if (isError) throw new Error("Ha ocurrido un error hubicandote");
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  );
  if (weeklyWeatherError)
    throw new Error("Oh ha ocurrido un error trayendo el pronóstico del clima");
  const weekList = formatWeekList(weather.list);
  configWeeklyWeather(weekList);
  tabHour();
  draggable($container);
}
