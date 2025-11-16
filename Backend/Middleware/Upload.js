const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo folder uploads nếu chưa có
const uploadFolder = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Nơi lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // dùng đường dẫn đầy đủ
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // đặt tên duy nhất
  }
});

// Chỉ cho phép upload ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Chỉ được upload file ảnh!'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
