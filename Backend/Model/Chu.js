class Admin {
  constructor(id, matKhau, ho, ten, soDienThoai, email, diaChi) {
    this.id = id;
    this.matKhau = matKhau;
    this.ho = ho;
    this.ten = ten;
    this.soDienThoai = soDienThoai;
    this.email = email;
    this.diaChi = diaChi;
  }

  static fromJSON(json) {
    return new Admin(
      json.MaAdmin,
      json.MatKhau,
      json.Ho,
      json.Ten,
      json.SoDienThoai,
      json.Email,
      json.DiaChi
    );
  }
}

module.exports = Admin;
