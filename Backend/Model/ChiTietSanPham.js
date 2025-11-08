class ProductDetail {
  constructor(id, maSanPham, kichThuoc, soLuong, giaNhap, giaXuat) {
    this.id = id;
    this.maSanPham = maSanPham;
    this.kichThuoc = kichThuoc;
    this.soLuong = soLuong;
    this.giaNhap = giaNhap;
    this.giaXuat = giaXuat;
  }

  static fromJSON(json) {
    return new ProductDetail(
      json.MaChiTietSanPham,
      json.MaSanPham,
      json.KichThuoc,
      json.SoLuong,
      json.GiaNhap,
      json.GiaXuat
    );
  }
}

module.exports = ProductDetail;
