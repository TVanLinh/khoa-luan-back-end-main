var mongoose = require('mongoose');

var leaveDepartShema = new mongoose.Schema({
    numberDecide: String,
    dateDecide: Date,
    contentDecide: String,
    unitTransfer: String,
    dateTransfer: String,
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('LeaveDepart', leaveDepartShema);