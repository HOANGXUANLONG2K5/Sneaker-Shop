class Cart {
    constructor(id, MaNguoiDung, MaChiTietSanPham, SoLuong, TenSanPham, GiaXuat, KichThuoc) {
        this.id = id;
        this.MaNguoiDung = MaNguoiDung;
        this.MaChiTietSanPham = MaChiTietSanPham;
        this.SoLuong = SoLuong;
        this.TenSanPham = TenSanPham;
        this.GiaXuat = GiaXuat;
        this.KichThuoc = KichThuoc;
    }

    static fromJSON(json) {
        return new Cart(
            json.MaGioHang,
            json.MaNguoiDung,
            json.MaChiTietSanPham,
            json.SoLuong,
            json.TenSanPham,
            json.GiaXuat,
            json.KichThuoc
        );
    }

    toJSON() {
        return {
            MaNguoiDung: this.MaNguoiDung,
            MaChiTietSanPham: this.MaChiTietSanPham,
            SoLuong: this.SoLuong,
            TenSanPham: this.TenSanPham,
            GiaXuat: this.GiaXuat,
            KichThuoc: this.KichThuoc
        };
    }
}

module.exports = Cart;
