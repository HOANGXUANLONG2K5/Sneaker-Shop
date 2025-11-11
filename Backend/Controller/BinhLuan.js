const db = require("../DB/Connect");

exports.getComment = (req, res) => {
    const { maSanPham } = req.params;

    const sql = `
        SELECT bl.MaBinhLuan, bl.SoSao, bl.NoiDung, bl.NgayBinhLuan,
               nd.Ho, nd.Ten, nd.Avatar
        FROM BinhLuan bl
        JOIN NguoiDung nd ON bl.MaNguoiDung = nd.MaNguoiDung
        WHERE bl.MaSanPham = ?
        ORDER BY bl.NgayBinhLuan DESC
    `;

    db.query(sql, [maSanPham], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });
        res.json(result);
    });
};

exports.addComment = (req, res) => {
    const { MaNguoiDung, MaSanPham, SoSao, NoiDung } = req.body;

    const sql = `
        INSERT INTO BinhLuan (MaNguoiDung, MaSanPham, SoSao, NoiDung, NgayBinhLuan)
        VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(sql, [MaNguoiDung, MaSanPham, SoSao, NoiDung], (err, result) => {
        if (err) {
            console.error("Lỗi SQL chi tiết:", err);
            return res.status(500).json({ message: "Lỗi SQL", error: err });
        }
        res.json({ message: "Thêm bình luận thành công", id: result.insertId });
    });
};

exports.updateComment = (req, res) => {
    const { id } = req.params;
    const { SoSao, NoiDung } = req.body;

    const sql = `
        UPDATE BinhLuan
        SET SoSao = ?, NoiDung = ?
        WHERE MaBinhLuan = ?
    `;

    db.query(sql, [SoSao, NoiDung, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });
        res.json({ message: "Cập nhật bình luận thành công" });
    });
};

exports.deleteComment = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM BinhLuan WHERE MaBinhLuan = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi SQL", error: err });
        res.json({ message: "Xóa bình luận thành công" });
    });
};
