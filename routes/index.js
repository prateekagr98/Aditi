var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    glob = require('glob'),
    ContactModel = require('../models/ContactModel');

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

router.get('/valentine', function (req, res, next) {

    glob("public/images/valentine/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('valentine', {
            page: 'valentine',
            imageSet: paths
        });
    });
});

router.get('/marble', function (req, res, next) {

    glob("public/images/marble/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('marble', {
            page: 'marble',
            imageSet: paths
        });
    });
});

router.get('/bridal', function (req, res, next) {

    glob("public/images/bridal/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('bridal', {
            page: 'bridal',
            imageSet: paths
        });
    });
});

router.get('/cakes', function (req, res, next) {

    glob("public/images/cakes/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('cakes', {
            page: 'cakes',
            imageSet: paths
        });
    });
});

router.get('/sketches', function (req, res, next) {

    glob("public/images/sketches/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('sketches', {
            page: 'sketches',
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

router.get('/rakhi', function (req, res, next) {

    glob("public/images/rakhi/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('rakhi', {
            page: 'rakhi',
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
    var success, message;

    if (req.query && req.query.success) {
        success = req.query.success
    }

    if (success === 'true') {
        message = 'Your query has been successfully sent to Aditi Mittal.'
    } else {
        if (success === 'false') {
            message = 'Oops! Your request was not saved. Please try again after some time';
        }
    }

    res.render('contact', {
        page: 'contact',
        message: message,
        success: success
    });
});

router.post('/sendEmail', function (req, res, next) {

    var newForm = new ContactModel({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        message: req.body.message,
        created_at: (new Date()).toString()
    });

    newForm.save(function (err, newForm) {
        if (err) {
            res.redirect('/contact?success=false');
            return;
        }

        res.redirect('/contact?success=true');
    });
});

router.get('/viewContacts', function (req, res, next) {
    ContactModel.find({}, function (err, mails) {
        if (err) {
            console.log(error);
            return;
        }

        res.render('viewContacts', {
            mails: mails.reverse()
        });
    });
});

module.exports = router;