const express = require('express');
const router = express.Router();
const passport = require('passport');

// get the "user_controller.js"
const usersController = require('../controllers/users_controller');

// accessing the "contoller's function" in routes folder using "router.get()"
//if the user is signed in 
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

//for updation of users detail
router.post('/update/:id', passport.checkAuthentication, usersController.update);

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


// Two routes here for google
// 1. When I click on button for the google sign-in, It takes me to google and the data is fetched from their.
// 2. When the google fetches that data from database and sends it back to me route which was my callback url.
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']})); //scope is the info. which we are looking to fetch and its an array of strings

// '/auth/google/callback' : this is the url at which i will recieve the data.
// Then passed through authentication
// Then it passes on controller to createSession action
router.get('/auth/google/callback', passport.authenticate(
    'google', 
    {failureRedirect: '/users/sign-in'}
    ), usersController.createSession);



module.exports = router;




