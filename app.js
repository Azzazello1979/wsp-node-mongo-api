const express = require('express');
const app = express();
PORT = process.env.PORT || 7171 // <--- heroku will asign the port

app.get('/', (req, res) => {
    res.status(200).send('Ok, running');
});

app.listen(PORT, () => { console.log(`OK...listening on ${PORT}`) });