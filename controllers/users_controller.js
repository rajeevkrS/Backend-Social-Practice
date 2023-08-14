//This is one controller which can controlls many users.

const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


//User's action
module.exports.profile = async function(req, res){
    try {
        const user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    }
    catch(err){
        console.log('error', err);
        return;
    }
}

//User's Update Form action
module.exports.update = async function(req, res){

    // checking if current user is logged in then only allowing to edit its details
    if(req.user.id == req.params.id){
        try {
            
            // First i will find the user
            let user = await User.findById(req.params.id);

            // if user is found, I need to update the user
            // we will be using multer and "uploadedAvatar" function will be used.
            User.uploadedAvatar(req, res, async function(err){
                if (err) {
                    if (err instanceof multer.MulterError) {
                        if (err.code === 'LIMIT_FILE_SIZE') {
                            req.flash('error', 'Avatar file size should be within 2MB.');
                            return res.redirect('back');
                        }
                    }
                    console.log('********Multer Error', err);
                }

                //storing the file along side the user
                user.name = req.body.name;
                user.email = req.body.email;

                //if req. has a file
                if(req.file){

                    // Delete old avatar if it exists
                    if (user.avatar) {
                        const avatarFilePath = path.join(__dirname, '..', user.avatar);
                        
                        // Check if the old avatar file exists before deleting
                        if (fs.existsSync(avatarFilePath)) {
                            try {
                                fs.unlinkSync(avatarFilePath);
                                console.log('Old avatar deleted successfully.');
                            } 
                            catch (deleteErr) {
                                console.error('Error deleting old avatar:', deleteErr);
                            }
                        }
                    }

                    // this is saving the path of the uploaded file into the avatar field in the current user.
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                // console.log(req.file);

                // saving the user
                user.save();
                req.flash('success', 'Updated Successfully!');
                return res.redirect('back');
            });
        } 
        catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    }
}


//"Sign Up Page" action
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    });
}

//"Sign In Page" action
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    });
}


//get the "Sign Up" Data
module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        const user = await User.findOne({email: req.body.email});
            
            //when the user is not found
            if(!user){
                const newUser = await User.create(req.body);
                    
                //if correct then the user is created
                return res.redirect('/users/sign-in');
            }
            else{ //if user is already present
                return res.redirect('back');
            }
    }
    catch(err){
        console.log('error in signing up', err);
        return;
    }
}

//sign in and create a session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}



//another action: "Sign out"
module.exports.destroySession = function(req, res){
    
    req.logout(function(err) {
        if (err) {
            // Handle error, maybe by logging it
            console.error(err);
        }
        req.flash('success', 'You have Logged out!');
        return res.redirect('/');
    });
}





//Now this controller is ready to access by a router, and now that route needs to be access by browser...browser tells me that you need to go to this route and the controller/action returns whatever data it has. If the controller/action is not present then it throws an error.

