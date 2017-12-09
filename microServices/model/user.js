var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    hashedPass: String,
    salt: String,
    fullname: String,
    avatarUrl: String,
    organ: {
        level1: {type: mongoose.SchemaTypes.ObjectId, ref: 'CatalogFaculty'},
        level2: {type: mongoose.SchemaTypes.ObjectId, ref: 'CatalogFaculty'}
    },
    email: String,
    birthDay: Date,
    sex: Number,
    roles: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Role'}],
    activated: {type: Boolean, 'default': true},
    createdOn: {type: Date, 'default': Date.now},
    index: {type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);