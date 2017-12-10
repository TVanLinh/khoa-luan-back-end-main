const Nation = require('../model/nation');
const CatalogFaculty = require("../model/catalogFaculty");

module.exports = {
    get_index: function () {
        // return CatalogFaculty.deleteMany({level: 2});
        // CatalogFaculty.findById("5a105ef7d52d014463ea76ce").then(cata => {
        //     cata.type = "khoa";
        //     return cata.save();
        // });
        return CatalogFaculty.find();
    },

    get_level: function (level) {
        return CatalogFaculty.find({level: 1});
    },

    u_post_index: function (data) {
        console.log("CatalogFaculty post request:" + JSON.stringify(data));
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
    u_put_index: function (data) {
        console.log("CatalogFaculty put request:" + JSON.stringify(data));
        let parent = data['parent'];
        if (parent && parent["id"] !== null) {
            return CatalogFaculty.findById(parent["id"]).then(result => {
                console.log("id:" + result._id);
                data["parent"]["id"] = result._id;
                data["parent"]["name"] = result.name;
                data["parent"]["level"] = result.level;
                return CatalogFaculty.findByIdAndUpdate(data['_id'], {$set: data}, function (err, result) {
                    if (err) {
                        console.log("CatalogFaculty put request error " + err);
                    }
                    return result;
                });
            });
        }

        return CatalogFaculty.findByIdAndUpdate(data['_id'], {$set: data}, function (err, result) {
            if (err) {
                console.log("CatalogFaculty put request error " + err);
            }
            return result;
        });

    },
    u_delete_index: function (id) {
        return CatalogFaculty.deleteOne({_id: id});
    }


};
