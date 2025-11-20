// Backend/Helper/Admin.js
const db = require('../DB/Connect');
const {
  DashboardStats,
  AdminOrderView,
  AdminUserView,
  ProductAdminSummary
} = require('../Model/Admin');

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
        // Dùng Model
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

        // Map mỗi row thành AdminOrderView
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

  // ====== SẢN PHẨM ======
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
  }
};

module.exports = AdminHelper;
