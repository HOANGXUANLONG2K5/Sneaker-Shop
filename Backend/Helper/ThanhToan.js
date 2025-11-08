const Payment = require('../Model/ChiTietDonHang');

const PaymentHelper = {
    getOrder: async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(Product.fromJSON);
    },

    addOrder: async (payment) => {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });
        return await res.json();
    },

    updateOrder: async (id, payment) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment)
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

module.exports = PaymentHelper;