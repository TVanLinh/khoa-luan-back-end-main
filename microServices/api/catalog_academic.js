const CatalogAcademic = require('../model/catalogAcademic');
var mongoose = require('mongoose');
module.exports = {
    get_index: function () {
        var item = [
            {
                name: "Tú tài"
            },
            {
                name: "Cử nhân"
            },
            {
                name: "Kỹ sư"
            },
            {
                name: "Bác sỹ"
            },
            {
                name: "Thạc sĩ"
            },
            {
                name: "Tiến sĩ"
            },
            {
                name: "Tiến sĩ khoa học"
            },
            {
                name: "Phó giáo sư"
            },
            {
                name: "Giáo sư"
            }
        ];
        // CatalogAcademic.insertMany(item, function (err) {
        //
        // });
        // CatalogAcademic.remove({},function (err) {
        //
        // });
        return CatalogAcademic.find();
    }
    ,
    u_post_index: function (data) {
        console.log(JSON.stringify(data));
        return CatalogAcademic(data).save();
    },

    u_put_index: function (data) {
        console.log(data);
        return CatalogAcademic.findById(data['_id']).then(temp => {
            temp.name = data['name'];
            return temp.save();
        });
    },

    u_delete_index: function (id) {
        let temp = ( mongoose.SchemaTypes.ObjectId(id));
        return CatalogAcademic.findByIdAndRemove(id);
    }
};
