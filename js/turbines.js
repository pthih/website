// One shared clock keeps visible blades and all occlusion masks aligned.
(function () {
  var rotors = document.querySelectorAll('.turbine-rotor');
  if (!rotors.length) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var frame = null;
  var elapsed = 0;
  var previous = null;
  function paint() {
    rotors.forEach(function (rotor) {
      var small = rotor.classList.contains('turbine-rotor-comparison');
      var angle = ((elapsed + (small ? 4000 : 0)) / (small ? 13000 : 10000) * 360) % 360;
      rotor.setAttribute('transform', 'rotate(' + angle + ' 0 0)');
    });
  }
  function tick(now) {
    if (previous !== null) elapsed += now - previous;
    previous = now;
    paint();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previous = null;
    if (!motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
  }
  if (motion.addEventListener) motion.addEventListener('change', sync);
  else motion.addListener(sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pageshow', sync);
  paint();
  sync();
})();
