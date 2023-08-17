const passport = require('passport');
// Its a Pssport-Jwt Strategy
const JWTStrategy = require('passport-jwt').Strategy;
// Its a module which helps us to extract JWT from the header.
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Since we are going to be using "User" as the model for authentication, it needs User model.
const User = require('../models/user');


let opts = {
    // finding JWT from the header using "fromAuthHeaderAsBearerToken"
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    // decrypted using 'codeial'
    secretOrKey: 'codeial'
}

// telling passport to use JWTStrategy
passport.use(new JWTStrategy(opts, function(jwtPayload, done){

    // Finding the user based on the info. in Payload
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        // If user found
        if(user){
            return done(null, user);
        }
        // user not found
        else{
            return done(null, false);
        }
    });
}));

module.exports = passport;

// Header is a list of keys, so header has a key called authorization that is also a list of keys, that keys called "Bearer". That Bearer having the JWT Token.
    // So we will be able extract from Authorization Header.
    // "fromAuthHeaderAsBearerToken()" creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'