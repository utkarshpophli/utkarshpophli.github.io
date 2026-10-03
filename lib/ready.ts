// Signals that the preloader curtain has lifted so the hero can play.
export const READY_EVENT = "portfolio:ready";

export const isReady = () =>
  typeof document !== "undefined" && document.documentElement.dataset.ready === "1";

export const markReady = () => {
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event(READY_EVENT));
};

export const whenReady = (fn: () => void) => {
  if (isReady()) {
    fn();
    return () => {};
  }
  window.addEventListener(READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(READY_EVENT, fn);
};
