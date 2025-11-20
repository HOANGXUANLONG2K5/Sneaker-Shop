const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

// Import routes
const userRoutes = require("./Route/TaiKhoan");
const productRoutes = require("./Route/SanPham");
const productDetailRoutes = require("./Route/ChiTietSanPham");
const cartRoutes = require("./Route/GioHang");
const commentRoutes = require("./Route/BinhLuan");
const orderRoutes = require("./Route/DonHang");

//Import routes quanly
const adminRoutes = require("./Route/Admin");


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cho phép truy cập các file trong folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes khach
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/productdetails", productDetailRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/order", orderRoutes);

//Routes quanly
app.use("/api/admin", adminRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server đang chạy tại: http://localhost:${port}`);
});
