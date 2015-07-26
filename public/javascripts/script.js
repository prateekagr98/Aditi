(function () {

    $(document).ready(function () {
        setTimeout(function () {
            $('.gallery').masonry({
                // options
                itemSelector: '.gallery-item',
                columnWidth: 50
            });
        }, 2000);

        if ($('[rel="lightbox"]').length) {
            $('[rel="lightbox"]').lightbox();
        }
    });
})();