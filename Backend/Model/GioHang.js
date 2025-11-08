class Cart {
  constructor(id, maNguoiDung) {
    this.id = id;
    this.maNguoiDung = maNguoiDung;
  }

  static fromJSON(json) {
    return new Cart(json.MaGioHang, json.MaNguoiDung);
  }
}

module.exports = Cart;
