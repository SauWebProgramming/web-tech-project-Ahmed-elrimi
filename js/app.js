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
        <p class="section-subtitle">
          A selection of projects showcasing my work and interests.
        </p>
      </header>

      <div id="projects-container" class="card">Loading projects...</div>
    </section>
  `;

  loadProjects();
}


function renderContact() {
  app.innerHTML = `
    <section class="section">
      <header class="section-header">
        <h2 class="section-title">Contact</h2>
        <p class="section-subtitle">
          Feel free to contact me for collaboration, questions, or opportunities. I will get back to you as soon as possible.
        </p>
      </header>

      <div class="contact-layout">
        <form id="contact-form" class="card" novalidate>
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input id="name" name="name" type="text" required minlength="3" placeholder="Enter your full name" />
            <p class="helper">At least 3 characters.</p>
            <p class="error" data-error-for="name"></p>
          </div>

          <div class="form-group">
            <label for="email">Email Address *</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" />
            <p class="helper">A valid email address is required.</p>
            <p class="error" data-error-for="email"></p>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" required minlength="10" maxlength="500"
              placeholder="Write your message here..."></textarea>
            <p class="helper">Between 10 and 500 characters.</p>
            <p class="error" data-error-for="message"></p>
          </div>

          <button type="submit" class="button">Send Message</button>
          <div id="form-status"></div>
        </form>

        <div>
          <div class="card mb-10">
            <h3>Contact Info</h3>
            <ul class="list mt-06">
              <li><strong>Email:</strong> ahmedalremi585379@gmail.com</li>
              <li><strong>GitHub:</strong> github.com/Ahmed-Elrimi</li>
              <li><strong>LinkedIn:</strong> linkedin.com/in/Ahmed-Elrimi</li>
              <li><strong>Location:</strong> Turkey</li>
            </ul>
          </div>

        <div class="card">
  <h3>Availability</h3>
  <p class="mt-06">
    I am currently open to internships, junior front-end roles, and small freelance projects.
    I enjoy collaborating on real-world applications and improving user-facing features.
  </p>

  <ul class="list mt-06">
    <li>Open to front-end internships</li>
    <li>Available for short-term freelance tasks</li>
    <li>Interested in UI-focused team projects</li>
    <li>Remote collaboration preferred</li>
  </ul>
</div>

        </div>
      </div>
    </section>
  `;

  setupContactValidation();
}

/* ---- Projects: async fetch ---- */

async function loadProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  try {
    const res = await fetch("./data/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch projects.json");

    const projects = await res.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      container.textContent = "No projects found.";
      return;
    }

    container.classList.remove("card");
    container.innerHTML = `
      <div class="projects-grid">
        ${projects.map((p) => projectCardHtml(p)).join("")}
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.textContent = "Error loading projects. Please try again later.";
  }
}

function projectCardHtml(p) {
  const title = escapeHtml(p?.title);
  const year = escapeHtml(p?.year);
  const desc = escapeHtml(p?.description);
  const techs = Array.isArray(p?.technologies) ? p.technologies : [];
  const githubUrl = safeUrl(p?.githubUrl);
  const demoUrl = safeUrl(p?.demoUrl);

  const linksHtml = (githubUrl || demoUrl)
    ? `
      <div class="project-links">
        ${githubUrl ? `<a class="link-btn" href="${githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
        ${demoUrl ? `<a class="link-btn" href="${demoUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
      </div>
    `
    : "";

  return `
    <article class="card">
      <h3 class="project-title">${title}</h3>
      <p class="project-meta">${year}</p>
      <p class="mt-06">${desc}</p>

      <div class="tags mt-06">
        ${techs.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>

      ${linksHtml}
    </article>
  `;
}

function safeUrl(value) {
  const v = String(value ?? "").trim();
  if (!v) return "";
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* --- Contact: validation --- */

function setupContactValidation() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.innerHTML = "";

    const ok = validateForm(form);
    if (!ok) return;

    form.reset();
    status.innerHTML = `
      <div class="alert">
        Your message has been sent successfully (simulated). Thank you!
      </div>
    `;
  });
}

function validateForm(form) {
  let valid = true;

  const show = (name, msg) => {
    const el = form.querySelector(`.error[data-error-for="${name}"]`);
    if (el) el.textContent = msg;
  };


  ["name", "email", "message"].forEach((f) => show(f, ""));

  const name = form.elements["name"];
  const email = form.elements["email"];
  const message = form.elements["message"];

  if (!name.checkValidity()) {
    valid = false;
    if (name.validity.valueMissing) show("name", "Name is required.");
    else if (name.validity.tooShort) show("name", "Name must be at least 3 characters.");
  }

  if (!email.checkValidity()) {
    valid = false;
    if (email.validity.valueMissing) show("email", "Email is required.");
    else if (email.validity.typeMismatch) show("email", "Please enter a valid email address.");
  }

  if (!message.checkValidity()) {
    valid = false;
    if (message.validity.valueMissing) show("message", "Message is required.");
    else if (message.validity.tooShort) show("message", "Message must be at least 10 characters.");
    else if (message.validity.tooLong) show("message", "Message must be less than 500 characters.");
  }


  const text = message.value.trim().toLowerCase();
  if (text.includes("http")) {
    valid = false;
    show("message", "Please do not include links in the message for this demo form.");
  }

  return valid;
}
