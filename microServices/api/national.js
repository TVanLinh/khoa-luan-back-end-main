const National = require('../model/national');
module.exports = {
    get_index: function () {
        console.log("national request");
        return National.find();
    },
};
