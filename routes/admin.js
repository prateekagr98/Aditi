var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    _ = require('underscore'),
    glob = require('glob'),
    del = require('delete'),
    AdminModel = require('../models/ContactModel');

function isAuthenticated(req, res, next) {

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user && req.user._id)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/admin/login');
}

// config the uploader 
var options = {
    tmpDir: __dirname + '/../public/images/temp',
    uploadDir: __dirname + '/../public/images/uploaded',
    storage: {
        type: 'local'
    }
};

//Admin Login
router.get('/login', function (req, res, next) {
    if (req.user && req.user._id) {
        res.redirect('/admin');
        return;
    }
    res.render('admin-login');
});

router.get('/', isAuthenticated, function (req, res, next) {
    res.render('admin-index');
});

// Admin Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/admin/login');
});

// Authenticate Admin
router.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: false
}));

router.get('/oilPaintings', isAuthenticated, function (req, res, next) {

    glob("public/images/oil-paintings/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });

        res.render('admin-oilPaintings', {
            page: 'oil-paintings',
            imageSet: paths
        });
    });
});

router.get('/portraits', isAuthenticated, function (req, res, next) {
    glob("public/images/portraits/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('admin-portraits', {
            page: 'portraits',
            imageSet: paths
        });
    });
});

router.get('/customGifts', isAuthenticated, function (req, res, next) {
    glob("public/images/custom-gifts/*", null, function (er, imagePaths) {
        var paths = _.map(imagePaths, function (item) {
            return item.replace('public', '');
        });
        res.render('admin-customGifts', {
            page: 'custom-gifts',
            imageSet: paths
        });
    });
});

router.post('/deleteImages', function (req, res, next) {
    var paths = _.map(req.body.images, function (item) {
        return 'public' + item;
    });

    _.each(paths, function (item) {
        del.sync(item);
    });
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({}));
});

router.post('/upload/oilPaintings', function (req, res) {
    options.uploadDir = __dirname + '/../public/images/oil-paintings'
    // init the uploader 
    var uploader = require('blueimp-file-upload-expressjs')(options);
    uploader.post(req, res, function (obj) {
        res.redirect('/admin/oilPaintings');
    });

});

router.post('/upload/portraits', function (req, res) {
    options.uploadDir = __dirname + '/../public/images/portraits'
    // init the uploader 
    var uploader = require('blueimp-file-upload-expressjs')(options);
    uploader.post(req, res, function (obj) {
        res.redirect('/admin/portraits');
    });

});

router.post('/upload/customGifts', function (req, res) {
    options.uploadDir = __dirname + '/../public/images/custom-gifts'
    // init the uploader 
    var uploader = require('blueimp-file-upload-expressjs')(options);
    uploader.post(req, res, function (obj) {
        res.redirect('/admin/customGifts');
    });

});

module.exports = router;