const LeaveJob = require('../model/leaveJob');
const User = require('../model/user');
module.exports = {
    post_index: function (data) {
        let leaveJob = data;
        // console.log("leave-job request" + JSON.stringify(data));
        return LeaveJob.findOne({user: data.user._id}).populate({
            path: 'user',
            match: {username: leaveJob['user']['username']}
        }).then(r => {
            if (r && r.user) {
                return {msg: "Cán bộ này đã được xử lý nghỉ việc rồi"};
            }

            return LeaveJob(leaveJob).save().then(r => {
                User.findById(data.user._id).then(user => {
                    if (user) {
                        user.activated = false;
                        user.save();
                    }
                });
                return r;
            });
        });

    },
    get_index: function () {
        // LeaveJob.remove({}, function () {
        //
        // });
        return LeaveJob.find().populate({
            path: 'user',
            populate: [{path: 'organ.level1'}, {path: 'organ.level2'}]
        }).lean();
    },
    put_index: function (data) {
        return LeaveJob.findByIdAndUpdate(data._id, data);
    },
    delete_index: function (data) {
        return LeaveJob.findByIdAndRemove(data._id, function () {
            return {msg: "ok"};
        });
    }
};