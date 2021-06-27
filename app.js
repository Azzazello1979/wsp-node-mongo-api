const express = require('express');
const app = express();
const PORT = 7122;

app.get('/', (req, res) => {
    res.status(200).send('Ok, running');
});

app.listen(PORT, () => { console.log(`OK...listening on ${PORT}`) });