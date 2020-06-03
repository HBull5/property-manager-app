const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menu.classList.remove("hide-menu");
});

closeBtn.addEventListener("click", () => {
    menu.classList.add("hide-menu");
});
