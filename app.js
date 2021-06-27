const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const userSchema = require('./models/userSchema');
const User = mongoose.model('User', userSchema, 'users');

let connectionError = null;
let connected = null;

PORT = process.env.PORT || 7171 // <--- heroku will assign the port
DB_CLUSTER = process.env.DB_CLUSTER;
DB_DATABASE = process.env.DB_DATABASE;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASS;

// mongoDB Atlas connection string
const mongoConnectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority?authSource=admin`;

// mongoose connection to mongoDB Atlas
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoConnectionString, { useNewUrlParser: true })
    .then(() => { connected = 'OK, connected' })
    .catch(err => { connectionError = err.message })

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check mongoDB Atlas connection
app.get('/check-connection', (req, res) => {
    if (!connectionError) {
        res.status(200).send(connected);
    } else {
        res.status(500).send(connectionError);
    }
});

app.get('/test-db', (req, res) => {
    User.findOne({ username: 'Peti' }, 'password')
        .then(result => res.status(200).send(result))
        .catch(err => res.status(404).send(err))
});

app.listen(PORT, (err) => {
    console.log(err ? `Error: Express cannot bind to port ${PORT}` : `OK... Express listening on port ${PORT}`);
});