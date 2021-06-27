// module imports
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// mongoDB Atlas connection flags
exports.connectionErrorMsg = null;
exports.connectedMsg = null;

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
const checkConnectionRoute = require('./routes/check-connection');
const usersRoute = require('./routes/users');

////////////////////// middleware chain //////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/check-connection', checkConnectionRoute);
app.use('/users', usersRoute);

// launch server
app.listen(PORT, (err) => {
    console.log(err ? `Error: Express cannot bind to port ${PORT}` : `OK... Express listening on port ${PORT}`);
});