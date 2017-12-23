var mongoose = require('mongoose');

var nationalShema = new mongoose.Schema({
    code: Number,
    name: String
});

module.exports = mongoose.model('National', nationalShema);
