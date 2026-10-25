import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import './App.css'
import {
  aiCodeSample,
  aiPrinciples,
  aiSupportUses,
  contact,
  coursework,
  engineeringAreas,
  heroHighlights,
  heroRoles,
  navLinks,
  pillars,
  projectFilters,
  projects,
  remoteNotes,
  roles,
  sampleChat,
  servicePrinciples,
  skills,
  supportAreas,
  ticketSteps,
  tools,
  type IconName,
  type Project,
  type ProjectFilter,
} from './content'

function matchesFilter(project: Project, filter: ProjectFilter) {
  if (filter === 'all') return true
  if (filter === 'ai') return Boolean(project.ai)
  return project.category === filter
}

const currentYear = new Date().getFullYear()
const HARARE_UTC_OFFSET = 2
const harareTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Harare',
  hour: '2-digit',
  minute: '2-digit',
})

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9Z" />,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  phone: (
    <>
      <rect height="20" rx="2.5" width="11" x="6.5" y="2" />
      <path d="M11 18h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8Z" />
      <path d="m19 15 .9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" />
    </>
  ),
  copy: (
    <>
      <rect height="11" rx="2" width="11" x="9" y="9" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect height="6" rx="1.5" width="4" x="3" y="13" />
      <rect height="6" rx="1.5" width="4" x="17" y="13" />
      <path d="M19 19a3 3 0 0 1-3 3h-3" />
    </>
  ),
  monitor: (
    <>
      <rect height="12" rx="2" width="18" x="3" y="4" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
}

