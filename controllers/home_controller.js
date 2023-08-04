const Post = require('../models/post');


//I need to export a function which is publically to my routes file and that should return something.
module.exports.home = async function (req, res) {
    try {
      const posts = await Post.find({}).populate('user');
    
      return res.render('home', {
        title: "Codeial | Home",
        posts: posts
      });
    } 
    catch (err) {
      console.log('Error in fetching posts:', err);
      return;
    }
  }


    //Note:
//So whenever this action getting called which is the home page, it will find all the posts and putting them into the context and sending to the view "home.ejs"