// Impoting User model
const User = require('../../../models/user');
// Importing JSON Web Token
const jwt = require('jsonwebtoken');


//sign in and create a JSON Web Token for user
module.exports.createSession = async function(req, res){
    try {

        // Whenever the user email and password is received, then finding that user and generate the JSON Web Token corressponding to that user.
        let user = await User.findOne({email: req.body.email});

        // If user not found
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        // if user is found: return response with message and telling there is a token along side it and also pass on the token using jwt library.
        // jwt.sign() is a function which passes the user and coverting that user into JSON using ".toJSON()" and the secret key and timelimit. And this whole returned as a token.
        // "user.toJSON" will gets encrypted and their is a "Header and Signature".
        return res.json(200, {
            message: 'Sign in successfully, here is yout token, please keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '10000'})
            }
        });
    } 
    catch (err) {
        console.log('*****', err);
        return res.json(500, {
            message: "Internal Server Error"    
        });
    }
    
}