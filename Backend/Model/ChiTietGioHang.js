class CartItem {
  constructor(id, maGioHang, maChiTietSanPham, soLuong) {
    this.id = id;
    this.maGioHang = maGioHang;
    this.maChiTietSanPham = maChiTietSanPham;
    this.soLuong = soLuong;
  }

  static fromJSON(json) {
    return new CartItem(
      json.MaChiTietGioHang,
      json.MaGioHang,
      json.MaChiTietSanPham,
      json.SoLuong
    );
  }
}

module.exports = CartItem;
