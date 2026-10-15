export const PROJECTS = [
  {
    slug: 'tanon-strait-resort',
    category: 'Client Projects',
    title: 'Tañon Strait Resort',
    outcome:
      'A resort website where guests can view rooms and rates, browse photos, and send booking inquiries.',
    description:
      'I built the site for Tañon Strait Resort with Next.js and Tailwind CSS. It includes room listings, photo galleries, and an inquiry form that checks dates on the server. Staff confirm reservations and payments manually. I evaluated the hosting and domain setup, chose Vercel for deployment, and configured Cloudflare DNS for the resort’s custom domain.',
    role: 'Software Developer & Technical Consultant',
    type: 'Paid client project',
    platform: 'Responsive website',
    focus: 'Booking inquiries · content · performance',
    timeline: 'Client work',
    status: 'Live',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    brief: {
      problem:
        'The resort needed a website showing the property, rooms, and rates before guests got in touch. Directions, extra-guest charges, cancellation terms, and payment instructions also needed to be available online.',
      approach:
        'I put the room details, rates, photos, directions, and FAQs on one page. The inquiry form collects dates and contact details and checks that checkout comes after check-in. The resort team handles confirmation and payment.',
    },
    modules: [
      {
        title: 'Rooms & Rates',
        text: 'Lists both room types with nightly rates, occupancy limits, breakfast details, and check-in times.',
      },
      {
        title: 'Inquiry Flow',
        text: 'Collects dates, party size, and contact details. Checks the checkout date, shows when a submission is pending, and includes a honeypot field.',
      },
      {
        title: 'Gallery & Media',
        text: 'Shows photos of the pool, grounds, and shore. The slideshow pauses on hover, keyboard focus, or touch.',
      },
      {
        title: 'Location & Directions',
        text: 'Provides a Plus Code, coordinates, and a map link for directions to the resort.',
      },
      {
        title: 'FAQ & Payment Instructions',
        text: 'Explains arrival times, extra-guest prices, private bookings, cancellations, and the steps for paying by bank transfer.',
      },
      {
        title: 'Motion Without a Library',
        text: 'Uses IntersectionObserver and CSS keyframes for scroll reveals, room transitions, and marquees, with reduced-motion support and no animation library.',
      },
    ],
    stackGroups: [
      {
        label: 'Application',
        chips: [
          { label: 'Next.js', hot: true },
          { label: 'React.js', hot: true },
          { label: 'Tailwind CSS', hot: true },
          { label: 'Next.js Route Handlers', hot: false },
        ],
      },
      {
        label: 'Design & delivery',
        chips: [
          { label: 'Vercel', hot: true },
          { label: 'Cloudflare DNS', hot: false },
          { label: 'Custom design tokens', hot: false },
          { label: 'SEO + Open Graph', hot: false },
        ],
      },
    ],
    results: [
      { value: '01', label: 'Live resort site on a custom domain' },
      { value: '08', label: 'Sections for rooms, photos, booking information, and directions' },
      { value: '01', label: 'Inquiry form with server-side validation' },
    ],
    architecture: [
      'Next.js App Router',
      'Tailwind design tokens',
      'IntersectionObserver + CSS keyframes',
      'Inquiry route handler',
      'Vercel delivery, Cloudflare DNS',
    ],
    links: {
      live: 'https://www.tanonstraitresortcebu.com/',
      github: null,
    },
    client: {
      name: 'Tañon Strait Resort',
      email: 'info@tanonstraitresort.com',
      phone: '+63 917 152 6996',
      facebook: null,
      note: 'Reservations are confirmed by the team after a manual bank transfer — the site takes inquiries, not payments.',
    },
    images: [
      {
        src: '/tanonstrait/tanonstraitmain.png',
        title: 'Landing',
        description:
          'Split hero — headline and booking calls to action over the strait, with the infinity pool at sunset filling the right half.',
        tags: ['Next.js', 'Tailwind CSS', 'Hero'],
        status: 'live',
      },
    ],
  },
  {
    slug: 'flowiq',
    category: 'Personal Projects',
    title: 'FlowIQ',
    outcome:
      'A web app that compares job postings with a résumé, drafts application emails, and waits for approval before sending.',
    description:
      'I built the React interface and Express API for collecting job postings, comparing requirements with a résumé, and reviewing email drafts. Analysis runs in a background queue that recovers pending work after a restart. Each sent application keeps a record of the approved content and delivery details.',
    role: 'Sole developer',
    type: 'Personal project',
    platform: 'Web app',
    focus: 'Intake · RAG analysis · approval-gated send',
    timeline: 'Personal build',
    status: 'Live · Cloudflare Pages',
    tags: ['React', 'Express', 'Node.js', 'PostgreSQL', 'pgvector', 'Gemini'],
    brief: {
      problem:
        'Applying for jobs involves reading postings, checking requirements against a résumé, and drafting replies. The app brings those steps and the sent messages into one place.',
      approach:
        'I built an API that classifies each posting, extracts requirements, retrieves matching résumé excerpts with pgvector, and generates an editable draft. Sending requires approval, and the app records the result.',
    },
    modules: [
      {
        title: 'Intake & Intent',
        text: 'Job URLs and free-text recruiter messages with AI classification and an explicit apply, reply, or ignore choice.',
      },
      {
        title: 'Extraction Pipeline',
        text: 'Extracts job details from JSON-LD and embedded page data, with Readability as a fallback. Reports when a page needs JavaScript or a login.',
      },
      {
        title: 'Requirement Fit Analysis',
        text: 'Compares job requirements with retrieved résumé excerpts and shows a weighted fit score, gaps, and the evidence for each match.',
      },
      {
        title: 'Drafting with Provenance',
        text: 'Generates cover letters and replies using retrieved résumé excerpts. Drafts can be reviewed and edited before sending.',
      },
      {
        title: 'Send & Application Ledger',
        text: 'Gmail OAuth with AES-256-GCM token storage or SMTP fallback, resume PDF attached, drafts persisted with retry and audit trail.',
      },
      {
        title: 'Workflows & Guardrails',
        text: 'Templated runs with approval gates and step history, per-user hourly quotas, Better Auth OTP plus Google sign-in.',
      },
    ],
    stackGroups: [
      {
        label: 'Application',
        chips: [
          { label: 'React.js', hot: true },
          { label: 'Express.js', hot: true },
          { label: 'REST API', hot: false },
          { label: 'Node.js', hot: false },
          { label: 'Better Auth', hot: false },
        ],
      },
      {
        label: 'Data & AI',
        chips: [
          { label: 'PostgreSQL + pgvector', hot: true },
          { label: 'Gemini', hot: true },
          { label: 'Drizzle ORM', hot: false },
          { label: 'Gmail API / SMTP', hot: false },
        ],
      },
    ],
    results: [
      { value: '01', label: 'Live AI workspace with approval gates' },
      { value: '09', label: 'Pipeline stages from intake to send plus audit' },
      { value: '18', label: 'Committed Drizzle migrations on pgvector' },
    ],
    architecture: [
      'React frontend',
      'Express API + background queue',
      'Gemini classify / analyze / draft',
      'Postgres + pgvector RAG',
      'Gmail / SMTP send + ledger',
    ],
    links: {
      live: 'https://flowiqai.pages.dev/',
      github: 'https://github.com/JohnCliffordAlbarico/FlowIQ',
    },
    client: null,
    images: [
      {
        src: '/flowiq/flowiq-maindashboard.png',
        title: 'Workspace Dashboard',
        description:
          'Main workspace greeting with paste, fetch, and recruiter-email actions plus quota pills. Nothing is submitted without approval.',
        tags: ['React', 'Workflows', 'RAG'],
        status: 'live',
      },
      {
        src: '/flowiq/flowiq-login.png',
        title: 'Sign In',
        description:
          'Sign-in with email and password plus Google sign-in, remember-me, and encrypted private workspace messaging.',
        tags: ['React', 'Better Auth'],
        status: 'live',
      },
      {
        src: '/flowiq/flowiq-register.png',
        title: 'Create Account',
        description:
          'Account creation with a full name, email verification code, or Google sign-in.',
        tags: ['React', 'Better Auth'],
        status: 'live',
      },
    ],
  },
  {
    slug: 'bacaltos-healthcare-system',
    category: 'Client Projects',
    title: 'Bacaltos Healthcare System',
    outcome:
      'A desktop application for managing patient records, prescriptions, and inventory, with local storage and cloud backups.',
    description:
      'I built this for Bacaltos Medical Clinic. An Electron tray app starts the local backend, and a React dashboard handles clinic records and daily tasks. SQLite stores data locally; Turso and Cloudflare R2 provide database and image backups with sync history.',
    role: 'Software Developer',
    type: 'Paid client project',
    platform: 'Windows desktop + web UI',
    focus: 'Operations · reliability · usability',
    timeline: 'Client work',
    status: 'Shipped · desktop-app · offline-first',
    tags: ['React', 'Express', 'Electron', 'SQLite', 'Turso', 'Cloudflare R2'],
    brief: {
      problem:
        'The clinic handles patient information, medical records, certificates, prescriptions, inventory, and printed documents. Managing these in separate tools makes it harder to keep patient histories and stock records together.',
      approach:
        'I used Electron to start the local services, React for the clinic interface, and Express for the API. SQLite keeps a local database, with Turso and Cloudflare R2 for offsite backups.',
    },
    modules: [
      {
        title: 'Patient Management',
        text: 'Stores patient profiles so staff can find their details and related records.',
      },
      {
        title: 'Medical Records',
        text: 'Keeps medical records linked to each patient and their clinic visits.',
      },
      {
        title: 'Certificates',
        text: 'Generates and prints medical certificates.',
      },
      {
        title: 'Prescriptions',
        text: 'Creates prescriptions linked to the patient record.',
      },
      {
        title: 'Inventory',
        text: 'Tracks medicine stock in the clinic dashboard.',
      },
      {
        title: 'Cloud Backup',
        text: 'Backs up the database to Turso and images to Cloudflare R2, with manual sync, automatic sync, and sync history.',
      },
    ],
    stackGroups: [
      {
        label: 'Application',
        chips: [
          { label: 'React.js', hot: true },
          { label: 'Electron.js', hot: true },
          { label: 'Express.js', hot: true },
          { label: 'REST API', hot: false },
          { label: 'SQLite', hot: false },
        ],
      },
      {
        label: 'Cloud & storage',
        chips: [
          { label: 'Turso', hot: true },
          { label: 'Cloudflare R2', hot: true },
          { label: 'Cloud database backup', hot: false },
          { label: 'Image backup', hot: false },
        ],
      },
    ],
    results: [
      { value: '01', label: 'Desktop-first application' },
      { value: '06', label: 'Clinic modules' },
      { value: '02', label: 'Cloud services for database and image backups' },
    ],
    architecture: ['Electron controller', 'React dashboard', 'Express API', 'SQLite local', 'Turso + R2 backup'],
    links: { live: null, github: null },
    client: {
      name: 'Bacaltos Medical Clinic',
      email: 'bacaltosjean@gmail.com',
      facebook: 'https://www.facebook.com/bacaltosmc',
      note: 'Runs locally via Electron — no public URL. The live deployment on Render belongs to the capstone version.',
    },
    images: [
      {
        src: '/bacaltosproject/MAIN UI.png',
        title: 'Dashboard',
        description:
          'Main dashboard with patient stats, prescriptions, medical records, inventory, and quick actions for daily clinic operations.',
        tags: ['React', 'Dashboard'],
        status: 'desktop-app · offline',
      },
      {
        src: '/bacaltosproject/login_page.png',
        title: 'Login Page',
        description:
          'Clinic staff sign in with a username and password.',
        tags: ['React', 'Auth'],
        status: 'desktop-app · offline',
      },
      {
        src: '/bacaltosproject/consoleui.png',
        title: 'Desktop Controller',
        description:
          'Electron-based system tray application for managing backend services. Displays real-time server and database status with auto-launch settings.',
        tags: ['Electron', 'System Tray'],
        status: 'desktop-app · offline',
      },
      {
        src: '/bacaltosproject/Cloudsync.png',
        title: 'Cloud Sync',
        description:
          'Turso Cloud integration for offsite database backup with manual sync, auto-sync, and full sync history logging.',
        tags: ['Turso', 'Cloudflare R2'],
        status: 'desktop-app · offline',
      },
    ],
  },
  {
    slug: 'printing-management-system',
    category: 'Personal Projects',
    title: 'Printing Management System',
    outcome:
      'A practice project for tracking print-shop orders, customers, payments, and staff activity through a desktop controller and web dashboard.',
    description:
      'I built an Electron tray app to run and monitor the Express backend, plus a React dashboard for transactions, customers, payments, users, and audit logs. The dashboard also shows transaction summaries and revenue reports.',
    role: 'Sole developer',
    type: 'Personal project — practice build',
    platform: 'Windows desktop + web UI',
    focus: 'Transactions · reporting · usability',
    timeline: 'Practice build',
    status: 'Practice build · desktop-app',
    tags: ['Electron', 'React', 'Express', 'Node.js'],
    brief: {
      problem:
        'This was a practice project for managing print-shop transactions, customer records, and payments. I used it to work on a local backend, a desktop controller, and a web dashboard.',
      approach:
        'I built an Electron tray controller for the local backend and a React dashboard for the shop records. The dashboard includes revenue summaries and an audit log.',
    },
    modules: [
      {
        title: 'Desktop Controller',
        text: 'System-tray app with live server and database status, auto-launch settings and console output.',
      },
      {
        title: 'Transactions',
        text: 'Tracks orders, payments, and transaction history.',
      },
      {
        title: 'Customers & Users',
        text: 'Customer records plus role-based staff access in the same dashboard.',
      },
      {
        title: 'Analytics & Audit',
        text: 'Summary cards, revenue views and audit logs for recent activity.',
      },
    ],
    stackGroups: [
      {
        label: 'Application',
        chips: [
          { label: 'React.js', hot: true },
          { label: 'Electron.js', hot: true },
          { label: 'Express.js', hot: true },
          { label: 'REST API', hot: false },
          { label: 'Node.js', hot: false },
        ],
      },
      {
        label: 'Operations',
        chips: [
          { label: 'System tray controller', hot: false },
          { label: 'Role-based dashboard', hot: false },
          { label: 'Audit logs', hot: false },
        ],
      },
    ],
    results: [
      { value: '01', label: 'Desktop controller + dashboard' },
      { value: '05', label: 'Admin areas in one sidebar' },
      { value: '01', label: 'Public source repo' },
    ],
    architecture: ['Electron controller', 'React dashboard', 'Express API', 'Node.js services'],
    links: {
      live: null,
      github: 'https://github.com/JohnCliffordAlbarico/Printing-Management-System',
    },
    client: null,
    images: [
      {
        src: '/printingmanagementpic/3.png',
        title: 'Web Dashboard',
        description:
          'Admin dashboard with sidebar navigation for managing transactions, customers, payments, users, and audit logs. Features summary cards, revenue analytics, and recent activity overview.',
        tags: ['React', 'Express'],
        status: 'shipped',
      },
      {
        src: '/printingmanagementpic/1.png',
        title: 'Desktop Controller',
        description:
          'Electron-based system tray application for managing backend services. Displays real-time status of the server and database, with auto-launch settings and live console output.',
        tags: ['Electron', 'System Tray'],
        status: 'shipped',
      },
      {
        src: '/printingmanagementpic/2.png',
        title: 'System Status Monitor',
        description:
          'System health dashboard showing backend server and database connectivity. Provides quick access to open the React dashboard, with options to stop, hide, or quit the application.',
        tags: ['Electron', 'Status Dashboard'],
        status: 'shipped',
      },
    ],
  },
  {
    slug: 'yuuko-workspace',
    category: 'Personal Projects',
    title: 'Yuuko Workspace',
    outcome:
      'My personal task tracker, with timers and daily and weekly summaries of how I spend my time.',
    description:
      'I designed and built this during weekends while I was on internship. Tasks have timers, and the reports group their durations so I can review what I worked on and how long it took.',
    role: 'Personal build — design + code',
    type: 'Personal project',
    platform: 'Web app',
    focus: 'Tracking · analytics · consistency',
    timeline: 'Built during OJT weekends',
    status: 'Live on Render',
    tags: ['React', 'Node.js', 'Supabase'],
    brief: {
      problem:
        'I wanted a record of the tasks I worked on during weekends and how long they took.',
      approach:
        'I added timers to tasks and grouped the recorded time into daily and weekly reports.',
    },
    modules: [
      {
        title: 'Task Tracking',
        text: 'Adds a timer to each task and saves its recorded work sessions.',
      },
      {
        title: 'Duration Breakdowns',
        text: 'Groups recorded task time by day and week.',
      },
      {
        title: 'Productivity Analytics',
        text: 'Shows time spent on tasks so I can review my week and plan the next one.',
      },
    ],
    stackGroups: [
      {
        label: 'Application',
        chips: [
          { label: 'React.js', hot: true },
          { label: 'Node.js', hot: true },
          { label: 'REST API', hot: false },
        ],
      },
      {
        label: 'Data & hosting',
        chips: [
          { label: 'Supabase', hot: true },
          { label: 'Render', hot: false },
        ],
      },
    ],
    results: [
      { value: '01', label: 'Personal task tracker' },
      { value: '03', label: 'Tracking, breakdowns, analytics' },
      { value: '01', label: 'Live deployment on Render' },
    ],
    architecture: ['React frontend', 'Node.js API', 'Supabase database + auth'],
    links: {
      live: 'https://yuuko-workspace.onrender.com/',
      github: 'https://github.com/JohnCliffordAlbarico/Workspace',
    },
    client: null,
    images: [],
    assetImage: 'workspace',
  },
  {
    slug: 'bacaltos-clinic',
    category: 'Capstone Project',
    title: 'Bacaltos Clinic',
    outcome:
      'My capstone project: a clinic web app with patient records, appointment scheduling, staff roles, and disease forecasting.',
    description:
      'I worked on this React, Express, and Supabase application for my capstone. It includes patient records, appointments, staff access controls, and a disease-forecasting module. The hosted version was used for the project demonstration and defense.',
    role: 'Capstone developer',
    type: 'School capstone',
    platform: 'Web app',
    focus: 'Access control · records · forecasting',
    timeline: 'Capstone',
    status: 'Live on Render',
    tags: ['React', 'Express', 'Supabase', 'Node.js'],
    brief: {
      problem:
        'The capstone needed patient records, appointment scheduling, staff roles, and a disease-forecasting module in one web application.',
      approach:
        'I used React for the interface, Express for the API, and Supabase for the database and authentication. Staff roles control access to records and appointments.',
    },
    modules: [
      {
        title: 'Role-Based Access',
        text: 'Limits access to pages and actions based on the staff member’s assigned role.',
      },
      {
        title: 'Records & Scheduling',
        text: 'Links patient records with appointment scheduling.',
      },
      {
        title: 'Disease Forecasting',
        text: 'Includes disease forecasting as part of the capstone demonstration.',
      },
    ],
    stackGroups: [
      {
        label: 'Application',
        chips: [
          { label: 'React.js', hot: true },
          { label: 'Express.js', hot: true },
          { label: 'REST API', hot: false },
        ],
      },
      {
        label: 'Data & hosting',
        chips: [
          { label: 'Supabase', hot: true },
          { label: 'Render', hot: false },
        ],
      },
    ],
    results: [
      { value: '01', label: 'Hosted capstone platform' },
      { value: '03', label: 'Access, records, forecasting' },
      { value: '01', label: 'Live deployment on Render' },
    ],
    architecture: ['React frontend', 'Express API', 'Supabase database + auth'],
    links: {
      live: 'https://bacaltosclinic.onrender.com/',
      github: null,
    },
    client: null,
    images: [],
    assetImage: 'bacaltos',
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}

export const CATEGORY_COLORS = {
  'Client Projects': '#60A5FA',
  'Personal Projects': '#34D399',
  'Capstone Project': '#FBBF24',
}

export function categoryColor(category) {
  return CATEGORY_COLORS[category] ?? '#DC2626'
}
