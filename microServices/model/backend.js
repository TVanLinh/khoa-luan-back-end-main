var mongoose = require('mongoose');

var BackendSchema = new mongoose.Schema({
    title: String,
    controller: {type: String, lowercase: true, trim: true},
    method: {type: String, lowercase: true, trim: true},
    httpVerb: {type: String, lowercase: true, trim: true},
    description: String,
    activated: Boolean,
    author: String,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Backend', BackendSchema);