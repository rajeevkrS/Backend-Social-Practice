//For creating a "Schema" we need to import "Mongoose"

const mongoose = require('mongoose');

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
const User = mongoose.model('user', userSchema);


module.exports = User;




