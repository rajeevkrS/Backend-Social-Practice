//Establishing database relation
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // fields for post data:
    content: {
        type: String,
        required: true //for saving the data
    },
    //linking to the user: whatever post is going to be created through "postSchema", is going to be link to a user.
    user: {
        //reference:
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //Refering to "User"
    },
    //including the array of "id's" of all comments in this post schema itself
    comments: [
        {
            //reference:
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

//this is going to be a model in the database
const Post = mongoose.model('Post', postSchema);

module.exports = Post;



