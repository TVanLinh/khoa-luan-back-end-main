const LeaveJob = require('../model/leaveJob');
const User = require('../model/user');
module.exports = {
    u_post_index: function (data) {
        let leaveJob = data;
        console.log("leave-job request" + JSON.stringify(data));
        LeaveJob.findOne().populate({
            path: 'user',
            match: {username: leaveJob['user']['username']}
        }).then(r => {
            if (r && r.user) {
                console.log("ok " + r);
                return JSON.stringify({"message": "Cán bộ này đã được xử lý nghỉ việc rồi"});
            }
            console.log("ok");
            return LeaveJob(leaveJob).save().then(r => {
                return User.findById(data.user._id).then(user => {
                    console.log(JSON.stringify(user));
                    if (user) {
                        user.activated = false;
                        return user.save();
                    }
                })
            });
        });

    },
    get_index: function () {
        // LeaveJob.remove({}, function () {
        //
        // });
        return LeaveJob.find().populate({
            path: 'user'
        }).lean();
    }
};