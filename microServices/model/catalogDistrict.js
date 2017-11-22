
var mongoose = require('mongoose');

var districtShema = new mongoose.Schema({
   Type: Number,
   SolrID:String,
   ID: Number,
   Title:String,
   STT:Number,
   Created:Date,
   Updated:Date,
   TinhThanhID : Number,
   TinhThanhTitle : String,
  TinhThanhTitleAscii: String
});

module.exports = mongoose.model('CatalogDistrictShema', districtShema);


