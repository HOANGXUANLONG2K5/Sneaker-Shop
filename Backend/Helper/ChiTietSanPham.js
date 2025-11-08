const ProductDetail = require('../Model/ChiTietSanPham');

const ProductDetailHelper = {
    getProduct: async () => {
        const res = await fetch('http://localhost:3000/api/productdetails');
        const data = await res.json();
        return data.map(ProductDetail.fromJSON);
    },

    addProduct: async (productdetail) => {
        const res = await fetch('http://localhost:3000/api/productdetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productdetail)
        });
        return await res.json();
    },

    updateProduct: async (id, productdetail) => {
    const res = await fetch(`http://localhost:3000/api/productdetails/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productdetail)
    });
    return await res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`http://localhost:3000/api/productdetails/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};  

module.exports = ProductDetailHelper;