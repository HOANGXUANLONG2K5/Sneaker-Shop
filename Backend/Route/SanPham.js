const express = require('express');
const router  = express.Router();
const productController = require('../Controller/SanPham');

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);


module.exports = router;
