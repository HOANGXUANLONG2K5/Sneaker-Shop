const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'SneakerStore'
});

db.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
  } else {
    console.log('Đã kết nối MySQL thành công!');
  }
});

module.exports = db;
