var mongoose = require('mongoose');

var leaveDepartShema = new mongoose.Schema({
    numberDecide: String,
    dateDecide: Date,
    contentDecide: {type: String, trim: true},
    unitTransfer: {
        level1: String,
        level2: String
    },
    dateTransfer: Date,
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    createdOn: {type: Date, 'default': Date.now}
});

module.exports = mongoose.model('LeaveDepart', leaveDepartShema);