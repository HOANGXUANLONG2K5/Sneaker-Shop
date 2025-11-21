// Backend/Controller/Admin.js
const AdminHelper = require('../Helper/Admin');

// ===== DASHBOARD =====
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
exports.getAllUsers = async (req, res) => {
  try {
    const users = await AdminHelper.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Lỗi getAllUsers:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== SẢN PHẨM – LIST =====
exports.getAllProducts = async (req, res) => {
  try {
    const products = await AdminHelper.getAllProductsWithSummary();
    res.json(products);
  } catch (err) {
    console.error("Lỗi getAllProducts:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== SẢN PHẨM – THÊM MỚI =====
// POST /api/admin/products
// body: { tenSanPham, thuongHieu?, anh?, model3D?, moTa? }
exports.createProduct = async (req, res) => {
  try {
    const { tenSanPham, thuongHieu, anh, model3D, moTa } = req.body;

    if (!tenSanPham) {
      return res.status(400).json({ message: "Thiếu tên sản phẩm" });
    }

    const payload = {
      tenSanPham,
      thuongHieu: thuongHieu || null,
      anh: anh || null,
      model3D: model3D || null,
      moTa: moTa || null
    };

    const newProduct = await AdminHelper.createProduct(payload);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Lỗi createProduct:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== SẢN PHẨM – CẬP NHẬT =====
// PUT /api/admin/products/:id
// body: { tenSanPham, thuongHieu?, anh?, model3D?, moTa? }
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenSanPham, thuongHieu, anh, model3D, moTa } = req.body;

    if (!tenSanPham) {
      return res.status(400).json({ message: "Thiếu tên sản phẩm" });
    }

    const payload = {
      tenSanPham,
      thuongHieu: thuongHieu || null,
      anh: anh || null,
      model3D: model3D || null,
      moTa: moTa || null
    };

    const updated = await AdminHelper.updateProduct(id, payload);

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Lỗi updateProduct:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== SẢN PHẨM – XOÁ =====
// DELETE /api/admin/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AdminHelper.deleteProduct(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({ message: "Xoá sản phẩm thành công" });
  } catch (err) {
    console.error("Lỗi deleteProduct:", err);

    // Bị ràng buộc FK (ví dụ sản phẩm đang nằm trong đơn hàng)
    if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
      return res.status(400).json({
        message: "Không thể xoá sản phẩm vì đang được sử dụng trong đơn hàng, giỏ hàng hoặc bình luận."
      });
    }

    res.status(500).json({ message: "Lỗi server" });
  }
};
