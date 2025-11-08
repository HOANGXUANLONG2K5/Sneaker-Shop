document.querySelectorAll(".menu-item").forEach(item => {
  const menu = item.querySelector(".mega-menu");

  item.addEventListener("mouseenter", () => {
    menu.style.display = "block";
  });

  item.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!menu.matches(":hover")) {
        menu.style.display = "none";
      }
    }, 200);
  });

  menu.addEventListener("mouseleave", () => {
    menu.style.display = "none";
  });
});