document.getElementById("changePasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // tránh reload trang

    const form = e.target;
    const current = form.currentPassword.value;
    const newPass = form.newPassword.value;
    const confirm = form.confirmPassword.value;

    if (newPass !== confirm) {
        alert("Mật khẩu xác nhận không trùng!");
        return;
    }

    // Giả sử userId bạn lưu trong localStorage hoặc lấy từ token
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser ? currentUser.id : null;

    try {
        const res = await fetch("http://localhost:3000/api/users/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, currentPassword: current, newPassword: newPass })
        });



        const data = await res.json();
        alert(data.message);

        if (data.message === "Đổi mật khẩu thành công!") {
            form.reset();
        }
    } catch (err) {
        console.error(err);
        alert("Lỗi server!");
    }
});
