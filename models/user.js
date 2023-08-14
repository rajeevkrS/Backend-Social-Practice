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
    }
}, {
    timestamps: true
});


//Telling "mongoose" this is a model which has an argument "user.js" as 'user' and it will refer to "userSchema"
const User = mongoose.model('User', userSchema);


module.exports = User;




