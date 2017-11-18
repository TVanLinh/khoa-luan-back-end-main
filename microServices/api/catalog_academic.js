const CatalogAcademic = require('../model/catalogAcademic');
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
};
