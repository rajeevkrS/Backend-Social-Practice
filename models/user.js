//For creating a "Schema" we need to import "Mongoose"

const mongoose = require('mongoose');

//multer for file uploads
const multer  = require('multer');
//Multer needs Path: we will be setting the path where the file will be stored
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
}, {
    timestamps: true
});


// Now linking "multer", "AVATAR_PATH" and "userSchema's avatar field". Making sure whenever I am saving the file it get saved inside the this folder "/uploads/users/avatars" and the path is going over "userSchema's avatar field".
    // The disk storage engine gives you full control on storing files to disk.
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //"__dirname": gives me the current path which is a models
        //"..": for finding I am going one step above(I am at models, I need to go uploads folder which is a neighbour)
        //"AVATAR_PATH": it has the path link
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    // "filename": used to define what would be the name of the file.
    filename: function (req, file, cb) {
        // "file.fieldname": will be stored as avatar
        // "uniqueSuffix": will have the value of Date.now()
        cb(null, file.fieldname + '-' + Date.now());
    }
});


// Static Function for the users:

// "multer({storage: storage})": it attached the diskStorage on multer in the storage property with my storage variable.
// "single('avatar')": this says only one avatar/file will be uploaded for the fieldname "avatar".
// For accessing this "uploadedAvatar" function by the model name "User" and ".uploadedAvatar" (User.uploadedAvatar).
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');

// Just need this "AVATAR_PATH" to be available publically for the user model. Whenever I want to access from the controller where is this going to be saved, It just needs to be able to tell me tha path.
userSchema.statics.avatarPath = AVATAR_PATH;



//Telling "mongoose" this is a model which has an argument "user.js" as 'user' and it will refer to "userSchema"
const User = mongoose.model('User', userSchema);


module.exports = User;




// cb: callback
// cb(null, path.join(__dirname, '..', AVATAR_PATH));
    // This whole will be converted into a path

// "__dirname" is models/user.js .
// ".." is going one step back which is uploads/users/avatars.
// "AVATAR_PATH" has a path which will join .








