const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

// "passport.checkAuthentication" if the user is not signed in, that user wont be able to reach that action of creating the post.
router.post('/create', passport.checkAuthentication, commentsController.create);

router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;










