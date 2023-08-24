const Post = require('../models/post');
const User = require('../models/user');

//I need to export a function which is publically to my routes file and that should return something.
module.exports.home = async function (req, res) {
    try {
      //populating the Post and Comment models with the likes
      const posts = await Post.find({})
                              .sort('-createdAt')
                              .populate('user')
                              .populate({
                                path: 'comments',
                                populate: {
                                  path: 'user'
                                },
                                populate: {
                                  // this likes for Comments
                                  path: 'likes'
                                }
                              })
                              .populate('likes');// this likes for Posts
    
                              posts.forEach((post)=>{
                                post.comments.forEach(async (comment)=>{
                                    comment.user = await User.findById(comment.user)
                                })
                            })
                              // console.log(posts);
      const users = await User.find({});
      return res.render('home', {
        title: "Codeial | Home",
        posts: posts,
        all_users: users
      });
    } 
    catch (err) {
      console.log('Error in fetching posts:', err);
      return;
    }
  }


    //Note:
//So whenever this action getting called which is the home page, it will find all the posts and putting them into the context and sending to the view "home.ejs"


  //Posts Steps:
// Step 1: displayed the posts
// Step 2: populate the users
// Step 3: displayed those users on the home page.
// Step 4: Showing comments just along side posts and author's name of the comment also.