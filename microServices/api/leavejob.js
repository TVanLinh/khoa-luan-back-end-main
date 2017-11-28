const LeaveJob = require('../model/leaveJob');
module.exports = {
    u_post_index: function (data) {
        let leaveJob = data;
        console.log("leave-job request" + JSON.stringify(data));
        LeaveJob.findOne().populate({
            path: 'user',
            match: {username: leaveJob['user']['username']}
        }).then(r => {
            if (r !== null) {
                console.log("\"Cán bộ này đã được xử lý nghỉ việc rồi\";" + JSON.stringify(r.user.username));
                return JSON.stringify({"message": "Cán bộ này đã được xử lý nghỉ việc rồi"});
            }
            return LeaveJob(leaveJob).save();
        });

    },
    get_index: function () {
        // LeaveJob.remove({},function () {
        //
        // });
        return LeaveJob.find().populate({
            path: 'user'
        }).lean();
    }
};