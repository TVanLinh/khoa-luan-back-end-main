var mongoose = require('mongoose');

var nationalShema = new mongoose.Schema({
    code: String,
    name: String,
    nativeName: String
});

module.exports = mongoose.model('National', nationalShema);
