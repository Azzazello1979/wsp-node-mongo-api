const express = require('express');
const router = express.Router();
const utilsController = require('./../controllers/utilsController');

router.get('/check-connection', utilsController.checkConnection);

module.exports = router;