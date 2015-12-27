var express = require('express'),
  router = express.Router(),
  _ = require('underscore'),
  async = require('async'),
  CategoriesModel = require('../models/CategoriesModel'),
  ImageModel = require('../models/ImageModel');

/* GET home page. */
router.get('/categories', function (req, res) {

  CategoriesModel.find({},function (err, categories) {
    if (err){
      return console.error(err);
    }

    res.status(201).json({
      'categories': categories
    });

  })
});

router.post('/categories', function (req, res) {

  CategoriesModel.create(req.body, function (err, category) {
    res.status(201).json(category);
  })

});

router.get('/images', function (req, res) {

  ImageModel.find({},function (err, images) {
    if (err){
      return console.error(err);
    }

    res.status(201).json({
      'images': images
    });

  })
});

router.post('/images', function (req, res) {

  ImageModel.create(req.body, function (err, image) {
    res.status(201).json(image);
  })

});


module.exports = router;