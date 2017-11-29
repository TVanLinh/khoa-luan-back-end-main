const LeaveOrgan = require('../model/leaveOrgan');
module.exports = {
    post_index: function (data) {
        let leaveOrgan = data;
        console.log("leave-organ request" + JSON.stringify(data));
        LeaveOrgan.findOne().populate({
            path: 'user',
            match: {username: leaveOrgan['user']['username']}
        }).then(r => {
            if (r.user) {
                return JSON.stringify({"message": "Cán bộ này đã được xử lý rồi"});
            }
            return LeaveOrgan(leaveOrgan).save();
        });

    },
    get_index: function () {
        // LeaveOrgan.remove({},function () {
        //
        // });
        return LeaveOrgan.find().populate({
            path: 'user'
        }).lean();
    }
};