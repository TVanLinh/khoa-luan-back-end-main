const Backend = require('../model/backend');

module.exports = {
    u_get_index: function () {
        return Backend.find().sort({createdOn: -1}).lean();
    },
    u_put_index: function (backend) {
        return Backend.findByIdAndUpdate(backend._id, backend);
    },
    u_post_index: function (backend) {
        return Backend(backend).save(function (err, result) {
            return result;
        });
    },
    u_get_activated: function () {
        return Backend.find({activated: true}, 'title description').lean();
    },
    u_delete_index: function (id) {
        console.log("delete backend request id " + id);
        return Backend.findByIdAndRemove(id, function () {

        });
    }
};