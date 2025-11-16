const CommentHelper = require('../Helper/BinhLuan');

// Lấy comment theo sản phẩm
exports.getComment = async (req, res) => {
    const { maSanPham } = req.params;
    try {
        const comments = await CommentHelper.getComment(maSanPham);
        res.json(comments.map(c => c.toJSON())); // trả về JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi lấy comment", error: err });
    }
};

exports.addComment = async (req, res) => {
    try {
        const newComment = await CommentHelper.addComment(req.body);
        res.json(newComment.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi thêm comment", error: err });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await CommentHelper.updateComment(req.params.id, req.body);
        res.json(updatedComment.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi cập nhật comment", error: err });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await CommentHelper.deleteComment(req.params.id);
        res.json({ message: "Xóa bình luận thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi xóa comment", error: err });
    }
};
