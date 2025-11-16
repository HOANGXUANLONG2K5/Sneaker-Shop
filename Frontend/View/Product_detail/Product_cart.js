document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.getElementById("addToCartBtn");

    addToCartBtn.addEventListener("click", async () => {
        //Lấy userId
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const userId = currentUser?.id;

        if (!userId) {
            alert("Bạn chưa đăng nhập!");
            window.location.href = "../Login/Login.html";
            return;
        }

        //Lấy sản phẩm đã chọn (ví dụ kích thước)
        const selectedBtn = document.querySelector(".btn-outline-dark.btn-sm.active");
        if (!selectedBtn) {
            alert("Vui lòng chọn kích thước!");
            return;
        }

        const MaChiTietSanPham = Number(selectedBtn.dataset.id);
        const SoLuong = 1;

        //Lấy productId từ dataset (giống comment)
        const productContainer = document.getElementById("productContainer");
        const MaSanPham = Number(productContainer?.dataset.productId) || null;

        // Tạo object gửi lên server
        const cartItem = {
            MaNguoiDung: userId,
            MaChiTietSanPham,
            SoLuong
        };

        try {
            //Gửi POST lên API
            const res = await fetch("http://localhost:3000/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartItem)
            });

            const data = await res.json();

            // 5️⃣ Kiểm tra kết quả
            if (res.ok) {
                alert("Đã thêm sản phẩm vào giỏ hàng!");
                // loadCart(userId);
            } else {
                alert("Thêm thất bại: " + (data.message || "Lỗi server"));
            }
        } catch (err) {
            console.error("Lỗi khi thêm giỏ hàng:", err);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    });
});
