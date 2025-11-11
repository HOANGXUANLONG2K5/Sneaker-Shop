// AddToCart.js
document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.addEventListener("click", async () => {
        const userId = Number(localStorage.getItem("userId"));
        if (!userId) return alert("Bạn chưa đăng nhập!");

        const selectedBtn = document.querySelector(".btn-outline-dark.btn-sm.active");
        if (!selectedBtn) return alert("Vui lòng chọn kích thước!");

        const MaChiTietSanPham = Number(selectedBtn.dataset.id);
        if (!MaChiTietSanPham) return alert("Chi tiết sản phẩm không tồn tại!");

        const SoLuong = 1;

        try {
            const res = await fetch("http://localhost:3000/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ MaNguoiDung: userId, MaChiTietSanPham, SoLuong })
            });

            const result = await res.json();
            if (res.ok) alert("Đã thêm sản phẩm vào giỏ hàng!");
            else alert(result.message || "Không thể thêm sản phẩm!");
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server!");
        }
    });
});
