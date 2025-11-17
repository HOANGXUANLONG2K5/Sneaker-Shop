class DonHang {
  constructor(MaDonHang, MaTaiKhoan, NgayDat, TrangThaiDonHang, DiaChiGiaoToi, SoDienThoai, TongTien) {
    this.MaDonHang = MaDonHang;
    this.MaTaiKhoan = MaTaiKhoan;
    this.NgayDat = NgayDat;
    this.TrangThaiDonHang = TrangThaiDonHang;
    this.DiaChiGiaoToi = DiaChiGiaoToi;
    this.SoDienThoai = SoDienThoai;
    this.TongTien = TongTien;
  }

  toJSON() {
    return {
      MaDonHang: this.MaDonHang,
      MaTaiKhoan: this.MaTaiKhoan,
      NgayDat: this.NgayDat,
      TrangThaiDonHang: this.TrangThaiDonHang,
      DiaChiGiaoToi: this.DiaChiGiaoToi,
      SoDienThoai: this.SoDienThoai,
      TongTien: this.TongTien
    };
  }

}

module.exports = DonHang;