// Backend/Route/Admin.js
const express = require('express');
const router  = express.Router();
const adminController = require('../Controller/admin');

// Dashboard thống kê
router.get('/dashboard', adminController.getDashboardStats);

// Đơn hàng
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:orderId/status', adminController.updateOrderStatus);

// Tài khoản
router.get('/users', adminController.getAllUsers);

// Sản phẩm
router.get('/products', adminController.getAllProducts);

module.exports = router;
