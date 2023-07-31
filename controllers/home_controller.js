//I need to export a function which is publically to my routes file and that should return something.
module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 25);
    
    return res.render('home', {
        title: "Home"
    });
} 