const express = require('express');
const router = express.Router();
const commentController = require('../Controller/BinhLuan');

// Lấy bình luận theo mã sản phẩm
router.get('/:maSanPham', commentController.getComment);

// Thêm bình luận
router.post('/add', commentController.addComment);

// Sửa bình luận
router.put('/:id', commentController.updateComment);

// Xóa bình luận
router.delete('/:id', commentController.deleteComment);

module.exports = router;
