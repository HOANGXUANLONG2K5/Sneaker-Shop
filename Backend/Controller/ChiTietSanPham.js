const db = require('../DB/Connect');

exports.getProductDetailByID = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT sp.*, ct.KichThuoc, ct.GiaXuat, ct.GiaNhap, ct.SoLuong
    FROM SanPham sp
    LEFT JOIN ChiTietSanPham ct ON sp.MaSanPham = ct.MaSanPham
    WHERE sp.MaSanPham = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Lỗi SQL:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
    console.log('Kết quả query:', result);
    res.json(result);
  });
};
