class Order {
  constructor(id, ngayDat, trangThaiDonHang, diaChiGiaoToi, soDienThoai, tongTien) {
    this.id = id;
    this.ngayDat = ngayDat;
    this.trangThaiDonHang = trangThaiDonHang;
    this.diaChiGiaoToi = diaChiGiaoToi;
    this.soDienThoai = soDienThoai;
    this.tongTien = tongTien;
  }

  static fromJSON(json) {
    return new Order(
      json.MaDonHang,
      json.NgayDat,
      json.TrangThaiDonHang,
      json.DiaChiGiaoToi,
      json.SoDienThoai,
      json.TongTien
    );
  }
}

module.exports = Order;
