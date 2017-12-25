const Nation = require('../model/nation');
module.exports = {
    get_index: function () {
        let a = [{"name": "Kinh", "code": 1},
            {"name": "Tày", "code": 2},
            {"name": "Mường", "code": 3},
            {"name": "Khơ Me", "code": 4},
            {"name": "Thái", "code": 5},
            {"name": "Nùng", "code": 6},
            {"name": "Hoa", "code": 7},
            {"name": "Dao", "code": 8},
            {"name": "H'Mông", "code": 9},
            {"name": "Gia Rai", "code": 10},
            {"name": "Ê Đê", "code": 11},
            {"name": "Ba Na", "code": 12},
            {"name": "Xơ Đăng", "code": 13},
            {"name": "Sán Chay", "code": 14},
            {"name": "Cơ Ho", "code": 15},
            {"name": "Chăm", "code": 16},
            {"name": "Sán Dìu", "code": 17},
            {"name": "Ra Glai", "code": 18},
            {"name": "X’Tiêng", "code": 19},
            {"name": "Bru-Vân Kiều", "code": 20},
            {"name": "Khơ Mú", "code": 21},
            {"name": "Giáy", "code": 22},
            {"name": "M'Nông", "code": 23},
            {"name": "Cơ Tu", "code": 24},
            {"name": "Giẻ Triêng", "code": 25},
            {"name": "Hrê", "code": 26},
            {"name": "Co", "code": 27},
            {"name": "Chơ Ro", "code": 28},
            {"name": "xinhmun", "code": 29},
            {"name": "Thổ", "code": 30},
            {"name": "Tà Ôi", "code": 31},
            {"name": "Hà Nhì", "code": 32},
            {"name": "Mạ", "code": 33},
            {"name": "Chu Ru", "code": 34},
            {"name": "Lào", "code": 35},
            {"name": "Kháng", "code": 36},
            {"name": "La Chí", "code": 37},
            {"name": "La Ha", "code": 38},
            {"name": "Pà Thẻn", "code": 39},
            {"name": "Chứt", "code": 40},
            {"name": "Phù Lá", "code": 41},
            {"name": "Lự", "code": 42},
            {"name": "La Hủ", "code": 43},
            {"name": "Lô Lô", "code": 44},
            {"name": "Mảng", "code": 45},
            {"name": "Cờ Lao", "code": 46},
            {"name": "Bố Y", "code": 47},
            {"name": "Cống", "code": 48},
            {"name": "Si La", "code": 49},
            {"name": "Pu Péo", "code": 50},
            {"name": "Rơ măm", "code": 51},
            {"name": "Brâu", "code": 52},
            {"name": "Ngái", "code": 53},
            {"name": "Ơ Đu", "code": 54}];
        // Nation.remove({}, function () {
        //
        // });
        // Nation.insertMany(a, function () {
        //
        // });
        return Nation.find({}).sort({name: 1});
    },
    u_delete_index: function (id) {
        console.log(id);
        return Nation.findByIdAndRemove(id);
    },
    u_put_index: function (data) {
        return Nation.findByIdAndUpdate(data._id, data);
    },
    u_post_index: function (data) {
        return Nation.find().sort({code: -1}).then(arr => {
            if (!Array.isArray(arr) || arr.length == 0) {
                data.code = 1;
            } else {
                data.code = arr[0].code + 1;
            }
            return Nation(data).save();
        })
    }
};
