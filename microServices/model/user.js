var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    hashedPass: String,
    salt: String,
    fullname:String,
    avatarUrl: String,
    roles: [{type:mongoose.SchemaTypes.ObjectId, ref:'Role'}],
    activated: {type: Boolean, 'default': true},
    createdOn: { type: Date, 'default': Date.now }

});

module.exports = mongoose.model('User', UserSchema);