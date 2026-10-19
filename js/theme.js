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
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem('phyo-color-theme', theme); } catch (e) {}
      update();
    });
  });
  update();
})();
