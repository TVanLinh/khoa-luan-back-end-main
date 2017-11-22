var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    	title: String,
    	code: Number,
    	districts: [code: Number, title: String],
    	guilde: [code: Number, title: String,districtID: Number]
});

module.exports = mongoose.model('Backend', addressSchema);