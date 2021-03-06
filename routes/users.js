const express = require('express');
const router = express.Router();
const tokenGuard = require('./../middlewares/tokenGuard');
const usersController = require('./../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

module.exports = router;