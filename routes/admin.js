var express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  _ = require('underscore'),
  del = require('delete'),
  fs = require('fs'),
  AdminModel = require('../models/ContactModel'),
  CategoriesModel = require('../models/CategoriesModel'),
  ImageModel = require('../models/ImageModel');

function isAuthenticated(req, res, next) {

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user && req.user._id)
    return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/admin/login');
}

//Admin Login
router.get('/login', function (req, res, next) {
  if (req.user && req.user._id) {
    res.redirect('/admin');
    return;
  }
  res.render('admin-login');
});

router.get('/', isAuthenticated, function (req, res, next) {

  CategoriesModel.find({}, function (err, categories) {
    if (err) {
      console.error(err);
      return;
    }

    ImageModel.find({}, function (err, images) {
      if (err) {
        console.error(err);
        return;
      }

      res.render('admin-index', {
        categories: categories,
        imageSet: images
      });

    })
  })
});

router.get('/category', isAuthenticated, function (req, res, next) {

  CategoriesModel.find({}, function (err, categories) {
    if (err) {
      console.error('Error Occured');
      return;
    }
    console.log(categories);
    res.render('admin-category', {
      'categories': categories
    });
  });
});

router.post('/addCategory', function (req, res) {
  CategoriesModel.create(req.body, function () {
    res.send(JSON.stringify({}));
  })
})

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

module.exports = router;