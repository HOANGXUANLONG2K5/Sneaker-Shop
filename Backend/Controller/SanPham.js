const db = require('../DB/Connect');

exports.getAllProducts = (req, res) => {
  const sql = `
    SELECT sp.*, ct.GiaXuat, ct.GiaNhap, ct.SoLuong
    FROM SanPham sp
    LEFT JOIN ChiTietSanPham ct ON sp.MaSanPham = ct.MaSanPham
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Lỗi SQL:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
    console.log('Kết quả query:', result);
    res.json(result);
  });
};

exports.getProductsByBrand = (req, res) => {
  const brand = req.query.hang;
  const sql = `
    SELECT sp.*, ct.GiaXuat 
    FROM SanPham sp
    LEFT JOIN ChiTietSanPham ct ON sp.MaSanPham = ct.MaSanPham
    WHERE sp.ThuongHieu = ?`;
  db.query(sql, [brand], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.json(result);
  });
};


