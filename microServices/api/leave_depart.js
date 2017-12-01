const LeaveDepart = require('../model/leaveDepart');
const User = require('../model/user');
module.exports = {
    post_index: function (data) {
        console.log(data);
        let temp = {};
        temp['numberDecide'] = data['numberDecide'];
        temp['dateDecide'] = data['dateDecide'];
        temp['contentDecide'] = data['contentDecide'];
        temp['unitTransfer'] = {};
        if (data['unitTransfer']['level1']) {
            temp['unitTransfer']['level1'] = data['unitTransfer'].level1.name;
        }

        if (data['unitTransfer']['level2']) {
            temp['unitTransfer']['level2'] = data['unitTransfer'].level2.name;
        }

        temp['dateTransfer'] = data['dateTransfer'];
        temp['user'] = data['user'];
        return LeaveDepart(temp).save().then(() => {
            User.findById(temp['user']._id).then(user => {
                console.log(user);
                if (user) {
                    user['organ'] = data['unitTransfer'];
                    return user.save();
                }
            });
        });

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
