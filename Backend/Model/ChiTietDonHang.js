class OrderItem {
  constructor(id, maDonHang, maChiTietSanPham, soLuong, gia) {
    this.id = id;
    this.maDonHang = maDonHang;
    this.maChiTietSanPham = maChiTietSanPham;
    this.soLuong = soLuong;
    this.gia = gia;
  }

  static fromJSON(json) {
    return new OrderItem(
      json.MaChiTietDonHang,
      json.MaDonHang,
      json.MaChiTietSanPham,
      json.SoLuong,
      json.Gia
    );
  }
}

module.exports = OrderItem;
