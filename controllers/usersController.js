const mongoose = require('mongoose');
const userSchema = require('./../models/userSchema');
const User = mongoose.model('User', userSchema, 'users');
const sha256 = require('sha256');

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

exports.registerUser = (req, res) => {

    if (req.body.action === 'register') {

        const newUserObject = new User({
            email: req.body.email,
            password: sha256(req.body.password).toString(),
        });

        newUserObject.save()
            .then(response => console.log(response))
            .catch(err => res.status(500).send(`MongoDB query error: ${err.message}`))

    }


};