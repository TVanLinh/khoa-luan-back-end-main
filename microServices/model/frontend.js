var mongoose = require('mongoose');

var FrontendSchema = new mongoose.Schema({
    title: {type: String, trim: true},
    url:{type: String, trim: true},
    description: {type: String, trim: true},
    activated: Boolean,
    author: String,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Frontend', FrontendSchema);

