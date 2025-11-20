const OrderHelper = require('../Helper/DonHang'); // helper xử lý DB
const DonHang = require('../Model/DonHang');       // model DonHang nếu muốn tạo object

exports.createOrder = async (req, res) => {
    try {
        const { MaTaiKhoan, DiaChiGiaoToi, SoDienThoai, PhuongThucThanhToan } = req.body;
        if (!MaTaiKhoan || !DiaChiGiaoToi || !SoDienThoai || !PhuongThucThanhToan) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        // tạo đơn hàng trong DB
        const orderData = await OrderHelper.createOrder(MaTaiKhoan, DiaChiGiaoToi, SoDienThoai, PhuongThucThanhToan);

        const order = new DonHang(
            orderData.MaDonHang,
            MaTaiKhoan,
            new Date(),
            'Đang xử lý',
            DiaChiGiaoToi,
            SoDienThoai,
            orderData.TongTien
        );

        res.json({ message: "Tạo đơn hàng thành công!", data: order });

    } catch (err) {
        console.error("Lỗi tạo đơn hàng:", err); 
        res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error: err.toString() });
    }
};

exports.getOrdersByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const results = await OrderHelper.getOrdersByUser(userId);

        const orders = results.map(r => new DonHang(
            r.MaDonHang,
            r.MaTaiKhoan,
            r.NgayDat,
            r.TrangThaiDonHang,
            r.DiaChiGiaoToi,
            r.SoDienThoai,
            r.TongTien
        ));

        res.json(orders);
    } catch (err) {
        console.error("Lỗi lấy lịch sử đơn hàng:", err);
        res.status(500).json({ message: "Lỗi khi lấy lịch sử", error: err.toString() });
    }
};

exports.getOrderDetail = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const details = await OrderHelper.getOrderDetail(orderId);
        res.json(details);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng" });
    }
};

