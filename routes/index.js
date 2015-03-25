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

module.exports = router;