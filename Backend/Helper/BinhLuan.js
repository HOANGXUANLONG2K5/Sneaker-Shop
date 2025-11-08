const Comment = require('../Model/BinhLuan');

const CommentHelper = {
    getComment: async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data.map(Comment.fromJSON);
    },

    addComment: async (comment) => {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        });
        return await res.json();
    },

    updateComment: async (id, Comment) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Comment)
    });
    return await res.json();
  },

  deleteComment: async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};  

module.exports = CommentHelper;