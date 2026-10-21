/* Homepage controls retained from the template. */
(function ($) {
  'use strict';
  $(function () {
    var menu = $('ul#navigation');
    if (menu.length) menu.slicknav({ prependTo: '.mobile_menu', closedSymbol: '+', openedSymbol: '-' });
    $.scrollUp({
      scrollName: 'scrollUp',
      scrollSpeed: 300,
      animation: 'fade',
      animationSpeed: 200,
      scrollTitle: 'Back to top',
      scrollText: '<i class="fa fa-angle-double-up" aria-hidden="true"></i><span class="sr-only">Back to top</span>',
      activeOverlay: false
    });
  });
})(jQuery);
