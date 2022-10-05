export function setViewportSize($el) {
  const viewportBlocksize = getViewport();
  $el.style.blockSize = `${viewportBlocksize}px`;
}
export function getViewport() {
  return window.innerHeight;
}

export function onViewportResize(callback) {
  window.addEventListener("resize", callback);
}

export function offViewportResize(callback) {
  window.removeEventListener("resize", callback);
}

export function viewportSize($el) {
  setViewportSize($el);
  onViewportResize(() => setViewportSize($el));
}
