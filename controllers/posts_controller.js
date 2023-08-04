const Post = require('../models/post');

//exporting a first action
module.exports.create = async function (req, res) {
    try {
      const post = await Post.create({
        //fields:
        content: req.body.content,
        user: req.user._id, // the user will be identified by "_id" from the database
      });
  
      return res.redirect('back');
    } 
    catch (err) {
      console.log('Error in creating a post', err);
      return;
    }
  }


//First we created a "post_controller" and created an action to get the data from the "form (textarea)" that is present on the browser.
  // But for this we need to map it to routes. So we created routes in "posts.js file" to show.
  //This posts are right now being exported but not been used by the main router which is "index.js router". So we called it there { router.use('/posts', require('./posts')); }.
//Once I was submitted the textarea form ater "signing in", it find the user from "req.body._id" using "setAuthentication" 






