(function () {

  $(document).ready(function () {

    $(".slider").owlCarousel({
      autoPlay: 3000,
      singleItem: true,
      pagination: false,
      autoHeight: true
    });

    setTimeout(function () {
      $('.gallery').masonry({
        itemSelector: '.gallery-item',
        columnWidth: 50
      });
    }, 5000);

    if ($('[rel="lightbox"]').length) {
      $('[rel="lightbox"]').lightbox();
    }

  });
})();

function startCarousel(selector){
  $(selector).owlCarousel({
    autoPlay: 3000,
    singleItem: true,
    pagination: false,
    autoHeight: true
  });
}