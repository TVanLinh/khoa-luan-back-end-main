var mongoose = require('mongoose');

var leaveJobShema = new mongoose.Schema({
    numberDecide: String,
    dateDecide: Date,
    contentDecide: {type: String, trim: true},
    organ: String,
    dateLeave: Date,
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    createdOn:{type: Date, 'default': Date.now }
});

module.exports = mongoose.model('LeaveJob', leaveJobShema);