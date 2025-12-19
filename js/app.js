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

/* ---------------- Router (SPA) ---------------- */

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
    <section class="section hero">
      <div>
        <h1>Ahmed Elrimi</h1>
        <p>
          Front-end developer with a strong focus on performance, accessibility, and clean UI engineering.
          I build responsive web interfaces, design reusable components, and ship practical features that solve real problems.
        </p>

        <div class="hero-actions">
          <a class="button" href="#projects" data-link>Explore Projects</a>
          <a class="button secondary" href="#contact" data-link>Let’s Work Together</a>
        </div>

        <div class="tags">
          <span class="tag">UI Engineering</span>
          <span class="tag">Accessibility</span>
          <span class="tag">Performance</span>
          <span class="tag">Component Design</span>
          <span class="tag">Clean Code</span>
        </div>

        <div class="kpi">
          <div class="card">
            <strong>End-to-End</strong>
            <span>From idea to shipped UI</span>
          </div>
          <div class="card">
            <strong>Quality First</strong>
            <span>Readable, scalable code</span>
          </div>
          <div class="card">
            <strong>User Focused</strong>
            <span>Simple and intuitive UX</span>
          </div>
        </div>
      </div>

      <div class="hero-side">
        <div class="card">
          <h3>Currently</h3>
          <ul class="list mt-06">
            <li><strong>Role:</strong> Front-End Developer</li>
            <li><strong>Location:</strong> Turkey</li>
            <li><strong>Open to:</strong> Internships & freelance</li>
            <li><strong>Interests:</strong> Web apps, UI systems, tooling</li>
          </ul>
        </div>

        <div class="card">
          <h3>What you can expect</h3>
          <ul class="list mt-06">
            <li>Responsive layouts that look great on any device</li>
            <li>Well-structured code with clear naming and organization</li>
            <li>Attention to details: spacing, typography, and interactions</li>
            <li>Practical solutions, not over-engineering</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  app.innerHTML = `
    <section class="section">
      <header class="section-header">
        <h2 class="section-title">About</h2>
        <p class="section-subtitle">
          I build modern interfaces that are clean, fast, and accessible — with a developer mindset that values clarity and maintainability.
        </p>
      </header>

      <div class="grid-2">
        <div class="card">
          <h3>My approach</h3>
          <p class="mt-06">
            I care about building UIs that feel smooth and professional. That means consistent spacing, readable typography,
            predictable component behavior, and clean structure. I enjoy taking a feature from a simple mockup to a polished experience.
          </p>

          <h3 class="mt-125">Core strengths</h3>
          <ul class="list mt-06">
            <li>Building responsive layouts using Flexbox/Grid</li>
            <li>Creating reusable UI components and consistent patterns</li>
            <li>Improving accessibility (semantic HTML, focus states, forms)</li>
            <li>Optimizing performance (small DOM, efficient rendering)</li>
          </ul>

          <h3 class="mt-125">What I’m aiming for</h3>
          <ul class="list mt-06">
            <li>Work on real products with real users</li>
            <li>Strengthen my front-end engineering and UI architecture skills</li>
            <li>Collaborate with teams and learn professional workflows</li>
          </ul>
        </div>

        <div class="card">
          <h3>Skills & tools</h3>
          <ul class="list mt-06">
            <li><strong>HTML:</strong> semantic structure, accessibility basics</li>
            <li><strong>CSS:</strong> responsive design, Grid/Flexbox, UI polish</li>
            <li><strong>JavaScript:</strong> ES6+, DOM events, async/await, fetch</li>
            <li><strong>Git:</strong> meaningful commits, collaboration on GitHub</li>
            <li><strong>Workflow:</strong> planning features, testing UI behavior, iterating quickly</li>
          </ul>

          <h3 class="mt-125">Outside coding</h3>
          <ul class="list mt-06">
            <li>Learning UI/UX fundamentals and design systems</li>
            <li>Exploring software architecture and best practices</li>
            <li>Building small tools to speed up development</li>
          </ul>
        </div>
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
