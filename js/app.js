const nav = document.getElementById("main-nav");
const hamburger = document.getElementById("hamburger");
const yearSpan = document.getElementById("year");

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initMobileNav();
});

function initYear() {
  yearSpan.textContent = String(new Date().getFullYear());
}

function initMobileNav() {
  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;
    closeMobileMenu();
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNav = nav.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    if (!clickedInsideNav && !clickedHamburger) closeMobileMenu();
  });
}

function closeMobileMenu() {
  nav.classList.remove("open");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
}
