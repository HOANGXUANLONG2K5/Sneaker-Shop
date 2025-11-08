const User = require('../models/NguoiDung');

const UserHelper = {
  getUsers: async () => {
    const res = await fetch('http://localhost:3000/api/users');
    const data = await res.json();
    return data.map(User.fromJSON);
  },
  addUser: async (user) => {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return await res.json();
  },
  updateUser: async (id, user) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return await res.json();
  },
  deleteUser: async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};

module.exports = UserHelper;
