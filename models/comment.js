const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

//Telling mongoose that "Comment" is my model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;




// We Created "comment.js model" in that we created "commentSchema" and referred "User" and "Post".
// Then we created just an array of "comments[{}]" in the "postSchema"







