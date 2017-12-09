const FuncLog = require('../model/funcLog');
const RoleHistory = require('../model/roleHistory');
const UserHistory = require('../model/userHistory');
const Frontend = require('../model/frontend');
const Backend = require('../model/backend');

module.exports = {
    get_index: function () {
        return FuncLog.find().lean();
    },
    put_index: function (log) {
        return FuncLog(log).save()
            .then(l => {
                if (log.funcType === 'frontend') return Frontend.findById(l.funcId);
                else return Backend.findById(l.funcId);
            })
            .then(f => {
                f.activated = log.activated;
                return f.save();
            });
    },
    get_userHistory: function (log) {
        // UserHistory.remove({},function (err) {
        //
        // });
        return UserHistory.find().populate({
            path: 'userId'
        }).lean();
    },

    get_roleHistory: function (log) {
        // RoleHistory.remove({},function (err) {
        //
        // });
        return RoleHistory.find().populate({
            path: 'roleId'
        }).lean();
    }
};