class Message {
  constructor(id, maDoanChat, maAdmin, maNguoiDung, noiDung, thoiGian, trangThai) {
    this.id = id;
    this.maDoanChat = maDoanChat;
    this.maAdmin = maAdmin;
    this.maNguoiDung = maNguoiDung;
    this.noiDung = noiDung;
    this.thoiGian = thoiGian;
    this.trangThai = trangThai;
  }

  static fromJSON(json) {
    return new Message(
      json.MaChiTietTinNhan,
      json.MaDoanChat,
      json.MaAdmin,
      json.MaNguoiDung,
      json.NoiDung,
      json.ThoiGian,
      json.TrangThai
    );
  }
}

module.exports = Message;
