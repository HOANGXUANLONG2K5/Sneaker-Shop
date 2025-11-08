const Admin = require('../Model/Chu');

const AdminHelper = { 
    getUsers: async()=>{
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(Admin.fromJSON);
    },

    addAdmin: async (admin)=>{
        const res = await fetch('http://localhost:3000/api/users',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(admin)
        });
        return await res.json();
    },

    updateAdmin: async (admin)=>{
        const res = await fetch('http://localhost:3000/api/users',{
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(admin)
        });
        return await res.json();
    },

    deleteAdmin: async (admin)=>{
        const res = await fetch('http://localhost:3000/api/users',{
            method:'Delete',
        });
        return await res.json();
    }, 
};

module.exports = AdminHelper;