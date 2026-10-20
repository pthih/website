// Responsive footer: frame the complete composition on phones.
(function () {
  var svg = document.querySelector('.footer-scene-art');
  if (!svg) return;
  var phone = window.matchMedia('(max-width: 767px)');
  function fit() { svg.setAttribute('viewBox', phone.matches ? '-170 -340 1540 680' : '0 0 1200 340'); }
  if (phone.addEventListener) phone.addEventListener('change', fit);
  else phone.addListener(fit);
  fit();
})();
