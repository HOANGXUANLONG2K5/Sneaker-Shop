const Cart = require('../Model/GioHang');


const CartHelper = {
    getProducts: async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(Cart.fromJSON);
    },

    addProduct: async (cart) => {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        });
        return await res.json();
    },

    updateProduct: async (id, cart) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    });
    return await res.json(cart);
  },

  deleteProduct: async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};  

module.exports = CartDetailHelper;