const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

// Toogle Like Action
module.exports.toggleLike = async function(req, res){
    try {

        //First: we take out the likable, url= "Like/toggle/?id=abcd&type=Post/Commnet"
        let likeable;
        let deleted = false; //for increment/decrement the likes

        // Finding Likable
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Checking if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // If user already liked and clicks on like button then deleting that like
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            await existingLike.deleteOne();
            deleted = true;
        }
        // else making a new like
        else{
            let newLike = await Like.create({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });
            // Putting this "newly created likes" into a array of likes on Post/Comment.
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.status(200).json({
            message: 'Request Successful!',
            data: {
                deleted: deleted
            }
        });

    }
    // Since this like is going to work with AJAX req. so we send back "json" data.
    catch (err) {
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}





