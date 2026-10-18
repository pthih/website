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
    var duration = Math.max(900, Math.min(Math.abs(destination() - startY) * 1.15, 1200));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, destination());
      frame = requestAnimationFrame(finish);
      return;
    }
    var startTime;
    function animate(now) {
      if (!running) return;
      if (startTime === undefined) startTime = now;
      var progress = Math.min(1, (now - startTime) / duration);
      // Ease in gently, accelerate through the middle, then settle softly.
      var eased = progress < 0.5
        ? 8 * Math.pow(progress, 4)
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;
      window.scrollTo(0, startY + (destination() - startY) * eased);
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
