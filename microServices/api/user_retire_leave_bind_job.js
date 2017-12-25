const Retire = require('../model/retire');
const LeaveJob = require('../model/leaveJob');
const BindJob = require('../model/bindJob');

module.exports = {
    u_get_index: function () {
        let result = [];
        return LeaveJob.find({}).populate({
            path: 'user',
            select: '_id username'
        }).then(arr => {
            if (Array.isArray(arr)) {
                console.log("LeaveJob " + JSON.stringify(arr));
                result.push(...getUsers(arr))
            }
            return BindJob.find({}).populate({
                path: 'user',
                select: '_id username'
            }).then(binjobs => {
                if (Array.isArray(binjobs)) {
                    console.log("binjobs " + JSON.stringify(binjobs));
                    result.push(...getUsers(binjobs));
                }

                return Retire.find({}).populate({
                    path: 'user',
                    select: '_id username'
                }).then(retires => {
                    if (Array.isArray(retires)) {
                        // console.log("retires " + JSON.stringify(retires));
                        result.push(...getUsers(retires));
                        console.log("concat " + JSON.stringify(result));
                    }
                    return result;
                });

            });


        })
    }
};

var getUsers = function (object) {
    if (!Array.isArray(object)) {
        return [];
    }

    let results = [];
    object.forEach(function (item, index) {
        if (item.user) {
            results.push(item.user);
        }
    });

    return results;
};