const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

PORT = process.env.PORT || 7171 // <--- heroku will assign the port
DB_CLUSTER = process.env.DB_CLUSTER;
DB_DATABASE = process.env.DB_DATABASE;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASS;

// mongoDB connection
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {

    client.connect((err, db) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(db);
        }
    });

});

app.listen(PORT, () => { console.log(`OK...listening on ${PORT}`) });