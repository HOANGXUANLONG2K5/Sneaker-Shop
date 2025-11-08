const db = require('../DB/Connect');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM NguoiDung', (err, results) => {
    if (err) res.status(500).json({ error: 'Lỗi server' });
    else res.json(results);
  });
};

exports.addUser = (req, res) => {
  const { MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar } = req.body;
  const sql = 'INSERT INTO NguoiDung (MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar], (err) => {
    if (err) res.status(500).json({ error: 'Lỗi server' });
    else res.json({ message: 'Thêm người dùng thành công!' });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar } = req.body;
  const sql = 'UPDATE NguoiDung SET MatKhau=?, Ho=?, Ten=?, GioiTinh=?, NgaySinh=?, SoDienThoai=?, Email=?, DiaChi=?, Avatar=? WHERE MaNguoiDung=?';
  db.query(sql, [MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar, id], (err) => {
    if (err) res.status(500).json({ error: 'Lỗi server' });
    else res.json({ message: 'Cập nhật người dùng thành công!' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM NguoiDung WHERE MaNguoiDung=?', [id], (err) => {
    if (err) res.status(500).json({ error: 'Lỗi server' });
    else res.json({ message: 'Xóa người dùng thành công!' });
  });
};

exports.loginUser = (req, res) => {
  const { Email, MatKhau } = req.body;

  const sql = 'SELECT * FROM NguoiDung WHERE Email = ? AND MatKhau = ?';
  db.query(sql, [Email, MatKhau], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    if (results.length > 0) {
      res.json({ message: 'Đăng nhập thành công!', user: results[0] });
    } else {
      res.status(401).json({ error: 'Sai email hoặc mật khẩu!' });
    }
  });
};
