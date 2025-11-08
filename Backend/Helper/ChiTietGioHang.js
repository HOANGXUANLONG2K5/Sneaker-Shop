const CartDetail = require('../Model/GioHang');


const CartDetailHelper = {
    getProducts: async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(CartDetail.fromJSON);
    },

    addProduct: async (cartdetail) => {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartdetail)
        });
        return await res.json();
    },

    updateProduct: async (id, cartdetail) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    });
    return await res.json(cartdetail);
  },

  deleteProduct: async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};  

module.exports = CartDetailHelper;