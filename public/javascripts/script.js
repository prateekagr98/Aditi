(function () {

    $(document).ready(function () {
        $('.gallery').masonry({
            // options
            itemSelector: '.gallery-item',
            columnWidth: 50
        });

        if ($('[rel="lightbox"]').length) {
            $('[rel="lightbox"]').lightbox();
        }
    });
})();