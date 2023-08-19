const passport = require('passport');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// importing crypto
const crypto = require('crypto');

const User = require('../models/user');


// telling passport to use new google-strategy
passport.use(new googleStrategy({
    // options:
    clientID: "145093345900-1qnhdvcfmpke2knvknoa5lr70jvcdnou.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
    try {
        // finding a user
        const user = await User.findOne({ email: profile.emails[0].value }).exec();

        console.log(accessToken, refreshToken);
        console.log(profile);

        // If user found then we call done() and set this user as req.user/sign that user
        if (user) {
            return done(null, user);
        } 
        // if user is not there
        else {
            // Creating the user and set it as req.user/sign that user
            const newUser = await User.create({
                // fields:
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')// generating the random password
            });
            
            return done(null, newUser);
        }
    } 
    catch (err) {
        console.log('error in google-strategy-passport', err);
        return done(err);
    }
}));
// I am asking google to establish an identity of an email id which has been passed on or selected by the user which will appears in profile.
// Now this "profile" has a list of emails, out of which the first emails value, I am checking if that user exists in the database, if it does not exists in database, I will create the user (sign-in/sign-up using google)


module.exports = passport;

