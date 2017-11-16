var mongoose = require('mongoose');

var nationShema = new mongoose.Schema({
    code: String,
    name: String
});

module.exports = mongoose.model('Nation', nationShema);
