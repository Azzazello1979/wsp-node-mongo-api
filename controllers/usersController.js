const mongoose = require('mongoose');
const userSchema = require('./../models/userSchema');
const User = mongoose.model('User', userSchema, 'users');

exports.getAllUsers = (req, res) => {
    User.find()
        .then(result => {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(404).send('No documents matched your query.');
            }
        })
        .catch(err => res.status(500).send(`MongoDB query error: ${err.message}`))

};