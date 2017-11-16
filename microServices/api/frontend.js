const Frontend = require('../model/frontend');

module.exports = {
    get_index: function(){        
        return Frontend.find().lean();
    },
    put_index: function(frontend) {
        return Frontend(frontend).save();
    },
    post_index: function(frontend){
        return Frontend.findByIdAndUpdate(frontend._id, frontend);
    },
    get_activated: function(){
        return Frontend.find({activated: true}, 'title description').lean();
    }
}