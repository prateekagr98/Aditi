var express = require('express'),
  router = express.Router(),
  _ = require('underscore'),
  async = require('async');

/* GET home page. */
router.get('/', function (req, res) {
  res.send(201).json({});
});

module.exports = router;