const db = require('../DB/Connect');
const Cart = require('../Model/GioHang');

const CartHelper = {
    async getCartByUser(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT 
                ct.MaGioHang,
                ct.MaChiTietSanPham,
                ct.SoLuong,
                gh.MaTaiKhoan AS MaNguoiDung,
                sp.TenSanPham,
                ctp.GiaXuat,
                ctp.KichThuoc
            FROM ChiTietGioHang ct
            JOIN GioHang gh ON ct.MaGioHang = gh.MaGioHang
            JOIN ChiTietSanPham ctp ON ct.MaChiTietSanPham = ctp.MaChiTietSanPham
            JOIN SanPham sp ON ctp.MaSanPham = sp.MaSanPham
            WHERE gh.MaTaiKhoan = ?
        `;

            db.query(sql, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }

                const carts = results.map((row) => Cart.fromJSON(row));
                resolve(carts);
            });
        });
    },

    async addProduct(data) {
        const { MaNguoiDung, MaChiTietSanPham, SoLuong } = data;
        return new Promise((resolve, reject) => {
            const sqlCart = `SELECT MaGioHang FROM GioHang WHERE MaTaiKhoan = ?`;
            db.query(sqlCart, [MaNguoiDung], (err, cartResult) => {
                if (err) return reject(err);
                let maGioHang = cartResult.length ? cartResult[0].MaGioHang : null;

                const addToChiTiet = (maGioHang) => {
                    const sqlCheck = `
                        SELECT * FROM ChiTietGioHang 
                        WHERE MaGioHang = ? AND MaChiTietSanPham = ?
                    `;
                    db.query(sqlCheck, [maGioHang, MaChiTietSanPham], (err, result) => {
                        if (err) return reject(err);
                        if (result.length > 0) {
                            const sqlUpdate = `
                                UPDATE ChiTietGioHang 
                                SET SoLuong = SoLuong + ? 
                                WHERE MaGioHang = ? AND MaChiTietSanPham = ?
                            `;
                            db.query(sqlUpdate, [SoLuong, maGioHang, MaChiTietSanPham], (err) => {
                                if (err) return reject(err);
                                resolve(new Cart(maGioHang, MaNguoiDung, MaChiTietSanPham, SoLuong));
                            });
                        } else {
                            const sqlInsert = `
                                INSERT INTO ChiTietGioHang (MaGioHang, MaChiTietSanPham, SoLuong)
                                VALUES (?, ?, ?)
                            `;
                            db.query(sqlInsert, [maGioHang, MaChiTietSanPham, SoLuong], (err) => {
                                if (err) return reject(err);
                                resolve(new Cart(maGioHang, MaNguoiDung, MaChiTietSanPham, SoLuong));
                            });
                        }
                    });
                };

                if (!maGioHang) {
                    const sqlCreate = `INSERT INTO GioHang (MaTaiKhoan) VALUES (?)`;
                    db.query(sqlCreate, [MaNguoiDung], (err, insertResult) => {
                        if (err) return reject(err);
                        maGioHang = insertResult.insertId;
                        addToChiTiet(maGioHang);
                    });
                } else {
                    addToChiTiet(maGioHang);
                }
            });
        });
    },

    async deleteProduct(MaChiTietSanPham, MaNguoiDung) {
        return new Promise((resolve, reject) => {
            const sql = `
                DELETE FROM ChiTietGioHang 
                WHERE MaChiTietSanPham = ? 
                AND MaGioHang IN (SELECT MaGioHang FROM GioHang WHERE MaTaiKhoan = ?)
            `;
            db.query(sql, [MaChiTietSanPham, MaNguoiDung], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
};

module.exports = CartHelper;
