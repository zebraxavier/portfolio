document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const navLinksContainer = document.getElementById("nav-links");
  const mobileNavLinksContainer = document.getElementById("mobile-nav-links");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // --- STATE ---
  // This flag prevents navigation while a page transition is active.
  let isTransitioning = false;

  // --- CONTENT DATABASE ---
  const portfolioData = {
    pages: [
      { id: "home", title: "Home" },
      { id: "about", title: "About Me" },
      { id: "projects", title: "Projects" },
      { id: "certificates", title: "Certificates" },
      { id: "education", title: "Education" },
      { id: "contact", title: "Contact" },
    ],
    content: {
      home: {
        title: "Xavier Leonard",
        subtitle: "Creative Web Developer & UI/UX Enthusiast",
        description:
          "I build futuristic, user-friendly web experiences with a passion for clean code and vibrant design. Let's create something amazing together.",
        cta: { text: "View My Work", page: "projects" },
      },
      about: {
        title: "About Me",
        imageUrl: "photo.jpg",
        bio: "Hello! I'm Xavier, a developer based in the digital universe. With 5 years of experience, I've honed my skills in front-end and back-end technologies. My journey in tech began with a curiosity for how things work, which evolved into a passion for building elegant and efficient applications. I thrive on challenges and am constantly learning to stay at the forefront of technology.",
        skills: [
          "c",
          "c++",
          "Java",
          "Html",
          "CSS",
          "JavaScript",
          "Ui/UX Design",
        ],
      },
      projects: {
        title: "My Projects",
        items: [
          {
            title: "Project Neon",
            description:
              "A futuristic social media dashboard built with React, featuring real-time data visualization and a customizable UI.",
            tags: ["React", "D3.js", "Node.js"],
            link: "#",
          },
          {
            title: "CyberMart",
            description:
              "An e-commerce platform with a cyberpunk aesthetic, focusing on a seamless and secure shopping experience.",
            tags: ["Vue.js", "Stripe", "Firebase"],
            link: "#",
          },
          {
            title: "AI Portfolio Generator",
            description:
              "A tool that uses generative AI to create personalized portfolio websites for developers and designers.",
            tags: ["JavaScript", "OpenAI API", "HTML/CSS"],
            link: "#",
          },
          {
            title: "Data Stream",
            description:
              "A real-time data streaming service for IoT devices, built with a scalable microservices architecture.",
            tags: ["Node.js", "WebSocket", "MongoDB"],
            link: "#",
          },
        ],
      },
      certificates: {
        title: "My Certificates",
        items: [
          {
            title: "Participated in various  competitions in college level",
            issuer:
              "Department of Computer Science,Npr Arts And Science College",
            link: "https://drive.google.com/drive/folders/1Lj_vs5oe1xRJlqboBpQJDZvmN5Hl071U?usp=drive_link",
          },
          {
            title: "Advanced CSS and Sass",
            issuer: "Design Masters",
            date: "Issued: Jan 2023",
            link: "#",
          },
          {
            title: "React - The Complete Guide",
            issuer: "Online Courses Inc.",
            date: "Issued: Sep 2022",
            link: "#",
          },
          {
            title: "Node.js, Express, MongoDB & More",
            issuer: "Server-side Gurus",
            date: "Issued: Jun 2022",
            link: "#",
          },
        ],
      },
      education: {
        title: "My Education",
        items: [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            duration: "2018 - 2022",
            description:
              "Focused on software development, algorithms, and data structures. Completed a final year project on machine learning applications.",
          },
          {
            institution: "Downtown High School",
            degree: "High School Diploma",
            duration: "2016 - 2018",
            description:
              "Specialized in mathematics and physics, laying the foundational knowledge for a career in technology.",
          },
          {
            institution: "Online Course Platform",
            degree: "The Complete Web Developer Bootcamp",
            duration: "Completed 2023",
            description:
              "A comprehensive course covering the MERN stack (MongoDB, Express, React, Node.js) and modern web development practices.",
          },
        ],
      },
      contact: {
        title: "Get In Touch",
        description:
          "I'm currently available for freelance work and open to new opportunities. Have a project in mind or just want to say hi? Feel free to reach out!",
      },
    },
  };

  // --- PAGE RENDERING LOGIC ---
  function renderPage(pageId) {
    const pageData = portfolioData.content[pageId];
    if (!pageData) {
      isTransitioning = false;
      return;
    }

    let html = "";
    switch (pageId) {
      case "home":
        html = `
                            <div id="home-content">
                                <h1 class="neon-gradient-text">${pageData.title}</h1>
                                <p class="subtitle">${pageData.subtitle}</p>
                                <p class="description">${pageData.description}</p>
                                <button class="neon-button" data-page="${pageData.cta.page}">${pageData.cta.text}</button>
                            </div>`;
        break;
      case "about":
        html = `
                            <div id="about-content">
                                <h2 class="neon-gradient-text">${
                                  pageData.title
                                }</h2>
                                <div class="about-container">
                                    <div class="about-image-container">
                                        <img src="${
                                          pageData.imageUrl
                                        }" alt="Xavier Leonard" class="about-image">
                                    </div>
                                    <div class="about-text-container">
                                        <p class="bio">${pageData.bio}</p>
                                        <h3 class="skills-title">My Skills</h3>
                                        <div class="skills-grid">
                                            ${pageData.skills
                                              .map(
                                                (skill) =>
                                                  `<span class="skill-tag">${skill}</span>`
                                              )
                                              .join("")}
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        break;
      case "projects":
        html = `
                            <div id="projects-content">
                                <h2 class="neon-gradient-text">${
                                  pageData.title
                                }</h2>
                                <div id="projects-grid">
                                    ${pageData.items
                                      .map(
                                        (p) => `
                                        <div class="project-card">
                                            <h3>${p.title}</h3>
                                            <p>${p.description}</p>
                                            <div class="tags">${p.tags
                                              .map(
                                                (tag) =>
                                                  `<span class="tag">${tag}</span>`
                                              )
                                              .join("")}</div>
                                            <a href="${
                                              p.link
                                            }" target="_blank" class="project-link">View Project &rarr;</a>
                                        </div>`
                                      )
                                      .join("")}
                                </div>
                            </div>`;
        break;
      case "certificates":
        html = `
                            <div id="certificates-content">
                                <h2 class="neon-gradient-text">${
                                  pageData.title
                                }</h2>
                                <div id="certificates-grid">
                                    ${pageData.items
                                      .map(
                                        (cert) => `
                                        <div class="certificate-card">
                                            <h3>${cert.title}</h3>
                                            <p class="issuer">${cert.issuer}</p>
                                             <p class="date">${cert.date}</p>
                                            <a href="${cert.link}" target="_blank" class="cert-link">View Credential &rarr;</a>
                                        </div>`
                                      )
                                      .join("")}
                                </div>
                            </div>`;
        break;
      case "education":
        html = `
                            <div id="education-content">
                                <h2 class="neon-gradient-text">${
                                  pageData.title
                                }</h2>
                                <div id="education-grid">
                                    ${pageData.items
                                      .map(
                                        (edu) => `
                                        <div class="education-card">
                                            <h3>${edu.institution}</h3>
                                            <p class="degree">${edu.degree}</p>
                                            <p class="duration">${edu.duration}</p>
                                            <p class="description">${edu.description}</p>
                                        </div>`
                                      )
                                      .join("")}
                                </div>
                            </div>`;
        break;
      case "contact":
        html = `
                            <div id="contact-content">
                                <h2 class="neon-gradient-text">${pageData.title}</h2>
                                <p>${pageData.description}</p>
                                <form id="contact-form">
                                    <div>
                                        <label for="name">Your Name</label>
                                        <input type="text" id="name" required>
                                    </div>
                                    <div>
                                        <label for="email">Your Email</label>
                                        <input type="email" id="email" required>
                                    </div>
                                    <div>
                                        <label for="message">Message</label>
                                        <textarea id="message" rows="5" required></textarea>
                                    </div>
                                    <button type="submit" class="neon-button">Send Message</button>
                                </form>
                                <p id="form-status"></p>
                            </div>`;
        break;
    }

    const newContent = document.createElement("div");
    newContent.className = "content-section is-entering";
    newContent.innerHTML = html;

    const oldContent = mainContent.querySelector(".content-section");

    const attachNewContent = () => {
      mainContent.appendChild(newContent);

      if (pageId === "contact") {
        const form = document.getElementById("contact-form");
        if (form) {
          form.addEventListener("submit", handleFormSubmit);
        }
      }

      setTimeout(() => {
        newContent.classList.remove("is-entering");
      }, 20);

      newContent.addEventListener(
        "transitionend",
        () => {
          isTransitioning = false;
        },
        { once: true }
      );
    };

    if (oldContent) {
      oldContent.classList.add("is-leaving");
      oldContent.addEventListener(
        "transitionend",
        () => {
          oldContent.remove();
          attachNewContent();
        },
        { once: true }
      );
    } else {
      attachNewContent();
    }
  }

  // --- NAVIGATION LOGIC ---
  function updateActiveLink(pageId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageId);
    });
  }

  function navigate(pageId) {
    if (isTransitioning) return;
    isTransitioning = true;

    renderPage(pageId);
    updateActiveLink(pageId);
    mobileMenu.classList.add("hidden");
  }

  function handleNavClick(e) {
    const target = e.target.closest("[data-page]");
    if (target) {
      e.preventDefault();
      navigate(target.dataset.page);
    }
  }

  // --- EVENT LISTENERS ---
  function handleFormSubmit(e) {
    e.preventDefault();

    const status = document.getElementById("form-status");
    if (status) {
      status.textContent = "Thank you for your message!";
    }

    e.target.reset();

    setTimeout(() => {
      if (status) {
        status.textContent = "";
      }
    }, 3000);
  }

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
  }

  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // --- INITIALIZATION ---
  function initialize() {
    const navHtml = portfolioData.pages
      .map(
        (page) =>
          `<li><a href="#" class="nav-link" data-page="${page.id}">${page.title}</a></li>`
      )
      .join("");
    navLinksContainer.innerHTML = navHtml;
    mobileNavLinksContainer.innerHTML = navHtml;

    document.body.addEventListener("click", handleNavClick);

    navigate("home");
  }

  initialize();
});
