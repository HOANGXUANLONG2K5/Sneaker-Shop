const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Route/Nguoidung');
const productRoutes = require('./Route/SanPham');
const productDetailRoutes = require('./Route/ChiTietSanPham');
const cartRoutes = require('./Route/GioHang');

const app = express();
const port = 3000;

app.use(cors());  

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productdetails', productDetailRoutes);
app.use('/api/cart', cartRoutes);

app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));
