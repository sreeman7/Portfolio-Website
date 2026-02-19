const portfolioData = {
  name: "Your Name",
  role: "Software Developer",
  headline: "I build useful products that solve real problems.",
  summary:
    "I design and ship web experiences with clean engineering, strong UX, and measurable results.",
  aboutTitle: "Builder mindset, product focus",
  about:
    "I enjoy shipping products that are technically strong and easy for people to use. I care about ownership, clear communication, and writing code that teams can maintain and scale.",
  metrics: [
    { value: "12+", label: "projects completed" },
    { value: "3", label: "production launches" },
    { value: "99%", label: "focus on quality" }
  ],
  projects: [
    {
      type: "Full Stack",
      title: "TaskFlow Platform",
      description:
        "Built a task automation dashboard with role-based auth, analytics, and workflow templates.",
      stack: ["React + Node.js", "PostgreSQL", "JWT Authentication"],
      linkLabel: "Case Study",
      link: "#"
    },
    {
      type: "Frontend",
      title: "Commerce UI Revamp",
      description:
        "Redesigned a product listing experience to improve conversion and reduce layout shift.",
      stack: ["Next.js", "Performance Optimization", "Accessibility"],
      linkLabel: "Case Study",
      link: "#"
    },
    {
      type: "Data + API",
      title: "Insights Engine",
      description:
        "Created a reporting tool that turns event data into action-ready business summaries.",
      stack: ["Python", "REST APIs", "Dashboarding"],
      linkLabel: "Case Study",
      link: "#"
    }
  ],
  skills: [
    {
      title: "Frontend",
      description:
        "HTML, CSS, JavaScript, React, Next.js, Tailwind, responsive design, accessibility."
    },
    {
      title: "Backend",
      description:
        "Node.js, Express, APIs, authentication, database modeling, integration workflows."
    },
    {
      title: "Engineering",
      description:
        "Testing, clean architecture, performance tuning, observability, and collaboration."
    }
  ],
  contactTitle: "Let's talk about your team's goals",
  contactCopy: "Open to software engineering roles and impactful product opportunities.",
  contactCta: "Contact Me",
  contacts: {
    email: "youremail@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-handle/",
    resume: "https://example.com/your-resume.pdf"
  }
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setLink(id, href, label) {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
    if (label) {
      element.textContent = label;
    }
  }
}

function renderMetrics(metrics) {
  const list = document.getElementById("metrics-list");
  if (!list) return;

  list.innerHTML = metrics
    .map((metric) => `<li><span>${metric.value}</span>${metric.label}</li>`)
    .join("");
}

function renderProjects(projects) {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card reveal">
        <p class="project-tag">${project.type}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul>
          ${project.stack.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <a href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel}</a>
      </article>
    `
    )
    .join("");
}

function renderSkills(skills) {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = skills
    .map(
      (skill) => `
      <article class="skill-block reveal">
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
      </article>
    `
    )
    .join("");
}

function initializePage(data) {
  document.title = `${data.name} | Portfolio`;
  setText("brand-name", data.name);
  setText("hero-role", data.role);
  setText("footer-name", data.name);
  setText("hero-headline", data.headline);
  setText("hero-summary", data.summary);
  setText("hero-contact-label", data.contactCta);
  setText("about-title", data.aboutTitle);
  setText("about-copy", data.about);
  setText("contact-title", data.contactTitle);
  setText("contact-copy", data.contactCopy);
  renderMetrics(data.metrics);
  renderProjects(data.projects);
  renderSkills(data.skills);
  setLink("email-link", `mailto:${data.contacts.email}`);
  setLink("github-link", data.contacts.github);
  setLink("linkedin-link", data.contacts.linkedin);
  setLink("resume-link", data.contacts.resume);
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.style.animationPlayState = "paused";
    observer.observe(element);
  });
}

initializePage(portfolioData);
setupRevealAnimation();

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
