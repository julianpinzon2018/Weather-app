import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js";
import { formatWeekList } from "./utils/format-date.js";
import { createDOM } from "./utils/dom.js";
import { createPeriodTime } from "./period-time.js";
import draggble from "./draggble.js";
import { configDayWeather } from "./day-weather.js";
import { selectItemHour } from "./select-hour.js";
import { createSummaryTime } from "./summary.js";

function tabPanelTemplate(id) {
  return `
          <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
            <div class="dayWeather" id="dayWeather-${id}">
              <ul class="dayWeather-list" id="dayWeather-list-${id}">
              </ul>
            </div>
          </div>
          `;
}

function createTabPanel(id) {
  const $panel = createDOM(tabPanelTemplate(id));
  if (id > 0) {
    $panel.hidden = true;
  }
  return $panel;
}
function configWeeklyWeather(weekList) {
  const $container = document.querySelector(".tabs");
  weekList.forEach((day, index) => {
    const $panel = createTabPanel(index);
    $container.append($panel);
    day.forEach((weather, indexWeather) => {
      configDayWeather();
      const id = { index, indexWeather };
      $panel
        .querySelector(".dayWeather-list")
        .append(createPeriodTime(weather, id));
      $panel.append(createSummaryTime(weather, id));
    });
  });
  selectItemHour();
}

export default async function weeklyWeather() {
  const $container = document.querySelector(".weeklyWeather");
  const { lat, lon, isError } = await getLatLon();
  if (isError) return console.log("Ha ocurrido un error ubicandote");
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  );
  if (weeklyWeatherError)
    return console.log(
      "oh! ha ocurrido un error trayendo el pronóstico del clima del clima"
    );
  const weekList = formatWeekList(weather.list);
  configWeeklyWeather(weekList);
  draggble($container);
}
