import { useState, type FormEvent } from 'react'
import './App.css'

const currentYear = new Date().getFullYear()

type Project = {
  index: string
  name: string
  type: string
  description: string
  stack: string[]
  note: string
  link?: string
  linkLabel?: string
  repo?: string
  repoLabel?: string
  image?: string
  imageAlt?: string
  imageSource?: string
}

const skills = [
  {
    number: '01',
    title: 'Full stack development',
    description: 'Building connected user experiences, application logic and APIs.',
    items: [
      'React.js',
      'Node.js',
      'Express.js',
      'REST APIs',
      'Responsive web design',
      'Frontend API integration',
      'JWT authentication',
      'Role-based access control',
    ],
  },
  {
    number: '02',
    title: 'Programming & mobile',
    description: 'Languages and mobile tools for practical application development.',
    items: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'Flutter',
      'Cross-platform mobile',
      'Mobile API integration',
      'Mobile interfaces',
    ],
  },
  {
    number: '03',
    title: 'Databases & AI integration',
    description: 'Working with structured data and adding useful AI capabilities.',
    items: [
      'PostgreSQL',
      'MySQL',
      'SQL queries',
      'Database design',
      'Data modelling',
      'AI API integration',
      'AI-assisted data processing',
    ],
  },
  {
    number: '04',
    title: 'Software engineering & tools',
    description: 'Taking software from requirements through maintenance.',
    items: [
      'Git & GitHub',
      'Object-oriented programming',
      'Software design',
      'Agile methodology',
      'Software testing',
      'Debugging',
      'Deployment',
      'Technical documentation',
    ],
  },
  {
    number: '05',
    title: 'IT support & systems',
    description: 'Supporting users, devices and common workplace systems.',
    items: [
      'Windows 10 / 11',
      'Ubuntu Linux',
      'Microsoft 365',
      'Microsoft Teams',
      'Outlook & SharePoint',
      'Active Directory',
      'Helpdesk support',
      'Hardware troubleshooting',
      'Remote desktop support',
      'Backup & recovery',
    ],
  },
  {
    number: '06',
    title: 'Networking & security',
    description: 'Foundational network setup, access control and system reliability.',
    items: [
      'TCP/IP',
      'LAN setup',
      'Network diagnostics',
      'Printer configuration',
      'Access control',
      'Firewall fundamentals',
      'Antivirus tools',
      'Secure API integration',
    ],
  },
  {
    number: '07',
    title: 'Professional strengths',
    description: 'A thoughtful, collaborative approach to solving technical problems.',
    items: [
      'Problem-solving',
      'Analytical thinking',
      'Technical communication',
      'Team collaboration',
      'Independent working',
      'Adaptability',
      'User-focused support',
    ],
  },
]

