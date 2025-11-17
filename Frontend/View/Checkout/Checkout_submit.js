document.getElementById("btnCheckout").addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Bạn cần đăng nhập trước khi thanh toán!");
        return;
    }

    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').id;

    const orderData = {
        MaTaiKhoan: currentUser.id,   // Lấy từ localStorage
        DiaChiGiaoToi: address,
        SoDienThoai: phone,
        PhuongThucThanhToan: paymentMethod
    };

    fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text) });
            }
            return res.json();
        })
        .then(data => {
            alert("Đặt hàng thành công!");
        })
        .catch(err => console.error("Lỗi fetch:", err));


});
