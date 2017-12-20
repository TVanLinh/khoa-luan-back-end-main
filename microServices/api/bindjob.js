const BindJob = require('../model/bindJob');
const User = require('../model/user');
module.exports = {
    post_index: function (data) {
        let bindJob = data;
        // console.log("bind-job request" + JSON.stringify(data));
        BindJob.findOne().populate({
            path: 'user',
            match: {username: bindJob['user']['username']}
        }).then(r => {
            if (r && r.user) {
                return JSON.stringify({"message": "Cán bộ này đã được xử lý  rồi"});
            }
            return BindJob(bindJob).save().then(r => {
                return User.findById(data.user._id).then(user => {

                    if (user) {
                        user.activated = false;
                        return user.save();
                    }
                })
            });
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