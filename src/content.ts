export type ProjectCategory = 'app' | 'website'

export type Project = {
  name: string
  type: string
  category: ProjectCategory
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

export type IconName =
  | 'arrow'
  | 'check'
  | 'chat'
  | 'clock'
  | 'copy'
  | 'headset'
  | 'monitor'
  | 'moon'
  | 'sun'

export const contact = {
  email: 'gomoekeneji@gmail.com',
  phone: '+263 78 303 1650',
  phoneHref: 'tel:+263783031650',
  github: 'https://github.com/Ekeneji21',
  location: 'Harare, Zimbabwe',
  cv: '/ekeneji-cv-preview.png',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'client-care', label: 'Client care' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
]

export const heroRoles = [
  'help desk analyst',
  'IT support technician',
  'client services specialist',
]

export const heroHighlights = [
  { title: 'Help desk', detail: 'Windows · M365 · AD' },
  { title: 'Client-first', detail: 'Plain-language support' },
  { title: 'UTC+2', detail: 'Full UK & EU overlap' },
]

export const tools = [
  'Microsoft 365',
  'Windows 10 / 11',
  'Active Directory',
  'Microsoft Teams',
  'Outlook',
  'SharePoint',
  'Ubuntu Linux',
  'Remote desktop',
  'TCP/IP & LAN',
  'Printers',
  'Backup & recovery',
  'Antivirus tools',
]

export const pillars: {
  icon: IconName
  title: string
  summary: string
  points: string[]
}[] = [
  {
    icon: 'headset',
    title: 'Help desk',
    summary: 'First-line support that keeps the queue moving.',
    points: [
      'Log, triage and prioritise tickets',
      'Password resets and account unlocks',
      'Remote desktop troubleshooting',
      'Escalate with complete, clear notes',
    ],
  },
  {
    icon: 'monitor',
    title: 'IT support',
    summary: 'Hands-on fixes across devices, networks and Microsoft 365.',
    points: [
      'Windows 10 / 11 and Ubuntu desktops',
      'Outlook, Teams and SharePoint issues',
      'Active Directory and access control',
      'Wi-Fi, LAN and printer faults',
    ],
  },
  {
    icon: 'chat',
    title: 'Client services',
    summary: 'Friendly, patient support people are glad they got.',
    points: [
      'Explanations without the jargon',
      'Clear expectations and regular updates',
      'Calm with frustrated or urgent users',
      'How-to guides and new-user onboarding',
    ],
  },
]

export const supportAreas = [
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

export const servicePrinciples = [
  {
    title: 'Acknowledge fast',
    description:
      'Reply quickly, confirm I have understood the problem and say exactly what happens next.',
  },
  {
    title: 'Speak their language',
    description:
      'Explain the fix in the user’s words, not mine, so they leave confident rather than confused.',
  },
  {
    title: 'Own it to the end',
    description:
      'Stay with the issue until it is resolved, or hand it over with notes so nobody asks twice.',
  },
  {
    title: 'Close the loop',
    description:
      'Check the fix really worked, then write it up so the same problem is quicker next time.',
  },
]

export const sampleChat: { from: 'user' | 'me' | 'system'; text: string }[] = [
  {
    from: 'user',
    text: 'Outlook keeps asking for my password and I have a client call in 10 minutes 😩',
  },
  {
    from: 'me',
    text: 'Let’s get you sorted before that call. Can you join Teams from your browser for now?',
  },
  { from: 'user', text: 'Yes, that works.' },
  {
    from: 'me',
    text: 'Great. I’ll clear your saved Office sign-in and reconnect your account. About 3 minutes, and I’ll stay with you until it works.',
  },
  { from: 'system', text: 'Resolved · user confirmed · how-to guide updated' },
]

export const ticketSteps = [
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

export const remoteNotes = [
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
  {
    label: 'WORKING STYLE',
    value: 'Independent, accountable',
    detail: 'Comfortable working on my own and keeping the team in the loop.',
  },
]

export const skills = [
  {
    title: 'Help desk & end-user support',
    description: 'Day-to-day support that keeps people productive.',
    items: [
      'Helpdesk support',
      'Remote desktop support',
      'Hardware troubleshooting',
      'Windows 10 / 11',
      'Ubuntu Linux',
      'Backup & recovery',
    ],
  },
  {
    title: 'Client services & communication',
    description: 'Looking after the person, not just the problem.',
    items: [
      'User-focused support',
      'Technical communication',
      'Clear written replies',
      'Setting expectations',
      'User onboarding',
      'How-to guides',
    ],
  },
  {
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
    title: 'Databases & data',
    description: 'Reading, querying and maintaining structured data.',
    items: ['PostgreSQL', 'MySQL', 'SQL queries', 'Database design', 'Data modelling'],
  },
  {
    title: 'Ways of working',
    description: 'How I approach problems and people.',
    items: [
      'Problem-solving',
      'Technical documentation',
      'Git & GitHub',
      'Agile methodology',
      'Independent working',
      'Team collaboration',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'MediPrescribe & MediScribe',
    type: 'Healthcare platforms',
    category: 'app',
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
    category: 'website',
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
    category: 'app',
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
    category: 'app',
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
    category: 'app',
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
    category: 'app',
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
    category: 'app',
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
    category: 'website',
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
    category: 'website',
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
    // The live domain currently returns 404, so the card has no outbound link.
    name: 'Titfaz Construction',
    type: 'Construction website',
    category: 'website',
    description:
      'A website for a Zimbabwean construction company, presenting its services and completed projects.',
    stack: ['Business website', 'Responsive design'],
    image: '/projects/titfaz-project-cover.svg',
    imageAlt: 'Illustrated cover for the Titfaz Construction website',
    note: 'Client website',
  },
]

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'app', label: 'Applications' },
  { id: 'website', label: 'Business websites' },
]

export const roles = [
  'Remote help desk / service desk analyst',
  'IT support technician',
  'Client services & customer support',
  'Technical support specialist',
  'Microsoft 365 support',
  'Desktop & end-user support',
  'Junior systems or network support',
  'Freelance website maintenance & fixes',
]

export const coursework = [
  'Operating systems',
  'Networking & data communications',
  'Database systems',
  'Software design & architecture',
  'Web and mobile application development',
  'Object-oriented programming',
  'Software project management',
  'Human-computer interaction',
]
