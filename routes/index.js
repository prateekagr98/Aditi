var express = require('express'),
  router = express.Router(),
  _ = require('underscore'),
  glob = require('glob'),
  async = require('async'),
  ContactModel = require('../models/ContactModel'),
  CategoriesModel = require('../models/CategoriesModel'),
  ImageModel = require('../models/ImageModel');

/* GET home page. */
router.get('/', function (req, res) {

  var returnObj = [];

  CategoriesModel.find({}, function (err, categories) {
    if (err) {
      console.error(err);
    }

    async.each(categories, function (category, next) {
      var obj = {
        'name': category.name,
        'slug': category.slug
      };

      ImageModel.findOne({
        'category_id': category._id
      }, function (err, image) {
        if (err) {
          console.error(err);
        }

        if (image) {
          obj.image = image.url;
          returnObj.push(obj);
        }

        next();

      })
    }, function (err) {
      res.render('index', {
        categorySet: returnObj
      });
    })

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

router.get('/:category', function (req, res, next) {
  CategoriesModel.findOne({
    'slug': req.params.category
  }, function (err, category) {
    if (err) {
      return console.error(err);
    }

    if (category) {
      var returnObj = {
        'category': category
      };

      ImageModel.find({
        'category_id': category._id
      }, function (err, images) {
        returnObj.imageSet = images;
        console.log(returnObj);
        res.render('category', {
          data: returnObj
        });
      })

    } else {
      res.redirect('/');
      return;
    }
  })
})

module.exports = router;