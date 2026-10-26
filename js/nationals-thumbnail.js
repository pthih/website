/* Match the lazy-loaded Nationals thumbnail to the site's explicit theme. */
(() => {
  const image = document.getElementById('nationals-theme-thumbnail');
  if (!image) return;
  const root = document.documentElement;
  function syncThumbnail() {
    const light = root.dataset.theme === 'light';
    const source = light ? 'img/gallery/nationals-light.webp' : 'img/gallery/nationals-city-connect.webp';
    if (image.getAttribute('src') !== source) image.setAttribute('src', source);
    image.setAttribute('width', light ? '853' : '946');
    image.setAttribute('height', light ? '1843' : '2048');
    image.alt = light
      ? 'Washington Nationals wallpaper with a red W over a navy Capitol silhouette and stars on light jersey fabric'
      : 'Washington Nationals City Connect wallpaper with WSH lettering and cherry blossoms on a dark jersey texture';
  }
  syncThumbnail();
  new MutationObserver(syncThumbnail).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
})();
