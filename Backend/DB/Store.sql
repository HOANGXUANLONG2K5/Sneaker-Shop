CREATE DATABASE SneakerStore
Use SneakerStore;

CREATE TABLE NguoiDung(
	MaNguoiDung INT AUTO_INCREMENT PRIMARY KEY,
    MatKhau VARCHAR(255) NOT NULL,
    Ho NVARCHAR(50),
    Ten NVARCHAR(50),
    GioiTinh VARCHAR(10),
    NgaySinh DATE,
    SoDienThoai VARCHAR(20),
    Email VARCHAR(100),
    DiaChi NVARCHAR(255),
    Avatar VARCHAR(255)
);

-- Bảng chủ (Admin)
CREATE TABLE Chu (
    MaAdmin INT AUTO_INCREMENT PRIMARY KEY,
    MatKhau VARCHAR(255) NOT NULL,
    Ho NVARCHAR(50),
    Ten NVARCHAR(50),
    SoDienThoai VARCHAR(20),
    Email VARCHAR(100),
    DiaChi NVARCHAR(255)
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
    MaNguoiDung INT NOT NULL,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
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
    NgayDat DATETIME,
    TrangThaiDonHang VARCHAR(50),
    DiaChiGiaoToi NVARCHAR(255),
    SoDienThoai VARCHAR(20),
    TongTien DECIMAL(12,2)
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
    MaNguoiDung INT NOT NULL,
    MaSanPham INT NOT NULL,
    SoSao INT,
    NoiDung NVARCHAR(500),
    NgayBinhLuan DATETIME,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);

-- Bảng chat
CREATE TABLE Chat (
    MaDoanChat INT AUTO_INCREMENT PRIMARY KEY,
    MaAdmin INT NOT NULL,
    MaNguoiDung INT NOT NULL,
    FOREIGN KEY (MaAdmin) REFERENCES Chu(MaAdmin),
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

-- Bảng chi tiết tin nhắn
CREATE TABLE ChiTietTinNhan (
    MaChiTietTinNhan INT AUTO_INCREMENT PRIMARY KEY,
    MaDoanChat INT NOT NULL,
    MaAdmin INT NOT NULL,
    MaNguoiDung INT NOT NULL,
    NoiDung NVARCHAR(1000),
    ThoiGian DATETIME,
    TrangThai VARCHAR(50),
    FOREIGN KEY (MaDoanChat) REFERENCES Chat(MaDoanChat),
    FOREIGN KEY (MaAdmin) REFERENCES Chu(MaAdmin),
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

-- Bảng NguoiDung (khách hàng)
INSERT INTO NguoiDung (MatKhau, Ho, Ten, GioiTinh, NgaySinh, SoDienThoai, Email, DiaChi, Avatar)
VALUES 
('123456', 'Nguyen', 'Duc', 'Nam', '2005-11-21', '0123456789', 'duc@example.com', 'Ha Noi', 'default.jpg'),
('654321', 'Tran', 'Linh', 'Nu', '2004-07-15', '0987654321', 'linh@example.com', 'Da Nang', 'linh.jpg');

-- Bảng Chu (admin)
INSERT INTO Chu (MatKhau, Ho, Ten, SoDienThoai, Email, DiaChi)
VALUES 
('admin123', 'Le', 'Minh', '0912345678', 'admin@sneakerstore.com', 'TP. HCM');

-- Bảng SanPham
INSERT INTO SanPham (TenSanPham, ThuongHieu, Anh, Model3D, MoTa)
VALUES 
('Air Jordan 1 Retro', 'Nike', 'jordan1.jpg', 'jordan1.glb', 'Giày huyền thoại của Nike'),
('Yeezy Boost 350 V2', 'Adidas', 'yeezy350.jpg', 'yeezy350.glb', 'Thiết kế thời trang và êm ái');

-- Bảng ChiTietSanPham
INSERT INTO ChiTietSanPham (MaSanPham, KichThuoc, SoLuong, GiaNhap, GiaXuat)
VALUES 
(1, '42', 10, 2500000, 3500000),
(2, '41', 15, 2800000, 4000000);

-- Bảng GioHang
INSERT INTO GioHang (MaNguoiDung)
VALUES (1), (2);

-- Bảng ChiTietGioHang
INSERT INTO ChiTietGioHang (MaGioHang, MaChiTietSanPham, SoLuong)
VALUES 
(1, 1, 2),
(2, 2, 1);

-- Bảng DonHang
INSERT INTO DonHang (NgayDat, TrangThaiDonHang, DiaChiGiaoToi, SoDienThoai, TongTien)
VALUES 
(NOW(), 'Đang xử lý', 'Hà Nội', '0123456789', 7000000),
(NOW(), 'Hoàn thành', 'Đà Nẵng', '0987654321', 4000000);

-- Bảng ChiTietDonHang
INSERT INTO ChiTietDonHang (MaDonHang, MaChiTietSanPham, SoLuong, Gia)
VALUES 
(1, 1, 2, 3500000),
(2, 2, 1, 4000000);

-- Bảng ThanhToan
INSERT INTO ThanhToan (MaDonHang, PhuongThucThanhToan, SoTien, TrangThai, Ngay)
VALUES 
(1, 'Momo', 7000000, 'Thành công', NOW()),
(2, 'Tiền mặt', 4000000, 'Thành công', NOW());

-- Bảng BinhLuan
INSERT INTO BinhLuan (MaNguoiDung, MaSanPham, SoSao, NoiDung, NgayBinhLuan)
VALUES 
(1, 1, 5, 'Giày đẹp và chất lượng!', NOW()),
(2, 2, 4, 'Mềm, thoải mái nhưng hơi đắt.', NOW());

-- Bảng Chat
INSERT INTO Chat (MaAdmin, MaNguoiDung)
VALUES 
(1, 1),
(1, 2);

-- Bảng ChiTietTinNhan
INSERT INTO ChiTietTinNhan (MaDoanChat, MaAdmin, MaNguoiDung, NoiDung, ThoiGian, TrangThai)
VALUES 
(1, 1, 1, 'Xin chào! Tôi cần hỗ trợ đơn hàng.', NOW(), 'Đã gửi'),
(1, 1, 1, 'Admin: Chúng tôi sẽ kiểm tra ngay.', NOW(), 'Đã xem');

SELECT * FROM SneakerStore.SanPham LIMIT 1000;

UPDATE SanPham
SET Anh = 'https://authentic-shoes.com/wp-content/uploads/2023/04/816352_01.jpg_cc33f27d80df4f98aa08ce4d6c5fcc90.png'
WHERE MaSanPham = 2;