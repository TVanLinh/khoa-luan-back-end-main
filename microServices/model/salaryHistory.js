var mongoose = require('mongoose');

var salaryHistoryShema = new mongoose.Schema({
    numberDecide: String,
    dateDecide: Date,
    contentDecide: String,
    group: String,
    speice: String,
    rank: String,
    level: Number,
    factor: Number,
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    createdOn:{type: Date, 'default': Date.now }
});

module.exports = mongoose.model('SalaryHistory', salaryHistoryShema);