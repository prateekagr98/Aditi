var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    glob = require('glob');

/* GET home page. */
router.get('/', function (req, res, next) {

    glob("public/images/homepage-slider/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('index', {
            sliderSet: paths
        });
    });
});

router.get('/oilPaintings', function (req, res, next) {

    glob("public/images/oil-paintings/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('oil-paintings', {
            page: 'oil-paintings',
            imageSet: paths
        });
    });
});

router.get('/marbleArt', function (req, res, next) {

    glob("public/images/marble-art/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('marble-art', {
            page: 'marble-art',
            imageSet: paths
        });
    });
});

module.exports = router;