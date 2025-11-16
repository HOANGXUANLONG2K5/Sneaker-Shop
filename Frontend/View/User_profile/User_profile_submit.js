document.querySelector("#profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.id;

    const formData = new FormData();
    formData.append("Ho", document.querySelector("input[name=Ho]").value);
    formData.append("Ten", document.querySelector("input[name=Ten]").value);
    formData.append("GioiTinh", document.querySelector("select[name=GioiTinh]").value);
    formData.append("NgaySinh", document.querySelector("input[name=NgaySinh]").value);
    formData.append("SoDienThoai", document.querySelector("input[name=SoDienThoai]").value);
    formData.append("DiaChi", document.querySelector("textarea[name=DiaChi]").value);

    // Nếu có file, append vào FormData
    const avatarFile = document.querySelector("input[name=Avatar]").files[0];
    if (avatarFile) formData.append("Avatar", avatarFile);

    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        body: formData
    });

    const data = await res.json();
    if (res.ok) {
        alert("Cập nhật thành công!");
        // Update avatar hiển thị
        if (avatarFile) {
            document.querySelector(".avatar-img").src = URL.createObjectURL(avatarFile);
        }
    } else {
        alert(data.error || "Lỗi cập nhật!");
    }
});
