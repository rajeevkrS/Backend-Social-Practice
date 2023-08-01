//This is one controller which can controlls many users.

const User = require("../models/user");

//exporting a first action
module.exports.profile = async function (req, res) {
    try {
        // Checking if there is a user id or not
        // We tried to find the user and if the user is found, then we are sending the users information in the context to the view template.
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);
            // If user is found
            if (user) {
                return res.render("user_profile", {
                    title: "User Profile",
                    user: user // Sending the user to the profile page
                });
            }
        }else{
            // If not found, then redirect to "Sign In Page"
            return res.redirect('/users/sign-in');
        }
    } 
    catch (err) {
        console.error(err); // Handle any errors that occurred during the query
        return res.redirect("/users/sign-in"); // Redirect to an sign-in page
    }
};


// second action: "Sign Up Page"
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};


// third action: "Sign In Page"
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};


// Fourth action: "Sign Out Page"
module.exports.signOut = function (req, res) {
    return res.render("user_sign_out", {
      title: "Codeial | Sign Out",
    });
  };


// get the "Sign Up" Data
module.exports.create = async function (req, res) {
  try {
    // if password is not equal to confirm password then redirected back to same page.
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });

    // when the user is not found
    if (!user) {
      const newUser = await User.create(req.body);

      // if redirected to "Sign In Page" then the user is created.
      return res.redirect("/users/sign-in");
    } else {
      // if user is already present
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in signing up", err);
    return;
  }
};


// get the "Sign In" Data
module.exports.createSession = async function (req, res) {
  try{
    // find the user
    const user = await User.findOne({ email: req.body.email });

    // handle user found
    if(user){
        // handle password which doesnt match
        if(user.password != req.body.password){
            return res.redirect("back");
        }

        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    }
    else{
        // hande user not found: redirected to "Sign-In Page" 
        return res.redirect("/users/sign-up");
    }
    
  }catch(err){
    console.log("error in signing up", err);
    return;
  }
};
// we are going to check whether the user exist, if it is then we are going to check the password entered is correct using the "username" which the "email" then match the password into the form with password in the database. If those two passwords matches then we store the users identity in the "cookie" and send it of to the browser.



// get the "Sign Out" Data
module.exports.endSession = async function (req, res) {
    try {
        const userId = req.headers.cookie.user_id;
        const user = await User.findOneAndDelete({ user_id: userId });
        console.log(req.headers.cookie);
      // Clear the user_id cookie
      res.clearCookie('user_id');
  
      // Redirect the user to sign-in page
      return res.redirect('/users/sign-in'); 
    } 
    catch (err) {
      console.log('Error in signing out', err);
      return res.redirect('/users/sign-in'); 
    }
  };






// Now this controller is ready to access by a router, and now that route needs to be access by browser...browser tells me that you need to go to this route and the controller/action returns whatever data it has. If the controller/action is not present then it throws an error.



// Summary of User Sign-In & Sign-Up

// We first created some pages (user_sign_in.ejs & user_sign_up.ejs) with their respective line of code.
//Then we created some actions in the "users_controller" by which we can "renders those pages" and "to get the users data".

    // First Step: Sign Up
//When we wanted to sign up the user their we checked first that user entered the matching password "password != confirm_password". Then we tried to find the user by email..if the user is found in database, we return back or if not, then we created new user in the database using the "create" method. It uses the request body (req.body) to populate the user data. 
//return res.redirect("/users/sign-in"); : After creating the new user, this line redirects the user to the "Sign In Page."


    // Next Step: Sign Up
//Next Step: Once the user is created, the user need to sign in.
//For that we "createSession" for "sign in". Here also we tried to find the user, if the user found, we tried to match the password from the database..if not matches-redirected back to the same page....if password matches then sets a cookie named "user_id" with the value of the found user's ID and redirects the user to the "profile page"


    // Final Step: Profile Page
// First, we tried to find the user by that "user_id" in the cookies...if user is not found- redirected to "sign-in page".... if user is found the we show the user's information of signed in user on the profile page 









