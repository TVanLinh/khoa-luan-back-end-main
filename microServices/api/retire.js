const Retire = require('../model/retire');
module.exports = {
    post_index: function (data) {
        let retire = data;
        console.log("retire request" + JSON.stringify(data));
        Retire.findOne().populate({
            path: 'user',
            match: {username: retire['user']['username']}
        }).then(r => {
            if (r !== null) {
                console.log("\"Cán bộ này đã được xử lý  rồi\";" + JSON.stringify(r.user.username));
                return JSON.stringify({"message": "Cán bộ này đã được xử lý rồi"});
            }
            return Retire(retire).save();
        });

    },
    get_index: function () {
        // Retire.remove({},function () {
        //
        // });
        return Retire.find().populate({
            path: 'user'
        }).lean();
    }
};