const SalaryHistory = require('../model/salaryHistory');
module.exports = {
    post_index: function (data) {
        let salaryHistory = data;
        console.log("salary-history request" + JSON.stringify(data));
        SalaryHistory.findOne().populate({
            path: 'user',
            match: {username: salaryHistory['user']['username']}
        }).then(r => {
            return SalaryHistory(salaryHistory).save();
        });

    },
    get_index: function () {
        // SalaryHistory.remove({},function () {
        //
        // });
        return SalaryHistory.find().populate({
            path: 'user'
        }).lean();
    }
};