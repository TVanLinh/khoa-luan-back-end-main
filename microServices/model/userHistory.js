var mongoose = require('mongoose');

var UserHistorySchema = new mongoose.Schema({
    userId: {type: mongoose.SchemaTypes.ObjectId,ref:'User'},
    type:String,
    reason: String,    
    username: String,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('UserHistory', UserHistorySchema);

