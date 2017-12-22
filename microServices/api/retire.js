const Retire = require('../model/retire');
const User = require('../model/user');
module.exports = {
    post_index: function (data) {
        let retire = data;
        console.log("retire request" + JSON.stringify(data));
       return Retire.findOne({user: data.user._id}).populate({
            path: 'user',
            match: {username: retire['user']['username']}
        }).then(r => {
            if (r && r.user) {
                // console.log("\"Cán bộ này đã được xử lý  rồi\";" + JSON.stringify(r.user.username));
                return {msg: "Cán bộ này đã được xử lý nghỉ việc rồi"};
            }
            return Retire(retire).save().then(r => {
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
        // Retire.remove({}, function () {
        //
        // });
        return Retire.find().populate({
            path: 'user',
            populate: [{path: 'organ.level1'}, {path: 'organ.level2'}]
        }).lean();
    },
    put_index: function (data) {
        return Retire.findByIdAndUpdate(data._id, data);
    },
    delete_index: function (data) {
        return Retire.findByIdAndRemove(data._id, function () {
            return {msg: "ok"};
        });
    },


    get_new: function (month, year) {
        if (!Number.parseInt(month) || !Number.parseInt(year)) {
            console.log("month or year not valid ");
            return [];
        }
        return User.find({}).populate({
            path: 'organ.level1'
        }).populate({
            path: 'organ.level2'
        }).then(arr => {

            if (!arr || !Array.isArray(arr)) {
                return [];
            } else {
                let end = {month: month, year: year};
                let listResult = [];
                for (let item of arr) {
                    if (item.birthDay) {
                        let begin = {month: item.birthDay.getMonth() + 1, year: item.birthDay.getFullYear()};
                        if (isRetire(item.sex, begin, end)) {
                            listResult.push(item);
                        }
                    }
                }
                return listResult;
            }
        });
    }
};

var getMonths = function (begin, end) {
    let a = 0;

    a = (12 - Number.parseInt(begin.month)) + (end.year - begin.year - 2) * 12 + Number.parseInt(end.month);

    // if (end.year == 1936) {
    //     console.log(JSON.stringify(begin) + JSON.stringify(end));
    //     console.log(a);
    // }
    return a;
};

var isRetire = function (sex, begin, end) {
    let man = 60 * 12;
    let woman = 55 * 12;
    // console.log("jhfjdjdfjhjdfhj" + getMonths(begin, end));
    // console.log(sex == 0);
    if (sex == 0 && getMonths(begin, end) >= man || sex == 1 && getMonths(begin, end) >= woman
    ) {
        return true;
    }

    return false;
};