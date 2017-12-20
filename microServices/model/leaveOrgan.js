var mongoose = require('mongoose');

var leaveOrganShema = new mongoose.Schema({
    numberDecide: {type: String, trim: true},
    dateDecide: Date,
    contentDecide: {type: String,trim: true},
    dateTransfer: Date,
    unitTransfer: String,
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    createdOn: {type: Date, 'default': Date.now}
});

module.exports = mongoose.model('LeaveOrgan', leaveOrganShema);