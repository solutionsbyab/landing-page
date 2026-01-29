const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

btn.addEventListener("click", () => {
  menu.toggleAttribute("hidden");
});

document.addEventListener("click", e => {
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.setAttribute("hidden", "");
  }
});
