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


//First we created a "post_controller" and created a form which has an action to get the data from the "form (textarea)" that is present on the browser.
//Inside the post controller we created an action "create" to create a post in the database.
//Then we needed to link this form { <form action="/posts/create" } using a route.
  // But for this we need to map it to routes. So we created routes in "posts.js file" to show.
  //This posts are right now being exported but not been used by the main router which is "index.js router". So we called it there { router.use('/posts', require('./posts')); }.
//Once I was submitted the textarea form ater "signing in", it find the user from "req.body._id" using "setAuthentication" .
//We wanted to show all the post using find() function from database and showed it on "home.ejs" using a "for loop".
//Next for showing the author, we needed to fetch the author from the database along side th post { <%= post.user.name %> }.






