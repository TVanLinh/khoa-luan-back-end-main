const LeaveDepart = require('../model/leaveDepart');
const User = require('../model/user');
const Info = require('../model/info');
module.exports = {
    post_index: function (data) {
        let temp = {};
        temp['numberDecide'] = data['numberDecide'];
        temp['dateDecide'] = data['dateDecide'];
        temp['contentDecide'] = data['contentDecide'];
        temp['unitTransfer'] = {};
        if (data['unitTransfer']['level1']) {
            temp['unitTransfer']['level1'] = data['unitTransfer'].level1.name;
        }

        if (data['unitTransfer']['level2']) {
            temp['unitTransfer']['level2'] = data['unitTransfer'].level2.name;
        }

        temp['dateTransfer'] = data['dateTransfer'];
        temp['user'] = data['user'];


        return LeaveDepart(temp).save().then(() => {
            let array = [];

            return User.find({}).populate({
                path: 'organ.level1'
            }).populate({
                path: 'organ.level2'
            }).sort({index: -1}).then(array => {
                return User.findById(temp['user']._id).populate({
                    path: 'organ.level1'
                }).populate({
                    path: 'organ.level2'
                }).then(user => {
                    if (user) {
                        if (user.organ.level2) {

                            //cap nhat ben don vi cu
                            //tim cac user o cung don vi va sap xep giam dan theo index
                            let userHashLeve2 = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == user.organ.level1.code && item.organ.level2 && item.organ.level2.code == user.organ.level2.code);

                            if (userHashLeve2 && userHashLeve2.length == 1) {

                                //tao mot bien trung gian luu tru thang max
                                User({
                                        index: userHashLeve2[0].index, organ: user.organ,
                                        username: null
                                    }
                                ).save();
                            } else {
                                if (user.index == userHashLeve2[0].index) {
                                    userHashLeve2[1].index = userHashLeve2[0].index;
                                    User(userHashLeve2[1]).save();
                                }
                            }
                        } else {

                            let userHashNotLevel2 = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == user.organ.level1.code);
                            if (userHashNotLevel2 && userHashNotLevel2.length == 1) {
                                User({
                                    index: userHashNotLevel2[0].index, organ: user.organ,
                                    username: null
                                }).save();
                            } else {
                                if (user.index == userHashNotLevel2[0].index) {
                                    userHashNotLevel2[1].index = userHashNotLevel2[0].index;
                                    User(userHashNotLevel2[1]).save();
                                }
                            }
                        }


                        //cap nha ben don vi moi cua user
                        if (data['unitTransfer'].level1 && data['unitTransfer'].level2) {
                            let userHashLeve2 = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == data['unitTransfer'].level1.code && item.organ.level2 && item.organ.level2.code == data['unitTransfer'].level2.code);
                            if (userHashLeve2 && userHashLeve2.length > 0) {
                                if (user.index >= userHashLeve2[0].index) {
                                    user.index = userHashLeve2[0].index + 1;
                                }
                            }
                        } else {
                            let userHashNotLeve2 = array.filter(item => item.organ && item.organ.level1 && item.organ.level1.code == data['unitTransfer'].level1.code);
                            if (userHashNotLeve2 && userHashNotLeve2.length > 0) {
                                if (user.index >= userHashNotLeve2[0].index) {
                                    user.index = userHashNotLeve2[0].index + 1;
                                }
                            }
                        }

                        user['organ'] = data['unitTransfer'];
                        return Info.findOne({staffCode: user.username}).then(info => {
                            let item = {
                                level1: user.organ.level1.name,
                                level2: user.organ.level2 ? user.organ.level2.name : '',
                                now: true,
                                dateFrom: data['dateTransfer'],
                                dateEnd: null,
                                position: '',
                                job: ''
                            };
                            let hashInfo = true;

                            if (!info) {
                                hashInfo = false;
                                info = {
                                    staffCode: user.username,
                                    process_work: []
                                }
                            }

                            if (!Array.isArray(info.process_work)) {
                                info.process_work = [];
                            }
                            for (let i = 0; i < info.process_work.length; i++) {
                                info.process_work[i].now = false;
                            }

                            info.process_work.push(item);
                            console.log("info " + info);
                            if (!hashInfo) {
                                Info(info).save();
                            } else {
                                info.save();
                            }

                            return user.save();
                        });

                    }

                });
            });


        });

    },
    u_get_index: function () {
        // LeaveDepart.remove({},function () {
        //
        // });

        return LeaveDepart.find().populate({
            path: 'user'
        }).lean();
    }
};
