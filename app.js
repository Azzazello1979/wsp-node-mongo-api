const express = require('express');
const app = express();
const cors = require('cors');
PORT = process.env.PORT || 7171 // <--- heroku will assign the port

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Ok, running');
});

app.listen(PORT, () => { console.log(`OK...listening on ${PORT}`) });