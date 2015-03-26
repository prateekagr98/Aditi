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

router.get('/portraits', function (req, res, next) {

    glob("public/images/portraits/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('portraits', {
            page: 'portraits',
            imageSet: paths
        });
    });
});

router.get('/customGifts', function (req, res, next) {

    glob("public/images/custom-gifts/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('custom-gifts', {
            page: 'custom-gifts',
            imageSet: paths
        });
    });
});

router.get('/media', function (req, res, next) {

    glob("public/images/media/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('media', {
            page: 'media',
            imageSet: paths
        });
    });
});

router.get('/about', function (req, res, next) {
    res.render('about', {
        page: 'about'
    });
});

router.get('/contact', function (req, res, next) {
    res.render('contact', {
        page: 'contact'
    });
});

module.exports = router;