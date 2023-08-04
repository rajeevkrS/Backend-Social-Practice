//What does this "index.js" file in routes folder do?

//If I look at it, my app "index.js" will sending a request to my "routes/index.js" and this will further routed to all different route files which would be their.

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

//accessing the "contoller's function" in routes folder using "router.get()"
router.get('/', homeController.home);
router.use('/users', require('./users'));
//postController
router.use('/posts', require('./posts'));

//for any further routes, access from here by let say " router.use('/story', require('./story')); ".

module.exports = router;





//Revise:
//I created a Router() and that router is accessing a "home_controller.js" which has a exported function "home". This home is now accessable over here "router.get('/', homeController.home); "  when I "required" in the variable "homeController".

//" router.use('/users', require('./users')) " whenever the requests is for users, you can just require my neighbour which is "./users".

//So any request which comes to "/" without anything appended to it will be forwarded to "homeController".


