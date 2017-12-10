var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    city: {
        name: String,
        code: Number
    },
    districts: [{
        code: Number, name: String,
        guids: [{
            code: Number, name: String
        }]
    }
    ]
    // Province: String,
    // Province_Code: Number,
    // District: String,
    // District_Code: Number,
    // Commune: String,
    // Commune_Code: String
});

module.exports = mongoose.model('Address', addressSchema);