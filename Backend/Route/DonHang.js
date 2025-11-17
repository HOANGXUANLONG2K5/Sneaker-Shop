// Route: Route/DonHang.js
const express = require("express");
const router = express.Router();
const orderController = require("../Controller/DonHang");

router.post("/", orderController.createOrder);
router.get("/:userId", orderController.getOrdersByUser);

module.exports = router;
