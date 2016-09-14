(function () {

  $(document).ready(function () {

    if($(".slider").length){
      $(".slider").owlCarousel({
        autoPlay: 3000,
        singleItem: true,
        pagination: false,
        autoHeight: true
      });
    }

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
