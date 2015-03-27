(function () {

    $(document).ready(function () {
        $('[rel="lightbox"]').lightbox();
        var slider = new Slider(4000);
        slider.start();
        loadSound();
        $('.birthday-container').on('click', function () {
            pauseSound();
        });

        $('.close').on('click', function () {
            hideBirthDay();
        });
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

var soundID = 'Birthday';

function loadSound() {
    createjs.Sound.registerSound("/birthday-song.mp3", soundID);
    $('.birthday-image').hide();
    setTimeout(function () {
        createjs.Sound.play(soundID);
        setTimeout(function () {
            $('.birthday-image').first().show(1000);
            setTimeout(function () {
                $('.birthday-image').hide();
                $('.birthday-image').last().show(1000);
                setTimeout(function () {
                    $('.birthday-image').hide(1000);
                }, 3000);
            }, 3000)
        }, 2000);
    }, 2000);
}

function pauseSound() {
    createjs.Sound.stop(soundID);
}

function hideBirthDay() {
    pauseSound();
    $('.birthday-container').remove();
}