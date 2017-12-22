const BindJob = require('../model/bindJob');
const User = require('../model/user');
module.exports = {

    post_index: function (data) {
        let bindJob = data;
        // console.log("leave-job request" + JSON.stringify(data));
        return BindJob.findOne({user: data.user._id}).populate({
            path: 'user',
            match: {username: bindJob['user']['username']}
        }).then(r => {
            if (r && r.user) {
                return {msg: "Cán bộ này đã được xử lý nghỉ việc rồi"};
            }

            return BindJob(bindJob).save().then(r => {
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
        // BindJob.remove({}, function () {
        //
        // });
        return BindJob.find().populate({
            path: 'user',
            populate: [{path: 'organ.level1'}, {path: 'organ.level2'}]
        }).lean();
    },
    put_index: function (data) {
        return BindJob.findByIdAndUpdate(data._id, data);
    },
    delete_index: function (data) {
        return BindJob.findByIdAndRemove(data._id, function () {
            return {msg: "ok"};
        });
    }
};