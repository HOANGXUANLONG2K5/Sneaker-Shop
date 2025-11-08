const express = require('express');
const router = express.Router();
const cartController = require('../Controller/GioHang');

router.get('/:userId', cartController.getCartByUser);
router.get('/', cartController.getCart); 
router.post('/add', cartController.addToCart);

module.exports = router;
