const User = require("../model/user");
const UserHistorry = require("../model/userHistory");
const RoleHistorry = require("../model/roleHistory");
const Role = require("../model/role");
const leveDepart = require("../model/leaveDepart");
const leveOrgan = require("../model/leaveOrgan");
const bindJob = require("../model/bindJob");
const leaveJob = require("../model/leaveJob");
const Info = require("../model/info");
const Retire = require("../model/retire");

module.exports = {
    get_index: function () {
        // User.remove({}, function (err) {
        //
        // });
        // UserHistorry.remove({}, function (err) {
        //
        // });
        //
        // RoleHistorry.remove({}, function (err) {
        //
        // });
        //
        // leaveJob.remove({}, function (err) {
        //
        // });
        // bindJob.remove({}, function (err) {
        //
        // });
        // Retire.remove({}, function (err) {
        //
        // });
        //  leveDepart.remove({}, function (err) {
        //
        //
        // });

        return Info.remove({}, function () {

        });
    },
}