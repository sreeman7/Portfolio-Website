const portfolioData = {
  name: "Sreeman Reddy Gokula",
  heroTitle: "Hello, I am Sreeman!",
  role: "Aspiring Software Engineer | GenAI & Full-Stack Developer",
  initials: "SR",
  githubUsername: "sreeman7",
  profileImage: "assets/profile.JPG",
  about: [
    "I’m a Computer Science student and aspiring Software Engineer with a strong interest in Generative AI and full-stack development. I enjoy building practical, user-focused applications and turning ideas into reliable products. I like working across the stack, from clean front-end interfaces to backend APIs and data-driven features. I’m currently focused on improving my skills in modern web development, problem solving, and AI-powered application building.",
    "Outside of tech, I enjoy marathon running, traveling, and hiking, which help me stay disciplined, curious, and motivated."
  ],
  facts: [
    "Based in Edmonton, AB",
    "Open to Software Engineer opportunities",
    "Interests: web apps, APIs, and product engineering"
  ],
  education: [
    {
      school: "University of Alberta",
      meta: "BSc in Computing Science | 2024 - 2028",
      points: [
        "Relevant focus on software engineering, algorithms, and systems.",
        "Built academic and personal projects in full-stack development."
      ]
    }
  ],
  experience: [
    {
      role: "Software Developer Projects",
      meta: "Portfolio Work | 2024 - Present",
      points: [
        "Developed web applications with responsive UI and accessible interactions.",
        "Implemented API integrations and improved performance across pages."
      ]
    }
  ],
  fallbackProjects: [
    {
      title: "TaskFlow Platform",
      description: "Task automation dashboard with auth, analytics, and workflow templates.",
      tags: ["React", "Node.js", "PostgreSQL"],
      link: "#",
      linkLabel: "View Project"
    },
    {
      title: "Commerce UI Revamp",
      description: "Redesigned product browsing experience to improve clarity and conversion.",
      tags: ["Next.js", "UX", "Accessibility"],
      link: "#",
      linkLabel: "View Project"
    },
    {
      title: "Insights Engine",
      description: "Reporting app that converts product events into decision-ready summaries.",
      tags: ["Python", "REST APIs", "Dashboard"],
      link: "#",
      linkLabel: "View Project"
    },
    {
      title: "Portfolio Website",
      description: "Personal website with structured sections, animations, and contact flow.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "#",
      linkLabel: "View Project"
    }
  ],
  activities: [
    {
      title: "Hackathon Participant",
      meta: "University and Community Events",
      description:
        "Worked in fast-paced teams to design and build prototypes within 24-48 hours."
    },
    {
      title: "Technical Club Member",
      meta: "Campus Developer Community",
      description:
        "Contributed to peer coding sessions, project demos, and technical knowledge sharing."
    }
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Python",
    "PostgreSQL",
    "Git",
    "Responsive Design",
    "Testing"
  ],
  contactCopy: "If you want to contact me, use the form or one of these links.",
  contacts: {
    email: "gokula@ualberta.ca",
    github: "https://github.com/sreeman7",
    linkedin: "https://www.linkedin.com/in/sreeman-reddy-gokula-3674b02b5/",
    resume: "https://example.com/your-resume.pdf"
  }
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setLink(id, href, label) {
  const element = document.getElementById(id);
  if (!element) return;
  element.href = href;
  if (label) element.textContent = label;
}

function renderFacts(facts) {
  const list = document.getElementById("profile-facts");
  if (!list) return;
  list.innerHTML = facts.map((fact) => `<li>${fact}</li>`).join("");
}

function renderTimeline(items, id, headingKey) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
        <article class="timeline-item">
          <h3>${item[headingKey]}</h3>
          <p class="timeline-meta">${item.meta}</p>
          <ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderProjects(projects) {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  grid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <h3><a class="project-title-link" href="${project.link}" target="_blank" rel="noreferrer">${project.title}</a></h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel}</a>
        </article>
      `
    )
    .join("");
}

function renderProjectStatus(message) {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  grid.innerHTML = `<p class="project-status">${message}</p>`;
}

async function fetchAllGitHubRepos(username) {
  const repos = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const pageItems = await response.json();
    repos.push(...pageItems);

    if (pageItems.length < perPage) break;
    page += 1;
  }

  return repos;
}

function mapGitHubReposToProjects(repos) {
  return repos
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .map((repo) => {
      const tags = [];
      if (repo.language) tags.push(repo.language);
      tags.push(`★ ${repo.stargazers_count}`);
      tags.push(`Forks ${repo.forks_count}`);

      return {
        title: repo.name,
        description: repo.description || "No description provided for this repository yet.",
        tags,
        link: repo.html_url,
        linkLabel: "Open Repo"
      };
    });
}

async function loadGitHubProjects(username, fallbackProjects) {
  renderProjectStatus("Loading projects from GitHub...");

  try {
    const repos = await fetchAllGitHubRepos(username);
    if (!repos.length) {
      renderProjectStatus("No public repositories found yet.");
      return;
    }
    renderProjects(mapGitHubReposToProjects(repos));
  } catch (error) {
    renderProjects(fallbackProjects);
  }
}

function renderSkills(skills) {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.className = "chip-list";
  grid.innerHTML = skills.map((skill) => `<span>${skill}</span>`).join("");
}

function renderActivities(activities) {
  const grid = document.getElementById("activity-grid");
  if (!grid) return;
  grid.innerHTML = activities
    .map(
      (activity) => `
        <article class="activity-card">
          <h3>${activity.title}</h3>
          <p class="activity-meta">${activity.meta}</p>
          <p>${activity.description}</p>
        </article>
      `
    )
    .join("");
}

function renderAboutParagraphs(paragraphs) {
  const container = document.getElementById("about-copy");
  if (!container) return;
  container.innerHTML = paragraphs.map((text) => `<p>${text}</p>`).join("");
}

function setupProfileImage(imagePath) {
  const image = document.getElementById("profile-image");
  const wrap = document.getElementById("profile-avatar-wrap");
  if (!image || !wrap) return;

  image.src = imagePath;
  image.onload = () => wrap.classList.add("has-image");
  image.onerror = () => wrap.classList.remove("has-image");
}

function initializePage(data) {
  document.title = `${data.name} | Portfolio`;
  setText("brand-name", data.name);
  setText("hero-name", data.heroTitle);
  setText("hero-role", data.role);
  setText("profile-avatar", data.initials);
  setText("contact-copy", data.contactCopy);
  setText("footer-name", data.name);
  setupProfileImage(data.profileImage);

  renderAboutParagraphs(data.about);
  renderFacts(data.facts);
  renderTimeline(data.education, "education-list", "school");
  renderTimeline(data.experience, "experience-list", "role");
  loadGitHubProjects(data.githubUsername, data.fallbackProjects);
  renderActivities(data.activities);
  renderSkills(data.skills);

  setLink("email-link", `mailto:${data.contacts.email}`);
  setLink("github-link", data.contacts.github);
  setLink("linkedin-link", data.contacts.linkedin);
  setLink("resume-link", data.contacts.resume);
}

initializePage(portfolioData);

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
