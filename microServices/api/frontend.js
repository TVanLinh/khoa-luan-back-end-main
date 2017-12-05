const Frontend = require('../model/frontend');

module.exports = {
    get_index: function () {
        // Frontend.findByIdAndRemove("5a260caa11adbc27c0e1d343",function (d) {
        //
        // });
        return Frontend.find().sort({createdOn: -1}).lean();
    },
    put_index: function (frontend) {
        return Frontend.findByIdAndUpdate(frontend._id, frontend);
    },
    post_index: function (frontend) {
        return Frontend(frontend).save(function (err, result) {
            return result;
        });
    },
    get_activated: function () {
        return Frontend.find({activated: true}, 'title description').lean();
    },
    delete_index: function (id) {
        console.log("delete frontend request id " + id);
        return Frontend.findByIdAndRemove(id, function () {

        });
    }
};