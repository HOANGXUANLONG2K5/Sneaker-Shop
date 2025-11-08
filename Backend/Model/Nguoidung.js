class User {
  constructor(id, matKhau, ho, ten, gioiTinh, ngaySinh, soDienThoai, email, diaChi, avatar) {
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
  }

  static fromJSON(json) {
    return new User(
      json.MaNguoiDung,
      json.MatKhau,
      json.Ho,
      json.Ten,
      json.GioiTinh,
      json.NgaySinh,
      json.SoDienThoai,
      json.Email,
      json.DiaChi,
      json.Avatar
    );
  }
}

module.exports = User;
