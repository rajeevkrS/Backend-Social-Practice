// Middleware always has 3 argumnets 
module.exports.setFlash = function(req, res, next){
    // we will just find out the falsh from the req. and set it up in the locals of the res.(will find that in view template)
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}
