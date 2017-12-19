const User = require("../model/user");
const UserHistorry = require("../model/userHistory");
const Role = require("../model/role");
const leveDepart = require("../model/leaveDepart");
const leveOrgan = require("../model/leaveOrgan");

module.exports = {
    get_index: function () {
        User.remove({username: {$ne: 'appAdmin'}}, function (err) {

        });
        UserHistorry.remove({}, function (err) {

        });
        leveOrgan.remove({}, function (err) {

        });
        // // return leveDepart.remove({},function (err) {
        // //
        //
        //  });
        // leveDepart.remove({});
    },
}