const projects: Project[] = [
  {
    index: '01',
    name: 'Mediscribe',
    type: 'Telemedicine platform',
    description:
      'A telemedicine platform concept with database-backed functionality, JWT authentication and REST APIs for patient-doctor communication.',
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'JWT'],
    image: '/projects/mediscribe-live.png',
    imageAlt: 'MediPrescribe sign-in screen from the related healthcare app',
    imageSource: 'Related healthcare app screenshot · eprescribe.netlify.app',
    note: 'Project details from supplied CV',
  },
  {
    index: '02',
    name: 'MediPrescribe',
    type: 'E-prescription platform',
    description:
      'An e-prescription platform featuring role-based access, patient records, audit trails and AI-assisted drug interaction validation.',
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'AI integration'],
    link: 'https://eprescribe.netlify.app',
    linkLabel: 'Visit live project',
    repo: 'https://github.com/Ekeneji21/Mediscribe-',
    repoLabel: 'GitHub repository',
    image: '/projects/mediprescribe.jpg',
    imageAlt: 'Screenshot of the MediPrescribe patient dashboard',
    imageSource: 'Live project image · Crestline Systems',
    note: 'Live demo supplied with CV',
  },
  {
    index: '03',
    name: 'GreenToken',
    type: 'Environmental technology',
    description:
      'A carbon credit platform for issuing and tracking credits, with reporting for environmental impact analytics.',
    stack: ['React.js', 'Node.js'],
    link: 'https://apexmountaintechnologies.netlify.app',
    linkLabel: 'Visit live project',
    image: '/projects/greentoken-live.png',
    imageAlt: 'Screenshot of the GreenToken live sign-in page',
    imageSource: 'Live website screenshot · apexmountaintechnologies.netlify.app',
    note: 'Live demo supplied with CV',
  },
  {
    index: '04',
    name: 'AI-Based Credit Scoring System',
    type: 'Data-driven application',
    description:
      'A credit assessment application using data-driven scoring algorithms and structured database design.',
    stack: ['Python', 'PostgreSQL'],
    link: 'https://credit-score-lilac.vercel.app',
    linkLabel: 'Visit live project',
    image: '/projects/credit-scoring-live.png',
    imageAlt: 'Screenshot of the Pamoja AI credit scoring dashboard',
    imageSource: 'Live website screenshot · credit-score-lilac.vercel.app',
    note: 'Live demo supplied with CV',
  },
  {
    index: '05',
    name: 'CrestMart',
    type: 'Zimbabwe-focused marketplace',
    description:
      'A marketplace prototype with product search, category browsing, cart and checkout flows, delivery zones, gift orders and seller pages. Payment options are simulated in this demo.',
    stack: ['React', 'JavaScript', 'React Router'],
    repo: 'https://github.com/Ekeneji21/crestmart',
    repoLabel: 'GitHub repository',
    image: '/projects/crestmart-live.png',
    imageAlt: 'Screenshot of CrestMart running from its public GitHub repository',
    imageSource: 'Local run of public GitHub project · github.com/Ekeneji21/crestmart',
    note: 'Public GitHub repository',
  },
  {
    index: '06',
    name: 'Agrotek19',
    type: 'Agriculture dashboard prototype',
    description:
      'A React and TypeScript application with farm, advisory, alerts, weather, marketplace and disease-detection screens, plus an API service module.',
    stack: ['React', 'TypeScript', 'API integration'],
    repo: 'https://github.com/Ekeneji21/Agrotek19',
    repoLabel: 'GitHub repository',
    image: '/projects/agrotek-live.png',
    imageAlt: 'Screenshot of AgriSense running from the Agrotek19 GitHub repository',
    imageSource: 'Local run of public GitHub project · github.com/Ekeneji21/Agrotek19',
    note: 'Public GitHub repository',
  },
  {
    index: '07',
    name: 'Crestline Systems',
    type: 'Software & IT services website',
    description:
      'A Zimbabwe-focused software and IT services website featuring business applications, web development, AI, networking and support services.',
    stack: ['Web development', 'Software', 'IT services'],
    link: 'https://crestlinesystems.co.zw',
    linkLabel: 'Visit live website',
    image: '/projects/crestline-site.png',
    imageAlt: 'Crestline Systems website social preview graphic',
    imageSource: 'Live website preview · crestlinesystems.co.zw',
    note: 'Live website',
  },
  {
    index: '08',
    name: 'AgriSense Zimbabwe',
    type: 'Agriculture dashboard',
    description:
      'A smart agriculture dashboard presented on Crestline Systems, with crop health, weather, disease detection, advisory and marketplace screens.',
    stack: ['React', 'Dashboard UI', 'Agriculture technology'],
    link: 'https://crestlinesystems.co.zw/agrisense',
    linkLabel: 'View project',
    image: '/projects/agrisense.jpg',
    imageAlt: 'Screenshot of the AgriSense Zimbabwe farmer dashboard',
    imageSource: 'Live project image · Crestline Systems',
    note: 'Featured on Crestline Systems',
  },
  {
    index: '09',
    name: 'AfriGenius STEM Academy',
    type: 'Education platform',
    description:
      'A STEM academy website and learning portal presented on Crestline Systems, focused on coding, robotics, AI and hands-on learning.',
    stack: ['Web development', 'Education technology', 'STEM'],
    link: 'https://crestlinesystems.co.zw/afrigenius',
    linkLabel: 'View project',
    image: '/projects/afrigenius.jpg',
    imageAlt: 'Screenshot of the AfriGenius STEM Academy website',
    imageSource: 'Live project image · Crestline Systems',
    note: 'Featured on Crestline Systems',
  },
  {
    index: '10',
    name: 'New Dream Glass & Aluminium',
    type: 'Business website',
    description:
      'A live website for a glass and aluminium business, showcasing entrance doors, windows, shopfronts and partition work.',
    stack: ['Business website', 'Product gallery', 'Responsive design'],
    link: 'https://dreams-zeta-six.vercel.app/',
    linkLabel: 'Visit live website',
    image: '/projects/new-dream-live.png',
    imageAlt: 'Screenshot of the New Dream Glass & Aluminium live website',
    imageSource: 'Live website screenshot · dreams-zeta-six.vercel.app',
    note: 'Live website',
  },
  {
    index: '11',
    name: 'Titfaz Construction',
    type: 'Construction website',
    description:
      'A construction company website supplied as a live project link. A preview image could not be retrieved, so no substitute artwork is shown.',
    stack: ['Construction', 'Business website'],
    link: 'https://titfazconstruction.co.zw',
    linkLabel: 'Visit live website',
    image: '/projects/titfaz-project-cover.svg',
    imageAlt: 'Illustrated project cover for Titfaz Construction; live site preview unavailable',
    imageSource: 'Illustrated cover · live site blocks screenshot access',
    note: 'Live link · preview unavailable',
  },
]

