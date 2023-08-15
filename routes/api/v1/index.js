const express = require('express');
const router = express.Router();

// telling router to use v1's post.js
router.use('/posts', require('./posts'));


module.exports = router;