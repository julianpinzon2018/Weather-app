function selectItemHour() {
  const $tabItem = document.querySelectorAll(".dayWeather-item");
  $tabItem.forEach(($itemHour) => {
    $itemHour.addEventListener("click", handleSelectItemHour);
  });
}

function handleSelectItemHour() {
  const $itemSelected = this;
  const $containerItem = $itemSelected.parentElement;

  const $itemActive = $containerItem.querySelector(".is-selected");
  $itemActive.classList.remove("is-selected");
  $itemSelected.classList.add("is-selected");

  const $tabSection = $containerItem.parentElement.parentElement;
  const $summaryActive = $tabSection.querySelector(
    ".dayWeather-summary:not(.is-hidden)"
  );
  // debugger;

  $summaryActive.classList.add("is-hidden");

  const summaryId = $itemSelected.id;
  const $summarySelected = document.querySelector(`[data-id="${summaryId}"]`);
  $summarySelected.classList.remove("is-hidden");
}

export { selectItemHour };
