var mongoose = require('mongoose');

var nationShema = new mongoose.Schema({
    code: Number,
    name: String
});

module.exports = mongoose.model('Nation', nationShema);
