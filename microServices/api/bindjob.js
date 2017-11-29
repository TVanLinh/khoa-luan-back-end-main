const BindJob = require('../model/bindJob');
module.exports = {
    u_post_index: function (data) {
        let bindJob = data;
        console.log("bind-job request" + JSON.stringify(data));
        BindJob.findOne().populate({
            path: 'user',
            match: {username: bindJob['user']['username']}
        }).then(r => {
            if (r.user) {
                return JSON.stringify({"message": "Cán bộ này đã được xử lý  rồi"});
            }
            return BindJob(bindJob).save();
        });

    },
    get_index: function () {
        // BindJob.remove({},function () {
        //
        // });
        return BindJob.find().populate({
            path: 'user'
        }).lean();
    }
};