const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Route/Nguoidung');
const productRoutes = require('./Route/SanPham');

const app = express();
const port = 3000;

app.use(cors());  

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));
