var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name: String,
    email: String,
    number: String,
    message: String,
    created_at: String
});

var ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;