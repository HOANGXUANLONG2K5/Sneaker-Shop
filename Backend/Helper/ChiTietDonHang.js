const OrderDetail = require('../Model/ChiTietDonHang');

const OrderDetailHelper = {
    getOrder: async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(Product.fromJSON);
    },

    addOrder: async (orderdetail) => {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderdetail)
        });
        return await res.json();
    },

    updateOrder: async (id, orderdetail) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderdetail)
    });
    return await res.json();
  },

  deleteOrder: async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};  

module.exports = OrderDetailHelper;