var mongoose = require('mongoose');

var leaveOrganShema = new mongoose.Schema({
    numberDecide: String,
    dateDecide: Date,
    contentDecide: String,
    dateTransfer: String,
    unitTransfer: String,
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('LeaveOrgan', leaveOrganShema);