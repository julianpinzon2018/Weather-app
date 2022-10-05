export function configDayWeather() {
  let $dayHour = document.querySelectorAll(".dayWeather-time");
  $dayHour.forEach(($el, index) => {
    if (index === 0) $el.textContent = "Ahora";
  });
}
