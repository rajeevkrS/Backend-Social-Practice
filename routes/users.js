const express = require('express');
const router = express.Router();
const passport = require('passport');

// get the "user_controller.js"
const usersController = require('../controllers/users_controller');

// accessing the "contoller's function" in routes folder using "router.get()"
//if the user is signed in 
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp); //Sign Up
router.get('/sign-in', usersController.signIn); //Sign In

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) ,usersController.createSession);
// created a session then passport first authenticates it:
    // if the authentication is done then usersController.createSession will be called and done(null, user) return the user.
    // if it is not done then it redirects to sign-in page



//sign out
router.get('/sign-out', usersController.destroySession);




module.exports = router;




