var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name: String,
  slug: String
});

var CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;