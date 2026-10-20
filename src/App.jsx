import React from 'react';
import {
  House, UserRound, Sparkles, FolderKanban, FileText, Mail, MapPin,
  Phone, Github, Linkedin, Download, ArrowUpRight, GraduationCap,
  BriefcaseBusiness, Code2, ExternalLink, Menu, X, Sun, Moon
} from 'lucide-react';

const profile = {
  name: 'Mohamed Samsul Alam K',
  role: 'Software Developer (Fresher)',
  email: 'samsulala77@gmail.com',
  phone: '7639324409',
  location: 'Chennai',
  linkedin: 'https://in.linkedin.com/in/samsulalam07',
  github: 'https://github.com/MohamedSamsulAlam',
};

const skills = [
  { name: 'HTML5', type: 'html', mark: '5' },
  { name: 'CSS3', type: 'css', mark: '3' },
  { name: 'JavaScript', type: 'js', mark: 'JS' },
  { name: 'React.js', type: 'react', mark: '⚛' },
  { name: 'Bootstrap', type: 'bootstrap', mark: 'B' },
  { name: 'Python', type: 'python', mark: 'Py' },
  { name: 'Django', type: 'django', mark: 'dj' },
  { name: 'MySQL', type: 'mysql', mark: '▤' },
  { name: 'VS Code', type: 'vscode', mark: '⌁' },
];

const projects = [
  {
    title: 'FLAVOUR — Online Food Ordering',
    description: 'A web-based food ordering platform with Customer, Restaurant Owner, and Admin modules. Includes order management, inventory tracking, and analytics features.',
    details: [
      'Multi-role platform for customers, restaurant owners, and administrators.',
      'Order placement, tracking, and management workflows.',
      'Inventory tracking and operational analytics for restaurant teams.',
      'Built with Python, Django, and MySQL during full stack internship work.',
    ],
    tags: ['Python', 'Django', 'MySQL'],
    icon: '🍲',
    href: 'https://flavour-food-ordering.onrender.com/',
    linkLabel: 'Visit FLAVOUR',
    external: true,
  },
  {
    title: 'Virtual Mouse Using Hand Gestures',
    description: 'Developed a virtual mouse using Python and OpenCV. Controls cursor movement and mouse actions through hand gestures.',
    details: [
      'Uses computer vision to detect hand gestures via webcam input.',
      'Maps gestures to cursor movement and common mouse actions.',
      'Implemented with Python and OpenCV for real-time tracking.',
    ],
    tags: ['Python', 'OpenCV'],
    icon: '🖐️',
    href: profile.github,
    linkLabel: 'View GitHub profile',
    external: true,
  },
];

const navItems = [
  { label: 'Home', href: '#home', icon: House },
  { label: 'About', href: '#about', icon: UserRound },
  { label: 'Skills', href: '#skills', icon: Sparkles },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Resume', href: '#resume', icon: FileText },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const THEME_STORAGE_KEY = 'portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function SkillLogo({ skill }) {
  return <div className={`skill-logo ${skill.type}`} aria-hidden="true"><span>{skill.mark}</span></div>;
}

