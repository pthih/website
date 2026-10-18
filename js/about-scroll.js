(function () {
  "use strict";
  var links = document.querySelectorAll(".more-about-link, .intro-down-link");
  var target = document.getElementById("about-me");
  if (!links.length || !target) return;
  var frame = 0;
  var running = false;
  function stop() {
    cancelAnimationFrame(frame);
    running = false;
  }
  function destination() {
    var header = document.getElementById("sticky-header");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 20);
  }
  function finish() {
    window.scrollTo(0, destination());
    target.focus({ preventScroll: true });
    running = false;
  }
  function activate(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    stop();
    running = true;
    var startY = window.scrollY;
    var duration = Math.max(1600, Math.min(Math.abs(destination() - startY) * 1.8, 2100));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, destination());
      frame = requestAnimationFrame(finish);
      return;
    }
    var startTime;
    function animate(now) {
      if (!running) return;
      if (startTime === undefined) startTime = now;
      var elapsed = now - startTime;
      var resistanceTime = 320;
      var progress = Math.min(1, Math.max(0, (elapsed - resistanceTime) / duration));
      // Slow drag, a late pickup, then a smooth arrival: cubic-bezier(.76,.03,.35,1).
      var low = 0;
      var high = 1;
      var t = progress;
      for (var i = 0; i < 16; i++) {
        t = (low + high) / 2;
        var x = 3 * (1 - t) * (1 - t) * t * 0.76
          + 3 * (1 - t) * t * t * 0.35 + t * t * t;
        if (x < progress) low = t;
        else high = t;
      }
      var eased = progress === 0 ? 0 : progress === 1 ? 1
        : 3 * (1 - t) * (1 - t) * t * 0.03
          + 3 * (1 - t) * t * t + t * t * t;
      // A small, resisted pull settles before the main motion releases.
      // Keep the existing pickup and landing curve after this short opening phase.
      var pullFraction = 0.012;
      var travel;
      if (elapsed < resistanceTime) {
        var pullProgress = elapsed / resistanceTime;
        travel = pullFraction * (1 - Math.pow(1 - pullProgress, 3));
      } else {
        travel = pullFraction + (1 - pullFraction) * eased;
      }
      window.scrollTo(0, startY + (destination() - startY) * travel);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else frame = requestAnimationFrame(finish);
    }
    frame = requestAnimationFrame(animate);
  }
  links.forEach(function (link) { link.addEventListener("click", activate); });
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", function (event) {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].indexOf(event.key) !== -1) stop();
  });
  window.addEventListener("resize", stop);
}());
