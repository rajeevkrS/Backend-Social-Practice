const express = require('express');
const router = express.Router();

//get the "user_controller.js"
const usersContoller = require('../controllers/users_controller');

//accessing the "contoller's function" in routes folder using "router.get()"
router.get('/', usersContoller.profile);


module.exports = router;




