const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/', usersController.registerUser);

module.exports = router;