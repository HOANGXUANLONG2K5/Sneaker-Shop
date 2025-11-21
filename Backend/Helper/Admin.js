// Backend/Helper/Admin.js
const db = require('../DB/Connect');
const {
  DashboardStats,
  AdminOrderView,
  AdminUserView,
  ProductAdminSummary,
  TopProductStats
} = require('../Model/Admin');

// Hàm dùng chung: lấy summary 1 sản phẩm theo MaSanPham
function getProductSummaryById(maSanPham) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        sp.MaSanPham,
        sp.TenSanPham,
        sp.ThuongHieu,
        sp.Anh,
        sp.Model3D,
        sp.MoTa,
        IFNULL(SUM(ctsp.SoLuong), 0) AS TongSoLuong,
        MIN(ctsp.GiaXuat)            AS GiaThapNhat,
        MAX(ctsp.GiaXuat)            AS GiaCaoNhat
      FROM SanPham sp
      LEFT JOIN ChiTietSanPham ctsp
        ON sp.MaSanPham = ctsp.MaSanPham
      WHERE sp.MaSanPham = ?
      GROUP BY
        sp.MaSanPham,
        sp.TenSanPham,
        sp.ThuongHieu,
        sp.Anh,
        sp.Model3D,
        sp.MoTa
    `;

    db.query(sql, [maSanPham], (err, rows) => {
      if (err) return reject(err);
      if (!rows.length) return resolve(null);
      const product = ProductAdminSummary.fromRow(rows[0]);
      resolve(product);
    });
  });
}

const AdminHelper = {
  // ====== DASHBOARD ======
  getDashboardStats: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          (SELECT COUNT(*) FROM TaiKhoan WHERE VaiTro = 'user')  AS totalUsers,
          (SELECT COUNT(*) FROM TaiKhoan WHERE VaiTro = 'admin') AS totalAdmins,
          (SELECT COUNT(*) FROM SanPham)                         AS totalProducts,
          (SELECT COUNT(*) FROM DonHang)                         AS totalOrders,
          (SELECT IFNULL(SUM(SoTien), 0)
           FROM ThanhToan
           WHERE TrangThai = 'Thành công')                      AS totalRevenue
      `;

      db.query(sql, (err, results) => {
        if (err) return reject(err);
        const stats = DashboardStats.fromRow(results[0]);
        resolve(stats);
      });
    });
  },

  // ====== ĐƠN HÀNG ======
  getAllOrders: (status) => {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT
          dh.MaDonHang,
          dh.MaTaiKhoan,
          tk.Ho,
          tk.Ten,
          tk.Email,
          dh.NgayDat,
          dh.TrangThaiDonHang,
          dh.DiaChiGiaoToi,
          dh.SoDienThoai,
          dh.TongTien,
          tt.PhuongThucThanhToan,
          tt.SoTien,
          tt.TrangThai AS TrangThaiThanhToan,
          tt.Ngay      AS NgayThanhToan
        FROM DonHang dh
        JOIN TaiKhoan tk ON dh.MaTaiKhoan = tk.MaTaiKhoan
        LEFT JOIN ThanhToan tt ON dh.MaDonHang = tt.MaDonHang
      `;
      const params = [];

      if (status) {
        sql += " WHERE dh.TrangThaiDonHang = ?";
        params.push(status);
      }

      sql += " ORDER BY dh.NgayDat DESC";

      db.query(sql, params, (err, rows) => {
        if (err) return reject(err);
        const orders = rows.map(row => AdminOrderView.fromRow(row));
        resolve(orders);
      });
    });
  },

  updateOrderStatus: (orderId, status) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE DonHang SET TrangThaiDonHang = ? WHERE MaDonHang = ?";

      db.query(sql, [status, orderId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // ====== TÀI KHOẢN ======
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          MaTaiKhoan,
          Ho,
          Ten,
          Email,
          SoDienThoai,
          GioiTinh,
          NgaySinh,
          DiaChi,
          Avatar,
          VaiTro
        FROM TaiKhoan
        ORDER BY MaTaiKhoan DESC
      `;

      db.query(sql, (err, rows) => {
        if (err) return reject(err);
        const users = rows.map(row => AdminUserView.fromRow(row));
        resolve(users);
      });
    });
  },

  // ====== SẢN PHẨM – LIST TÓM TẮT ======
  getAllProductsWithSummary: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          sp.MaSanPham,
          sp.TenSanPham,
          sp.ThuongHieu,
          sp.Anh,
          sp.Model3D,
          sp.MoTa,
          IFNULL(SUM(ctsp.SoLuong), 0) AS TongSoLuong,
          MIN(ctsp.GiaXuat)            AS GiaThapNhat,
          MAX(ctsp.GiaXuat)            AS GiaCaoNhat
        FROM SanPham sp
        LEFT JOIN ChiTietSanPham ctsp
          ON sp.MaSanPham = ctsp.MaSanPham
        GROUP BY
          sp.MaSanPham,
          sp.TenSanPham,
          sp.ThuongHieu,
          sp.Anh,
          sp.Model3D,
          sp.MoTa
        ORDER BY sp.MaSanPham DESC
      `;

      db.query(sql, (err, rows) => {
        if (err) return reject(err);
        const products = rows.map(row => ProductAdminSummary.fromRow(row));
        resolve(products);
      });
    });
  },

  // ====== SẢN PHẨM – TOP BÁN CHẠY ======
  // trả về mảng top sản phẩm: { maSanPham, tenSanPham, tongSoLuongBan }
  getTopSellingProducts: (limit = 5) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          sp.MaSanPham,
          sp.TenSanPham,
          SUM(ctdh.SoLuong) AS TongSoLuongBan
        FROM ChiTietDonHang ctdh
        JOIN ChiTietSanPham ctp
          ON ctdh.MaChiTietSanPham = ctp.MaChiTietSanPham
        JOIN SanPham sp
          ON ctp.MaSanPham = sp.MaSanPham
        GROUP BY sp.MaSanPham, sp.TenSanPham
        ORDER BY TongSoLuongBan DESC
        LIMIT ?
      `;

      db.query(sql, [limit], (err, rows) => {
        if (err) return reject(err);
        const result = rows.map(row => TopProductStats.fromRow(row));
        resolve(result);
      });
    });
  },

  // ====== SẢN PHẨM – THÊM MỚI ======
  // input: { tenSanPham, thuongHieu, anh, model3D, moTa }
  createProduct: (payload) => {
    return new Promise((resolve, reject) => {
      const {
        tenSanPham,
        thuongHieu = null,
        anh = null,
        model3D = null,
        moTa = null
      } = payload;

      const sqlInsert = `
        INSERT INTO SanPham (TenSanPham, ThuongHieu, Anh, Model3D, MoTa)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sqlInsert,
        [tenSanPham, thuongHieu, anh, model3D, moTa],
        (err, result) => {
          if (err) return reject(err);
          const newId = result.insertId;
          // Lấy lại summary cho sản phẩm mới tạo
          getProductSummaryById(newId)
            .then(product => resolve(product))
            .catch(reject);
        }
      );
    });
  },

  // ====== SẢN PHẨM – CẬP NHẬT ======
  // input: (maSanPham, { tenSanPham, thuongHieu, anh, model3D, moTa })
  updateProduct: (maSanPham, payload) => {
    return new Promise((resolve, reject) => {
      const {
        tenSanPham,
        thuongHieu = null,
        anh = null,
        model3D = null,
        moTa = null
      } = payload;

      const sqlUpdate = `
        UPDATE SanPham
        SET TenSanPham = ?,
            ThuongHieu = ?,
            Anh        = ?,
            Model3D    = ?,
            MoTa       = ?
        WHERE MaSanPham = ?
      `;

      db.query(
        sqlUpdate,
        [tenSanPham, thuongHieu, anh, model3D, moTa, maSanPham],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) {
            // Không tìm thấy sản phẩm
            return resolve(null);
          }
          // Lấy lại summary mới
          getProductSummaryById(maSanPham)
            .then(product => resolve(product))
            .catch(reject);
        }
      );
    });
  },

  // ====== SẢN PHẨM – XOÁ ======
  deleteProduct: (maSanPham) => {
    return new Promise((resolve, reject) => {
      // Xoá chi tiết sản phẩm trước (tránh lỗi FK)
      const sqlDeleteDetails = `
        DELETE FROM ChiTietSanPham WHERE MaSanPham = ?
      `;
      db.query(sqlDeleteDetails, [maSanPham], (err) => {
        if (err) return reject(err);

        // Sau đó xoá sản phẩm
        const sqlDeleteProduct = `
          DELETE FROM SanPham WHERE MaSanPham = ?
        `;
        db.query(sqlDeleteProduct, [maSanPham], (err2, result) => {
          if (err2) return reject(err2);
          resolve(result); // result.affectedRows để controller xử lý
        });
      });
    });
  }
};

module.exports = AdminHelper;
