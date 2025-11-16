document.querySelector(".product-review .btn.btn-dark").addEventListener("click", async () => {
    const content = document.getElementById("feedback").value;
    const stars = parseInt(document.getElementById("rating").value) || 0;

    if (!content.trim() || stars === 0) {
        alert("Vui lòng nhập nội dung và chọn số sao!");
        return;
    }

    // Lấy userId từ localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.id;

    if (!userId) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "../Login/Login.html";
        return;
    }

    // Lấy productId từ dataset đã gán lúc DOMContentLoaded
    const productContainer = document.getElementById("reviewContainer");
    const productId = parseInt(productContainer.dataset.productId);
    if (!productId) {
        alert("Không xác định được sản phẩm!");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/comment/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                MaTaiKhoan: userId,
                MaSanPham: productId,
                NoiDung: content,
                SoSao: stars
            })
        });

        const data = await res.json();
        if (res.ok) {
            alert("Gửi đánh giá thành công!");
            // Load lại comment sau khi thêm
            loadComments(productId);
        } else {
            alert("Gửi đánh giá thất bại: " + data.message);
        }
    } catch (err) {
        console.error("Lỗi khi gửi comment:", err);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
});
