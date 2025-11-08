const Order = require('../Model/DonHang');

const OrderHelper = {
    getOrder: async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(OrderHelper.fromJSON);
    },

    addOrder: async (order) => {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        return await res.json();
    },

    updateOrder: async (id, order) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
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

module.exports = OrderHelper;