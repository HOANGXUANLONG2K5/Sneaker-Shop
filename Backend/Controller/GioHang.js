const db = require("../DB/Connect");


// Thêm sản phẩm vào giỏ hàng
exports.addToCart = (req, res) => {
  const { MaNguoiDung, MaChiTietSanPham, SoLuong } = req.body;

  console.log("BODY NHẬN ĐƯỢC:", req.body); // debug

  if (!MaNguoiDung) {
    console.log("Thiếu MaNguoiDung:", MaNguoiDung);
    return res.status(400).json({ message: "Thiếu MaNguoiDung!" });
  }

  if (!MaChiTietSanPham) {
    console.log("Thiếu MaChiTietSanPham:", MaChiTietSanPham);
    return res.status(400).json({ message: "Thiếu MaChiTietSanPham!" });
  }

  if (!SoLuong) {
    console.log("Thiếu SoLuong:", SoLuong);
    return res.status(400).json({ message: "Thiếu SoLuong!" });
  }


  // Kiểm tra giỏ hàng của người dùng
  const sqlCart = `SELECT MaGioHang FROM GioHang WHERE MaNguoiDung = ?`;
  db.query(sqlCart, [MaNguoiDung], (err, cartResult) => {
    if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });

    const maGioHang = cartResult.length === 0 ? null : cartResult[0].MaGioHang;

    if (!maGioHang) {
      // Tạo giỏ mới
      const sqlCreateCart = `INSERT INTO GioHang (MaNguoiDung) VALUES (?)`;
      db.query(sqlCreateCart, [MaNguoiDung], (err, insertResult) => {
        if (err) return res.status(500).json({ message: "Không tạo được giỏ hàng", error: err });
        themVaoChiTiet(insertResult.insertId, MaChiTietSanPham, SoLuong, res);
      });
    } else {
      // Thêm hoặc cập nhật giỏ
      themVaoChiTiet(maGioHang, MaChiTietSanPham, SoLuong, res);
    }
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

// Cart.js (controller)

exports.deleteCartItem = (req, res) => {
    const { MaChiTietSanPham, MaNguoiDung } = req.body; // hoặc req.params nếu dùng params

    if (!MaChiTietSanPham || !MaNguoiDung) {
        return res.status(400).json({ message: 'Thiếu thông tin xóa sản phẩm' });
    }

    const sql = `
        DELETE FROM ChiTietGioHang 
        WHERE MaChiTietSanPham = ? 
        AND MaGioHang IN (
            SELECT MaGioHang FROM GioHang WHERE MaNguoiDung = ?
        )
    `;

    db.query(sql, [MaChiTietSanPham, MaNguoiDung], (err, result) => {
        if (err) return res.status(500).json({ message: 'Lỗi SQL khi xóa', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
        res.json({ message: 'Xóa sản phẩm thành công!' });
    });
};




