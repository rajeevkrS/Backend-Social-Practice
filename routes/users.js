const express = require('express');
const router = express.Router();

//get the "user_controller.js"
const usersController = require('../controllers/users_controller');

//accessing the "contoller's function" in routes folder using "router.get()"
router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp); //Sign Up
router.get('/sign-in', usersController.signIn); //Sign In
router.get('/sign-out', usersController.signOut); //Sign Out

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/end-session', usersController.endSession);




module.exports = router;




