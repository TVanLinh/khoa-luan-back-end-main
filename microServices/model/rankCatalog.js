var mongoose = require('mongoose');

var rankCatalogShema = new mongoose.Schema({
    name: String,
    group: {
        name: String,
        listRank: [String],
        level: [
            {
                name: String,
                salary: Number
            }]
    }
});

module.exports = mongoose.model('RankCatalog', rankCatalogShema);