function SectionTitle({ icon: Icon, children, accent = '' }) {
  return (
    <h2 className="section-title">
      <Icon size={19} /> <span>{children}</span>
      {accent && <small>{accent}</small>}
    </h2>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(getInitialTheme);
  const [activeSection, setActiveSection] = React.useState('home');
  const [selectedProject, setSelectedProject] = React.useState(null);
  const modalCloseRef = React.useRef(null);

  React.useEffect(() => {
    const mode = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', mode);
    document.body.setAttribute('data-theme', mode);
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'light' ? '#f8fafc' : '#030914');
  }, [theme]);

  React.useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  React.useEffect(() => {
    const sectionIds = navItems.map(({ href }) => href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.12, 0.35, 0.6] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalCloseRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  React.useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const scrollToSection = (event, href) => {
    event.preventDefault();
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-shell" data-theme={theme === 'light' ? 'light' : 'dark'}>
      {menuOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} aria-label="Primary">
        <a className="brand" href="#home" onClick={(event) => scrollToSection(event, '#home')}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-letter">M</span>
          </span>
          <span><strong>Mohamed Samsul Alam K</strong><small>Code · Build · Grow</small></span>
        </a>
        <button type="button" className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X />
        </button>
        <nav>
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              className={activeSection === href.slice(1) ? 'nav-link active' : 'nav-link'}
              key={label}
              href={href}
              onClick={(event) => scrollToSection(event, href)}
            >
              <Icon size={17} /><span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-note">Code<br/>Build<br/>Create<br/>Grow <span>↗</span></div>
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
        </div>
      </aside>

      <main className="main-content">
        <div className="main-toolbar">
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Hi, I&apos;m</p>
            <h1 className="hero-title">
              <span className="hero-line hero-line-accent">Mohamed</span>
              <span className="hero-line hero-line-main">Samsul Alam <em>K</em></span>
            </h1>
            <h3>{profile.role}</h3>
            <p className="hero-description">MCA graduate with hands-on experience in HTML, CSS, JavaScript, Python, and MySQL. Completed a Full Stack Development internship and worked on web application projects. Interested in software development and eager to learn new technologies while building practical solutions.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/resume.pdf" download="Mohamed_Samsul_Alam_K_Resume.pdf">
                <Download size={16}/> Download Resume
              </a>
              <a className="btn btn-outline" href="#projects" onClick={(event) => scrollToSection(event, '#projects')}>
                Explore My Projects <ArrowUpRight size={16}/>
              </a>
            </div>
            <div className="stats">
              <div><strong>2</strong><span>Projects</span></div>
              <div><strong>1</strong><span>Internship</span></div>
              <div><strong>MCA</strong><span>Graduate</span></div>
            </div>
          </div>
          <div className="hero-art" role="img" aria-label="Developer working at a laptop in a neon-lit workspace" />
          <a className="scroll-hint" href="#about" onClick={(event) => scrollToSection(event, '#about')}>Scroll Down ↓</a>
        </section>

        <section className="intro-skills">
          <div className="about-card" id="about">
            <div className="about-card-bg" aria-hidden="true" />
            <div className="about-copy">
              <SectionTitle icon={UserRound}>About <b>Me</b></SectionTitle>
              <p>MCA graduate with hands-on experience in web development using HTML, CSS, JavaScript, Python, Django, and MySQL. Completed a Full Stack Developer internship at Gateway Software Solutions. Interested in building useful applications and continuing to grow as a software developer.</p>
              <ul className="contact-list">
                <li><MapPin />{profile.location}, India</li>
                <li><Mail /><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                <li><Phone /><a href={`tel:${profile.phone}`}>{profile.phone}</a></li>
                <li><Linkedin /><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a></li>
              </ul>
            </div>
          </div>
          <div className="skills-panel" id="skills">
            <SectionTitle icon={Code2}>My <b>Skills</b></SectionTitle>
            <p className="hint">Tools & technologies</p>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <SkillLogo skill={skill}/>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="code-art"><div className="code-gem"><Code2 size={45}/></div><p>Code<br/>Creates<br/>Opportunities ↙</p></div>
        </section>

        <section className="details-grid">
          <div className="panel experience-panel" id="experience">
            <SectionTitle icon={BriefcaseBusiness}>Work <b>Experience</b></SectionTitle>
            <div className="timeline-item">
              <div className="timeline-heading"><strong>Full Stack Developer Intern (Python)</strong><span>Jan 2026 – May 2026</span></div>
              <p className="muted">Gateway Software Solutions · Chennai</p>
              <ul>
                <li>Developed responsive web pages using HTML, CSS, and JavaScript.</li>
                <li>Assisted in backend development using Python.</li>
                <li>Worked with MySQL database for CRUD operations.</li>
                <li>Contributed to the FLAVOUR food ordering system.</li>
                <li>Participated in testing, debugging, and feature enhancement.</li>
              </ul>
            </div>
          </div>

          <div className="panel education-panel" id="education">
            <SectionTitle icon={GraduationCap}>Education</SectionTitle>
            <div className="education-item">
              <div className="timeline-heading"><strong>Master of Computer Applications (MCA)</strong><span>2024–2026</span></div>
              <p>Measi Institute of Information Technology / University of Madras</p>
              <small>Coursework: Web Development, Data Structures, Database Systems, Software Engineering</small>
            </div>
            <div className="education-item">
              <div className="timeline-heading"><strong>Bachelor of Science in Computer Science</strong><span>2021–2024</span></div>
              <p>Sadakathulla Appa College · Tirunelveli</p>
              <small>Programming fundamentals, data structures, databases, OOP, and web technologies.</small>
            </div>
          </div>

          <div className="panel projects-panel" id="projects">
            <SectionTitle icon={Code2}>Featured <b>Projects</b></SectionTitle>
            <p className="hint project-hint">Click a project card to view details</p>
            {projects.map((project) => (
              <article
                className="project-card project-card-clickable"
                key={project.title}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="project-icon">{project.icon}</div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <span className="project-open-hint">View details ↗</span>
              </article>
            ))}
          </div>

          <div className="right-stack">
            <div className="panel resume-panel" id="resume">
              <div className="resume-icon"><FileText size={31}/></div>
              <div className="resume-content">
                <SectionTitle icon={FileText}>My <b>Resume</b></SectionTitle>
                <p>Check out my detailed resume with skills, education, experience, and projects.</p>
                <a className="btn btn-small btn-outline" href="/resume.pdf" download="Mohamed_Samsul_Alam_K_Resume.pdf">
                  Download Resume <Download size={14}/>
                </a>
              </div>
              <div className="pdf-badge">PDF</div>
            </div>
            <div className="panel contact-panel" id="contact">
              <div className="contact-art"><Mail size={30}/></div>
              <div>
                <SectionTitle icon={Mail}>Let&apos;s <b>Connect</b></SectionTitle>
                <p>Have a project in mind or want to say hello? I&apos;d love to hear from you!</p>
                <a className="btn btn-small btn-primary" href={`mailto:${profile.email}`}>Get In Touch <ArrowUpRight size={14}/></a>
              </div>
            </div>
          </div>
        </section>
        <footer><span></span><p>Thanks for visiting my portfolio <b>♥</b></p><span></span></footer>
      </main>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={modalCloseRef}
              className="modal-close"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>
            <div className="modal-icon">{selectedProject.icon}</div>
            <h3 id="project-modal-title">{selectedProject.title}</h3>
            <p className="modal-lead">{selectedProject.description}</p>
            <ul className="modal-details">
              {selectedProject.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="tag-row modal-tags">
              {selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            {selectedProject.href && (
              <a
                className="btn btn-primary modal-link"
                href={selectedProject.href}
                target={selectedProject.external ? '_blank' : undefined}
                rel={selectedProject.external ? 'noreferrer' : undefined}
              >
                {selectedProject.linkLabel}
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
