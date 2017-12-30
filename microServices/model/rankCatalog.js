var mongoose = require('mongoose');

var rankCatalogShema = new mongoose.Schema({
    // name: String,
    // group: {
    //     name: String,
    //     listRank: [String],
    //     level: [
    //         {
    //             name: String,
    //             salary: Number
    //         }]
    // },
    name: {type: String, trim: true},
    group: [
        {
            name: {type: String, trim: true},
            listRank: [{type: String, trim: true}],
            level: [{
                name: Number,
                salary: Number
            }]
        }
    ]
});

module.exports = mongoose.model('RankCatalog', rankCatalogShema);
