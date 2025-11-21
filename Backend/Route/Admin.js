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

// Sản phẩm – list
router.get('/products', adminController.getAllProducts);

// Top bán chạy
router.get('/products/top-selling', adminController.getTopProducts);

// Sản phẩm – thêm mới
router.post('/products', adminController.createProduct);

// Sản phẩm – cập nhật
router.put('/products/:id', adminController.updateProduct);

// Sản phẩm – xoá
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
