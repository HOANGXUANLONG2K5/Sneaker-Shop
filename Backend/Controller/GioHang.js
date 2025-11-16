const CartHelper = require('../Helper/GioHang');
const Cart = require('../Model/GioHang');

exports.getCartByUser = async (req, res) => {
  try {
    const cart = await CartHelper.getCartByUser(req.params.userId);
    res.json(cart.map(c => c.toJSON()));
  } catch (err) {
    console.error("Lỗi chi tiết khi lấy giỏ hàng:", err);
    res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try { 
    const cart = await CartHelper.addProduct(req.body);
    res.json(cart.toJSON());
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng", error: err });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    await CartHelper.deleteProduct(req.body.MaChiTietSanPham, req.body.MaNguoiDung);
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: err });
  }
};
