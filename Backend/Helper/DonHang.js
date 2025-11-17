const db = require('../DB/Connect');

const OrderHelper = {

    async createOrder(MaTaiKhoan, DiaChiGiaoToi, SoDienThoai, PhuongThucThanhToan) {
        return new Promise((resolve, reject) => {

            // 1. Lấy giỏ hàng
            const sqlCart = `
                SELECT gh.MaGioHang, ct.MaChiTietSanPham, ct.SoLuong, ctp.GiaXuat
                FROM ChiTietGioHang ct
                JOIN GioHang gh ON ct.MaGioHang = gh.MaGioHang
                JOIN ChiTietSanPham ctp ON ct.MaChiTietSanPham = ctp.MaChiTietSanPham
                WHERE gh.MaTaiKhoan = ?
            `;

            db.query(sqlCart, [MaTaiKhoan], (err, cartItems) => {
                if (err) return reject(err);
                if (cartItems.length === 0) return reject("Giỏ hàng rỗng!");

                // 2. Tổng tiền
                const TongTien = cartItems.reduce((sum, item) => {
                    return sum + item.GiaXuat * item.SoLuong;
                }, 0);

                // 3. Tạo đơn hàng
                const sqlOrder = `
                    INSERT INTO DonHang (MaTaiKhoan, NgayDat, TrangThaiDonHang, DiaChiGiaoToi, SoDienThoai, TongTien)
                    VALUES (?, NOW(), 'Đang xử lý', ?, ?, ?)
                `;

                db.query(sqlOrder, [MaTaiKhoan, DiaChiGiaoToi, SoDienThoai, TongTien], (err, result) => {
                    if (err) return reject(err);

                    const MaDonHang = result.insertId;

                    // 4. Insert chi tiết đơn
                    cartItems.forEach(item => {
                        const sqlDetail = `
                            INSERT INTO ChiTietDonHang (MaDonHang, MaChiTietSanPham, SoLuong, Gia)
                            VALUES (?, ?, ?, ?)
                        `;
                        db.query(sqlDetail, [
                            MaDonHang,
                            item.MaChiTietSanPham,
                            item.SoLuong,
                            item.GiaXuat
                        ]);
                    });

                    // 5. Xóa giỏ hàng
                    const sqlDelete = `
                        DELETE FROM ChiTietGioHang 
                        WHERE MaGioHang = ?
                    `;
                    db.query(sqlDelete, [cartItems[0].MaGioHang]);

                    // 6. THÊM VÀO BẢNG THANH TOÁN
                    const sqlPayment = `
                        INSERT INTO ThanhToan (MaDonHang, PhuongThucThanhToan, TrangThaiThanhToan, NgayThanhToan)
                        VALUES (?, ?, ?, ?)
                    `;

                    const isCOD = PhuongThucThanhToan === "COD";

                    db.query(sqlPayment, [
                        MaDonHang,
                        PhuongThucThanhToan,
                        isCOD ? "Chưa thanh toán" : "Đã thanh toán",
                        isCOD ? null : new Date()
                    ]);

                    resolve({ MaDonHang, TongTien });
                });
            });
        });
    },

    async getOrdersByUser(userId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM DonHang WHERE MaTaiKhoan = ? ORDER BY NgayDat DESC`;
            db.query(sql, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results); 
            });
        });
    }

};

module.exports = OrderHelper;
