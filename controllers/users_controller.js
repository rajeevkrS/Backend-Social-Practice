//This is one controller which can controlls many users.

const User = require('../models/user');


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
    try {
        //checking if current user is logged in then only allowing to edit its details
        if(req.user.id == req.params.id){
            const user = await User.findByIdAndUpdate(req.params.id, req.body);

            return res.redirect('back');
        }
        else{
            return res.status(401).send('Unauthorized');
        }
    } 
    catch(err){
        console.log('error', err);
        return;
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

