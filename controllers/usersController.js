const mongoose = require('mongoose');
const userSchema = require('./../models/userSchema');
const User = mongoose.model('User', userSchema, 'users');
const sha256 = require('sha256');

exports.getAllUsers = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.find({}).select('email')
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
    res.setHeader('Content-Type', 'application/json');

    User.findOne({ email: req.body.email })
        .then(response => response ? emailExists() : saveNewUser())
        .catch(err => console.log(`main catch error: ${err}`))

    async function saveNewUser() {
        const newUser = new User({
            email: req.body.email,
            password: sha256(req.body.password),
        });
        const response = await newUser.save();
        console.log(`response after saving new user: ${response}`);
        res.status(200).json({ message: 'OK, user saved!' });
    }

    function emailExists() {
        console.log(`email taken...`);
        res.status(400);
    }


};