function Icon({ name, className = 'icon' }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      {iconPaths[name]}
    </svg>
  )
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useHarareClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  const difference = HARARE_UTC_OFFSET + now.getTimezoneOffset() / 60
  let relative = 'Same time zone as you'
  if (difference !== 0) {
    relative = `${Math.abs(difference)} h ${difference > 0 ? 'ahead of' : 'behind'} you`
  }

  return { time: harareTime.format(now), relative }
}

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies.
    }
  }, [theme])

  return [theme, () => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))] as const
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all')
  const [copied, setCopied] = useState(false)
  const [contactStatus, setContactStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const clock = useHarareClock()

  const visibleProjects = projects.filter((project) => matchesFilter(project, projectFilter))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % heroRoles.length),
      2600,
    )
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    if (form.get('_honey')) return
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const company = String(form.get('company') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const subject = `Portfolio enquiry from ${name}`

    setSending(true)
    setContactStatus('Sending your message…')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, company, message, _subject: subject, _template: 'table' }),
      })
      const result = (await response.json()) as { success?: boolean | string }
      if (!response.ok || String(result.success) !== 'true') throw new Error('Not delivered')
      formElement.reset()
      setContactStatus(`Thanks ${name}, your message has been sent. I’ll reply to ${email} soon.`)
    } catch {
      // Fall back to the visitor's email app so the message is never lost.
      const body = encodeURIComponent(
        `Name: ${name}\nReply email: ${email}${company ? `\nCompany: ${company}` : ''}\n\n${message}`,
      )
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`
      setContactStatus(
        `The form couldn’t send just now, so your email app should open with the message ready. You can also email ${contact.email} directly.`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a className="wordmark" href="#home" onClick={closeMenu}>
            <span className="wordmark-mark">EG</span>
            <span>Ekeneji Gomo</span>
          </a>
          <nav
            aria-label="Main navigation"
            className={`main-nav${menuOpen ? ' is-open' : ''}`}
            id="main-nav"
          >
            {navLinks.map((link) => (
              <a
                aria-current={activeSection === link.id ? 'true' : undefined}
                href={`#${link.id}`}
                key={link.id}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a className="button button-primary nav-cta" href="#contact" onClick={closeMenu}>
              Hire me <Icon name="arrow" />
            </a>
          </nav>
          <div className="header-actions">
            <button
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="icon-button"
              onClick={toggleTheme}
              type="button"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button
              aria-controls="main-nav"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="hero-title" className="hero" id="home">
          <div aria-hidden="true" className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="availability">
                <span className="status-dot" />
                Available now for remote roles
              </p>
              <h1 id="hero-title">
                Ekeneji <span className="gradient-text">Tanaka Gomo</span>
              </h1>
              <p className="hero-role">
                Your next{' '}
                <span aria-hidden="true" className="role-rotator">
                  <span className="role-word" key={roleIndex}>
                    {heroRoles[roleIndex]}
                  </span>
                </span>
                <span className="sr-only">{heroRoles.join(', ')}</span>
              </p>
              <p className="hero-intro">
                I help people get back to work: troubleshooting Windows and
                Microsoft 365, sorting out accounts, networks and devices, and
                explaining every fix in plain language. I&apos;m also a
                software engineering student who builds and deploys full stack
                web apps, supporting teams remotely from Harare across UK and
                European hours.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Hire me remotely <Icon name="arrow" />
                </a>
                <a className="button button-ghost" href={contact.cv} rel="noreferrer" target="_blank">
                  View CV
                </a>
                <button className="button button-ghost" onClick={copyEmail} type="button">
                  <Icon name={copied ? 'check' : 'copy'} />
                  {copied ? 'Email copied' : 'Copy email'}
                </button>
              </div>
              <ul aria-label="At a glance" className="hero-highlights">
                {heroHighlights.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="portrait-card">
                <img
                  alt="Portrait of Ekeneji Tanaka Gomo"
                  className="portrait-image"
                  fetchPriority="high"
                  src="/ekeneji-portrait.jpg"
                />
                <div aria-hidden="true" className="portrait-shade" />
                <div className="portrait-caption">
                  <span>IT SUPPORT · CLIENT SERVICES · SOFTWARE ENGINEERING</span>
                  <strong>Calm, clear fixes that get people back to work.</strong>
                </div>
              </div>
              <div className="float-card float-clock">
                <span className="float-icon">
                  <Icon name="clock" />
                </span>
                <div>
                  <span className="float-label">Local time in Harare</span>
                  <strong>
                    {clock.time} <small>CAT · UTC+2</small>
                  </strong>
                  <span className="float-detail">{clock.relative}</span>
                </div>
              </div>
              <div aria-hidden="true" className="float-card float-ticket">
                <span className="float-label">EXAMPLE TICKET · #2048</span>
                <strong>Outlook won’t sync</strong>
                <span className="badge-success">
                  <Icon name="check" /> Resolved
                </span>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Tools I support" className="marquee">
          <div className="marquee-track">
            {[...tools, ...tools].map((tool, index) => (
              <span aria-hidden={index >= tools.length ? true : undefined} key={`${tool}-${index}`}>
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-title" className="section" id="about">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">01 · About</p>
              <h2 id="about-title">
                Technical depth, <span className="muted-heading">human patience.</span>
              </h2>
            </div>
            <div className="about-grid">
              <div className="about-copy" data-reveal>
                <p>
                  I&apos;m a Year 3 Software Engineering student at the
                  University of Zimbabwe with hands-on IT support experience:
                  troubleshooting workplace systems, supporting users and
                  configuring networks, alongside building and deploying web
                  applications.
                </p>
                <p>
                  That mix means I can follow a problem past the surface, from
                  a user&apos;s screen to the network, the account or the app
                  behind it, and still explain the fix without jargon. I treat
                  every request as a person who needs to get back to work, not
                  just a ticket number, and I write things down so the next
                  person doesn&apos;t start from zero.
                </p>
                <div className="about-links">
                  <a className="text-link" href="#contact">
                    Talk to me about your support team <Icon name="arrow" />
                  </a>
                  <a className="text-link" href={contact.linkedin} rel="noreferrer" target="_blank">
                    View my LinkedIn <Icon name="arrow" />
                  </a>
                </div>
              </div>
              <dl className="about-facts" data-reveal>
                <div>
                  <dt>Software Engineering</dt>
                  <dd>Year 3</dd>
                </div>
                <div>
                  <dt>University of Zimbabwe</dt>
                  <dd>UZ</dd>
                </div>
                <div>
                  <dt>Harare time zone</dt>
                  <dd>UTC+2</dd>
                </div>
                <div>
                  <dt>Shipped projects</dt>
                  <dd>{projects.length}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="services-title" className="section section-tinted" id="services">
          <div className="container">
            <div className="section-head section-head-split" data-reveal>
              <div>
                <p className="eyebrow">02 · Services</p>
                <h2 id="services-title">
                  Four strengths, <span className="muted-heading">one goal.</span>
                </h2>
              </div>
              <p>
                Whether it&apos;s the first reply on the help desk, a hands-on
                fix, keeping a client happy or building the app itself, the aim
                is the same: technology that works for the people using it.
              </p>
            </div>
            <div className="pillar-grid">
              {pillars.map((pillar) => (
                <article className="card pillar-card" data-reveal key={pillar.title}>
                  <span className="pillar-icon">
                    <Icon name={pillar.icon} />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.summary}</p>
                  <ul className="check-list">
                    {pillar.points.map((point) => (
                      <li key={point}>
                        <Icon name="check" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <h3 className="subhead" data-reveal>
              The tickets I&apos;m ready for
            </h3>
            <div className="support-grid">
              {supportAreas.map((area) => (
                <article className="card support-card" data-reveal key={area.code}>
                  <span className="chip">{area.code}</span>
                  <h4>{area.title}</h4>
                  <p>{area.description}</p>
                  <ul aria-label={`${area.title} tools`} className="tag-list">
                    {area.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="client-title" className="section" id="client-care">
          <div className="container client-grid">
            <div data-reveal>
              <p className="eyebrow">03 · Client care</p>
              <h2 id="client-title">
                Great support <span className="muted-heading">feels human.</span>
              </h2>
              <p className="lede">
                The technical fix is only half the job. People remember how
                you made them feel when they were stuck, so this is how I look
                after every client and colleague.
              </p>
              <ol className="principles">
                {servicePrinciples.map((principle, index) => (
                  <li key={principle.title}>
                    <span className="principle-number">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <figure className="chat-card" data-reveal>
              <div className="chat-header">
                <span className="chat-avatar">EG</span>
                <div>
                  <strong>Ekeneji · IT Support</strong>
                  <span>
                    <span className="status-dot" /> Online
                  </span>
                </div>
              </div>
              <ul className="chat-body">
                {sampleChat.map((message, index) => (
                  <li
                    className={`chat-message chat-${message.from}`}
                    key={message.text}
                    style={{ '--i': index } as CSSProperties}
                  >
                    {message.from === 'system' && <Icon name="check" />}
                    {message.text}
                  </li>
                ))}
              </ul>
              <figcaption>A sample conversation showing how I handle an urgent ticket.</figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="approach-title" className="section section-tinted" id="approach">
          <div className="container">
            <div className="section-head section-head-split" data-reveal>
              <div>
                <p className="eyebrow">04 · Approach</p>
                <h2 id="approach-title">
                  Every ticket, <span className="muted-heading">start to finish.</span>
                </h2>
              </div>
              <p>
                A consistent process keeps users informed, avoids repeat issues
                and makes handovers painless for the rest of the team.
              </p>
            </div>
            <ol className="ticket-flow" data-reveal>
              {ticketSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-badge">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>

            <div className="remote-panel" data-reveal>
              <div className="remote-clock">
                <p className="eyebrow eyebrow-light">Built for remote teams</p>
                <span className="clock-time">{clock.time}</span>
                <span className="clock-zone">Harare · CAT (UTC+2) · {clock.relative}</span>
                <span className="clock-overlap">
                  Full working-day overlap with UK &amp; European business hours.
                </span>
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
          </div>
        </section>

        <section aria-labelledby="skills-title" className="section" id="skills">
          <div className="container">
            <div className="section-head section-head-split" data-reveal>
              <div>
                <p className="eyebrow">05 · Toolkit</p>
                <h2 id="skills-title">
                  Skills I bring <span className="muted-heading">to the desk.</span>
                </h2>
              </div>
              <p>
                Support and people skills, plus real software engineering:
                I can build applications as well as fix the ones people rely
                on.
              </p>
            </div>
            <div className="skills-grid">
              {skills.map((group) => (
                <article className="card skill-card" data-reveal key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul className="tag-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="engineering-title" className="section section-dark" id="engineering">
          <div aria-hidden="true" className="engineering-glow" />
          <div className="container">
            <div className="section-head section-head-split" data-reveal>
              <div>
                <p className="eyebrow eyebrow-light">06 · Engineering &amp; AI</p>
                <h2 id="engineering-title">
                  I build apps, <span className="gradient-text">and make them smarter.</span>
                </h2>
              </div>
              <p>
                Alongside support, I design, build and deploy full stack
                applications, including AI features that help people make
                faster, safer decisions.
              </p>
            </div>

            <div className="engineering-grid">
              {engineeringAreas.map((area) => (
                <article className="engineering-card" data-reveal key={area.title}>
                  <span className="engineering-icon">
                    <Icon name={area.icon} />
                  </span>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <ul aria-label={`${area.title} skills`} className="tag-list">
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="engineering-proof">
                    <span>Seen in</span> {area.proof}
                  </p>
                </article>
              ))}
            </div>

            <div className="ai-grid">
              <figure className="code-window" data-reveal>
                <div className="code-window-bar">
                  <span aria-hidden="true" className="code-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>ai-check.ts</span>
                </div>
                <pre>
                  <code>{aiCodeSample}</code>
                </pre>
                <figcaption>
                  An illustrative pattern from my healthcare work: the AI flags
                  risks, and low-confidence results go to a person.
                </figcaption>
              </figure>

              <div className="ai-panel" data-reveal>
                <h3>
                  <Icon name="sparkles" /> How I use AI responsibly
                </h3>
                <ol className="ai-principles">
                  {aiPrinciples.map((principle, index) => (
                    <li key={principle.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <strong>{principle.title}</strong>
                        <p>{principle.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="ai-support">
                  <p>Where AI can help a support team</p>
                  <ul className="tag-list">
                    {aiSupportUses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-title" className="section section-tinted" id="projects">
          <div className="container">
            <div className="section-head section-head-split" data-reveal>
              <div>
                <p className="eyebrow">07 · Projects</p>
                <h2 id="projects-title">
                  Systems I&apos;ve built, <span className="muted-heading">so I know how they break.</span>
                </h2>
              </div>
              <p>
                Building and deploying these taught me how accounts,
                databases, APIs and hosting fit together, which is exactly
                what you need when something stops working.
              </p>
            </div>
            <div aria-label="Filter projects" className="filter-bar" role="group">
              {projectFilters.map((filter) => (
                <button
                  aria-pressed={projectFilter === filter.id}
                  className="filter-button"
                  key={filter.id}
                  onClick={() => setProjectFilter(filter.id)}
                  type="button"
                >
                  {filter.label}
                  <span>{projects.filter((project) => matchesFilter(project, filter.id)).length}</span>
                </button>
              ))}
            </div>
            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article className="card project-card" key={project.name}>
                  <div className="project-media">
                    {project.image && (
                      <img
                        alt={project.imageAlt ?? `${project.name} project preview`}
                        loading="lazy"
                        src={project.image}
                      />
                    )}
                    <span className="project-note">{project.note}</span>
                    {project.ai && (
                      <span className="project-ai">
                        <Icon name="sparkles" /> AI
                      </span>
                    )}
                  </div>
                  <div className="project-content">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    <ul aria-label={`${project.name} technology stack`} className="tag-list">
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {(project.link || project.repo) && (
                      <div className="project-links">
                        {project.link && (
                          <a href={project.link} rel="noreferrer" target="_blank">
                            {project.linkLabel} <Icon name="arrow" />
                          </a>
                        )}
                        {project.repo && (
                          <a href={project.repo} rel="noreferrer" target="_blank">
                            {project.repoLabel} <Icon name="arrow" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <a className="text-link projects-github" href={contact.github} rel="noreferrer" target="_blank">
              Browse my GitHub profile <Icon name="arrow" />
            </a>
          </div>
        </section>

        <section aria-labelledby="experience-title" className="section" id="experience">
          <div className="container experience-grid">
            <div data-reveal>
              <p className="eyebrow">08 · Background</p>
              <h2 id="experience-title">
                Learning by <span className="muted-heading">fixing and building.</span>
              </h2>
              <p className="lede">
                A software engineering degree in progress, grounded in
                practical systems support, real users and real project work.
              </p>
            </div>
            <ol className="timeline" data-reveal>
              <li>
                <span className="timeline-date">Practical experience</span>
                <h3>IT support &amp; systems</h3>
                <p>
                  Troubleshooting workplace systems and devices, supporting
                  users with Windows and Microsoft 365, and configuring
                  networks and printers.
                </p>
              </li>
              <li>
                <span className="timeline-date">Project work</span>
                <h3>Full stack development &amp; deployment</h3>
                <p>
                  Building and deploying applications across healthcare,
                  finance, agriculture and environmental technology, plus live
                  business websites for clients.
                </p>
              </li>
              <li>
                <span className="timeline-date">2023 — present · Year 3</span>
                <h3>BSc Honours in Software Engineering</h3>
                <p>University of Zimbabwe</p>
                <ul className="tag-list">
                  {coursework.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>
        </section>

        <section aria-labelledby="roles-title" className="section section-tinted" id="roles">
          <div className="container roles-grid">
            <div data-reveal>
              <p className="eyebrow">09 · Where I fit</p>
              <h2 id="roles-title">
                Roles I&apos;m <span className="muted-heading">looking for.</span>
              </h2>
              <p className="lede">
                Remote, full-time, part-time or contract. I&apos;m happy to
                start on first-line support and grow with your team.
              </p>
            </div>
            <ul className="role-list" data-reveal>
              {roles.map((role) => (
                <li key={role}>
                  <Icon name="check" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact" id="contact">
          <div className="container">
            <div className="contact-card" data-reveal>
              <div className="contact-copy">
                <p className="eyebrow eyebrow-light">Let&apos;s connect</p>
                <h2 id="contact-title">
                  Need someone reliable on <span className="gradient-text">your help desk?</span>
                </h2>
                <p>
                  I&apos;m open to remote help desk, IT support, technical
                  support and client services roles, as well as freelance
                  projects.
                </p>
                <ul className="contact-methods">
                  <li>
                    <span>Email</span>
                    <div>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      <button
                        aria-label={copied ? 'Email address copied' : 'Copy email address'}
                        className="copy-button"
                        onClick={copyEmail}
                        type="button"
                      >
                        <Icon name={copied ? 'check' : 'copy'} />
                      </button>
                    </div>
                  </li>
                  <li>
                    <span>Phone</span>
                    <a href={contact.phoneHref}>{contact.phone}</a>
                  </li>
                  <li>
                    <span>LinkedIn</span>
                    <a href={contact.linkedin} rel="noreferrer" target="_blank">
                      linkedin.com/in/ekeneji-gomo
                    </a>
                  </li>
                  <li>
                    <span>GitHub</span>
                    <a href={contact.github} rel="noreferrer" target="_blank">
                      github.com/Ekeneji21
                    </a>
                  </li>
                  <li>
                    <span>Location</span>
                    <p>
                      {contact.location} · {clock.time} now
                    </p>
                  </li>
                </ul>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="field-row">
                  <label>
                    Your name
                    <input autoComplete="name" maxLength={100} name="name" placeholder="Jane Smith" required />
                  </label>
                  <label>
                    Company <em>(optional)</em>
                    <input autoComplete="organization" maxLength={120} name="company" placeholder="Company" />
                  </label>
                </div>
                <label>
                  Your email
                  <input
                    autoComplete="email"
                    maxLength={254}
                    name="email"
                    placeholder="you@company.com"
                    required
                    type="email"
                  />
                </label>
                <label>
                  Tell me about the role
                  <textarea
                    maxLength={4000}
                    name="message"
                    placeholder="Team, hours, tools and what support looks like day to day..."
                    required
                    rows={5}
                  />
                </label>
                <input
                  aria-hidden="true"
                  autoComplete="off"
                  className="honeypot"
                  name="_honey"
                  tabIndex={-1}
                  type="text"
                />
                <button className="button button-primary button-block" disabled={sending} type="submit">
                  {sending ? 'Sending…' : 'Send message'} <Icon name="arrow" />
                </button>
                <p aria-live="polite" className="form-status">
                  {contactStatus}
                </p>
                <p className="form-note">Goes straight to my inbox. I usually reply within a day.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="wordmark" href="#home">
            <span className="wordmark-mark">EG</span>
            <span>© {currentYear} Ekeneji Tanaka Gomo</span>
          </a>
          <div className="footer-links">
            <a href={contact.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a href={contact.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a href={`mailto:${contact.email}`}>Email</a>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
