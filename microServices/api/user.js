const User = require('../model/user');
const Role = require('../model/role');
const UserHistory = require('../model/userHistory');
const crypto = require('crypto');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'linhtran180895@gmail.com',
        pass: 'knbcdsfinhmuqakv'
    }
});


module.exports = {
    get_index: function () {
        // User.remove({username: 'appAdmin'}, function (err) {
        //     console.log("delete user");
        // });
        return User.find().populate({
            path: 'roles',
            match: {activated: true},
            select: 'title description'
        }).populate({
            path: 'organ.level1'
        }).populate({
            path: 'organ.level2'
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


    u_get_find: function (query) {
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

    u_get_findByUserNameOrFullName: function (username) {

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

    u_get_findByOrgan: function (level1, level2) {
        return User.find({username: {$ne: null}}).populate({
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

    u_get_findByUserNameAndOrgan: function (username, level1, level2) {
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

    u_put_index: function (user, reason, username) {
        // const salt = crypto.randomBytes(128).toString('base64');
        // const hashedPassword = crypto.createHmac('sha256', salt).update(user['hashedPass']).digest('hex');
        // user.salt = salt;
        // user.hashedPass = hashedPassword;
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

    u_post_activate: function (userId, reason, activated, username) {
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

    u_post_assignRole: function (user, reason, username) {
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
                console.log("hash level2 ");
                if (data['organ'].level2) {
                    temp = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == data.organ.level1.code && item.organ.level2 && item.organ.level2.code == data.organ.level2.code)[0];
                    let isLesthan1 = true;
                    if (!temp) {
                        user['username'] = user.organ.level2.code + "01";
                        user.index = 1;
                    } else {
                        let index = temp.index + 1;
                        //console.log("exist user " + user.username);
                        if (temp.index >= 9) {
                            user['username'] = user.organ.level2.code + "" + (index);
                        } else {
                            user['username'] = user.organ.level2.code + "0" + (index);
                        }
                        user.index = (index);
                    }


                    return userService.createUser(user);
                    // });


                } else {
                    console.log("not level2");
                    temp = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == data.organ.level1.code)[0];
                    if (!temp) {
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

                    return userService.createUser(user);
                    // });

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
    },
    u_put_changePass: function (data) {
        console.log(JSON.stringify(data));
        if (data && data['username']) {
            return User.findOne({username: data['username']}).then(user => {
                if (user) {
                    var hashedPassword = crypto.createHmac('sha256', user.salt).update(data['password']).digest('hex');

                    if (user.hashedPass == hashedPassword) {
                        const salt = crypto.randomBytes(128).toString('base64');
                        const pass = crypto.createHmac('sha256', salt).update(data['newPass']).digest('hex');
                        user.salt = salt;
                        user.hashedPass = pass;
                        return user.save();
                    } else {
                        console.log("Mật khẩu không đúng");
                        return {
                            msg: "Mật khẩu không đúng"
                        }
                    }
                } else {
                    console.log("Tài khoản không tồn tại");
                    return {
                        msg: "Tài khoản không tồn tại"
                    }
                }

            });
        } else {
            return {
                msg: "Tài khoản không tồn tại"
            }
        }
    },
    get_forgetPass: function (username, email) {
        console.log(username + "  email " + email);
        var mailOptions = {
            from: 'linhtran180895@gmail.com',
            to: '',
            subject: '',
            text: ''
        };
        return User.findOne({username: username, email: email}).then(user => {
            if (user) {
                const random = randomstring.generate(9);
                const salt = crypto.randomBytes(128).toString('base64');
                const pass = crypto.createHmac('sha256', salt).update(random).digest('hex');
                user.salt = salt;
                user.hashedPass = pass;
                user.save();

                mailOptions.to = user.email;
                mailOptions.subject = "Hệ thống quản lý nhân sự gửi mật khẩu";
                mailOptions.text = "Mật khẩu là: " + random;

                transporter.sendMail(mailOptions, function (error, info) {
                    // if (error) {
                    //     return {msg: "Vui lòng thử lại"}
                    // } else {
                    //     return {
                    //         msg: "Vui lòng kiểm tra email để nhận mật khẩu"
                    //     }
                    // }
                });
            } else {
                return {
                    msg: "Vui lòng kiểm tra lại thông tin!"
                }
            }
        });


    }
};


var userService = {
    createUser: function (user) {
        console.log("ok" + JSON.stringify(user));
        return User(user).save(function (err, f) {
            const salt = crypto.randomBytes(128).toString('base64');
            const hashedPassword = crypto.createHmac('sha256', salt).update(user['hashedPass']).digest('hex');
            f.salt = salt;
            f.hashedPass = hashedPassword;
            return f.save();
        }).then(user => {
            return Role.findOne({title: 'MyCV'}).then(role => {
                if (role) {
                    user.roles = [];
                    user.roles.push(role);
                    return user.save();
                }
            });
        });

    }
};