class TaiKhoan {
  constructor(id, matKhau, ho, ten, gioiTinh, ngaySinh, soDienThoai, email, diaChi, avatar, vaiTro) {
    this.id = id;
    this.matKhau = matKhau;
    this.ho = ho;
    this.ten = ten;
    this.gioiTinh = gioiTinh;
    this.ngaySinh = ngaySinh;
    this.soDienThoai = soDienThoai;
    this.email = email;
    this.diaChi = diaChi;
    this.avatar = avatar;
    this.vaiTro = vaiTro;
  }

  static fromJSON(json) {
    return new TaiKhoan(
      json.MaTaiKhoan,
      json.MatKhau,
      json.Ho,
      json.Ten,
      json.GioiTinh,
      json.NgaySinh,
      json.SoDienThoai,
      json.Email,
      json.DiaChi,
      json.Avatar,
      json.VaiTro
    );
  }
}

module.exports = TaiKhoan;
