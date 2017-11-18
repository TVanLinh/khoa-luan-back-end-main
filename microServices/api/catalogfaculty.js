const Nation = require('../model/nation');
const CatalogFaculty = require("../model/catalogFaculty");

module.exports = {
    get_index: function () {
        // return CatalogFaculty.deleteMany({level: 2});
        return CatalogFaculty.find();
    },

    get_level: function (level) {
        return CatalogFaculty.find({level: 1});
    },

    post_index: function (data) {
        console.log("request:" + JSON.stringify(data));
        let parent = data['parent'];
        if (parent && parent["id"] !== null) {
            return CatalogFaculty.findById(parent["id"]).then(result => {
                console.log("id:" + result._id);
                data["parent"]["id"] = result._id;
                data["parent"]["name"] = result.name;
                data["parent"]["level"] = result.level;
                return CatalogFaculty(data).save();
            });

        }
        // console.log(JSON.stringify(data));
        return CatalogFaculty(data).save();
    },
    delete_index: function (id) {
        return CatalogFaculty.deleteOne({_id: id});
    }


};
