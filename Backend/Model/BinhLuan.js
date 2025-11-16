class Comment {
    constructor(id, maTaiKhoan, maSanPham, soSao, noiDung, ngayBinhLuan, ho = '', ten = '', avatar = '') {
        this.id = id;                 
        this.maTaiKhoan = maTaiKhoan;  
        this.maSanPham = maSanPham;    
        this.soSao = soSao;            
        this.noiDung = noiDung;        
        this.ngayBinhLuan = ngayBinhLuan; 
        this.ho = ho;                  
        this.ten = ten;
        this.avatar = avatar;
    }

    static fromJSON(json) {
        return new Comment(
            json.MaBinhLuan,
            json.MaTaiKhoan,
            json.MaSanPham,
            json.SoSao,
            json.NoiDung,
            json.NgayBinhLuan,
            json.Ho || '',
            json.Ten || '',
            json.Avatar || ''
        );
    }

    toJSON() {
        return {
            id: this.id,
            maTaiKhoan: this.maTaiKhoan,
            maSanPham: this.maSanPham,
            soSao: this.soSao,
            noiDung: this.noiDung,
            ngayBinhLuan: this.ngayBinhLuan,
            ho: this.ho,
            ten: this.ten,
            avatar: this.avatar
        };
    }
}

module.exports = Comment;
