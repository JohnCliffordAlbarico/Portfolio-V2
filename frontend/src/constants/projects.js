export const PROJECTS = [
  {
    slug: 'bacaltos-healthcare-system',
    category: 'Client Projects',
    title: 'Bacaltos Healthcare System',
    outcome:
      'A desktop-first clinic management system designed around the day-to-day workflow of a real healthcare operation — patient management, records, prescriptions, inventory and cloud-backed data in one workspace.',
    description:
      'Built for Bacaltos Medical Clinic. An Electron controller runs the backend services locally via system tray, a React dashboard handles daily clinic work, and Turso + Cloudflare R2 keep an offsite backup with sync history.',
    role: 'Software Developer',
    type: 'Paid client project',
    platform: 'Windows desktop + web UI',
    focus: 'Operations · reliability · usability',
    timeline: 'Client work',
    status: 'Shipped · desktop-app · offline-first',
    tags: ['React', 'Express', 'Electron', 'SQLite', 'Turso', 'Cloudflare R2'],
    brief: {
      problem:
        'Clinic workflows involve patient information, records, certificates, prescriptions, stock, and printed documents. Keeping those tasks consistent across separate processes creates unnecessary manual work and makes it harder to maintain a reliable history.',
      approach:
        'I designed the application as one operational system: a desktop controller for the local environment, a React interface for daily use, structured APIs for business logic, and cloud-backed persistence for resilience beyond a single machine.',
    },
    modules: [
      {
        title: 'Patient Management',
        text: 'Centralized patient profiles designed for quick access during routine clinic interactions.',
      },
      {
        title: 'Medical Records',
        text: 'Structured records keep patient history connected to the people and encounters they belong to.',
      },
      {
        title: 'Certificates',
        text: 'Digital document generation and printing remove repetitive manual formatting.',
      },
      {
        title: 'Prescriptions',
        text: 'Prescription workflows live alongside the patient context instead of in a separate process.',
      },
      {
        title: 'Inventory',
        text: 'Stock information is integrated into the same operational environment used by the clinic.',
      },
      {
        title: 'Cloud Backup',
        text: 'Turso provides cloud-backed database storage, while Cloudflare R2 handles image backup beyond the local installation.',
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
      { value: '06', label: 'Core clinic workflows brought together' },
      { value: '02', label: 'Cloud services supporting data resilience' },
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
          'Clean login interface for clinic staff with username and password authentication.',
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
      'A full-stack print-shop system: an Electron controller for the local environment plus a React admin dashboard for transactions, customers, payments, users and audit logs.',
    description:
      'Electron tray app runs and watches the backend, Express serves the API, and a React dashboard with sidebar navigation covers daily shop operations with summary cards and revenue analytics.',
    role: 'Sole developer',
    type: 'Personal project — practice build',
    platform: 'Windows desktop + web UI',
    focus: 'Transactions · reporting · usability',
    timeline: 'Practice build',
    status: 'Practice build · desktop-app',
    tags: ['Electron', 'React', 'Express', 'Node.js'],
    brief: {
      problem:
        'A print shop tracks transactions, customers and payments across disconnected notes and files. Without one place for the numbers, daily totals and outstanding payments take longer than they should.',
      approach:
        'I built one system for it: a desktop controller that owns the local backend lifecycle, and an admin dashboard where transactions, customers, payments, users and audit logs live side by side with revenue summaries.',
    },
    modules: [
      {
        title: 'Desktop Controller',
        text: 'System-tray app with live server and database status, auto-launch settings and console output.',
      },
      {
        title: 'Transactions',
        text: 'Order and payment tracking with history instead of scattered paperwork.',
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
      'My own workspace for tracking what I actually get done — tasks with timers, duration breakdowns and analytics views to review productivity week over week.',
    description:
      'Designed and coded on OJT weekends. Tasks carry durations, and analytics break down where the time went so progress is visible instead of guessed.',
    role: 'Personal build — design + code',
    type: 'Personal project',
    platform: 'Web app',
    focus: 'Tracking · analytics · consistency',
    timeline: 'Built during OJT weekends',
    status: 'Live on Render',
    tags: ['React', 'Node.js', 'Supabase'],
    brief: {
      problem:
        'Weekend building time disappears without a trace. I wanted a record of what I worked on and how long it took, not just a todo list that resets.',
      approach:
        'I built a small workspace where every task can carry time, and analytics views roll those durations up so a week of work reads back as a summary.',
    },
    modules: [
      {
        title: 'Task Tracking',
        text: 'Tasks with per-task timers so work sessions stay attached to the thing they belong to.',
      },
      {
        title: 'Duration Breakdowns',
        text: 'Time rolled up over days and weeks instead of buried in individual entries.',
      },
      {
        title: 'Productivity Analytics',
        text: 'Views that show where the hours actually went, for planning the next week.',
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
      { value: '01', label: 'Personal workspace, dogfooded weekly' },
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
      'The capstone platform version of the clinic work — role-based access, patient records, appointment scheduling and a disease-forecasting module, deployed live for demo and defense.',
    description:
      'Full-stack capstone build on React + Express + Supabase. Same clinic domain as the desktop client system, packaged as a hosted web platform with a forecasting module for the defense.',
    role: 'Capstone developer',
    type: 'School capstone',
    platform: 'Web app',
    focus: 'Access control · records · forecasting',
    timeline: 'Capstone',
    status: 'Live on Render',
    tags: ['React', 'Express', 'Supabase', 'Node.js'],
    brief: {
      problem:
        'The capstone needed to show a complete system, not a slice: real roles, real records, scheduling, and one analytical module that goes beyond CRUD.',
      approach:
        'I built the clinic domain as a hosted platform with role-based access at the core, records and scheduling on top, and disease forecasting as the analytical layer for the defense.',
    },
    modules: [
      {
        title: 'Role-Based Access',
        text: 'Staff see what their role allows — no shared logins, no leaked screens.',
      },
      {
        title: 'Records & Scheduling',
        text: 'Patient records connected to appointments instead of floating lists.',
      },
      {
        title: 'Disease Forecasting',
        text: 'Analytical module that surfaces trends for the capstone defense.',
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
  {
    slug: 'flowiq',
    category: 'Personal Projects',
    title: 'FlowIQ',
    outcome:
      'An AI-assisted workspace for job applications — paste a job posting or a recruiter message and FlowIQ classifies it, scores requirements against your profile and resume, drafts a tailored reply, and sends only with your approval.',
    description:
      'Human-in-the-loop automation throughout: intake returns a pending row immediately while fetch, analysis, and ingestion proceed in a background queue with boot recovery. Every send records snapshots plus transport metadata.',
    role: 'Sole developer',
    type: 'Personal project',
    platform: 'Web app',
    focus: 'Intake · RAG analysis · approval-gated send',
    timeline: 'Personal build',
    status: 'Live · Cloudflare Pages',
    tags: ['React', 'Express', 'Node.js', 'PostgreSQL', 'pgvector', 'Gemini'],
    brief: {
      problem:
        'Job hunting means re-reading postings, comparing requirements against a resume, and writing custom replies from scratch. Doing that across dozens of roles is slow and easy to get wrong.',
      approach:
        'I built one pipeline for it: classify the input and pick an intent, extract structured requirements, retrieve resume evidence with pgvector RAG, generate a draft with provenance, then hold for human approval before sending and recording the application.',
    },
    modules: [
      {
        title: 'Intake & Intent',
        text: 'Job URLs and free-text recruiter messages with AI classification and an explicit apply, reply, or ignore choice.',
      },
      {
        title: 'Extraction Pipeline',
        text: 'Structured data from JSON-LD and embedded page state, Readability fallback, honest handling of JS shells and login walls.',
      },
      {
        title: 'Requirement Fit Analysis',
        text: 'Typed requirements, weighted fit score, gaps, and per-requirement evidence drawn from the resume via RAG.',
      },
      {
        title: 'Drafting with Provenance',
        text: 'Cover letters and replies generated against retrieved resume excerpts, previewed and editable before anything sends.',
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
          'One-minute signup with full name, email verification code, and Google sign-in to start building momentum.',
        tags: ['React', 'Better Auth'],
        status: 'live',
      },
    ],
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
