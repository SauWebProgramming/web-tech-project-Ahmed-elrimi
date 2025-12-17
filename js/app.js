const app = document.getElementById("app");
const nav = document.getElementById("main-nav");
const hamburger = document.getElementById("hamburger");
const yearSpan = document.getElementById("year");

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initMobileNav();
  initRouter();
});

window.addEventListener("hashchange", () => {
  navigate();
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

/* ----Router (SPA) ---- */

const routes = {
  "#home": renderHome,
  "#about": renderAbout,
  "#projects": renderProjects,
  "#contact": renderContact
};

function initRouter() {

  if (!window.location.hash) {
    window.location.hash = "#home";
    return;
  }
  navigate();
}

function navigate() {
  const hash = window.location.hash || "#home";
  const view = routes[hash] || routes["#home"];

  view();
  setActiveLink(hash);
}

function setActiveLink(activeHash) {
  nav.querySelectorAll("a[data-link]").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === activeHash);
  });
}



function renderHome() {
  app.innerHTML = `
    <section class="section">
      <header class="section-header">
        <h2 class="section-title">Home</h2>
        <p class="section-subtitle">This is a home section. </p>
      </header>
      <div class="card">
        <p>Welcome to my portfolio .</p>
      </div>
    </section>
  `;
}

function renderAbout() {
  app.innerHTML = `
    <section class="section">
      <header class="section-header">
        <h2 class="section-title">About</h2>
        <p class="section-subtitle">This is a about section. </p>
      </header>
      <div class="card">
        <p>About me content will be here.</p>
      </div>
    </section>
  `;
}

function renderProjects() {
  app.innerHTML = `
    <section class="section">
      <header class="section-header">
        <h2 class="section-title">Projects</h2>
        <p class="section-subtitle">This is a projects section.</p>
      </header>
      <div class="card">
        <p>Projects list will be loaded here.</p>
      </div>
    </section>
  `;
}

function renderContact() {
  app.innerHTML = `
    <section class="section">
      <header class="section-header">
        <h2 class="section-title">Contact</h2>
        <p class="section-subtitle">This is a contact section.</p>
      </header>
      <div class="card">
        <p>Contact form will be here.</p>
      </div>
    </section>
  `;
}
