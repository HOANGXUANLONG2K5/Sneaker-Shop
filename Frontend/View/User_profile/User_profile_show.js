document.addEventListener("DOMContentLoaded", async function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.id;

    if (!userId) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "../Login/Login.html";
        return;
    }

    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
    const user = await res.json();

    document.querySelector("input[name=Ho]").value = user.ho;
    document.querySelector("input[name=Ten]").value = user.ten;
    document.querySelector("select[name=GioiTinh]").value = user.gioiTinh;
    document.querySelector("input[name=NgaySinh]").value = user.ngaySinh?.split("T")[0];
    document.querySelector("input[name=SoDienThoai]").value = user.soDienThoai;
    document.querySelector("textarea[name=DiaChi]").value = user.diaChi;

    const avatarImg = document.querySelector(".avatar-img");
    if (user.avatar && user.avatar.trim() !== "") {
        avatarImg.src = `http://localhost:3000${user.avatar}`;
        avatarImg.onerror = function () {
            this.src = "https://static.vecteezy.com/system/resources/previews/026/631/405/non_2x/human-icon-symbol-design-illustration-vector.jpg";
        };
    } else {
        avatarImg.src = "https://static.vecteezy.com/system/resources/previews/026/631/405/non_2x/human-icon-symbol-design-illustration-vector.jpg";
    }
});
