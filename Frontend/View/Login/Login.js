document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[placeholder="User"]').value;
  const password = document.querySelector('input[placeholder="Password"]').value;

  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, MatKhau: password }),
    });

    const data = await res.json();

    if (res.ok) {
      const user = data.user; 
      
      localStorage.setItem("currentUser", JSON.stringify({
        id: user.MaTaiKhoan,
        role: user.VaiTro
      }));

      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        text: data.message,
      }).then(() => {
        if (user.VaiTro === "admin") {
          window.location.href = "../Manage/Manage.html";
        } else {
          window.location.href = "../Home/Home.html";
        }
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng nhập!",
        text: data.error,
      });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    alert("Không thể kết nối đến server.");
  }
});
