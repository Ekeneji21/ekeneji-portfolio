import { useState, type FormEvent } from 'react'
import './App.css'

const currentYear = new Date().getFullYear()

type Project = {
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
}

const supportAreas = [
  {
    code: 'ACCOUNTS',
    title: 'Sign-in & account access',
    description:
      'Password resets, locked accounts, group membership and permission changes, handled with the right identity checks.',
    tools: ['Active Directory', 'Microsoft 365', 'Access control'],
  },
  {
    code: 'M365',
    title: 'Email, Teams & SharePoint',
    description:
      'Outlook profiles and mailbox issues, Teams calls and chat, SharePoint access and file sharing problems.',
    tools: ['Outlook', 'Microsoft Teams', 'SharePoint'],
  },
  {
    code: 'DESKTOP',
    title: 'Windows & Linux desktops',
    description:
      'Slow or crashing PCs, software installs, updates and configuration on Windows 10/11 and Ubuntu.',
    tools: ['Windows 10 / 11', 'Ubuntu Linux', 'Debugging'],
  },
  {
    code: 'NETWORK',
    title: 'Connectivity & printers',
    description:
      'No internet, Wi-Fi and LAN faults, shared printers and drives, worked through step by step with network diagnostics.',
    tools: ['TCP/IP', 'LAN setup', 'Printer configuration'],
  },
  {
    code: 'HARDWARE',
    title: 'Hardware & peripherals',
    description:
      'Diagnosing faulty devices, monitors, keyboards and docks, and preparing machines for new users.',
    tools: ['Hardware troubleshooting', 'Device setup'],
  },
  {
    code: 'SECURITY',
    title: 'Security & data recovery',
    description:
      'Antivirus checks, suspicious activity, firewall basics and restoring lost files from backup.',
    tools: ['Antivirus tools', 'Firewall fundamentals', 'Backup & recovery'],
  },
]

const ticketSteps = [
  {
    title: 'Listen & log',
    description:
      'Understand what the user was trying to do, capture the error, device and impact, and set clear expectations.',
  },
  {
    title: 'Diagnose',
    description:
      'Reproduce the problem, check the obvious first, then narrow it down methodically instead of guessing.',
  },
  {
    title: 'Resolve or escalate',
    description:
      'Fix it remotely where possible, or escalate with complete notes so nobody has to ask the user again.',
  },
  {
    title: 'Document & follow up',
    description:
      'Confirm the fix with the user, record the steps taken and turn repeat issues into simple how-to guides.',
  },
]

const remoteNotes = [
  {
    label: 'TIME ZONE',
    value: 'UTC+2 · Harare (CAT)',
    detail: 'A full working-day overlap with UK and European business hours.',
  },
  {
    label: 'COMMUNICATION',
    value: 'Teams, Outlook & email',
    detail: 'Plain-language updates for users, precise technical notes for the team.',
  },
  {
    label: 'DOCUMENTATION',
    value: 'Written first',
    detail: 'Clear ticket notes, step-by-step guides and handover summaries.',
  },
]

const skills = [
  {
    number: '01',
    title: 'Help desk & end-user support',
    description: 'Day-to-day support that keeps people productive.',
    items: [
      'Helpdesk support',
      'Remote desktop support',
      'Hardware troubleshooting',
      'Windows 10 / 11',
      'Ubuntu Linux',
      'Backup & recovery',
      'User-focused support',
    ],
  },
  {
    number: '02',
    title: 'Microsoft 365 & identity',
    description: 'Workplace collaboration tools and user accounts.',
    items: [
      'Microsoft 365',
      'Microsoft Teams',
      'Outlook & SharePoint',
      'Active Directory',
      'Role-based access control',
    ],
  },
  {
    number: '03',
    title: 'Networking & security',
    description: 'Foundational network setup, access control and reliability.',
    items: [
      'TCP/IP',
      'LAN setup',
      'Network diagnostics',
      'Printer configuration',
      'Access control',
      'Firewall fundamentals',
      'Antivirus tools',
    ],
  },
  {
    number: '04',
    title: 'Web & application support',
    description: 'Enough development depth to support and fix business apps.',
    items: [
      'JavaScript',
      'TypeScript',
      'React.js',
      'Node.js',
      'REST APIs',
      'Python',
      'Java',
      'C#',
      'Flutter',
      'Deployment',
    ],
  },
  {
    number: '05',
    title: 'Databases & data',
    description: 'Reading, querying and maintaining structured data.',
    items: ['PostgreSQL', 'MySQL', 'SQL queries', 'Database design', 'Data modelling'],
  },
  {
    number: '06',
    title: 'Ways of working',
    description: 'How I approach problems and people.',
    items: [
      'Problem-solving',
      'Technical communication',
      'Technical documentation',
      'Git & GitHub',
      'Agile methodology',
      'Independent working',
      'Team collaboration',
    ],
  },
]

