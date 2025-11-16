CREATE DATABASE SneakerStore;
USE SneakerStore;

CREATE TABLE TaiKhoan (
    MaTaiKhoan INT AUTO_INCREMENT PRIMARY KEY,
    MatKhau VARCHAR(255) NOT NULL,
    Ho NVARCHAR(50),
    Ten NVARCHAR(50),
    GioiTinh VARCHAR(10),
    NgaySinh DATE,
    SoDienThoai VARCHAR(20),
    Email VARCHAR(100) UNIQUE NOT NULL,
    DiaChi NVARCHAR(255),
    Avatar VARCHAR(255),
    VaiTro ENUM('user', 'admin') DEFAULT 'user'
);

-- Bảng sản phẩm
CREATE TABLE SanPham (
    MaSanPham INT AUTO_INCREMENT PRIMARY KEY,
    TenSanPham NVARCHAR(100) NOT NULL,
    ThuongHieu NVARCHAR(50),
    Anh VARCHAR(255),
    Model3D VARCHAR(255),
    MoTa NVARCHAR(500)
);

-- Bảng chi tiết sản phẩm
CREATE TABLE ChiTietSanPham (
    MaChiTietSanPham INT AUTO_INCREMENT PRIMARY KEY,
    MaSanPham INT NOT NULL,
    KichThuoc VARCHAR(50),
    SoLuong INT,
    GiaNhap DECIMAL(12,2),
    GiaXuat DECIMAL(12,2),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);

-- Bảng giỏ hàng
CREATE TABLE GioHang (
    MaGioHang INT AUTO_INCREMENT PRIMARY KEY,
    MaTaiKhoan INT NOT NULL,
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- Bảng chi tiết giỏ hàng
CREATE TABLE ChiTietGioHang (
    MaChiTietGioHang INT AUTO_INCREMENT PRIMARY KEY,
    MaGioHang INT NOT NULL,
    MaChiTietSanPham INT NOT NULL,
    SoLuong INT,
    FOREIGN KEY (MaGioHang) REFERENCES GioHang(MaGioHang),
    FOREIGN KEY (MaChiTietSanPham) REFERENCES ChiTietSanPham(MaChiTietSanPham)
);

-- Bảng đơn hàng
CREATE TABLE DonHang (
    MaDonHang INT AUTO_INCREMENT PRIMARY KEY,
    MaTaiKhoan INT NOT NULL,
    NgayDat DATETIME,
    TrangThaiDonHang VARCHAR(50),
    DiaChiGiaoToi NVARCHAR(255),
    SoDienThoai VARCHAR(20),
    TongTien DECIMAL(12,2),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- Bảng chi tiết đơn hàng
CREATE TABLE ChiTietDonHang (
    MaChiTietDonHang INT AUTO_INCREMENT PRIMARY KEY,
    MaDonHang INT NOT NULL,
    MaChiTietSanPham INT NOT NULL,
    SoLuong INT,
    Gia DECIMAL(12,2),
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang),
    FOREIGN KEY (MaChiTietSanPham) REFERENCES ChiTietSanPham(MaChiTietSanPham)
);

-- Bảng thanh toán
CREATE TABLE ThanhToan (
    MaThanhToan INT AUTO_INCREMENT PRIMARY KEY,
    MaDonHang INT NOT NULL,
    PhuongThucThanhToan VARCHAR(50),
    SoTien DECIMAL(12,2),
    TrangThai VARCHAR(50),
    Ngay DATETIME,
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang)
);

-- Bảng bình luận
CREATE TABLE BinhLuan (
    MaBinhLuan INT AUTO_INCREMENT PRIMARY KEY,
    MaTaiKhoan INT NOT NULL,
    MaSanPham INT NOT NULL,
    SoSao INT,
    NoiDung NVARCHAR(500),
    NgayBinhLuan DATETIME,
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);

