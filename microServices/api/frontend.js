const Frontend = require('../model/frontend');

module.exports = {
    u_get_index: function () {
        // Frontend.findByIdAndRemove("5a260caa11adbc27c0e1d343",function (d) {
        //
        // });
        return Frontend.find().sort({createdOn: -1}).lean();
    },
    u_put_index: function (frontend) {
        return Frontend.findByIdAndUpdate(frontend._id, frontend);
    },
    u_post_index: function (frontend) {
        return Frontend(frontend).save(function (err, result) {
            return result;
        });
    },
    u_get_activated: function () {
        return Frontend.find({activated: true}, 'title description').lean();
    },
    u_delete_index: function (id) {
        console.log("delete frontend request id " + id);
        return Frontend.findByIdAndRemove(id, function () {

        });
    }
};