const Address = require("../model/address");
module.exports = {
    post_index: function (address) {
        console.log(address);
        Address(address).save();
        return "OK";
    },

    get_index: function () {
        console.log("Address request");
        Address.find({
            _id: "5a185304a8b1d2143466c43b", function (err, docs) {
                docs.remove();
            }
        });

        Address.findByIdAndRemove("5a184b6ea8b1d21434668dc9", (err, todo) => {
            // res.status(200).send(response);
        });
        return Address.find("-_id");
    }


};
