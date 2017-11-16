const Backend = require('../model/backend');

module.exports = {
    get_index: function(){
        return Backend.find().lean();        
    },
    put_index: function(backend) {
        return Backend(backend).save();        
    },
    post_index: function(backend){
        return Backend.findByIdAndUpdate(backend._id, backend);
    },
    get_activated: function(){
        return Backend.find({activated: true}, 'title description').lean();
    }
}