const services = [
  'Full stack web development',
  'Frontend development',
  'Backend API development',
  'Flutter mobile applications',
  'Database design & integration',
  'AI API integration',
  'Website maintenance & bug fixes',
  'IT support & troubleshooting',
  'Basic network setup',
]

const coursework = [
  'Software design & architecture',
  'Web and mobile application development',
  'Database systems',
  'Operating systems',
  'Networking & data communications',
  'Object-oriented programming',
  'Software project management',
  'Human-computer interaction',
]

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactStatus, setContactStatus] = useState('')

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nReply email: ${email}\n\n${message}`,
    )

    window.location.href = `mailto:gomoekeneji@gmail.com?subject=${subject}&body=${body}`
    setContactStatus(
      'Your email app should open with this message as a draft. Send it there to complete delivery.',
    )
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu}>
          <span className="wordmark-mark">EG</span>
          <span>Ekeneji Gomo</span>
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
        <nav
          aria-label="Main navigation"
          className={`main-nav${menuOpen ? ' is-open' : ''}`}
        >
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
          <a href="#experience" onClick={closeMenu}>
            Background
          </a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowIcon />
          </a>
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="hero-title" className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> OPEN TO OPPORTUNITIES</p>
            <h1 id="hero-title">
              Ekeneji
              <br />
              <span>Tanaka Gomo.</span>
            </h1>
            <p className="hero-role">
              Full Stack Developer <span>/</span> Software Engineer
              <span>/</span> Mobile Developer
            </p>
            <p className="hero-intro">
              I build practical digital products—from responsive interfaces and
              backend services to data-driven applications. I&apos;m a software
              engineering student in Harare, Zimbabwe, ready to contribute and
              keep growing.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">
                Explore my work <ArrowIcon />
              </a>
              <a
                className="button button-outline"
                download="Ekeneji-Tanaka-Gomo-CV-preview.png"
                href="/ekeneji-cv-preview.png"
                title="Download the supplied CV screenshot as a PNG preview"
              >
                Download CV preview <span className="download-icon">↓</span>
              </a>
            </div>
            <p className="cv-note">
              PNG preview from the supplied image; request the PDF by email.
            </p>
            <div className="hero-socials">
              <a href="https://github.com/Ekeneji21" rel="noreferrer" target="_blank">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:gomoekeneji@gmail.com">
                Email <span aria-hidden="true">↗</span>
              </a>
              <span className="social-divider" />
              <span>Harare, Zimbabwe</span>
            </div>
          </div>
          <div className="hero-art">
            <img
              alt="Portrait of Ekeneji Tanaka Gomo"
              className="hero-portrait"
              src="/ekeneji-portrait.jpg"
            />
            <div aria-hidden="true" className="portrait-shade" />
            <div className="hero-art-top">
              <span>EKENEJI TANAKA GOMO</span>
              <span>HARARE, ZW</span>
            </div>
            <div className="portrait-caption">
              <span>SOFTWARE ENGINEERING STUDENT</span>
              <strong>Thoughtful work. Practical solutions.</strong>
            </div>
            <div className="hero-art-bottom">
              <div>
                <span className="art-label">BASED IN</span>
                <strong>Harare, Zimbabwe</strong>
              </div>
              <span className="art-coordinate">OPEN TO OPPORTUNITIES</span>
            </div>
          </div>
          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </section>

        <section aria-label="Areas of work" className="focus-strip">
          <span>01 / WEB APPLICATIONS</span>
          <span>02 / BACKEND &amp; API</span>
          <span>03 / DATABASES</span>
          <span>04 / IT SUPPORT</span>
        </section>

        <section aria-labelledby="about-title" className="content-section about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <span className="section-number">01 — ABOUT</span>
          </div>
          <div className="about-grid">
            <h2 id="about-title">
              Building a strong
              <br />
              <span>foundation in software.</span>
            </h2>
            <div className="about-copy">
              <p>
                I&apos;m a Year 3 Software Engineering student at the University
                of Zimbabwe. My experience spans full stack application
                development and hands-on IT support, from troubleshooting
                workplace systems to building and deploying software.
              </p>
              <p>
                I enjoy understanding the real problem behind a request,
                creating a clear technical solution and documenting the work
                so it can be maintained. I&apos;m especially interested in
                useful web products, backend systems and technology that
                addresses practical needs.
              </p>
              <a className="text-link" href="#contact">
                Tell me what you&apos;re building <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="about-facts">
            <div>
              <span className="fact-number">03</span>
              <span className="fact-label">YEAR OF STUDY</span>
            </div>
            <div>
              <span className="fact-number">UZ</span>
              <span className="fact-label">UNIVERSITY OF ZIMBABWE</span>
            </div>
            <div>
              <span className="fact-number">ZW</span>
              <span className="fact-label">BASED IN HARARE</span>
            </div>
            <div>
              <span className="fact-number">11</span>
              <span className="fact-label">SELECTED PROJECTS</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-title" className="content-section projects-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">SELECTED WORK</p>
            <span className="section-number">02 — PROJECTS</span>
          </div>
          <div className="projects-intro">
            <h2 id="projects-title">
              Ideas turned into
              <br />
              <span>working software.</span>
            </h2>
            <p>
              Selected applications and websites, with screenshots captured
              from live deployments or directly from public repositories.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-media">
                  {project.image ? (
                    <img
                      alt={project.imageAlt ?? `${project.name} project preview`}
                      className="project-image"
                      loading="lazy"
                      src={project.image}
                    />
                  ) : (
                    <div className="project-image-missing">
                      <span>SCREENSHOT UNAVAILABLE</span>
                      <strong>No verified project image</strong>
                    </div>
                  )}
                  {project.imageSource && (
                    <span className="project-image-source">{project.imageSource}</span>
                  )}
                </div>
                <div className="project-content">
                  <div className="project-title-row">
                    <div>
                      <p className="project-type">{project.type}</p>
                      <h3>{project.name}</h3>
                    </div>
                    {(project.link || project.repo) && (
                      <a
                        aria-label={`${project.link ? project.linkLabel : project.repoLabel}: ${project.name}`}
                        className="round-link"
                        href={project.link ?? project.repo}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <ArrowIcon />
                      </a>
                    )}
                  </div>
                  <p className="project-description">{project.description}</p>
                  <ul aria-label={`${project.name} technology stack`} className="tag-list">
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="project-footer">
                    <span>{project.note}</span>
                    <div className="project-links">
                      {project.link && (
                        <a href={project.link} rel="noreferrer" target="_blank">
                          {project.linkLabel} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} rel="noreferrer" target="_blank">
                          {project.repoLabel} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="project-disclosure">
            Images are screenshots from live apps and public GitHub projects,
            or previews published on project sites. The Titfaz cover is a
            labelled illustration because its site blocks reliable screenshot
            access.
          </p>
          <a
            className="text-link projects-github"
            href="https://github.com/Ekeneji21"
            rel="noreferrer"
            target="_blank"
          >
            Browse my GitHub profile <ArrowIcon />
          </a>
        </section>

        <section aria-labelledby="skills-title" className="content-section skills-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">TOOLS OF THE TRADE</p>
            <span className="section-number">03 — CAPABILITIES</span>
          </div>
          <div className="skills-intro">
            <h2 id="skills-title">
              Skills I bring
              <br />
              <span>to the work.</span>
            </h2>
            <p>
              A broad, growing toolkit across software development and IT
              systems. I focus on clear fundamentals and practical solutions.
            </p>
          </div>
          <div className="skills-list">
            {skills.map((group) => (
              <article className="skill-row" key={group.number}>
                <span className="skill-number">{group.number}</span>
                <div className="skill-title">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <ul className="tag-list skill-tags">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="skills-note">
            Skills are listed from my CV and supplied brief; no proficiency
            ratings are implied.
          </p>
        </section>

        <section aria-labelledby="experience-title" className="content-section experience-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">EDUCATION &amp; EXPERIENCE</p>
            <span className="section-number">04 — BACKGROUND</span>
          </div>
          <div className="experience-grid">
            <div>
              <h2 id="experience-title">
                Learning by
                <br />
                <span>building and doing.</span>
              </h2>
              <p className="experience-lede">
                A software engineering education complemented by practical
                systems support and project work.
              </p>
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <span className="timeline-date">2023 — PRESENT · YEAR 3</span>
                <h3>BSc Honours in Software Engineering</h3>
                <p>University of Zimbabwe</p>
                <ul className="coursework-list">
                  {coursework.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article className="timeline-item">
                <span className="timeline-date">PRACTICAL EXPERIENCE</span>
                <h3>IT support &amp; software projects</h3>
                <p>
                  Systems troubleshooting, user support and network
                  configuration, alongside building and deploying application
                  projects across healthcare, finance and environmental
                  technology.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="services-title" className="content-section services-section" id="services">
          <div className="section-heading">
            <p className="eyebrow">WAYS I CAN HELP</p>
            <span className="section-number">05 — SERVICES</span>
          </div>
          <div className="services-grid">
            <div>
              <h2 id="services-title">
                Let&apos;s solve
                <br />
                <span>a real problem.</span>
              </h2>
              <p>
                These are areas I&apos;m available to discuss for suitable
                projects and opportunities—not a claim of prior client work.
              </p>
            </div>
            <ul className="service-list">
              {services.map((service, index) => (
                <li key={service}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {service}
                  <ArrowIcon />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact-section" id="contact">
          <div className="contact-topline">
            <span>HAVE A PROJECT OR OPPORTUNITY?</span>
            <span>HARARE, ZIMBABWE · UTC+2</span>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">LET&apos;S CONNECT</p>
              <h2 id="contact-title">
                Good work
                <br />
                starts with
                <br />
                <span>a conversation.</span>
              </h2>
              <p>
                I&apos;m open to suitable remote opportunities, freelance
                projects and software engineering roles.
              </p>
              <a className="contact-email" href="mailto:gomoekeneji@gmail.com">
                gomoekeneji@gmail.com <ArrowIcon />
              </a>
              <a
                className="contact-github"
                href="https://github.com/Ekeneji21"
                rel="noreferrer"
                target="_blank"
              >
                GitHub portfolio <ArrowIcon />
              </a>
              <a className="contact-phone" href="tel:+263783031650">
                +263 78 303 1650
              </a>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label htmlFor="contact-name">Your name</label>
              <input
                autoComplete="name"
                id="contact-name"
                maxLength={100}
                name="name"
                placeholder="Name"
                required
              />
              <label htmlFor="contact-email">Your email</label>
              <input
                autoComplete="email"
                id="contact-email"
                maxLength={254}
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
              <label htmlFor="contact-message">What would you like to discuss?</label>
              <textarea
                id="contact-message"
                maxLength={4000}
                name="message"
                placeholder="A little about your project or opportunity..."
                required
                rows={4}
              />
              <button className="button button-light" type="submit">
                Create email draft <ArrowIcon />
              </button>
              <p aria-live="polite" className="form-status">
                {contactStatus}
              </p>
              <p className="form-note">
                This opens your email app with a draft; it does not send or
                store your message on this website.
              </p>
            </form>
          </div>
          <footer className="site-footer">
            <a className="footer-brand" href="#home">EG</a>
            <span>© {currentYear} Ekeneji Tanaka Gomo</span>
            <div>
              <a href="https://github.com/Ekeneji21" rel="noreferrer" target="_blank">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:gomoekeneji@gmail.com">
                Email <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a className="back-to-top" href="#home">
              Back to top ↑
            </a>
          </footer>
        </section>
      </main>
    </>
  )
}

export default App
