// Theme preference and toggle.
(function () {
  var buttons = document.querySelectorAll('.theme-toggle');
  function update() {
    var light = document.documentElement.dataset.theme === 'light';
    buttons.forEach(function (button) {
      var action = 'Switch to ' + (light ? 'Dark' : 'Light');
      button.setAttribute('aria-pressed', String(light));
      button.setAttribute('aria-label', action + ' mode');
      button.title = action + ' mode';
      var label = button.querySelector('.theme-toggle-label');
      if (label) label.textContent = action;
      button.querySelector('svg').innerHTML = light
        ? '<path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/>'
        : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';
    });
  }
  var journeys = [];
  var journeyId = 0;
  var arcOption = 2;
  var skyAnimations = [];
  var skyGeneration = 0;
  function moveSky(theme) {
    var generation = ++skyGeneration;
    skyAnimations.forEach(function (a) { a.cancel(); });
    skyAnimations = [];
    var scene = document.querySelector('.footer-scene-art');
    scene.classList.remove('sky-transition');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !scene.animate) return;
    scene.classList.add('sky-transition');
    var night = theme === 'dark';
    document.querySelectorAll('.sky-cloud').forEach(function (cloud, i) {
      var dx = i === 0 ? -65 : (i === 1 ? -40 : 65);
      var rest = {transform:'translate(0px,0px)',opacity:1};
      var away = {transform:'translate('+dx+'px,-8px)',opacity:0};
      skyAnimations.push(cloud.animate(night ? [rest,away] : [away,rest], {
        duration:1100, delay:night ? i*80 : 450+i*100, easing:'ease-in-out', fill:'both'
      }));
    });
    document.querySelectorAll('.sky-stars circle, .sky-stars path').forEach(function (star, i) {
      // A repeatable shuffled order avoids a mechanical left-to-right reveal.
      var stagger = ((i*7)%23)*27;
      skyAnimations.push(star.animate(night ? [{opacity:0},{opacity:1}] : [{opacity:1},{opacity:0}], {
        duration:650, delay:(night ? 550 : 0)+stagger, easing:'ease-in-out',fill:'both'
      }));
    });
    Promise.all(skyAnimations.map(function (a) { return a.finished; })).then(function () {
      if (generation !== skyGeneration) return;
      scene.classList.remove('sky-transition');
      skyAnimations.forEach(function (a) { a.cancel(); });
      skyAnimations = [];
    }).catch(function () {});
  }
  function travel(theme) {
    var id = ++journeyId;
    journeys.forEach(function (a) { a.cancel(); });
    document.querySelectorAll('.celestial-orbit').forEach(function (g) { g.classList.remove('is-travelling'); });
    var outgoing = document.querySelector(theme === 'dark' ? '.celestial-sun' : '.celestial-moon');
    var incoming = document.querySelector(theme === 'dark' ? '.celestial-moon' : '.celestial-sun');
    if (!outgoing || !incoming) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !outgoing.animate) {
      incoming.removeAttribute('transform'); incoming.parentNode.removeAttribute('mask');
      incoming.dataset.restX = incoming.dataset.restY = '0';
      return;
    }
    var option = arcOption;
    var endX = 0;
    var endY = 0;
    var startX = Number(outgoing.dataset.restX || 0), startY = Number(outgoing.dataset.restY || 0);
    function arc(start, end, entering) {
      var frames = [];
      for (var i = 0; i <= 24; i++) {
        var t = i / 24, angle = start + (end - start) * t;
        var x = 200 * Math.cos(angle), y = 200 + 200 * Math.sin(angle);
        if (!entering) { x += startX; y += startY; }
        frames.push({ transform: 'translate(' + x + 'px,' + y + 'px)', opacity: entering ? Math.min(1, t * 3) : Math.min(1, (1-t) * 3) });
      }
      return frames;
    }
    // Two halves of a continuous quadratic curve, meeting at the resting spot.
    // Entry: (260,-110) -> (0,0). Exit: (0,0) -> (-59,247).
    function skyCurve(entering) {
      var frames = [];
      var ax = entering ? 260 : startX;
      var ay = entering ? -110 : startY;
      var bx = entering ? 70.5 : -70.5;
      var by = entering ? -89.25 : 89.25;
      var cx = entering ? 0 : -59;
      var cy = entering ? 0 : 247;
      for (var i = 0; i <= 32; i++) {
        var t = i/32, u = 1-t;
        var x = u*u*ax + 2*u*t*bx + t*t*cx;
        var y = u*u*ay + 2*u*t*by + t*t*cy;
        frames.push({transform: 'translate('+x+'px,'+y+'px)', opacity: entering ? Math.min(1,t*4) : Math.min(1,(1-t)*3)});
      }
      return frames;
    }
    outgoing.classList.add('is-travelling');
    incoming.classList.add('is-travelling');
    incoming.parentNode.setAttribute('mask', 'url(#celestial-house-occlusion)');
    if (option === 2) outgoing.parentNode.setAttribute('mask', 'url(#celestial-house-occlusion)');
    else outgoing.parentNode.removeAttribute('mask');
    var down = outgoing.animate(option === 1 ? arc(-Math.PI/2, 0, false) : skyCurve(false), {duration: 1000, easing: 'ease-in-out', fill: 'both'});
    var up = incoming.animate(option === 1 ? arc(-Math.PI, -Math.PI/2, true) : skyCurve(true), {duration: 1200, delay: 650, easing: 'ease-in-out', fill: 'both'});
    journeys = [down, up];
    Promise.all([down.finished, up.finished]).then(function () {
      if (id !== journeyId) return;
      incoming.setAttribute('transform','translate('+endX+' '+endY+')');
      incoming.dataset.restX = String(endX); incoming.dataset.restY = String(endY);
      if (option === 1) incoming.parentNode.removeAttribute('mask');
      outgoing.classList.remove('is-travelling');
      incoming.classList.remove('is-travelling');
      journeys.forEach(function (a) { a.cancel(); });
      journeys = [];
    }).catch(function () {});
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      travel(theme);
      moveSky(theme);
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem('phyo-color-theme', theme); } catch (e) {}
      update();
    });
  });
  update();
})();
