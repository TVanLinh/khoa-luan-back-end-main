var mongoose = require('mongoose');

var catalogAcademicShema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('CatalogAcademic', catalogAcademicShema);
