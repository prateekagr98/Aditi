var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
  url: String,
  category_id: String
});

var ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;