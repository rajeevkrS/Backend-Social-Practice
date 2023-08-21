const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    //this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment'] // the value which can be put in to this field could be either "Post" or "Comment".
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;



// enum:
    // It tells the likes, the value of onModel in each like is either "Post" or "Comment" and nothing other than that.









