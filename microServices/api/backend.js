const Backend = require('../model/backend');

module.exports = {
    get_index: function () {
        return Backend.find().sort({createdOn: -1}).lean();
    },
    put_index: function (backend) {
        return Backend.findByIdAndUpdate(backend._id, backend);
    },
    post_index: function (backend) {
        return Backend(backend).save(function (err, result) {
            return result;
        });
    },
    get_activated: function () {
        return Backend.find({activated: true}, 'title description').lean();
    },
    delete_index: function (id) {
        console.log("delete backend request id " + id);
        return Backend.findByIdAndRemove(id, function () {

        });
    }
};