document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCartBtn");

  addToCartBtn.addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const selectedSizeBtn = document.querySelector(".btn-outline-dark.btn-sm.active");
    
    if (!selectedSizeBtn) {
      alert("Vui lòng chọn kích thước!");
      return;
    }

    const kichThuoc = selectedSizeBtn.textContent.trim();
    const soLuong = 1; // mặc định 1
    const maNguoiDung = 1; // tạm thời hardcode, sau sẽ lấy từ session khi có login

    try {
      const res = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maNguoiDung, productId, kichThuoc, soLuong })
      });

      const result = await res.json();
      if (res.ok) {
        alert("Đã thêm sản phẩm vào giỏ hàng!");
        console.log("Cart:", result);
      } else {
        alert(result.message || "Lỗi khi thêm vào giỏ hàng!");
      }
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu:", err);
      alert("Không thể kết nối tới server!");
    }
  });

  // hiệu ứng chọn size
  const sizeButtons = document.querySelectorAll(".btn-outline-dark.btn-sm");
  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
