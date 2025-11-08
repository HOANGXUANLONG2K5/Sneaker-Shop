const express = require('express');
const router  = express.Router();
const productController = require('../Controller/ChiTietSanPham');

router.get('/:id', productController.getProductDetailByID);


module.exports = router;
