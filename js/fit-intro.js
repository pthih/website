(function () {
  "use strict";
  var heading = document.querySelector(".personal-intro");
  if (!heading) return;
  var lines = heading.querySelectorAll(":scope > span");
  var portrait = document.querySelector(".slider_area .my_img");
  var frame;
  function fit() {
    var bounds = heading.getBoundingClientRect();
    var available = bounds.width;
    if (portrait && portrait.getClientRects().length) {
      var image = portrait.getBoundingClientRect();
      available = Math.min(available, image.left - bounds.left - 24);
    }
    if (available <= 0) return;
    heading.classList.add("intro-fitted");
    lines.forEach(function (line) {
      // Measure the rendered font, including capitalization, then use the
      // largest size that fits (up to the original design's 80px heading).
      line.style.fontSize = "80px";
      var measured = line.getBoundingClientRect().width;
      var size = Math.min(80, 80 * (available - 2) / measured);
      line.style.fontSize = (Math.floor(size * 10) / 10) + "px";
    });
  }
  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fit);
  }
  fit();
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  if (document.fonts) document.fonts.ready.then(schedule);
  if (typeof ResizeObserver !== "undefined") {
    var observer = new ResizeObserver(schedule);
    observer.observe(heading.parentElement);
    if (portrait) observer.observe(portrait);
  }
}());
