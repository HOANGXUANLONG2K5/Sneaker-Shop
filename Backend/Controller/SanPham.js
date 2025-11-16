const db = require('../DB/Connect');

const ProductHelper = require('../Helper/SanPham');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductHelper.getAllWithDetails();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }

    const products = await ProductHelper.getBySearch(keyword);
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

