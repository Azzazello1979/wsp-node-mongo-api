const UserModel = require('./../models/user');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const SALT = process.env.SALT;
const SECRET = process.env.SECRET;


// get all users
exports.getAllUsers = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    UserModel.find({}).select('email')
        .then(result => {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(404).send('No documents matched your query.');
            }
        })
        .catch(err => res.status(500).send(`MongoDB query error: ${err.message}`))

};

// register new user
exports.registerUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    UserModel.findOne({ email: req.body.email })
        .then(response => response ? emailExists(response) : saveNewUser())
        .catch(err => console.log(`main catch error: ${err}`))

    async function saveNewUser() {
        const newUser = new User({
            email: req.body.email,
            password: sha256(req.body.password + SALT),
        });
        const response = await newUser.save();

        // create and send token to front-end
        const token = jwt.sign(
            { email: req.body.email },
            SECRET,
            { expiresIn: '1d' }
        );


        console.log(`response after saving new user: ${response}`);
        res.status(200).json({ message: 'OK, user saved!', token });
    }

    function emailExists(response) {
        console.log(`email taken...${response}`);
        res.status(400).json({ message: 'EMAIL_TAKEN' });
    }


};

// login existing user
exports.loginUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // see if such email exists
    UserModel.findOne({ email: req.body.email })
        .then(response => response ? emailExists(response.password) : noSuchEmail())
        .catch(err => console.log(`main catch error: ${err}`))

    function emailExists(passwordFromDB) {
        // check if incoming password is same as stored
        const incomingHashedPassword = sha256(req.body.password + SALT);
        const storedHashedPassword = passwordFromDB;

        const same = incomingHashedPassword === storedHashedPassword;

        if (same) { // create and send token to front-end
            const token = jwt.sign(
                { email: req.body.email },
                SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).send(token);

        } else { // not same, send error to front-end
            res.status(400).json({ message: 'PASSWORD_MISMATCH' });
        }

    };

    function noSuchEmail() {
        res.status(400).json({ message: 'NO_SUCH_EMAIL' });
    };



};