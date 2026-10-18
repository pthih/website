(function () {
  "use strict";
  var loader = document.getElementById("page-loader");
  if (!loader) return;
  var finished = false;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  loader.hidden = false;
  function dismiss() {
    if (finished) return;
    finished = true;
    loader.classList.add("is-finished");
    setTimeout(function () { loader.hidden = true; }, reducedMotion ? 0 : 500);
  }
  function ready() {
    setTimeout(dismiss, 100);
  }
  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready, { once: true });
  loader.querySelector("img").addEventListener("error", dismiss, { once: true });
  // Never leave an overlay blocking the site if a remote resource stalls.
  setTimeout(dismiss, 2500);
}());
