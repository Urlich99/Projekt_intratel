const menu = document.querySelector(".menu");
const burgerBtn = document.querySelector(".burger");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});