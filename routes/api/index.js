const express = require('express');
const router = express.Router();

// telling router to use v1
router.use('/v1', require('./v1'));

module.exports = router;


// Folder structure and connection:

// First router's index.js file found "api".
// Then api's index.js file found "v1".
// Then v1's index.js file found "posts.js"
// Then posts.js file refer/gets "posts_api.js".
