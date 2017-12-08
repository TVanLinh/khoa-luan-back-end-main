var mongoose = require('mongoose');

var catalogFacultyShema = new mongoose.Schema({
    name: String,
    level: Number,
    type: String,
    url: String,
    code: String,
    parent: {
        id: String,
        name: String,
        level: Number
    }
});

module.exports = mongoose.model('CatalogFaculty', catalogFacultyShema);





