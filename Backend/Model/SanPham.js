// Model/SanPham.js
class Product {
  constructor(id, tenSanPham, thuongHieu, anh, model3D, moTa, chiTiet = []) {
    this.id = id;
    this.tenSanPham = tenSanPham;
    this.thuongHieu = thuongHieu;
    this.anh = anh;
    this.model3D = model3D;
    this.moTa = moTa;
    this.chiTiet = chiTiet; // mảng chi tiết sản phẩm
  }

  // Chuyển JSON từ JOIN query thành class
  static fromJSONWithDetails(json) {
    return new Product(
      json.MaSanPham,
      json.TenSanPham,
      json.ThuongHieu,
      json.Anh,
      json.Model3D,
      json.MoTa,
      [{
        id: json.MaChiTietSanPham,
        kichThuoc: json.KichThuoc,
        giaNhap: json.GiaNhap,
        giaXuat: json.GiaXuat,
        soLuong: json.SoLuong
      }]
    );
  }
}

module.exports = Product;
