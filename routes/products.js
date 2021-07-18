const express = require('express');
const router = express.Router();
const tokenGuard = require('./../middlewares/tokenGuard');
const productsController = require('./../controllers/productsController');

router.get('/', productsController.getAllProducts);
router.post('/', productsController.saveProduct);

module.exports = router;