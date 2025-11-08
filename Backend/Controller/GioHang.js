const db = require("../DB/Connect");

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = (req, res) => {
  const { maNguoiDung, productId, kichThuoc, soLuong } = req.body;

  if (!maNguoiDung || !productId || !kichThuoc || !soLuong) {
    return res.status(400).json({ message: "Thiếu dữ liệu!" });
  }

  // Kiểm tra chi tiết sản phẩm
  const sqlFind = `
    SELECT ct.MaChiTietSanPham 
    FROM ChiTietSanPham ct
    WHERE ct.MaSanPham = ? AND ct.KichThuoc = ?;
  `;

  db.query(sqlFind, [productId, kichThuoc], (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm với kích thước này!" });

    const maChiTietSP = result[0].MaChiTietSanPham;

    // Kiểm tra giỏ hàng của người dùng
    const sqlCart = `SELECT MaGioHang FROM GioHang WHERE MaNguoiDung = ?`;
    db.query(sqlCart, [maNguoiDung], (err, cartResult) => {
      if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });

      const maGioHang = cartResult.length === 0
        ? null
        : cartResult[0].MaGioHang;

      if (!maGioHang) {
        // Nếu chưa có giỏ → tạo mới
        const sqlCreateCart = `INSERT INTO GioHang (MaNguoiDung) VALUES (?)`;
        db.query(sqlCreateCart, [maNguoiDung], (err, insertResult) => {
          if (err) return res.status(500).json({ message: "Không tạo được giỏ hàng", error: err });
          themVaoChiTiet(insertResult.insertId, maChiTietSP, soLuong, res);
        });
      } else {
        // Nếu đã có giỏ → thêm hoặc cập nhật
        themVaoChiTiet(maGioHang, maChiTietSP, soLuong, res);
      }
    });
  });
};

// Lấy toàn bộ giỏ hàng (demo)
exports.getCart = (req, res) => {
  const sql = `SELECT * FROM GioHang`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });
    res.json(result);
  });
};

// Hàm phụ: thêm sản phẩm vào chi tiết giỏ hàng
function themVaoChiTiet(maGioHang, maChiTietSP, soLuong, res) {
  const sqlCheck = `
    SELECT * FROM ChiTietGioHang 
    WHERE MaGioHang = ? AND MaChiTietSanPham = ?;
  `;

  db.query(sqlCheck, [maGioHang, maChiTietSP], (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });

    if (result.length > 0) {
      const sqlUpdate = `
        UPDATE ChiTietGioHang 
        SET SoLuong = SoLuong + ? 
        WHERE MaGioHang = ? AND MaChiTietSanPham = ?;
      `;
      db.query(sqlUpdate, [soLuong, maGioHang, maChiTietSP], (err) => {
        if (err) return res.status(500).json({ message: "Lỗi khi cập nhật giỏ hàng", error: err });
        return res.json({ message: "Cập nhật giỏ hàng thành công!" });
      });
    } else {
      const sqlInsert = `
        INSERT INTO ChiTietGioHang (MaGioHang, MaChiTietSanPham, SoLuong)
        VALUES (?, ?, ?);
      `;
      db.query(sqlInsert, [maGioHang, maChiTietSP, soLuong], (err) => {
        if (err) return res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng", error: err });
        return res.json({ message: "Đã thêm sản phẩm vào giỏ hàng!" });
      });
    }
  });
}

exports.getCartByUser = (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT ct.MaChiTietGioHang,
           ct.MaGioHang,
           ct.MaChiTietSanPham,
           ct.SoLuong,
           sp.TenSanPham,
           cts.KichThuoc,
           cts.GiaXuat
    FROM ChiTietGioHang ct
    JOIN ChiTietSanPham cts ON ct.MaChiTietSanPham = cts.MaChiTietSanPham
    JOIN SanPham sp ON cts.MaSanPham = sp.MaSanPham
    WHERE ct.MaGioHang IN (
        SELECT MaGioHang 
        FROM GioHang 
        WHERE MaNguoiDung = ?
    )
  `;
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });
    res.json(result);
  });
};



