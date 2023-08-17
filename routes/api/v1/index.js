const express = require('express');
const router = express.Router();

// telling router to use v1's js file
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));



module.exports = router;