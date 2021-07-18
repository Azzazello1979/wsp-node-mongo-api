const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', userSchema, 'users');
module.exports = UserModel;