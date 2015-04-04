var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
});

var ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;