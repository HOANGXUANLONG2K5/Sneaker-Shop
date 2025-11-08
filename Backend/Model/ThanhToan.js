class Payment {
  constructor(id, maDonHang, phuongThucThanhToan, soTien, trangThai, ngay) {
    this.id = id;
    this.maDonHang = maDonHang;
    this.phuongThucThanhToan = phuongThucThanhToan;
    this.soTien = soTien;
    this.trangThai = trangThai;
    this.ngay = ngay;
  }

  static fromJSON(json) {
    return new Payment(
      json.MaThanhToan,
      json.MaDonHang,
      json.PhuongThucThanhToan,
      json.SoTien,
      json.TrangThai,
      json.Ngay
    );
  }
}

module.exports = Payment;
