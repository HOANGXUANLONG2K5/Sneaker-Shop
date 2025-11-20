// Backend/Model/Admin.js

// ===== Dashboard Stats =====
class DashboardStats {
  constructor(totalUsers, totalAdmins, totalProducts, totalOrders, totalRevenue) {
    this.totalUsers     = totalUsers;
    this.totalAdmins    = totalAdmins;
    this.totalProducts  = totalProducts;
    this.totalOrders    = totalOrders;
    this.totalRevenue   = totalRevenue;
  }

  static fromRow(row) {
    return new DashboardStats(
      row.totalUsers,
      row.totalAdmins,
      row.totalProducts,
      row.totalOrders,
      row.totalRevenue
    );
  }
}

// ===== Đơn hàng cho Admin =====
class AdminOrderView {
  constructor(
    maDonHang,
    maTaiKhoan,
    ho,
    ten,
    email,
    ngayDat,
    trangThaiDonHang,
    diaChiGiaoToi,
    soDienThoai,
    tongTien,
    phuongThucThanhToan,
    soTienThanhToan,
    trangThaiThanhToan,
    ngayThanhToan
  ) {
    this.maDonHang            = maDonHang;
    this.maTaiKhoan           = maTaiKhoan;
    this.ho                   = ho;
    this.ten                  = ten;
    this.email                = email;
    this.ngayDat              = ngayDat;
    this.trangThaiDonHang     = trangThaiDonHang;
    this.diaChiGiaoToi        = diaChiGiaoToi;
    this.soDienThoai          = soDienThoai;
    this.tongTien             = tongTien;
    this.phuongThucThanhToan = phuongThucThanhToan;
    this.soTienThanhToan      = soTienThanhToan;
    this.trangThaiThanhToan   = trangThaiThanhToan;
    this.ngayThanhToan        = ngayThanhToan;
  }

  static fromRow(row) {
    return new AdminOrderView(
      row.MaDonHang,
      row.MaTaiKhoan,
      row.Ho,
      row.Ten,
      row.Email,
      row.NgayDat,
      row.TrangThaiDonHang,
      row.DiaChiGiaoToi,
      row.SoDienThoai,
      row.TongTien,
      row.PhuongThucThanhToan,
      row.SoTien,
      row.TrangThaiThanhToan,
      row.NgayThanhToan
    );
  }
}

// ===== Tài khoản (view trong admin) =====
class AdminUserView {
  constructor(
    maTaiKhoan,
    ho,
    ten,
    email,
    soDienThoai,
    gioiTinh,
    ngaySinh,
    diaChi,
    avatar,
    vaiTro
  ) {
    this.maTaiKhoan = maTaiKhoan;
    this.ho         = ho;
    this.ten        = ten;
    this.email      = email;
    this.soDienThoai = soDienThoai;
    this.gioiTinh   = gioiTinh;
    this.ngaySinh   = ngaySinh;
    this.diaChi     = diaChi;
    this.avatar     = avatar;
    this.vaiTro     = vaiTro;
  }

  static fromRow(row) {
    return new AdminUserView(
      row.MaTaiKhoan,
      row.Ho,
      row.Ten,
      row.Email,
      row.SoDienThoai,
      row.GioiTinh,
      row.NgaySinh,
      row.DiaChi,
      row.Avatar,
      row.VaiTro
    );
  }
}

// ===== Sản phẩm tóm tắt cho admin =====
class ProductAdminSummary {
  constructor(
    maSanPham,
    tenSanPham,
    thuongHieu,
    anh,
    model3D,
    moTa,
    tongSoLuong,
    giaThapNhat,
    giaCaoNhat
  ) {
    this.maSanPham   = maSanPham;
    this.tenSanPham  = tenSanPham;
    this.thuongHieu  = thuongHieu;
    this.anh         = anh;
    this.model3D     = model3D;
    this.moTa        = moTa;
    this.tongSoLuong = tongSoLuong;
    this.giaThapNhat = giaThapNhat;
    this.giaCaoNhat  = giaCaoNhat;
  }

  static fromRow(row) {
    return new ProductAdminSummary(
      row.MaSanPham,
      row.TenSanPham,
      row.ThuongHieu,
      row.Anh,
      row.Model3D,
      row.MoTa,
      row.TongSoLuong,
      row.GiaThapNhat,
      row.GiaCaoNhat
    );
  }
}

module.exports = {
  DashboardStats,
  AdminOrderView,
  AdminUserView,
  ProductAdminSummary
};
