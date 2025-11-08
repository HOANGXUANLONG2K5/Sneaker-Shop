const Cart = require('../Model/GioHang');

const CartHelper = {
    // Lấy giỏ hàng của một user
    getProducts: async (userId) => {
        const res = await fetch(`http://localhost:3000/api/cart/${userId}`);
        if (!res.ok) throw new Error('Không lấy được giỏ hàng');
        const data = await res.json();
        return data.map(Cart.fromJSON);
    },

    // Thêm sản phẩm vào giỏ hàng
    addProduct: async (cart) => {
        const res = await fetch('http://localhost:3000/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        if (!res.ok) throw new Error('Thêm sản phẩm thất bại');
        return await res.json();
    },

    // Cập nhật sản phẩm trong giỏ
    updateProduct: async (id, cart) => {
        const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        if (!res.ok) throw new Error('Cập nhật thất bại');
        return await res.json();
    },

    // Xóa sản phẩm khỏi giỏ
    deleteProduct: async (id) => {
        const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Xóa thất bại');
        return await res.json();
    }
};

module.exports = CartHelper;
