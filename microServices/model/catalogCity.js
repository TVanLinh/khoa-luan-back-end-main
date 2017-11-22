var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
   Type: Number,
   SolrID:String,
   ID: Number,
   Title:String,
   STT:Number,
   Created:Date,
   Updated:Date,
   TotalDoanhNghiep:Number
});

module.exports = mongoose.model('CatalogCityShema', citySchema);