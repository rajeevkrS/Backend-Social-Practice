const express = require('express');
const router = express.Router();
// users api
const usersAPI = require('../../../controllers/api/v1/users_api');

// telling router to post create-session of users_api file.
router.post('/create-session', usersAPI.createSession);


module.exports = router;