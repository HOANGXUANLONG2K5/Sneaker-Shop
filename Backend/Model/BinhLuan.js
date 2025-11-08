class Comment {
  constructor(id, maNguoiDung, maSanPham, soSao, noiDung, ngayBinhLuan) {
    this.id = id;
    this.maNguoiDung = maNguoiDung;
    this.maSanPham = maSanPham;
    this.soSao = soSao;
    this.noiDung = noiDung;
    this.ngayBinhLuan = ngayBinhLuan;
  }

  static fromJSON(json) {
    return new Comment(
      json.MaBinhLuan,
      json.MaNguoiDung,
      json.MaSanPham,
      json.SoSao,
      json.NoiDung,
      json.NgayBinhLuan
    );
  }
}

module.exports = Comment;
