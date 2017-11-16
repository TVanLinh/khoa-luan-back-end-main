const Nation = require('../model/nation');
module.exports = {
    get_index: function () {
        return Nation.find();
    },
};
