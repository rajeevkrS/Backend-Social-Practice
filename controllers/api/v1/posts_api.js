// This will be for Posts Controller

// And since we are finding from the postSchema, importing that.
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


    // Action:
// "index" is basically used when we list down something.
module.exports.index = async function(req, res){
    try {

        //populating the mutiple models
        let posts = await Post.find({})
                              .sort('-createdAt')
                              .populate('user')
                              .populate({
                                path: 'comments',
                                populate: {
                                  path: 'user'
                                }
                              });
            
            // sending the posts req. from database
            return res.json(200, {
            message: "List of Posts",
            posts: posts
        });                      
    } 
    catch (err) {
        console.log('Error in fetching posts:', err);
        return;
    }
}

// Delete Post Action
module.exports.destroy = async function(req, res){
  try{
    let post = await Post.findByIdAndDelete(req.params.id);

        //if got the post
    // Authorization comes in picture: No user is allowed to delete the post that has been written by another user.
    // So we need to check whether the user is deleting the post is the user who written the post.
    // ".id" means converting the object id into string
    // if(post.user == req.user.id){
      //deleteing the comments when post gets deleted
      await Comment.deleteMany({post: req.params.id});

      return res.json(200, {
        message: "Post and Associated Comments Deleted Successfully!"
      });
    // }
    // else{
    //   req.flash('error', 'You cannot delete this post!');
    //   return res.redirect('back');
    // }
  }
  catch (err) {
    console.log('*****', err);
    return res.json(500, {
        message: "Internal Server Error"
    });
  }
}

