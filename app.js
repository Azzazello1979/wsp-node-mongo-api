// module imports
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config('.env');
const mongoose = require('mongoose');

// mongoDB Atlas connection flags
let connectionErrorMsg = null;
let connectedMsg = null;

// process env files
PORT = process.env.PORT || 80 // <--- heroku will assign the port
DB_CLUSTER = process.env.DB_CLUSTER;
DB_DATABASE = process.env.DB_DATABASE;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASS;

// mongoDB Atlas connection string
const mongoConnectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority?authSource=admin`;

// mongoose connection to mongoDB Atlas
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { connectedMsg = 'OK, connected to MongoDB Atlas'; })
    .catch(err => { connectionErrorMsg = `Error when connecting to MongoDB Atlas: ${err.message}`; })

// require routes
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

////////////////////// middleware chain //////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoute);
app.use('/products', productsRoute);


// check connection...
app.get('/check-connection', (req, res) => {
    if (!connectionErrorMsg) {
        res.status(200).send(connectedMsg);
    } else {
        res.status(500).send(connectionErrorMsg);
    }
});

// launch server
app.listen(PORT, (err) => {
    console.log(err ? `Error: Express cannot bind to port ${PORT}` : `OK... Express listening on port ${PORT}`);
});
