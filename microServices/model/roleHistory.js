var mongoose = require('mongoose');

var RoleHistorySchema = new mongoose.Schema({
    roleId: {type: mongoose.SchemaTypes.ObjectId,ref:'Role'},
    type:String,
    reason: String,    
    username: String,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('RoleHistory', RoleHistorySchema);