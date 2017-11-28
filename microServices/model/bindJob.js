var mongoose = require('mongoose');

var bindJobShema = new mongoose.Schema({
    numberDecide: String,
    dateDecide: Date,
    contentDecide: String,
    user:{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('BindJob', bindJobShema);