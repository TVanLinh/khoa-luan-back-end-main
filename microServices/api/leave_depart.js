const LeaveDepart = require('../model/leaveDepart');
module.exports = {
    post_index: function (data) {
        return LeaveDepart(data).save();
    },
    get_index: function () {
        // LeaveDepart.remove({},function () {
        //
        // });
        return LeaveDepart.find().populate({
            path: 'user'
        }).lean();
    }
};