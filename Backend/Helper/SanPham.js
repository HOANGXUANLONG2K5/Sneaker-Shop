const Product = require('../Model/SanPham');

const ProductHelper = {
  getProducts: async () => {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    return data.map(Product.fromJSON);
  },

  getProductsByBrand: async (brand) => {
    const res = await fetch(`http://localhost:3000/api/products/brand?hang=${brand}`);
    const data = await res.json();
    return data.map(Product.fromJSON);
  },

  addProduct: async (product) => {
    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return await res.json();
  },

  updateProduct: async (id, product) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return await res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};

module.exports = ProductHelper;