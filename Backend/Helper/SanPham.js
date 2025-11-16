const db = require('../DB/Connect');
const Product = require('../Model/SanPham');

const ProductHelper = {
  getAllWithDetails: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT sp.*, ct.MaChiTietSanPham, ct.KichThuoc, ct.GiaNhap, ct.GiaXuat, ct.SoLuong
        FROM SanPham sp
        LEFT JOIN ChiTietSanPham ct ON sp.MaSanPham = ct.MaSanPham
      `;
      db.query(sql, (err, results) => {
        if (err) return reject(err);

        const productMap = new Map();

        results.forEach(row => {
          if (productMap.has(row.MaSanPham)) {
            productMap.get(row.MaSanPham).chiTiet.push({
              id: row.MaChiTietSanPham,
              kichThuoc: row.KichThuoc,
              giaNhap: row.GiaNhap,
              giaXuat: row.GiaXuat,
              soLuong: row.SoLuong
            });
          } else {
            productMap.set(row.MaSanPham, Product.fromJSONWithDetails(row));
          }
        });

        resolve(Array.from(productMap.values()));
      });
    });
  },

  getBySearch: (keyword) => { 
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT sp.*, ct.MaChiTietSanPham, ct.KichThuoc, ct.GiaNhap, ct.GiaXuat, ct.SoLuong
        FROM SanPham sp
        LEFT JOIN ChiTietSanPham ct ON sp.MaSanPham = ct.MaSanPham
        WHERE sp.TenSanPham LIKE ? OR sp.MoTa LIKE ?;
      `;

      db.query(sql, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
        if (err) return reject(err);

        const productMap = new Map();

        results.forEach(row => {
          if (productMap.has(row.MaSanPham)) {
            productMap.get(row.MaSanPham).chiTiet.push({
              id: row.MaChiTietSanPham,
              kichThuoc: row.KichThuoc,
              giaNhap: row.GiaNhap,
              giaXuat: row.GiaXuat,
              soLuong: row.SoLuong
            });
          } else {
            productMap.set(row.MaSanPham, Product.fromJSONWithDetails(row));
          }
        });

        resolve(Array.from(productMap.values()));
      });
    });
  }
};

module.exports = ProductHelper;
