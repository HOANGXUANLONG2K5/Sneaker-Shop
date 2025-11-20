// Backend/Controller/Admin.js
const AdminHelper = require('../Helper/Admin');

// ===== DASHBOARD =====
// GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await AdminHelper.getDashboardStats();
    res.json(stats);
  } catch (err) {
    console.error("Lỗi getDashboardStats:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== ĐƠN HÀNG =====
// GET /api/admin/orders?status=Hoàn thành
exports.getAllOrders = async (req, res) => {
  try {
    const status = req.query.status || null;
    const orders = await AdminHelper.getAllOrders(status);
    res.json(orders);
  } catch (err) {
    console.error("Lỗi getAllOrders:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// PUT /api/admin/orders/:orderId/status
// body: { status: "Hoàn thành" }
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status }  = req.body;

    if (!status) {
      return res.status(400).json({ message: "Thiếu trạng thái đơn hàng" });
    }

    const result = await AdminHelper.updateOrderStatus(orderId, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.json({ message: "Cập nhật trạng thái đơn hàng thành công" });
  } catch (err) {
    console.error("Lỗi updateOrderStatus:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== TÀI KHOẢN =====
// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await AdminHelper.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Lỗi getAllUsers:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== SẢN PHẨM =====
// GET /api/admin/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await AdminHelper.getAllProductsWithSummary();
    res.json(products);
  } catch (err) {
    console.error("Lỗi getAllProducts:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
