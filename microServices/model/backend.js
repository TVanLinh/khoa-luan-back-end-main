var mongoose = require('mongoose');

var BackendSchema = new mongoose.Schema({
    title: {type: String, trim: true},
    controller: {type: String, lowercase: true, trim: true},
    method: {type: String, uppercase: true, trim: true},
    httpVerb: {type: String, trim: true},
    description: {type: String,trim: true},
    activated: Boolean,
    author: String,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Backend', BackendSchema);