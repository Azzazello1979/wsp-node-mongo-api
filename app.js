const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

let connectionError = null;
let connected = null;

PORT = process.env.PORT || 7171 // <--- heroku will assign the port
DB_CLUSTER = process.env.DB_CLUSTER;
DB_DATABASE = process.env.DB_DATABASE;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASS;

// mongoDB connection string
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority?authSource=admin`;

// mongoose connection to mongoDB Atlas
mongoose.set('useCreateIndex', true);
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => { connected = 'OK, connected' })
    .catch(err => { connectionError = err.message })

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {

    if (!connectionError) {
        res.status(200).send(connected);
    } else {
        res.status(500).send(connectionError);
    }

});

app.listen(PORT, () => { console.log(`OK...listening on ${PORT}`) });