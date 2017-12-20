var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    // city: {
    //     name: String,
    //     code: Number
    // },
    // districts: [{
    //     code: Number, name: String,
    //     guids: [{
    //         code: Number, name: String
    //     }]
    // }
    // ]

    city: {
        name: String,
        code: Number,
        districts: [{
            code: Number, name: String,
            guids: [{
                code: Number, name: String
            }]
        }
        ]
    }
});

module.exports = mongoose.model('Address', addressSchema);