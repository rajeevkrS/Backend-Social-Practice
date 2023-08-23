const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// Create Post Action
module.exports.create = async function (req, res) {
    try {
      let post = await Post.create({
        //fields:
        content: req.body.content,
        user: req.user._id, // the user will be identified by "_id" from the database
      });

      //checking if the req. is AJAX req.(type of req. is XMLHttp req.:- xhr)
      if (req.xhr) {
        post = await post.populate('user', 'name').execPopulate();

        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post Created!"
        });
    }
  
      req.flash('success', 'Post Published!');
      return res.redirect('back');
    } 
    catch (err) {
      req.flash('error', err);
      return res.redirect('back');
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
    if(post.user == req.user.id){

      // deleted the associated likes for the post and all its comment's likes too
      await Like.deleteMany({likeable: post, onModel: 'Post'});
      await Like.deleteMany({_id: {$in: post.comments}});


      //deleteing the comments when post gets deleted
      await Comment.deleteMany({post: req.params.id});

      //checking if the req. is AJAX req.(type of req. is XMLHttp req.:- xhr)
      if(req.xhr){
        return res.status(200).json({
          data: {
            post_id: req.params.id
          },
          message: "Post Deleted!"
        })
      }

      req.flash('success', 'Post and associated comments deleted!');

      return res.redirect('back');
    }
    else{
      req.flash('error', 'You cannot delete this post!');
      return res.redirect('back');
    }
  }
  catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
}








//First we created a "post_controller" and created a form which has an action to get the data from the "form (textarea)" that is present on the browser.
//Inside the post controller we created an action "create" to create a post in the database.
//Then we needed to link this form { <form action="/posts/create" } using a route.
  // But for this we need to map it to routes. So we created routes in "posts.js file" to show.
  //This posts are right now being exported but not been used by the main router which is "index.js router". So we called it there { router.use('/posts', require('./posts')); }.
//Once I was submitted the textarea form ater "signing in", it find the user from "req.body._id" using "setAuthentication" .
//We wanted to show all the post using find() function from database and showed it on "home.ejs" using a "for loop".
//Next for showing the author, we needed to fetch the author from the database along side th post { <%= post.user.name %> }.






