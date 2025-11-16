const db = require('../DB/Connect');
const Comment = require('../Model/BinhLuan');

const CommentHelper = {
  getComment: (productID) => {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT bl.MaBinhLuan, bl.SoSao, bl.NoiDung, bl.NgayBinhLuan,
                   bl.MaTaiKhoan, bl.MaSanPham,
                   tk.Ho, tk.Ten, tk.Avatar
            FROM BinhLuan bl
            JOIN TaiKhoan tk ON bl.MaTaiKhoan = tk.MaTaiKhoan
            WHERE bl.MaSanPham = ?
            ORDER BY bl.NgayBinhLuan DESC
        `;
      db.query(sql, [productID], (err, results) => {
        if (err) return reject(err);
        resolve(results.map(Comment.fromJSON));
      });
    });
  },


  addComment: (data) => {
    return new Promise((resolve, reject) => {
      const { MaTaiKhoan, MaSanPham, SoSao, NoiDung } = data;
      // Lưu ý đổi MaNguoiDung → MaTaiKhoan
      const sql = `
                INSERT INTO BinhLuan (MaTaiKhoan, MaSanPham, SoSao, NoiDung, NgayBinhLuan)
                VALUES (?, ?, ?, ?, NOW())
            `;
      db.query(sql, [MaTaiKhoan, MaSanPham, SoSao, NoiDung], (err, result) => {
        if (err) return reject(err);
        resolve(new Comment(result.insertId, MaTaiKhoan, MaSanPham, SoSao, NoiDung, new Date()));
      });
    });
  },

  updateComment: (id, data) => {
    return new Promise((resolve, reject) => {
      const { SoSao, NoiDung } = data;
      const sql = `UPDATE BinhLuan SET SoSao = ?, NoiDung = ? WHERE MaBinhLuan = ?`;
      db.query(sql, [SoSao, NoiDung, id], (err) => {
        if (err) return reject(err);
        resolve(new Comment(id, null, null, SoSao, NoiDung, new Date()));
      });
    });
  },

  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM BinhLuan WHERE MaBinhLuan = ?`;
      db.query(sql, [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};

module.exports = CommentHelper;