const projects: Project[] = [
  {
    name: 'MediPrescribe & MediScribe',
    type: 'Healthcare platforms',
    description:
      'E-prescription and telemedicine platforms with role-based access, patient records, audit trails, JWT authentication and AI-assisted drug interaction checks.',
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'JWT', 'AI integration'],
    link: 'https://eprescribe.netlify.app',
    linkLabel: 'Live demo',
    repo: 'https://github.com/Ekeneji21/Mediscribe-',
    repoLabel: 'GitHub',
    image: '/projects/mediprescribe.jpg',
    imageAlt: 'Screenshot of the MediPrescribe patient dashboard',
    note: 'Live demo',
  },
  {
    name: 'Crestline Systems',
    type: 'Software & IT services website',
    description:
      'A Zimbabwe-focused software and IT services website covering business applications, web development, AI, networking and support services.',
    stack: ['Next.js', 'Vercel', 'DNS & domains'],
    link: 'https://crestlinesystems.co.zw',
    linkLabel: 'Visit site',
    image: '/projects/crestline-site.png',
    imageAlt: 'Crestline Systems website preview',
    note: 'Live website',
  },
  {
    name: 'GreenToken',
    type: 'Environmental technology',
    description:
      'A carbon credit platform for issuing and tracking credits, with reporting for environmental impact analytics.',
    stack: ['React.js', 'Node.js'],
    link: 'https://apexmountaintechnologies.netlify.app',
    linkLabel: 'Live demo',
    image: '/projects/greentoken-live.png',
    imageAlt: 'Screenshot of the GreenToken sign-in page',
    note: 'Live demo',
  },
  {
    name: 'AI-Based Credit Scoring System',
    type: 'Data-driven application',
    description:
      'A credit assessment application using data-driven scoring algorithms and structured database design.',
    stack: ['Python', 'PostgreSQL'],
    link: 'https://credit-score-lilac.vercel.app',
    linkLabel: 'Live demo',
    image: '/projects/credit-scoring-live.png',
    imageAlt: 'Screenshot of the Pamoja AI credit scoring dashboard',
    note: 'Live demo',
  },
  {
    name: 'CrestMart',
    type: 'Zimbabwe-focused marketplace',
    description:
      'A marketplace prototype with product search, categories, cart and checkout flows, delivery zones, gift orders and seller pages.',
    stack: ['React', 'JavaScript', 'React Router'],
    repo: 'https://github.com/Ekeneji21/crestmart',
    repoLabel: 'GitHub',
    image: '/projects/crestmart-live.png',
    imageAlt: 'Screenshot of the CrestMart storefront',
    note: 'Open source',
  },
  {
    name: 'Agrotek19',
    type: 'Agriculture dashboard',
    description:
      'A React and TypeScript application with farm, advisory, alerts, weather, marketplace and disease-detection screens, plus an API service module.',
    stack: ['React', 'TypeScript', 'API integration'],
    repo: 'https://github.com/Ekeneji21/Agrotek19',
    repoLabel: 'GitHub',
    image: '/projects/agrotek-live.png',
    imageAlt: 'Screenshot of the AgriSense dashboard from Agrotek19',
    note: 'Open source',
  },
  {
    name: 'AgriSense Zimbabwe',
    type: 'Agriculture dashboard',
    description:
      'A smart agriculture dashboard with crop health, weather, disease detection, advisory and marketplace screens.',
    stack: ['React', 'Dashboard UI', 'Agriculture technology'],
    link: 'https://crestlinesystems.co.zw/agrisense',
    linkLabel: 'View project',
    image: '/projects/agrisense.jpg',
    imageAlt: 'Screenshot of the AgriSense Zimbabwe farmer dashboard',
    note: 'Featured on Crestline Systems',
  },
  {
    name: 'AfriGenius STEM Academy',
    type: 'Education platform',
    description:
      'A STEM academy website and learning portal focused on coding, robotics, AI and hands-on learning.',
    stack: ['Web development', 'Education technology'],
    link: 'https://crestlinesystems.co.zw/afrigenius',
    linkLabel: 'View project',
    image: '/projects/afrigenius.jpg',
    imageAlt: 'Screenshot of the AfriGenius STEM Academy website',
    note: 'Featured on Crestline Systems',
  },
  {
    name: 'New Dream Glass & Aluminium',
    type: 'Business website',
    description:
      'A live website for a glass and aluminium business, showcasing entrance doors, windows, shopfronts and partition work.',
    stack: ['Business website', 'Responsive design'],
    link: 'https://dreams-zeta-six.vercel.app/',
    linkLabel: 'Visit site',
    image: '/projects/new-dream-live.png',
    imageAlt: 'Screenshot of the New Dream Glass & Aluminium website',
    note: 'Live website',
  },
  {
    name: 'Titfaz Construction',
    type: 'Construction website',
    description:
      'A website for a Zimbabwean construction company, presenting its services and completed projects.',
    stack: ['Business website', 'Responsive design'],
    link: 'https://titfazconstruction.co.zw',
    linkLabel: 'Visit site',
    image: '/projects/titfaz-project-cover.svg',
    imageAlt: 'Illustrated cover for the Titfaz Construction website',
    note: 'Live website',
  },
]

