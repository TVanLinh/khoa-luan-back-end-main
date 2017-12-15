const User = require('../model/user');
const UserHistory = require('../model/userHistory');
const crypto = require('crypto');
var mongoose = require('mongoose');
var ObjectId = mongoose.SchemaTypes.ObjectId;
module.exports = {
    get_index: function () {
        // User.remove({username: 'appAdmin'}, function (err) {
        //     console.log("delete user");
        // });
        return User.find().populate({
            path: 'roles',
            match: {activated: true},
            select: 'title description'
        }).lean();
    },
    get_all: function () {
        return User.find().populate({
            path: 'roles'
        });
    },

    get_role: function (username) {
        return User.findOne().populate({
            path: 'roles'
        }).select('-_id roles');
    },

    u_get_staffcode: function (staffCode) {
        return User.findOne({username: staffCode}).populate({
            path: "organ.level1"
        }).populate({
            path: "organ.level2"
        }).populate({
            path: 'roles',
            select: 'title description'
        });
        // return "Ok";
    },


    get_find: function (query) {
        let rex = new RegExp('' + query.trim() + "", 'i');
        return User.find({$or: [{username: rex}, {fullname: rex}]}).populate({
            path: "organ.level1"
        }).populate({
            path: "organ.level2"
        }).populate({
            path: 'roles',
            select: 'title description'
        });
        // return "Ok";
    },

    get_findByUserNameOrFullName: function (username) {

        if (!username) {
            return;
        }
        let rex = new RegExp('' + username.trim() + "", 'i');
        return User.find({$or: [{username: rex}, {fullname: rex}]}).populate({
            path: "organ.level1"
        }).populate({
            path: "organ.level2"
        }).populate({
            path: 'roles',
            select: 'title description'
        });
    },

    get_findByOrgan: function (level1, level2) {
        return User.find().populate({
            path: "organ.level1"
        }).populate({
            path: "organ.level2"
        }).populate({
            path: 'roles',
            select: 'title description'
        }).then(arr => {
            if (Array.isArray(arr)) {
                if (level1 && level2) {
                    return arr.filter(item => item.organ && item.organ.level1 && item.organ.level1._id == level1 && item.organ.level2 && item.organ.level2._id == level2);

                } else if (level1) {
                    return arr.filter(item => item.organ && item.organ.level1 && item.organ.level1._id == level1);
                }
            }
            return [];
        });
    },

    get_findByUserNameAndOrgan: function (username, level1, level2) {
        let rex = new RegExp('' + username.trim() + "", 'i');
        return User.find(
            {
                $or: [{username: rex}, {fullname: rex}]
            }).populate({
            path: "organ.level1"
        }).populate({
            path: "organ.level2"
        }).populate({
            path: 'roles',
            select: 'title description'
        }).then((arr) => {
            if (Array.isArray(arr)) {
                if (level1 && level2) {
                  console.log("ok level2");
                    return arr.filter(item => item.organ && item.organ.level1 && item.organ.level1._id == level1 && item.organ.level2 && item.organ.level2._id == level2);

                } else if (level1) {
                    return arr.filter(item => item.organ && item.organ.level1 && item.organ.level1._id == level1);
                }
            }
            return [];
        });

    },

    u_get_faculty: function (id) {
        // console.log(id);
        let arry = [];
        return User.find().populate({
            path: 'organ.level1'
        }).then(result => {
            if (Array.isArray(result)) {
                for (let item of result) {
                    console.log(item);
                    if (item.organ != null && item.organ.level1 && item.organ.level1._id == id) {
                        arry.push(item);
                    }
                }
            }
            return arry;
        });
    }
    ,

    put_index: function (user, reason, username) {
        const salt = crypto.randomBytes(128).toString('base64');
        const hashedPassword = crypto.createHmac('sha256', salt).update(user['hashedPass']).digest('hex');
        user.salt = salt;
        user.hashedPass = hashedPassword;

        return User.findByIdAndUpdate(user._id, user).then(u => {
            return UserHistory({
                roleId: u._id,
                type: 'Update',
                reason: reason,
                username: username
            }).save();
        }).then(log => {
            return user;
        });
    }
    ,

    post_activate: function (userId, reason, activated, username) {
        return User.findById(userId).then(
            user => {
                user.activated = activated;
                return user.save();
            }
        ).then(r => {
            return UserHistory({
                userId: r._id,
                type: activated ? 'activate' : 'disable',
                reason: reason,
                username: username
            }).save();
        });
    },

    post_assignRole: function (user, reason, username) {
        console.log("assignRole request ");
        return User.findByIdAndUpdate(user._id, user)
            .then(data => {
                console.log(data);
                return UserHistory({
                    userId: user._id,
                    type: 'Update Roles',
                    reason: reason,
                    username: username
                }).save();
            })
            .then(log => {
                console.log("log " + log.userId);
                return log.userId;
            });
    }
    ,
    post_index: function (data) {
        let user = data;
        let temp = null;
        let array = [];
        return User.find({}).populate({
            path: 'organ.level1'
        }).populate({
            path: 'organ.level2'
        }).sort({index: -1}).then(result => {
            array = result;

            if (Array.isArray(array)) {
                if (data['organ'].level2) {
                    temp = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == data.organ.level1.code && item.organ.level2 && item.organ.level2.code == data.organ.level2.code)[0];
                    if (!temp || !temp.username) {
                        user['username'] = user.organ.level2.code + "01";
                        user.index = 1;
                    } else {
                        if (temp.index >= 9) {
                            user['username'] = user.organ.level2.code + "" + (temp.index + 1);
                        } else {
                            user['username'] = user.organ.level2.code + "0" + (temp.index + 1);
                        }
                        user.index = (temp.index + 1);
                    }
                    console.log("hast level2 " + JSON.stringify(data));
                    return User(user).save(function (err, f) {
                        const salt = crypto.randomBytes(128).toString('base64');
                        const hashedPassword = crypto.createHmac('sha256', salt).update(user['hashedPass']).digest('hex');
                        f.salt = salt;
                        f.hashedPass = hashedPassword;
                        return f.save();
                    });

                } else {
                    console.log("not level2");
                    temp = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == data.organ.level1.code)[0];
                    if (!temp || !temp.username) {
                        user['username'] = user.organ.level1.code + "01";
                        user.index = 1;
                    } else {
                        if (temp.index >= 9) {
                            user['username'] = user.organ.level1.code + "" + (temp.index + 1);
                        } else {
                            user['username'] = user.organ.level1.code + "0" + (temp.index + 1);
                        }
                        user.index = (temp.index + 1);
                    }
                    return User(user).save(function (err, f) {
                        const salt = crypto.randomBytes(128).toString('base64');
                        const hashedPassword = crypto.createHmac('sha256', salt).update(user['hashedPass']).digest('hex');
                        f.salt = salt;
                        f.hashedPass = hashedPassword;
                        return f.save();
                    });
                }
            }
        });

        return temp;
    },
    get_hashfrontend: function (username, url) {
        return User.findOne({username: username}).populate({
            path: 'roles',
            populate: {
                path: 'frontends',
                match: {url: url, activated: true}
            }
        }).then(user => {
            if (user && user.username) {
                for (let item of user.roles) {
                    for (let fr of item.frontends) {
                        if (fr.url == url && fr.activated == true) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }


};
