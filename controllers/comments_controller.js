const Comment = require('../models/comment');
const Post = require('../models/post');

//Creating Comment Action
module.exports.create = async function(req, res){
    try{
        //finding the post first
        const post = await Post.findById(req.body.post);

        //if we found the post then we create the comment
        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            //if the comments gets created then adding comments to a post
            post.comments.push(comment);
            await post.save(); //save() tells the database this is the final version so block it and save this push.

            res.redirect('/');
        }
    }
    catch (err) {
        console.log('Error in creating a comment', err);
        return res.redirect('/');
    }
}



//Deleting Comment Action
module.exports.destroy = async function(req, res){
    try {
        //finding the comment to be deleted
        const comment = await Comment.findByIdAndDelete(req.params.id);

            //if got the comment:
        // Authorization comes in picture: No user is allowed to delete the comment that has been written by another user.
        // So we need to check whether the user is deleting the comment is the user who written the comment.
        // ".id" means converting the object id into string.
        if(comment.user == req.user.id){

            //deleteing the comments and updating the post when comments gets deleted using "$pull:"
            let postId = comment.post;

            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } 
    catch (err) {
        console.log('Error in deleting a comment', err);
        return res.redirect('back');
    }
}




// We need to create comment over the posts for that we need to find whether the post exist!!

// We will find the post with that "post id" first and the create a comment after it because we need to create a comment.. alot it to a post.
// And inside the post.js "postSchema" in the models folder, we also need to add the comment id to "comment[{}] array".

// So comment id gets added to a post inside the comment's array and inside "commentSchema" in "post:{}" we need to add "post id" 
    // And also with the post we also add "comment id" to comment's array.. both the places so that our query runs faster 

//Deleting Comment Action:

//In Comments Controller, we put a check if user id matches and in Comments Router, we put a "checkAuthentication" if user is logged in.
// Finally we just go to "home.ejs" file to create a delete button to delete any comments.
    //So if "comment user id" matches the "local user id" and that user is signned in then only user can see the delete button.
 