const roles = [
  'Remote help desk / service desk analyst',
  'IT support technician',
  'Desktop & end-user support',
  'Microsoft 365 support',
  'Technical support for web applications',
  'Junior systems or network support',
  'Freelance website maintenance & fixes',
]

const coursework = [
  'Operating systems',
  'Networking & data communications',
  'Database systems',
  'Software design & architecture',
  'Web and mobile application development',
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
          <a href="#support" onClick={closeMenu}>
            Support
          </a>
          <a href="#approach" onClick={closeMenu}>
            Approach
          </a>
          <a href="#skills" onClick={closeMenu}>
            Toolkit
          </a>
          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Hire me <ArrowIcon />
          </a>
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="hero-title" className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> AVAILABLE FOR REMOTE IT SUPPORT ROLES</p>
            <h1 id="hero-title">
              Ekeneji
              <br />
              <span>Tanaka Gomo.</span>
            </h1>
            <p className="hero-role">
              IT Support <span>/</span> Help Desk <span>/</span> Full Stack
              Developer
            </p>
            <p className="hero-intro">
              I help people get back to work: troubleshooting Windows and
              Microsoft 365, sorting out accounts, networks and devices, and
              explaining every fix in plain language. Software engineering
              student in Harare, working remotely in UTC+2.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">
                Hire me remotely <ArrowIcon />
              </a>
              <a
                className="button button-outline"
                href="/ekeneji-cv-preview.png"
                rel="noreferrer"
                target="_blank"
              >
                View CV <span className="download-icon">↗</span>
              </a>
            </div>
            <ul aria-label="At a glance" className="hero-highlights">
              <li>
                <strong>Windows & M365</strong>
                <span>Plus Active Directory</span>
              </li>
              <li>
                <strong>Remote-first</strong>
                <span>Remote desktop support</span>
              </li>
              <li>
                <strong>UTC+2</strong>
                <span>UK & EU hours overlap</span>
              </li>
            </ul>
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
              <span>IT SUPPORT · HELP DESK</span>
              <strong>Calm, clear fixes that get people back to work.</strong>
            </div>
            <div className="hero-art-bottom">
              <div>
                <span className="art-label">WORKING</span>
                <strong>Remotely · UTC+2</strong>
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
          <span>01 / HELP DESK SUPPORT</span>
          <span>02 / MICROSOFT 365 &amp; ACCOUNTS</span>
          <span>03 / NETWORK TROUBLESHOOTING</span>
          <span>04 / WEB &amp; APP SUPPORT</span>
        </section>

        <section aria-labelledby="about-title" className="content-section about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <span className="section-number">01 — ABOUT</span>
          </div>
          <div className="about-grid">
            <h2 id="about-title">
              Technical depth,
              <br />
              <span>human patience.</span>
            </h2>
            <div className="about-copy">
              <p>
                I&apos;m a Year 3 Software Engineering student at the University
                of Zimbabwe with hands-on IT support experience: troubleshooting
                workplace systems, supporting users and configuring networks,
                alongside building and deploying web applications.
              </p>
              <p>
                That mix means I can follow a problem past the surface, from a
                user&apos;s screen to the network, the account or the app
                behind it, and still explain the fix without jargon. I write
                things down so the next person doesn&apos;t start from zero.
              </p>
              <a className="text-link" href="#contact">
                Talk to me about your support team <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="about-facts">
            <div>
              <span className="fact-number">03</span>
              <span className="fact-label">YEAR OF SOFTWARE ENGINEERING</span>
            </div>
            <div>
              <span className="fact-number">UZ</span>
              <span className="fact-label">UNIVERSITY OF ZIMBABWE</span>
            </div>
            <div>
              <span className="fact-number">+2</span>
              <span className="fact-label">UTC · HARARE TIME ZONE</span>
            </div>
            <div>
              <span className="fact-number">{String(projects.length).padStart(2, '0')}</span>
              <span className="fact-label">SHIPPED PROJECTS</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="support-title" className="content-section support-section" id="support">
          <div className="section-heading">
            <p className="eyebrow">WHAT I CAN HELP WITH</p>
            <span className="section-number">02 — SUPPORT</span>
          </div>
          <div className="skills-intro">
            <h2 id="support-title">
              The tickets
              <br />
              <span>I&apos;m ready for.</span>
            </h2>
            <p>
              Everyday issues that stop people working, and the tools I use to
              resolve them, on site or remotely.
            </p>
          </div>
          <div className="support-grid">
            {supportAreas.map((area, index) => (
              <article className="support-card" key={area.code}>
                <div className="support-card-top">
                  <span>#{String(index + 1).padStart(2, '0')}</span>
                  <span className="support-code">{area.code}</span>
                </div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <ul aria-label={`${area.title} tools`} className="tag-list">
                  {area.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="approach-title" className="content-section approach-section" id="approach">
          <div className="section-heading">
            <p className="eyebrow">HOW I WORK</p>
            <span className="section-number">03 — APPROACH</span>
          </div>
          <div className="skills-intro">
            <h2 id="approach-title">
              Every ticket,
              <br />
              <span>start to finish.</span>
            </h2>
            <p>
              A consistent process keeps users informed, avoids repeat issues
              and makes handovers painless for the rest of the team.
            </p>
          </div>
          <ol className="ticket-flow">
            {ticketSteps.map((step, index) => (
              <li key={step.title}>
                <span className="ticket-step">STEP {String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="remote-panel">
            <div className="remote-panel-heading">
              <span className="status-dot" />
              <h3>Built for remote teams</h3>
            </div>
            <dl className="remote-notes">
              {remoteNotes.map((note) => (
                <div key={note.label}>
                  <dt>{note.label}</dt>
                  <dd>
                    <strong>{note.value}</strong>
                    <span>{note.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="skills-title" className="content-section skills-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">TOOLS OF THE TRADE</p>
            <span className="section-number">04 — TOOLKIT</span>
          </div>
          <div className="skills-intro">
            <h2 id="skills-title">
              Skills I bring
              <br />
              <span>to the desk.</span>
            </h2>
            <p>
              Support fundamentals first, backed by development skills that
              help me understand and fix the applications people rely on.
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
        </section>

        <section aria-labelledby="projects-title" className="content-section projects-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">SELECTED WORK</p>
            <span className="section-number">05 — PROJECTS</span>
          </div>
          <div className="projects-intro">
            <h2 id="projects-title">
              Systems I&apos;ve built,
              <br />
              <span>so I know how they break.</span>
            </h2>
            <p>
              Building and deploying these applications taught me how
              accounts, databases, APIs and hosting fit together, which is
              exactly what you need when something stops working.
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
                      <span>NO PREVIEW</span>
                      <strong>{project.name}</strong>
                    </div>
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
          <a
            className="text-link projects-github"
            href="https://github.com/Ekeneji21"
            rel="noreferrer"
            target="_blank"
          >
            Browse my GitHub profile <ArrowIcon />
          </a>
        </section>

        <section aria-labelledby="experience-title" className="content-section experience-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">EDUCATION &amp; EXPERIENCE</p>
            <span className="section-number">06 — BACKGROUND</span>
          </div>
          <div className="experience-grid">
            <div>
              <h2 id="experience-title">
                Learning by
                <br />
                <span>fixing and building.</span>
              </h2>
              <p className="experience-lede">
                A software engineering degree in progress, grounded in
                practical systems support and real project work.
              </p>
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <span className="timeline-date">PRACTICAL EXPERIENCE</span>
                <h3>IT support &amp; systems</h3>
                <p>
                  Troubleshooting workplace systems and devices, supporting
                  users with Windows and Microsoft 365, and configuring
                  networks and printers.
                </p>
              </article>
              <article className="timeline-item">
                <span className="timeline-date">PROJECT WORK</span>
                <h3>Full stack development &amp; deployment</h3>
                <p>
                  Building and deploying applications across healthcare,
                  finance, agriculture and environmental technology, plus
                  live business websites.
                </p>
              </article>
              <article className="timeline-item">
                <span className="timeline-date">2023 — PRESENT · YEAR 3</span>
                <h3>BSc Honours in Software Engineering</h3>
                <p>University of Zimbabwe</p>
                <ul className="coursework-list">
                  {coursework.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="roles-title" className="content-section services-section" id="roles">
          <div className="section-heading">
            <p className="eyebrow">WHERE I FIT</p>
            <span className="section-number">07 — ROLES</span>
          </div>
          <div className="services-grid">
            <div>
              <h2 id="roles-title">
                Roles I&apos;m
                <br />
                <span>looking for.</span>
              </h2>
              <p>
                Remote, full-time, part-time or contract. I&apos;m happy to
                start with first-line support and grow with your team.
              </p>
            </div>
            <ul className="service-list">
              {roles.map((role, index) => (
                <li key={role}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {role}
                  <ArrowIcon />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact-section" id="contact">
          <div className="contact-topline">
            <span>HIRING FOR REMOTE IT SUPPORT?</span>
            <span>HARARE, ZIMBABWE · UTC+2</span>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">LET&apos;S CONNECT</p>
              <h2 id="contact-title">
                Need someone
                <br />
                reliable on
                <br />
                <span>your help desk?</span>
              </h2>
              <p>
                I&apos;m open to remote help desk, IT support and technical
                support roles, as well as freelance projects.
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
                GitHub <ArrowIcon />
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
                placeholder="you@company.com"
                required
                type="email"
              />
              <label htmlFor="contact-message">Tell me about the role</label>
              <textarea
                id="contact-message"
                maxLength={4000}
                name="message"
                placeholder="Team, hours, tools and what support looks like day to day..."
                required
                rows={4}
              />
              <button className="button button-light" type="submit">
                Send via email <ArrowIcon />
              </button>
              <p aria-live="polite" className="form-status">
                {contactStatus}
              </p>
              <p className="form-note">
                Opens a pre-filled draft in your email app.
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
