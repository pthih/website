// Render the selected vector as an image to keep SVG IDs isolated from the page.
(function () {
  var dialog = document.getElementById('logo-viewer');
  var image = dialog.querySelector('img');
  var title = document.getElementById('logo-viewer-title');
  var sourceUrl;
  function release() {
    image.removeAttribute('src');
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    sourceUrl = null;
  }
  document.querySelectorAll('[data-logo-viewer]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var original = link.classList.contains('show-original');
      var svg = link.querySelector(original ? '.burma-original svg' : 'svg');
      if (!svg) return;
      var copy = svg.cloneNode(true);
      copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      copy.style.color = getComputedStyle(svg).color;
      copy.style.width = '100%';
      copy.style.height = '100%';
      release();
      sourceUrl = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)], {type: 'image/svg+xml'}));
      title.textContent = link.dataset.logoViewer + (link.classList.contains('burma-logo-stage') ? (original ? ' — Original logo' : ' — Revised logo') : '');
      image.alt = title.textContent;
      image.src = sourceUrl;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', release);
})();
