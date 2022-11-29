function handleSelectTabHourClick(event) {
  const $tabHour = event.target;
  const id = $tabHour.id;
  const $tabHourPanel = document.querySelector(`[aria-labelledby=${id}]`);
  const $tabHourPanelSelected = document.querySelector(
    `.daySummary-item:not([hidden])`
  );
  $tabHourPanel.hidden = false;
  $tabHourPanelSelected.hidden = true;
  const $hourActive = document.querySelector(".is-selected");
  $hourActive.classList.remove("is-selected");
  $tabHour.classList.add("is-selected");
}

export function tabHour() {
  const dayHour = document.querySelectorAll(".dayWeather-item");
  dayHour.forEach((x, i) => {
    x.addEventListener("click", handleSelectTabHourClick);
    if (i === 0) {
      x.classList.add("is-selected");
    }
  });
}
