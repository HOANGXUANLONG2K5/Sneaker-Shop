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

-- Thêm SanPham cho Nike
INSERT INTO SanPham (TenSanPham, ThuongHieu, Anh, Model3D, MoTa) VALUES
('Nike Air Force 1', 'Nike', 'https://cdn.shopify.com/s/files/1/0268/2003/2327/products/AF1-White-1_1024x1024.jpg', 'https://sketchfab.com/3d-models/nike-air-force-1-low-summit-white-sneaker-591feae57ee04d69b35720490a8365e2.glb', 'Giày Nike Air Force 1 cổ thấp, thiết kế kinh điển.'),
('Nike Dunk Low', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3f56438c-1f90-4de9-90bb-3e4a40204f50/dunk-low-retro-giay-nam-pXgM22.png', 'https://sketchfab.com/3d-models/nike-dunk-low-3d-model-example.glb', 'Nike Dunk Low phong cách street / skate.'),
('Nike Air Max 1', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6df96718-94b9-48f2-b9f9-26325a01bc07/air-max-1-giay-nam-ZA55lY.png', 'https://sketchfab.com/3d-models/nike-air-max-1-3d-model-example.glb', 'Nike Air Max 1 với đệm khí nổi tiếng.'),
('Nike Air Max 90', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f1e7c55-6a8c-454a-9e97-924f7fd2a496/air-max-90-giay-nam-2rd1X6.png', 'https://sketchfab.com/3d-models/nike-air-max-90-3d-model-example.glb', 'Nike Air Max 90 – thiết kế hoài cổ & thể thao.'),
('Nike Blazer Mid', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/91d47b2a-306e-4d5f-9cca-e8aeba4490c2/blazer-mid-77-giay-nam-qbS8bR.png', 'https://sketchfab.com/3d-models/nike-blazer-mid-3d-model-example.glb', 'Nike Blazer Mid cổ cao, phong cách vintage.'),
('Nike Cortez', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2f755b68-b566-4e6a-a69f-f7baa2295d80/cortez-basic-sl-giay-nam-p2f7wW.png', 'https://sketchfab.com/3d-models/nike-cortez-3d-model-example.glb', 'Nike Cortez – thiết kế retro cổ điển.'),
('Nike Pegasus 40', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/abcd1234-5678-pegasus-40.png', 'https://sketchfab.com/3d-models/nike-pegasus-40-3d-model-example.glb', 'Nike Pegasus 40 – giày chạy bộ hiệu năng cao.'),
('Nike React Element 55', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fedc4321-react-element-55.png', 'https://sketchfab.com/3d-models/nike-react-element-55-3d-model-example.glb', 'Nike React Element 55 – đệm React nhẹ & êm.'),
('Nike Air Presto', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99887766-air-presto.png', 'https://sketchfab.com/3d-models/nike-air-presto-3d-model-example.glb', 'Nike Air Presto – thiết kế co giãn, ôm chân.'),
('Nike Zoom Vomero 5', 'Nike', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/12345678-zoom-vomero-5.png', 'https://sketchfab.com/3d-models/nike-zoom-vomero-5-3d-model-example.glb', 'Nike Zoom Vomero 5 – giày chạy có đệm Zoom thoải mái.');

-- Sau đó thêm ChiTietSanPham (kích cỡ, số lượng, giá nhập / xuất)
INSERT INTO ChiTietSanPham (MaSanPham, KichThuoc, SoLuong, GiaNhap, GiaXuat) VALUES
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Air Force 1'), '40', 20, 1200000, 2000000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Air Force 1'), '42', 15, 1200000, 2000000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Dunk Low'), '41', 25, 1100000, 1850000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Dunk Low'), '43', 10, 1100000, 1850000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Air Max 1'), '44', 12, 1500000, 2600000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Air Max 1'), '46', 8, 1500000, 2600000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Air Max 90'), '42', 18, 1400000, 2500000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Blazer Mid'), '44', 10, 1300000, 2200000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Cortez'), '41', 30, 1000000, 1600000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Pegasus 40'), '43', 15, 1600000, 3000000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike React Element 55'), '42', 12, 1700000, 3200000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Air Presto'), '44', 8, 1500000, 2800000),
((SELECT MaSanPham FROM SanPham WHERE TenSanPham = 'Nike Zoom Vomero 5'), '45', 5, 1800000, 3500000);


select * from DonHang;

SELECT dh.MaDonHang, ctdh.MaChiTietSanPham, ctdh.SoLuong, sp.TenSanPham
FROM DonHang dh
JOIN ChiTietDonHang ctdh ON dh.MaDonHang = ctdh.MaDonHang
JOIN ChiTietSanPham ctp ON ctdh.MaChiTietSanPham = ctp.MaChiTietSanPham
JOIN SanPham sp ON ctp.MaSanPham = sp.MaSanPham
WHERE dh.MaTaiKhoan = 1;


