
var mongoose = require('mongoose');

var guildShema = new mongoose.Schema({
   Type: Number,
   SolrID:String,
   ID: Number,
   Title:String,
   STT:Number,
   Created:Date,
   Updated:Date,
   TinhThanhID : Number,
   TinhThanhTitle : String,
  TinhThanhTitleAscii: String,
  QuanHuyenID : Number,
  QuanHuyenTitle : String,
  QuanHuyenTitleAscii : String
});

module.exports = mongoose.model('CatalogGuildShema', guildShema);
