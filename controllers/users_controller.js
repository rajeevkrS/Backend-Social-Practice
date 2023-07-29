//This is one controller which can controlls many users.

//exporting an action
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    });
}

//Now this controller is ready to access by a router, and now that route needs to be access by browser...browser tells me that you need to go to this route and the controller/action returns whatever data it has. If the controller/action is not present then it throws an error.

