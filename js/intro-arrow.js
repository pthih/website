(function () {
  "use strict";
  var cue = document.querySelector(".intro-down-link");
  if (!cue) return;
  var loader = document.getElementById("page-loader");
  function start() { cue.classList.add("cue-ready"); }
  if (!loader || loader.hidden) start();
  else {
    var observer = new MutationObserver(function () {
      if (loader.hidden) { observer.disconnect(); start(); }
    });
    observer.observe(loader, { attributes: true, attributeFilter: ["hidden"] });
  }
}());
