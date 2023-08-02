//requiring the passport package
const passport = require("passport");


//requiring the "passport-local library" & "strategy" is the property
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/user');


// authentication: telling passport to use the local-strategy
passport.use(new LocalStrategy({
  usernameField: "email",
},
async function (email, password, done) {
  try {
    // Find the user and establish the identity using async/await
    const user = await User.findOne({ email: email });

    if (!user || user.password !== password) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }

    // If the user is found
    return done(null, user);
  } 
  catch (err) {
    console.log('Error in finding the user--> Passport');
    return done(err);
  }
}
));


//serializing the user to decide which key is to be kept in the cookies.
passport.serializeUser(function(user, done){
    done(null, user.id);
});
//we are storing the passed user's Id in an encrypted formate. This automatically encryptes it into the cookie.


// deserializing the user from the key in the cookies.
passport.deserializeUser(async function (id, done) {
  try {
    // Find the user using async/await
    const user = await User.findById(id);

    // If the user is found
    return done(null, user);
  } 
  catch (err) {
    console.log('Error in finding the user--> Passport');
    return done(err);
  }
});


//Sending data of signed-in current user to the views
//check if the user is authenticate(using this as a middleware)
passport.checkAuthentication = function(req, res, next){
    //if the user is signed-in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed-in
    return res.redirect('/users/sign-in');
}

//Set the user for the views :this the middleware to check the user is signed-in or not 
//if the user is signed-in
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed-in user from the session cookie and we are just sending this to the locals for the views.
        res.locals.user = req.user
    }
    next();
}


module.exports = passport;




//Summary:
// We are telling "passport" to use "local strategy" where we defining the "usernamefield" is "email" which is syntax of defining.
// Then we initialized a function with 3 arguments: "email", "password" & "done" were "done" is my callback function which is reporting back to "passport.js".
// Then we are finding the user the user using the email. So whenever "passport" is being called "email and password" automatically passed on to it "User.findOne({email: email},".
//So we are finding the user : 
    // if not found then throwing an error.
    // if user entered wrong password then also throwing an error.
    // And if the user is found then we pass on the user.

//So what is happing till now :
// "passport" is using the "local-strategy" to find the user who signed in and the using "serializeUser()" to set that user into the cookie means the "Id" of the user.
    // On the otherside, the cookie sent to the browser, when the browser makes the request the browser sends back the user.id..so we need "deserializer" to find the user again.
