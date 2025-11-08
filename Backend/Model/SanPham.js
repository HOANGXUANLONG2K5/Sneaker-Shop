class Product {
  constructor(id, tenSanPham, thuongHieu, anh, model3D, moTa) {
    this.id = id;
    this.tenSanPham = tenSanPham;
    this.thuongHieu = thuongHieu;
    this.anh = anh;
    this.model3D = model3D;
    this.moTa = moTa;
  }

  static fromJSON(json) {
    return new Product(
      json.MaSanPham,
      json.TenSanPham,
      json.ThuongHieu,
      json.Anh,
      json.Model3D,
      json.MoTa
    );
  }
}

module.exports = Product;
