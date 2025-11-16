document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // sửa đúng

    const firstName = document.querySelector('input[placeholder="First name"]').value.trim();
    const lastName = document.querySelector('input[placeholder="Last name"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const address = document.querySelector('input[placeholder="Address"]').value.trim();
    const phoneNumber = document.querySelector('input[placeholder="Phone number"]').value.trim();
    const password = document.querySelector('input[placeholder="Password"]').value;
    const day = document.querySelector('#daySelect .select-selected').textContent;
    const month = document.querySelector('#monthSelect .select-selected').textContent;
    const year = document.querySelector('#yearSelect .select-selected').textContent;

    try {
        const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Ho: lastName,
                Ten: firstName,
                Email: email,
                DiaChi: address,
                SoDienThoai: phoneNumber,
                MatKhau: password,
                NgaySinh: `${year}-${month}-${day}`,
                VaiTro: "user"
            })
        });

        const result = await res.json();

        if (res.ok) {
            alert("Đăng ký thành công!");
            window.location.href = "../Login/Login.html";
        } else {
            alert("Lỗi đăng ký: " + result.error);
        }
    } catch (err) {
        console.error("Lỗi:", err);
        alert("Không thể kết nối tới server!");
    }
});
