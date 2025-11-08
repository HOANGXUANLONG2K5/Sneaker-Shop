class Chat {
  constructor(id, maAdmin, maNguoiDung) {
    this.id = id;
    this.maAdmin = maAdmin;
    this.maNguoiDung = maNguoiDung;
  }

  static fromJSON(json) {
    return new Chat(json.MaDoanChat, json.MaAdmin, json.MaNguoiDung);
  }
}

module.exports = Chat;
