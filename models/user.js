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
    // The disk storage engine gives you full control on storing files to disk locally.
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
        // "Date.now()": will change its timestamps value at every uploads
        cb(null, file.fieldname + '-' + Date.now());
    }
});


// Static Function for the users:

// "multer({storage: storage})": it attached the diskStorage on multer in the storage property with my storage variable.
// "single('avatar')": this says only one avatar/file will be uploaded for the fieldname "avatar".
// For accessing this "uploadedAvatar" function by the model name "User" and ".uploadedAvatar" (User.uploadedAvatar).
userSchema.statics.uploadedAvatar = multer({
                                        storage: storage,
                                        limits: {
                                            fileSize: 2 * 1024 * 1024 //2MB(adjust the size limit as needed)
                                        },
                                    }).single('avatar');

// Just need this "AVATAR_PATH" to be available publically for the user model. Whenever I want to access from the controller where is this going to be saved, It just needs to be able to tell me tha path.
userSchema.statics.avatarPath = AVATAR_PATH;



//Telling "mongoose" this is a model which has an argument "user.js" as 'user' and it will refer to "userSchema"
const User = mongoose.model('User', userSchema);


module.exports = User;




// cb: callback
// cb(null, path.join(__dirname, '..', AVATAR_PATH));
    // This whole will be converted into a path

// "__dirname" is models/user.js .
// ".." is going one step back which is uploads folder.
// "AVATAR_PATH" has a path which will join .


// Multer for file uploads:

// first we installed multer "npm install multer" and required it and decleared a path where it will be stores the uploaded file.
// Then we decleared a field with name "avatar" which will be storing the path of the file because the database does not store the file, it just stores the path of the file for that we are putting this field "avatar".
// Next we defiend some storage properties for multer to on the disk locally with "destination" and "filename" and file name was appended with current timestamp "Date.now()" on every uploads.
// Next we declared "uploadedAvatar" as the multer which used the variable storage.
// Next we went to "users controller", their inside user's update function, we finded the user and calling "uploadedAvatar" static function.. passing the req. to it so that we are able to read the req./data from the "multipart form" and then we set the user name, email and the file.
// Next we saved the user and redirect to the same page.
// Then we created the "img" attribute to show the avatar file in the "user_profile.ejs".
// Then for showing the avatar file we went to main "index.js" made the app to use the static file : { app.use('/uploads', express.static(__dirname + '/uploads')) }.







