const db = require('../DB/Connect');
const TaiKhoan = require('../Model/TaiKhoan');

const TaiKhoanHelper = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM TaiKhoan', (err, results) => {
        if (err) return reject(err);
        resolve(results.map(TaiKhoan.fromJSON));
      });
    });
  },

  add: (tk) => {
    return new Promise((resolve, reject) => {
      const checkSql = 'SELECT * FROM TaiKhoan WHERE Email = ?';
      db.query(checkSql, [tk.Email], (err, results) => {
        if (err) return reject({ status: 500, message: 'Lỗi database!' });

        if (results.length > 0) {
          return reject({ status: 400, message: 'Email đã tồn tại!' });
        }

        const sql = `
        INSERT INTO TaiKhoan 
        (MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar, VaiTro)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
        db.query(sql, [tk.MatKhau, tk.Ho, tk.Ten, tk.GioiTinh, tk.NgaySinh, tk.SoDienThoai, tk.Email, tk.DiaChi, tk.Avatar, tk.VaiTro || 'user'],
          (err, result) => {
            if (err) return reject({ status: 500, message: 'Thêm tài khoản thất bại!' });
            resolve({ message: 'Thêm tài khoản thành công!', id: result.insertId });
          });
      });
    });
  },


  update: (id, tk) => {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      // Chỉ thêm các trường thực sự có giá trị
      if (tk.MatKhau !== undefined) { fields.push("MatKhau=?"); values.push(tk.MatKhau); }
      if (tk.Ho !== undefined) { fields.push("Ho=?"); values.push(tk.Ho); }
      if (tk.Ten !== undefined) { fields.push("Ten=?"); values.push(tk.Ten); }
      if (tk.GioiTinh !== undefined) { fields.push("GioiTinh=?"); values.push(tk.GioiTinh); }
      if (tk.NgaySinh !== undefined) { fields.push("NgaySinh=?"); values.push(tk.NgaySinh); }
      if (tk.SoDienThoai !== undefined) { fields.push("SoDienThoai=?"); values.push(tk.SoDienThoai); }
      if (tk.Email !== undefined) { fields.push("Email=?"); values.push(tk.Email); }
      if (tk.DiaChi !== undefined) { fields.push("DiaChi=?"); values.push(tk.DiaChi); }
      if (tk.Avatar !== undefined) { fields.push("Avatar=?"); values.push(tk.Avatar); }
      if (tk.VaiTro !== undefined) { fields.push("VaiTro=?"); values.push(tk.VaiTro); }

      if (fields.length === 0) return resolve({ message: "Không có gì để cập nhật!" });

      const sql = `UPDATE TaiKhoan SET ${fields.join(", ")} WHERE MaTaiKhoan=?`;
      values.push(id);

      db.query(sql, values, (err) => {
        if (err) return reject(err);
        resolve({ message: "Cập nhật tài khoản thành công!" });
      });
    });
  },

  // Thêm hàm changePassword
  changePassword: (id, currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      // 1. Lấy mật khẩu hiện tại của user
      const sqlGet = "SELECT MatKhau FROM TaiKhoan WHERE MaTaiKhoan = ?";
      db.query(sqlGet, [id], (err, results) => {
        if (err) return reject({ status: 500, message: "Lỗi server!" });
        if (results.length === 0) return reject({ status: 404, message: "Không tìm thấy tài khoản!" });

        const oldPassword = results[0].MatKhau;

        // 2. Kiểm tra mật khẩu hiện tại
        if (oldPassword !== currentPassword) {
          return reject({ status: 400, message: "Mật khẩu hiện tại không đúng!" });
        }

        // 3. Update mật khẩu mới
        const sqlUpdate = "UPDATE TaiKhoan SET MatKhau=? WHERE MaTaiKhoan=?";
        db.query(sqlUpdate, [newPassword, id], (err2) => {
          if (err2) return reject({ status: 500, message: "Cập nhật mật khẩu thất bại!" });
          resolve({ message: "Đổi mật khẩu thành công!" });
        });
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM TaiKhoan WHERE MaTaiKhoan = ?', [id], (err) => {
        if (err) return reject(err);
        resolve({ message: 'Xóa tài khoản thành công!' });
      });
    });
  },

  login: ({ Email, MatKhau }) => {
    return new Promise((resolve, reject) => {
      console.log('Login helper nhận:', Email, MatKhau); // log xem có nhận đúng không
      const sql = 'SELECT * FROM TaiKhoan WHERE Email=? AND MatKhau=?';
      db.query(sql, [Email, MatKhau], (err, results) => {
        if (err) {
          console.error('Query login lỗi:', err); // log chi tiết lỗi
          return reject(err);
        }
        if (results.length > 0) resolve({ message: 'Đăng nhập thành công!', user: results[0] });
        else reject({ status: 401, message: 'Sai email hoặc mật khẩu!' });
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM TaiKhoan WHERE MaTaiKhoan = ?";
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject({ status: 404, message: "Không tìm thấy user!" });
        resolve(TaiKhoan.fromJSON(results[0]));
      });
    });
  }
};


module.exports = TaiKhoanHelper;


