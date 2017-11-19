var mongoose = require('mongoose');

var rankCatalogShema = new mongoose.Schema({
    name: String,
    group: {
        name: String,
        rank: [{
            name: Number,
            level: [{
                name: String,
                salary: Number
            }]
        }]
    }
});

module.exports = mongoose.model('RankCatalog', rankCatalogShema);
