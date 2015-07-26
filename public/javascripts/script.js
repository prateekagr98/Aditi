(function () {

    $(document).ready(function () {
        $('.gallery').masonry({
            // options
            itemSelector: '.gallery-item',
            columnWidth: 200
        });

        if ($('[rel="lightbox"]').length) {
            $('[rel="lightbox"]').lightbox();
        }

        var slider = new Slider(4000);
        slider.start();

    });

    function Slider(timeInterval) {
        this.timeInterval = timeInterval;

        $('.homepage-slider-item').hide();
        $('.homepage-slider-item').first().show();
    };

    Slider.prototype.start = function () {
        this.slide();
    };

    Slider.prototype.slide = function () {
        var self = this,
            $targetEle = $('.homepage-slider-item:visible');

        setTimeout(function () {
            $('.homepage-slider').prepend($('<div>', {
                'class': 'homepage-slider-loader'
            }));
        }, 1000);

        setTimeout(function () {
            $('.homepage-slider-loader').remove();
            if ($targetEle.is(':last-child')) {
                $targetEle.hide();
                $('.homepage-slider-item').first().show();
            } else {
                $targetEle.hide().next().show();
            }
            self.slide();
        }, self.timeInterval);
    }

    Slider.prototype.stop = function () {

    }

})();