-- Bảng chat (1 đoạn chat giữa user và admin)
CREATE TABLE Chat (
    MaDoanChat INT AUTO_INCREMENT PRIMARY KEY,
    NguoiDung INT NOT NULL,
    Admin INT NOT NULL,
    FOREIGN KEY (NguoiDung) REFERENCES TaiKhoan(MaTaiKhoan),
    FOREIGN KEY (Admin) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- Bảng chi tiết tin nhắn
CREATE TABLE ChiTietTinNhan (
    MaChiTietTinNhan INT AUTO_INCREMENT PRIMARY KEY,
    MaDoanChat INT NOT NULL,
    NguoiGui INT NOT NULL,
    NoiDung NVARCHAR(1000),
    ThoiGian DATETIME,
    TrangThai VARCHAR(50),
    FOREIGN KEY (MaDoanChat) REFERENCES Chat(MaDoanChat),
    FOREIGN KEY (NguoiGui) REFERENCES TaiKhoan(MaTaiKhoan)
);

-- Dữ liệu mẫu
INSERT INTO TaiKhoan (MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar, VaiTro)
VALUES
('123456', 'Nguyen', 'Duc', 'Nam', '2005-11-21', '0123456789', 'duc@example.com', 'Ha Noi', 'default.jpg', 'user'),
('654321', 'Tran', 'Linh', 'Nu', '2004-07-15', '0987654321', 'linh@example.com', 'Da Nang', 'linh.jpg', 'user'),
('admin123', 'Le', 'Minh', NULL, NULL, '0912345678', 'admin@sneakerstore.com', 'TP. HCM', NULL, 'admin');

INSERT INTO SanPham (TenSanPham, ThuongHieu, Anh, Model3D, MoTa)
VALUES 
('Air Jordan 1 Retro', 'Nike', 'jordan1.jpg', 'jordan1.glb', 'Giày huyền thoại của Nike'),
('Yeezy Boost 350 V2', 'Adidas', 'yeezy350.jpg', 'yeezy350.glb', 'Thiết kế thời trang và êm ái');

INSERT INTO ChiTietSanPham (MaSanPham, KichThuoc, SoLuong, GiaNhap, GiaXuat)
VALUES 
(1, '42', 10, 2500000, 3500000),
(2, '41', 15, 2800000, 4000000);

INSERT INTO GioHang (MaTaiKhoan) VALUES (1), (2);

INSERT INTO ChiTietGioHang (MaGioHang, MaChiTietSanPham, SoLuong)
VALUES 
(1, 1, 2),
(2, 2, 1);

INSERT INTO DonHang (MaTaiKhoan, NgayDat, TrangThaiDonHang, DiaChiGiaoToi, SoDienThoai, TongTien)
VALUES 
(1, NOW(), 'Đang xử lý', 'Hà Nội', '0123456789', 7000000),
(2, NOW(), 'Hoàn thành', 'Đà Nẵng', '0987654321', 4000000);

INSERT INTO ChiTietDonHang (MaDonHang, MaChiTietSanPham, SoLuong, Gia)
VALUES 
(1, 1, 2, 3500000),
(2, 2, 1, 4000000);

INSERT INTO ThanhToan (MaDonHang, PhuongThucThanhToan, SoTien, TrangThai, Ngay)
VALUES 
(1, 'Momo', 7000000, 'Thành công', NOW()),
(2, 'Tiền mặt', 4000000, 'Thành công', NOW());

INSERT INTO BinhLuan (MaTaiKhoan, MaSanPham, SoSao, NoiDung, NgayBinhLuan)
VALUES 
(1, 1, 5, 'Giày đẹp và chất lượng!', NOW()),
(2, 2, 4, 'Mềm, thoải mái nhưng hơi đắt.', NOW());

INSERT INTO Chat (NguoiDung, Admin)
VALUES 
(1, 3),
(2, 3);

INSERT INTO ChiTietTinNhan (MaDoanChat, NguoiGui, NoiDung, ThoiGian, TrangThai)
VALUES 
(1, 1, 'Xin chào! Tôi cần hỗ trợ đơn hàng.', NOW(), 'Đã gửi'),
(1, 3, 'Admin: Chúng tôi sẽ kiểm tra ngay.', NOW(), 'Đã xem');

SELECT * FROM BinhLuan WHERE MaSanPham = 2;

SELECT 
    ct.MaGioHang,
    ct.MaChiTietSanPham,
    ct.SoLuong,
    gh.MaTaiKhoan AS MaNguoiDung,
    sp.TenSanPham,
    ctp.GiaXuat,
    ctp.KichThuoc
FROM ChiTietGioHang ct
JOIN GioHang gh ON ct.MaGioHang = gh.MaGioHang
JOIN ChiTietSanPham ctp ON ct.MaChiTietSanPham = ctp.MaChiTietSanPham
JOIN SanPham sp ON ctp.MaSanPham = sp.MaSanPham
WHERE gh.MaTaiKhoan = 1;

SElect *from TaiKhoan
