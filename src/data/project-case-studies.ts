export interface CaseStudyChallenge {
  challenge: string
  solution: string
}

export interface CaseStudyTechStack {
  backend: string[]
  frontend: string[]
  database: string[]
  integrations: string[]
}

export interface CaseStudyScreenshot {
  id: string
  title: string
  subtitle?: string
  description: string
  src: string
  alt: string
  badge?: string
  route?: string
}

export interface CaseStudyDetail {
  slug: string
  shortTitle: string
  subtitle: string
  problemStatement: string
  solutionStatement: string
  myRoleDescription: string
  myContributions: string[]
  techStackGrouped: CaseStudyTechStack
  screenshots?: {
    platformShowcase?: CaseStudyScreenshot
    dashboards?: CaseStudyScreenshot[]
    aiIntelligence?: CaseStudyScreenshot[]
    mobileExperience?: CaseStudyScreenshot
    technicalArchitecture?: CaseStudyScreenshot
    authShowcase?: CaseStudyScreenshot
    workflowShowcase?: CaseStudyScreenshot
  }
  databaseArchitecture: {
    overview: string
    keyEntities: string[]
    schemaPrinciples: string[]
  }
  apiArchitecture: {
    overview: string
    dataFlowSteps: string[]
    authMethod: string
  }
  challenges: CaseStudyChallenge[]
  finalResult: {
    summary: string
    achievements: string[]
  }
}

export const projectCaseStudies: Record<string, CaseStudyDetail> = {
  'resumate-ai-conversational-ai-resume-builder-and-ats-optimization-platform': {
    slug: 'resumate-ai-conversational-ai-resume-builder-and-ats-optimization-platform',
    shortTitle: 'Resumate AI',
    subtitle: 'Conversational AI resume builder, document ingestion, and ATS optimization platform with real-time A4 preview and server-side PDF export.',
    problemStatement:
      'Traditional form-based resume builders overwhelm job seekers by requiring manual formatting, complex section organization, manual ATS keyword adjustment, and regional convention knowledge. Non-technical candidates struggle to translate their career history into modern, recruiter-ready formats, while static editors fail to provide instant feedback or context-aware rewriting.',
    solutionStatement:
      'Engineered Resumate AI, a conversational full-stack SaaS platform built with Next.js 16, Google Gemini AI, Supabase PostgreSQL, and Playwright. Users can converse in Bangla, Banglish, or English or upload existing resumes (PDF, DOCX, TXT, scanned images), and the system extracts, rewrites, and renders the data across 8 regional templates in real time, backed by server-side headless Chromium A4 PDF export.',
    myRoleDescription:
      'Full-Stack Developer and AI Systems Engineer responsible for the complete application architecture, multi-model Google Gemini integration, real-time React state synchronization, Supabase PostgreSQL schema with Row Level Security (RLS), Playwright server-side PDF rendering, and production Docker deployment on Render.',
    myContributions: [
      'Engineered a trilingual conversational AI pipeline powered by Google Gemini supporting natural-language CV editing in Bengali, Banglish, and English.',
      'Built a multimodal resume ingestion engine parsing PDF, DOCX, TXT, and scanned image documents into normalized, type-safe JSON schema.',
      'Designed and implemented 8 market-specific CV templates tailored for Bangladesh, Global ATS, International, MNC, DACH, Nordic, Australia/NZ, and Europass markets.',
      'Developed real-time A4 preview with algorithmic vertical whitespace balancing, dynamic typography scaling, and atomic undo/redo history.',
      'Architected Supabase PostgreSQL database models with Row Level Security (RLS), HMAC-SHA256 signed guest sessions, and seamless account migration.',
      'Configured a production-grade Dockerized Chromium runner using Playwright for server-side, zero-margin A4 PDF generation gated by server-verified payments.',
    ],
    techStackGrouped: {
      backend: ['Next.js 16 API Routes', 'Node.js', 'Playwright Chromium', 'JWT Auth'],
      frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
      database: ['Supabase', 'PostgreSQL', 'Row Level Security (RLS)', 'Schema Migrations'],
      integrations: ['Google Gemini API', 'Gemini Multimodal Vision', 'OpenAI API (Fallback)', 'bKash Gateway Architecture', 'Docker / Render'],
    },
    screenshots: {
      platformShowcase: {
        id: 'resumate-landing-showcase',
        title: 'Conversational Resume Platform Gateway & Onboarding',
        subtitle: 'Fast Multilingual Document Creation & AI Transformation Flow',
        description:
          'Modern full-stack web application landing interface welcoming job seekers with options to upload existing CV documents (PDF, DOCX, TXT, images) or start interactive conversational creation with trilingual AI assistance.',
        src: '/projects/resumate-ai/landing-showcase.webp',
        alt: 'Resumate AI Conversational AI Resume Platform Desktop Showcase',
        badge: 'Platform Showcase',
        route: 'https://ai-cv-builder-sli4.onrender.com',
      },
      dashboards: [
        {
          id: 'resumate-multimodal-ingestion',
          title: 'Multimodal Ingestion & Modern Layout',
          subtitle: 'Instant AI Document Parsing into Two-Column National Pro Layout',
          description:
            'Initial AI conversion gateway formatting candidate career history, contact details, and core skills into a structured two-column layout.',
          src: '/projects/resumate-ai/01-multimodal-ingestion-v2.webp',
          alt: 'Resumate AI Multimodal Ingestion and National Pro Two-Column Layout',
          badge: 'Onboarding & Parsing',
          route: 'https://ai-cv-builder-sli4.onrender.com',
        },
        {
          id: 'resumate-conversational-editing',
          title: 'Conversational Experience Tuning in Banglish',
          subtitle: 'Natural Language Prompt: "Experience ta aro strong koro"',
          description:
            'Interactive split-screen interface where users converse in Banglish or Bengali to enhance bullet points with action-driven metrics and impact.',
          src: '/projects/resumate-ai/02-conversational-editing-v2.webp',
          alt: 'Resumate AI Conversational AI Editing in Banglish with Live Preview',
          badge: 'Trilingual AI Chat',
          route: 'https://ai-cv-builder-sli4.onrender.com/workspace',
        },
        {
          id: 'resumate-ats-optimizer',
          title: 'Global ATS Layout Optimization',
          subtitle: 'Natural Language Prompt: "Make it ATS friendly"',
          description:
            'Deterministic conversion into an ATS-compliant single-column layout engineered for applicant tracking system parseability and typography clarity.',
          src: '/projects/resumate-ai/03-ats-optimization-v2.webp',
          alt: 'Resumate AI Global ATS Single-Column Layout and Polished Resume Output',
          badge: 'ATS Optimizer',
          route: 'https://ai-cv-builder-sli4.onrender.com/templates',
        },
        {
          id: 'resumate-one-page-fit',
          title: '1-Page Fit Active & Polished A4 Output',
          subtitle: 'Natural Language Prompt: "EDUCATION ay section ta r ektu sundor kore like dao"',
          description:
            'Algorithmic vertical whitespace balancing maintaining strict 1-page fit alongside server-side Playwright PDF download authorization.',
          src: '/projects/resumate-ai/04-one-page-fit-export-v2.webp',
          alt: 'Resumate AI 1-Page Fit Active and Polished A4 Resume Output',
          badge: '1-Page Fit & Export',
          route: 'https://ai-cv-builder-sli4.onrender.com/render-cv',
        },
      ],
    },
    databaseArchitecture: {
      overview:
        'Engineered on Supabase PostgreSQL with strict Row Level Security (RLS) policies, providing secure multi-tenant resume isolation, atomic version snapshots, and guest-to-user account migration.',
      keyEntities: [
        'users: Registered user credentials, profile metadata, and password hashes',
        'resumes: Master CV documents storing JSONB resume data, design configs, and payment states',
        'resume_versions: Historical state snapshots for rollback, undo/redo, and change tracking',
        'conversations & chat_messages: Multi-turn AI interaction logs and diff previews per CV',
        'payments: Server-verified transaction records strictly tied to verified resume IDs',
      ],
      schemaPrinciples: [
        'PostgreSQL Row Level Security (RLS) isolating user records and HMAC-signed guest sessions',
        'JSONB document columns enabling agile schema evolution without breaking data integrity',
        'Automated foreign key cascading ensuring clean lifecycle management on CV deletion',
      ],
    },
    apiArchitecture: {
      overview:
        'A robust 8-stage data pipeline transforming raw inputs into validated JSON resume data, dynamic React views, and pixel-perfect server-side PDF streams.',
      dataFlowSteps: [
        'User submits prompt or uploads document (PDF, DOCX, TXT, scanned image)',
        'Document / Vision parser extracts text streams or processes image base64 via Gemini Vision',
        'Google Gemini AI parses and restructures career facts against strict JSON schema',
        'Runtime Normalizer validates schema, strips hallucinations, and sanitizes fields',
        'ResumeContext dispatches atomic update and saves version snapshot to database',
        'Regional Template Engine renders dynamic A4 layout with selected fonts and colors',
        'WYSIWYG preview updates in real time with interactive zoom and balancing',
        'Playwright Headless Chromium generates zero-margin A4 PDF stream on authorized request',
      ],
      authMethod: 'HMAC-SHA256 Signed Guest Sessions (HttpOnly) & 30-Day User JWTs',
    },
    challenges: [
      {
        challenge:
          'Preventing LLM hallucination and schema drift during multi-turn conversational edits.',
        solution:
          'Enforced structured JSON MIME outputs with Google Gemini, backed by an automated 2-stage retry validator and custom runtime normalizers that discard invalid fields.',
      },
      {
        challenge:
          'Processing mixed-script and colloquial Bengali/Banglish commands for resume modifications.',
        solution:
          'Designed a dual-layer prompt architecture paired with regex-assisted NLP heuristics to accurately interpret requests like "CV ta one page koro" or "photo bad dao".',
      },
      {
        challenge:
          'Unifying multi-format resume ingestion across PDFs, Word documents, and scanned physical CVs.',
        solution:
          'Built a unified parsing pipeline combining pdf-parse, mammoth, and Gemini Multimodal Vision to extract up to 25,000 characters without losing career milestones.',
      },
      {
        challenge:
          'Eliminating awkward whitespace and pagination overflow on standard A4 outputs.',
        solution:
          'Engineered a smart vertical balancing algorithm that dynamically modulates section margins, line heights, and font scaling without altering candidate facts.',
      },
      {
        challenge:
          'Preserving guest progress and enabling friction-free migration upon account registration.',
        solution:
          'Implemented HMAC-SHA256 signed guest sessions and an atomic database claim procedure (claimGuestResumes) that transfers all draft CVs and version history to the newly registered account.',
      },
      {
        challenge:
          'Rendering consistent, pixel-perfect A4 PDFs on Linux production containers without layout shifts.',
        solution:
          'Configured headless Chromium with Playwright inside a Debian Docker container with pre-installed typography libraries and zero-margin print stylesheets.',
      },
    ],
    finalResult: {
      summary:
        'Successfully engineered and deployed Resumate AI to production on Render, delivering a high-performance conversational resume builder tested across multi-turn multilingual scenarios.',
      achievements: [
        'Live production deployment on Render Cloud',
        '8 verified regional CV templates with A4 PDF export',
        'Open-source codebase maintained on GitHub',
      ],
    },
  },

  'securex-cctv-and-security-service-management-system': {
    slug: 'securex-cctv-and-security-service-management-system',
    shortTitle: 'SecureX',
    subtitle: 'End-to-end security service booking, slot conflict prevention, and invoice generation system.',
    problemStatement:
      'Local security and CCTV service providers frequently face operational friction caused by manual phone reservations, technician double-booking conflicts, handwritten receipts, and delayed billing cycles. Without a centralized digital platform, clients experience scheduling uncertainty and businesses suffer revenue leakage.',
    solutionStatement:
      'Engineered a full-stack Laravel MVC platform with MySQL relational schema design. The platform introduces an algorithmic conflict-aware time-slot booking engine that eliminates overlapping reservations, pairs client self-service with administrative oversight, and automates transactional email delivery and dynamic PDF invoice generation.',
    myRoleDescription:
      'Full Stack Developer responsible for end-to-end system architecture, relational database design, Laravel MVC backend implementation, Google OAuth 2.0 authentication, conflict detection algorithms, and automated PDF invoice generation.',
    myContributions: [
      'Designed the normalized MySQL relational schema for users, roles, services, bookings, and invoices.',
      'Implemented full-stack Laravel MVC architecture with Eloquent ORM relationships and query optimization.',
      'Engineered conflict-aware time-slot validation logic that detects overlaps and suggests open slots.',
      'Integrated Google OAuth 2.0 (Socialite) alongside traditional email/password authentication with RBAC.',
      'Built automated transactional email notifications via SMTP and dynamic PDF invoice generation.',
    ],
    techStackGrouped: {
      backend: ['Laravel', 'PHP', 'Laravel MVC', 'Laravel Sanctum'],
      frontend: ['Blade Templates', 'Tailwind CSS', 'JavaScript', 'HTML5'],
      database: ['MySQL', 'Eloquent ORM', 'Relational Schema (3NF)'],
      integrations: ['Google OAuth 2.0', 'SMTP Mailer', 'PDF Generation', 'Git & GitHub'],
    },
    screenshots: {
      platformShowcase: {
        id: 'securex-landing',
        title: 'Securex CCTV & Security Platform Showcase',
        subtitle: 'Centralized Client Booking & Service Catalog Gateway',
        description:
          'Public-facing product showcase offering direct access to security services, booking consultations, and customer quote requests.',
        src: '/projects/securex/landing-showcase.webp',
        alt: 'Securex CCTV and Security Platform Landing Page and Product Showcase',
        badge: 'Product Showcase',
        route: '127.0.0.1:8000',
      },
      dashboards: [
        {
          id: 'securex-admin-control-room',
          title: 'Securex Control Room & Service Admin Panel',
          subtitle: 'Central Administrative Workspace & Real-Time Booking Oversight',
          description:
            'Comprehensive administrator control center displaying live booking review queues (8 pending reviews), active service metrics (16 active services), and customer inbox communications.',
          src: '/projects/securex/admin-dashboard.webp',
          alt: 'Securex Admin Control Room Dashboard and Security Service Management Panel',
          badge: 'Admin Control Room',
          route: '127.0.0.1:8000/admin/dashboard',
        },
      ],
      workflowShowcase: {
        id: 'securex-service-workflow',
        title: 'Security Service Management & Operational Workflow',
        subtitle: 'Service Catalog Administration & Inventory Lifecycle',
        description:
          'Administrative operations interface for configuring security service offerings (CC Camera, Video Surveillance, Fingerprint Access Control, Fire Alarm), updating pricing, and managing lifecycle statuses.',
        src: '/projects/securex/service-workflow.webp',
        alt: 'Securex Service Management Workflow and Admin Operations Interface',
        badge: 'Service Operations',
        route: '127.0.0.1:8000/admin/services',
      },
    },
    databaseArchitecture: {
      overview:
        'Structured around a normalized 3NF relational schema that maintains strict referential integrity across users, roles, services, time-slots, bookings, and transactional invoices.',
      keyEntities: [
        'users: Stores client and administrative accounts with role identification',
        'services: Catalogs security service types, standard pricing, and durations',
        'time_slots: Manages available technician scheduling windows',
        'bookings: Links clients, services, and time-slots with status workflows',
        'invoices: Generates immutable billing records linked to completed bookings',
      ],
      schemaPrinciples: [
        'Foreign key constraints ensuring automatic cascade integrity',
        'Indexed lookup columns on booking_date and service_id for instant slot queries',
        'Transactional database operations to prevent partial or duplicate reservations',
      ],
    },
    apiArchitecture: {
      overview:
        'Follows a structured controller-service pattern where all booking requests pass through middleware validation, concurrency checks, and automated notification triggers.',
      dataFlowSteps: [
        'Client Submits Booking Request with desired service and time slot',
        'Route Middleware verifies authentication status and role permissions',
        'BookingService runs conflict detection against existing active reservations in MySQL',
        'Database Transaction commits booking and creates linked invoice record',
        'MailService dispatches confirmation email with dynamic PDF invoice attached',
      ],
      authMethod: 'Google OAuth 2.0 (Socialite) & Session-Based RBAC (Admin / Client)',
    },
    challenges: [
      {
        challenge:
          'Handling simultaneous booking attempts for the same technician time slot without creating duplicate reservations.',
        solution:
          'Implemented database-level transaction locks (DB::transaction) and pre-commit conflict queries that verify slot availability before committing booking records.',
      },
      {
        challenge:
          'Providing frictionless client onboarding while maintaining secure role-based administrative control.',
        solution:
          'Integrated Google OAuth 2.0 single sign-on alongside email authentication, paired with middleware that automatically assigns and routes roles upon login.',
      },
    ],
    finalResult: {
      summary:
        'Successfully completed and verified during industrial field work under university faculty supervision. Published as a formal technical report on Zenodo with registered DOI.',
      achievements: [
        'Verified in industrial training project evaluation',
        'Published technical report on Zenodo (DOI: 10.5281/zenodo.21893082)',
        'Open-source codebase maintained on GitHub',
      ],
    },
  },

  'ai-smart-campus-system': {
    slug: 'ai-smart-campus-system',
    shortTitle: 'AI Smart Campus System',
    subtitle: 'Decoupled campus management platform combining a React frontend, Laravel 12 API, and AI integrations.',
    problemStatement:
      'University students and faculty often navigate fragmented web portals for academic information, administrative requests, and campus notices. Manual query handling creates administrative bottlenecks and delays critical support for students.',
    solutionStatement:
      'Architected a modern decoupled full-stack platform featuring a responsive React & Vite Single Page Application connected to a high-performance Laravel 12 REST API with Sanctum token authentication. Integrated OpenAI and Gemini APIs to deliver intelligent, automated student assistance workflows.',
    myRoleDescription:
      'Team Leader and Database Lead responsible for coordinating project milestones, designing the MySQL data layer, building the Laravel 12 RESTful API with Sanctum, integrating AI APIs, and connecting the React frontend.',
    myContributions: [
      'Led the academic project team, coordinated task distribution, and maintained repository workflow.',
      'Designed and optimized the relational MySQL database schema for students, departments, and AI logs.',
      'Engineered the secure Laravel 12 RESTful API backend protected by Laravel Sanctum token authentication.',
      'Integrated OpenAI and Gemini API endpoints for intelligent student queries and campus assistance.',
      'Coordinated the integration between the React/Vite client interface and the Laravel API layer.',
    ],
    techStackGrouped: {
      backend: ['Laravel 12', 'PHP 8.3', 'RESTful API', 'Laravel Sanctum'],
      frontend: ['React 19', 'Next.js / Vite', 'TypeScript', 'Tailwind CSS'],
      database: ['MySQL', 'Relational Schema Design', 'Query Optimization'],
      integrations: ['OpenAI API', 'Gemini API', 'Render Cloud', 'Postman'],
    },
    screenshots: {
      platformShowcase: {
        id: 'platform-showcase',
        title: 'Northern University of Business & Technology Khulna Portal',
        subtitle: 'Unified Public Landing & Institutional Gateway',
        description:
          'Institutional landing page for NUBTK featuring integrated navigation, student indicators (8,400+ active students), and 24/7 AI-assisted academic support.',
        src: '/projects/ai-smart-campus/landing-showcase.webp',
        alt: 'Northern University of Business and Technology Khulna Smart Campus Portal Landing Page',
        badge: 'Platform Showcase',
        route: 'http://localhost:5173/',
      },
      dashboards: [
        {
          id: 'faculty-dashboard',
          title: 'Faculty & Admin Teaching Workspace',
          subtitle: 'Academic Oversight & Live Class Analytics',
          description:
            'Instructor dashboard offering high-level academic tracking across enrolled students, class schedules, weekly agendas, attendance benchmarks (69% average), and at-risk student alerts.',
          src: '/projects/ai-smart-campus/faculty-dashboard.webp',
          alt: 'Faculty and Admin Teaching Workspace Dashboard Interface',
          badge: 'Faculty Workspace',
          route: 'localhost:5173/faculty-dashboard',
        },
        {
          id: 'student-dashboard',
          title: 'Student Learning & Course Progress Hub',
          subtitle: 'Personalized Academic Schedule & CGPA History',
          description:
            'Comprehensive student portal displaying registered courses (Mobile Computing, Introduction to Computers, Structured Programming), upcoming lecture schedules, and historical CGPA tracking across semesters (3.51 - 3.61).',
          src: '/projects/ai-smart-campus/student-dashboard.webp',
          alt: 'Student Learning and Course Progress Dashboard with CGPA History',
          badge: 'Student Portal',
          route: 'localhost:5173/dashboard',
        },
      ],
      aiIntelligence: [
        {
          id: 'risk-alerts',
          title: 'AI Risk Alert & Early Warning System',
          subtitle: 'Automated Academic Diagnostics & Advisory',
          description:
            'Database-backed academic diagnostic engine calculating attendance thresholds and CGPA trajectories to categorize student risks (Critical, Medium, On Track) with tailored recovery recommendations.',
          src: '/projects/ai-smart-campus/risk-alerts.webp',
          alt: 'Database-backed academic early warnings and AI risk analysis interface',
          badge: 'Risk Diagnostics',
          route: 'localhost:5173/risk-alerts',
        },
        {
          id: 'ai-assistant',
          title: 'AI Assistant Conversational Workspace',
          subtitle: 'Contextual Academic Inquiries & Lesson Planning',
          description:
            'Interactive AI chat workspace powered by Gemini and OpenAI models, enabling instructors and students to generate lesson plans, analyze student performance, and query campus schedules with authenticated account context.',
          src: '/projects/ai-smart-campus/ai-assistant.webp',
          alt: 'AI Assistant Interactive Workspace for lesson planning and queries',
          badge: 'Gemini / OpenAI API',
          route: 'localhost:5173/ai-assistant',
        },
      ],
      mobileExperience: {
        id: 'mobile-showcase',
        title: 'Responsive Mobile-First Experience',
        subtitle: 'Touch-Optimized Adaptive Interface',
        description:
          'Fully responsive mobile application interface running on Render cloud (system-ce9i.onrender.com), providing instantaneous access to campus tools, authentication, and academic status across mobile viewports.',
        src: '/projects/ai-smart-campus/mobile-experience.webp',
        alt: 'AI Smart Campus System Responsive Mobile Interface on Render Cloud',
        badge: 'Mobile Viewport',
        route: 'system-ce9i.onrender.com',
      },
      technicalArchitecture: {
        id: 'database-architecture',
        title: 'MySQL Relational Schema & Storage Engine',
        subtitle: 'Normalized Database Tables & Performance Indices',
        description:
          'Production InnoDB relational database schema tracking academic events, attendance records, users, AI conversation history, and course enrollments with foreign key referential integrity.',
        src: '/projects/ai-smart-campus/database-architecture.webp',
        alt: 'phpMyAdmin Relational Database Schema Structure and Tables',
        badge: 'MySQL InnoDB',
        route: 'localhost/phpmyadmin',
      },
    },
    databaseArchitecture: {
      overview:
        'Relational data layer engineered to support high-concurrency API requests, student profiles, departmental hierarchies, and AI interaction logging.',
      keyEntities: [
        'users & students: Manages authenticated credentials and academic profiles',
        'departments & courses: Houses institutional curriculum and program mapping',
        'academic_queries: Tracks student submissions and resolution statuses',
        'ai_conversations: Logs AI prompts and responses for auditability and session continuity',
      ],
      schemaPrinciples: [
        'Optimized composite indexing for fast student and course lookups',
        'Foreign key cascades maintaining data consistency across department transfers',
        'Encrypted token storage via Laravel Sanctum personal access tokens',
      ],
    },
    apiArchitecture: {
      overview:
        'Stateless RESTful API architecture connecting the React SPA client to the Laravel backend and third-party AI models.',
      dataFlowSteps: [
        'React SPA sends authenticated HTTP request with Bearer Token in headers',
        'Laravel Sanctum Middleware authenticates token and resolves user model',
        'API Controller validates request body via FormRequest classes',
        'Backend service formats prompt context and dispatches request to Gemini/OpenAI API',
        'Eloquent ORM writes interaction log to MySQL and returns structured JSON payload to React state',
      ],
      authMethod: 'Laravel Sanctum Token-Based Bearer Authentication',
    },
    challenges: [
      {
        challenge:
          'Protecting sensitive third-party AI provider API keys while enabling client-side interactive campus queries.',
        solution:
          'Created secure server-side controller proxies in Laravel 12 that securely manage API keys in environment variables, ensuring zero exposure to the client application.',
      },
      {
        challenge:
          'Ensuring responsive user experience during asynchronous AI model inference.',
        solution:
          'Implemented animated loading skeletons, optimistic state management in React, and robust server-side error fallbacks.',
      },
    ],
    finalResult: {
      summary:
        'Delivered a fully functioning full-stack AI-integrated academic platform with a live hosted demonstration and complete source code repository.',
      achievements: [
        'Live demonstration hosted online on Render',
        'Successful team leadership and database architecture execution',
        'Published open-source repository on GitHub',
      ],
    },
  },

  'library-management-project': {
    slug: 'library-management-project',
    shortTitle: 'Library Management System',
    subtitle: 'Database-driven management application built on normalized relational schema design (1NF–3NF).',
    problemStatement:
      'Manual book cataloging and paper checkout logs cause inventory discrepancies, unrecorded overdue fines, and redundant data storage across multi-entity academic records.',
    solutionStatement:
      'Developed a database-driven Laravel MVC management system designed around a strictly normalized (1NF–3NF) MySQL relational schema. Provides role-based access control for librarians and students, automated inventory tracking, and full CRUD record administration.',
    myRoleDescription:
      'Full Stack Developer responsible for relational database schema normalization (1NF–3NF), Laravel MVC architecture, Eloquent ORM configuration, role-based authentication, and inventory checkout workflows.',
    myContributions: [
      'Designed and implemented a normalized MySQL schema eliminating transitive and partial dependencies.',
      'Constructed structured Laravel MVC controllers, models, and responsive Blade views.',
      'Implemented role-based access control separating administrative functions from student catalog search.',
      'Configured Eloquent ORM relationships with eager loading to prevent N+1 query overhead.',
      'Engineered inventory quantity tracking with automatic status updates upon book checkout/return.',
    ],
    techStackGrouped: {
      backend: ['Laravel', 'PHP', 'MVC Architecture', 'Eloquent ORM'],
      frontend: ['Blade Templates', 'HTML5', 'CSS3', 'JavaScript'],
      database: ['MySQL', 'Relational Normalization (1NF–3NF)', 'SQL Indexing'],
      integrations: ['Git', 'GitHub', 'MySQL Workbench'],
    },
    screenshots: {
      platformShowcase: {
        id: 'library-catalog-showcase',
        title: 'Library Management Public Catalog & Book Search Portal',
        subtitle: 'Multi-Category Filtered Book Discovery & Instant Borrowing Interface',
        description:
          'Public catalog interface featuring instant category filtering, keyword and ISBN search, real-time availability counters, and direct student borrowing interactions.',
        src: '/projects/library-management/catalog-showcase.webp',
        alt: 'Library Management System Public Catalog, Search, and Book Borrowing Portal',
        badge: 'Public Catalog & Borrowing',
        route: '127.0.0.1:8000/books',
      },
      dashboards: [
        {
          id: 'library-admin-book-list',
          title: 'Librarian Administrative Control & Book Inventory Management',
          subtitle: 'Centralized Book Catalog CRUD & Stock Status Ledger',
          description:
            'Comprehensive administrative book ledger showcasing relational data records with cover thumbnails, ISBN codes, author mappings, categorization, publication years, real-time availability statuses, and full CRUD control actions (View, Edit, Delete).',
          src: '/projects/library-management/admin-book-list.webp',
          alt: 'Library Management System Admin Book List and Inventory Management CRUD Table',
          badge: 'Admin Book Inventory',
          route: '127.0.0.1:8000/admin/books',
        },
      ],
    },
    databaseArchitecture: {
      overview:
        'Strictly normalized relational schema eliminating redundancy and anomalies across multi-table book, author, category, and borrowing records.',
      keyEntities: [
        'books: Central catalog records with ISBN, title, total copies, and available copies',
        'authors & categories: Normalized lookup tables preventing duplicate string storage',
        'students: Student member registry with borrowing privileges and limits',
        'borrow_records: Transactional ledger tracking checkout dates, due dates, and return statuses',
      ],
      schemaPrinciples: [
        'Full 3NF normalization eliminating duplicate author/category attributes',
        'Composite foreign keys on borrow_records linking student_id and book_id',
        'Referential integrity rules preventing deletion of books currently on loan',
      ],
    },
    apiArchitecture: {
      overview:
        'Standard Laravel MVC request-response lifecycle with session-based security and transactional database mutations.',
      dataFlowSteps: [
        'User initiates book checkout or catalog search from Blade interface',
        'Authentication Middleware verifies active session and role permissions',
        'Controller executes Eloquent query with eager loading (Book::with(["author", "category"]))',
        'Database Transaction updates available copy count and inserts borrow_record',
        'View renders updated inventory status with contextual flash alert',
      ],
      authMethod: 'Session-Based Authentication with Role-Based Access Control (Librarian / Student)',
    },
    challenges: [
      {
        challenge:
          'Preventing N+1 query performance degradation when listing multi-author and categorized book catalogs.',
        solution:
          'Utilized Eloquent eager loading (with()) across related author and category models, minimizing query overhead to a single efficient join.',
      },
      {
        challenge:
          'Maintaining exact available inventory count during concurrent student checkouts.',
        solution:
          'Enforced atomic quantity checks and database transaction wrapping before checkout records are saved.',
      },
    ],
    finalResult: {
      summary:
        'Successfully demonstrated database normalization principles, clean Laravel MVC separation of concerns, and reliable CRUD administration.',
      achievements: [
        'Demonstrated 1NF–3NF normalized relational schema design',
        'Robust multi-role CRUD catalog and checkout tracking',
        'Public repository maintained on GitHub',
      ],
    },
  },

  logistica: {
    slug: 'logistica',
    shortTitle: 'Logistica Transport & Courier System',
    subtitle: 'Enterprise shipment, transport, and courier management system developed during internship at Appstick.',
    problemStatement:
      'International and country-to-country transport operations require strict server-side validation, reliable consignment tracking across transit stages, and high database integrity in collaborative team environments.',
    solutionStatement:
      'Contributed to the development of a comprehensive transport and courier management platform using Laravel, PHP, and MySQL. Supported reusable backend logic, performed schema integrity checks, and participated in Agile Git workflows.',
    myRoleDescription:
      'Backend Developer Intern at Appstick Tech Firm responsible for supporting Laravel and PHP feature implementations, database integrity checks, consignment tracking logic, and team Git workflows.',
    myContributions: [
      'Supported Laravel and PHP application implementation in an Agile team setting.',
      'Worked with reusable business logic for multi-stage transport consignment tracking.',
      'Performed database integrity checks and relational schema validation.',
      'Assisted in debugging, troubleshooting, and code quality verification.',
      'Collaborated using Git branching, commit discipline, and peer code reviews.',
    ],
    techStackGrouped: {
      backend: ['PHP', 'Laravel', 'Reusable Services', 'MVC'],
      frontend: ['Blade', 'CSS3', 'JavaScript'],
      database: ['MySQL', 'Database Integrity Checks', 'Schema Migrations'],
      integrations: ['Git', 'GitHub Team Workflow', 'Postman'],
    },
    screenshots: {
      platformShowcase: {
        id: 'logistica-home-hero',
        title: 'Logistica Transport & Logistics Platform Showcase',
        subtitle: 'Public Freight & Courier Solution Gateway',
        description:
          'Public hero interface introducing transport services, freight solutions, direct quote actions, and online consignment booking.',
        src: '/projects/logistica/logistica-home-hero.webp',
        alt: 'Logistica Transport and Logistics Solution Home Page and Hero Section',
        badge: 'Platform Showcase',
        route: 'localhost:8000',
      },
      dashboards: [
        {
          id: 'logistica-admin-control-center',
          title: 'Operations Control Center & Admin Dashboard',
          subtitle: 'Consignment Management & Real-Time Operational Activity',
          description:
            'Administrative control panel displaying operational metrics across registered customer accounts (3 users), active services (6 services), pending bookings (2 bookings), and real-time activity logs.',
          src: '/projects/logistica/logistica-admin-dashboard.webp',
          alt: 'Logistica Operations Control Center and Admin Dashboard Interface',
          badge: 'Operations Control Center',
          route: 'localhost:8000/admin/dashboard',
        },
      ],
    },
    databaseArchitecture: {
      overview:
        'Relational schema engineered to track multi-leg shipment consignments, transport routes, branch nodes, and dispatch logs.',
      keyEntities: [
        'consignments: Core shipment records with tracking codes and weight/dimension metrics',
        'branches: Regional transit hubs and destination checkpoints',
        'tracking_logs: Chronological, immutable state transitions for each parcel',
        'couriers & customers: Dispatch personnel and sender/recipient accounts',
      ],
      schemaPrinciples: [
        'Immutable tracking log design ensuring historical auditability',
        'Relational foreign keys maintaining connection across consignment waypoints',
        'Strict schema integrity checks preventing orphaned shipment records',
      ],
    },
    apiArchitecture: {
      overview:
        'Modular server-side service architecture handling shipment creation, status transitions, and tracking lookups.',
      dataFlowSteps: [
        'Consignment entry submitted by branch staff',
        'Validation layer checks payload integrity and parcel parameters',
        'Service Layer creates shipment record and generates initial tracking log',
        'Database commits state and updates branch inventory ledger',
        'Tracking query returns chronological milestone history',
      ],
      authMethod: 'Role-Based Authentication (Branch Staff, Dispatcher, Admin)',
    },
    challenges: [
      {
        challenge:
          'Adapting quickly to an active enterprise codebase and adhering to team code standards.',
        solution:
          'Systematically verified database migrations, used Postman for endpoint testing, and maintained disciplined Git branch conventions.',
      },
      {
        challenge:
          'Ensuring data consistency across multi-stage parcel consignment status updates.',
        solution:
          'Assisted with validating business rules and database constraints that prevent invalid status state jumps.',
      },
    ],
    finalResult: {
      summary:
        'Successfully contributed to real enterprise client project deliverables during practical internship at Appstick Tech Firm.',
      achievements: [
        'Completed real-world software firm internship contribution',
        'Gained collaborative team Git and code review experience',
        'Published project repository on GitHub',
      ],
    },
  },

  'nur-foodes-restaurant-pos-and-store-erp-system': {
    slug: 'nur-foodes-restaurant-pos-and-store-erp-system',
    shortTitle: 'Nur Foodes POS',
    subtitle: 'A touch-optimized restaurant POS and operations platform connecting cashier ordering, kitchen workflows, inventory controls, payments, Saudi VAT invoicing and shift reporting.',
    problemStatement: 'Restaurant operations can become fragmented when cashier ordering, kitchen communication, product availability, payments, invoice generation, returns and shift reporting are handled independently. The system needed to provide a fast interface suitable for counter staff while also maintaining structured order lifecycle management, bilingual operation, tax calculations and administrative control.',
    solutionStatement: 'Engineered Nur Foodes, a modular browser-based POS application. The POS, payment, receipt, reports, administration, and printer logic are separated into dedicated modules. The system integrates the complete workflow from Catalog to Cart, Order to Kitchen, and Payment to VAT Invoice and Reports, providing a unified operational platform.',
    myRoleDescription: 'Application Developer & System Designer responsible for the POS interaction model, modular JavaScript application structure, cashier workflows, payment logic, tax invoice generation, reporting interfaces, bilingual UI behavior, responsive design and operational workflow integration.',
    myContributions: [
      'Designed the touch-oriented POS product discovery and ordering workflow.',
      'Implemented modular JavaScript architecture separating POS, payment, receipt, reporting, administration and printing responsibilities.',
      'Built Arabic/English localization behavior including RTL/LTR presentation.',
      'Implemented payment totals, VAT calculations and cash change workflows.',
      'Developed tax receipt generation and ZATCA TLV QR logic.',
      'Built responsive layouts for commercial desktop POS, tablet and mobile use.',
      'Implemented restaurant order lifecycle and operational reporting.',
      'Added test/verification utilities for important POS calculations and workflows.',
    ],
    techStackGrouped: {
      backend: [
        'Modular JavaScript Application Logic',
        'Vite Build System',
        'POS / Payment / Receipt Modules',
      ],
      frontend: [
        'HTML5',
        'CSS3',
        'JavaScript ES6+',
        'Responsive UI',
        'RTL / LTR Localization',
      ],
      database: [
        'Browser Local Persistence',
        'Client-Side State Store',
        'Inventory / Order State',
      ],
      integrations: [
        'PWA Manifest',
        'ZATCA TLV QR Logic',
        'Thermal Print Workflow',
        'Vercel',
        'Puppeteer / jsdom Testing',
      ],
    },
    screenshots: {
      platformShowcase: {
        id: 'nur-foodes-pos-terminal',
        title: 'Nur Foodes Restaurant POS Terminal',
        subtitle: 'Touch-Optimized Counter Ordering & Product Catalog',
        description: 'A high-density commercial POS interface combining visual item discovery, category filtering, search, pricing and fast order entry while keeping the main restaurant actions immediately accessible.',
        src: '/projects/nur-foodes/pos-terminal-v3.png',
        alt: 'Nur Foodes Restaurant POS Terminal Interface',
        badge: 'POS Terminal',
        route: 'https://food-software-sigma.vercel.app/',
      },
      mobileExperience: {
        id: 'nur-foodes-mobile-pos',
        title: 'Responsive Mobile-First POS Experience',
        subtitle: 'Touch-Optimized Adaptive Interface for Tablets and Phones',
        description: 'Fully responsive mobile application interface for ordering, catalog browsing, and receipt generation optimized for smaller viewports.',
        src: '/projects/nur-foodes/mobile-pos-v3.png',
        alt: 'Nur Foodes Responsive Mobile POS Interface',
        badge: 'Mobile Viewport',
        route: 'https://food-software-sigma.vercel.app/',
      },
    },
    databaseArchitecture: {
      overview: 'Engineered as a highly responsive client-side application utilizing persistent browser storage to maintain restaurant operational state across sessions without a remote server dependency.',
      keyEntities: [
        'menu items: Product catalog with prices, categories, and bilingual descriptions',
        'categories: Menu categorization for filtering and UI structure',
        'orders: Transactional records encompassing order items, notes, and payment status',
        'payments: Financial ledger tracking subtotal, discounts, VAT, and tendered cash',
        'inventory: Product availability states synchronizing across the POS interface',
        'settings: Application configuration including active language, currency, and tax rates',
      ],
      schemaPrinciples: [
        'Centralized application state (store.js) for POS operational consistency',
        'Persistent browser storage ensuring reload resilience and offline capability',
        'Separate application modules consuming shared state for UI synchronization',
      ],
    },
    apiArchitecture: {
      overview: 'A modular browser application where a shared store coordinates POS, payment, receipt, reporting, and administrative modules, allowing each workflow to remain separated while sharing consistent restaurant operational state.',
      dataFlowSteps: [
        'Cashier searches or selects menu item from the visual catalog',
        'POS module updates active cart/order state in the central store',
        'Payment module calculates payable amount, applying discount and VAT rules',
        'Receipt module creates invoice and generates ZATCA TLV QR data',
        'Completed transaction is recorded in persistent browser state',
        'Reporting modules aggregate saved transaction records for shift analysis',
      ],
      authMethod: 'PIN-Based Local Authorization',
    },
    challenges: [
      {
        challenge: 'High-speed product discovery in a large touch interface.',
        solution: 'Implemented a visual catalog with category filters, live search, product codes, and compact quick-add interactions to accelerate order entry.',
      },
      {
        challenge: 'Keeping cashier and kitchen workflows synchronized conceptually.',
        solution: 'Designed a structured order lifecycle and dedicated operational views, ensuring order states are cleanly managed.',
      },
      {
        challenge: 'Reliable monetary calculation.',
        solution: 'Centralized subtotal calculation, discount application, 15% VAT computation, tendered amount, and cash change logic into a dedicated payment module.',
      },
      {
        challenge: 'Supporting Arabic and English without mixed-language interface pollution.',
        solution: 'Built comprehensive localization dictionaries with dynamic RTL/LTR layout handling and localized numeral formatting where implemented.',
      },
      {
        challenge: 'Printing tax/customer receipts across varying hardware environments.',
        solution: 'Developed dedicated receipt and printer modules featuring thermal-optimized formatting and reliable browser print fallbacks.',
      },
      {
        challenge: 'Keeping a commercial POS usable on different display sizes.',
        solution: 'Applied dedicated responsive CSS and adaptive layouts ensuring the POS terminal, tablet, and mobile navigation remain functional and legible.',
      },
    ],
    finalResult: {
      summary: 'Built and deployed a comprehensive restaurant operations application that demonstrates practical POS engineering across cashier ordering, client-side operational state, payment calculation, Saudi VAT invoice generation, bilingual interfaces and restaurant reporting.',
      achievements: [
        'Live POS application deployed publicly',
        'Modular JavaScript operational architecture',
        'Arabic (RTL) and English (LTR) UI support',
        'Saudi 15% VAT invoice workflow & ZATCA TLV QR implementation',
        'Responsive POS interface across devices',
      ],
    },
  },
  'cv-payment-reminder-automation': {
    slug: 'cv-payment-reminder-automation',
    shortTitle: 'CV Payment Reminder',
    subtitle: 'Scheduled client payment reminder automation pipeline integrating n8n, Google Sheets, and Telegram Bot API in a containerized Docker environment.',
    problemStatement:
      'Managing client billing cycles and sending timely payment reminders manually is time-consuming, prone to human error, and inconsistent. Without an automated scheduler, freelancers and service agencies frequently experience delayed cash flows, missed follow-ups, and repetitive copy-pasting of payment notices across chat applications.',
    solutionStatement:
      'Architected and deployed a containerized n8n automation workflow that polls client payment ledgers in Google Sheets, evaluates payment status using conditional IF logic, dispatches personalized Telegram notifications via Telegram Bot API, and updates spreadsheet records with confirmation timestamps to prevent duplicate reminders.',
    myRoleDescription:
      'Workflow Automation Developer responsible for end-to-end pipeline architecture, n8n Docker container setup, Google Cloud OAuth2 credentials configuration, Telegram Bot API token setup, conditional routing logic, and spreadsheet row status tracking.',
    myContributions: [
      'Configured a self-hosted n8n automation instance running in a containerized Docker environment with persistent volume storage.',
      'Integrated Google Cloud Console API credentials with OAuth2 authentication to securely read and update Google Sheets ledgers.',
      'Configured Telegram Bot via BotFather, setting up automated messaging endpoints with Markdown-formatted notifications.',
      'Designed a 5-stage sequential automation flow: Schedule Trigger → Google Sheets Read → Conditional IF Filter → Telegram Message Dispatch → Google Sheets Row Update.',
      'Implemented idempotent status tracking by updating the spreadsheet with notification timestamps to prevent redundant reminder delivery.',
      'Tested edge cases including empty rows, partial payments, and API rate limits to ensure dependable execution.',
    ],
    techStackGrouped: {
      backend: ['n8n Workflow Automation', 'Docker Container', 'Node.js Runtime', 'Cron Scheduler'],
      frontend: ['n8n Visual Workflow Canvas', 'Google Sheets Spreadsheet UI', 'Telegram Mobile & Desktop Apps'],
      database: ['Google Sheets API v4', 'Tabular Client Ledger Schema', 'Row Status Tracking'],
      integrations: ['Telegram Bot API', 'Google Cloud Platform (GCP)', 'OAuth2 Service Connection', 'HTTP Request / Webhooks'],
    },
    screenshots: {
      platformShowcase: {
        id: 'n8n-workflow-showcase',
        title: 'n8n Automation Architecture & Canvas Overview',
        subtitle: 'Scheduled Multi-Node Automation Pipeline',
        description:
          'Complete n8n automation canvas demonstrating the 5-node workflow connecting Schedule Trigger, Google Sheets ingestion, conditional IF decision logic, Telegram Bot dispatch, and spreadsheet record updates.',
        src: '/images/n8n-workflow-architecture.png',
        alt: 'CV Payment Reminder Automation n8n Editor Workflow Screenshot',
        badge: 'n8n Workflow Canvas',
        route: 'localhost:5678/workflow/cv-payment-reminder',
      },
      workflowShowcase: {
        id: 'n8n-full-banner',
        title: 'CV Payment Reminder System Map & Cover Visual',
        subtitle: 'Google Sheets & Telegram Notification Flow',
        description:
          'Architectural presentation showcasing the end-to-end scheduled automation that monitors client dues and triggers instantaneous chat alerts.',
        src: '/projects/cv-payment-reminder-cover.webp',
        alt: 'CV Payment Reminder Automation Designed Cover and Node Map',
        badge: 'System Architecture',
        route: 'Docker: n8n Container',
      },
    },
    databaseArchitecture: {
      overview:
        'Utilizes Google Sheets as a structured, lightweight tabular database accessible via Google Sheets API v4. Each row represents an individual client transaction with strict column definitions.',
      keyEntities: [
        'Client ID & Name: Unique client identifier and customer contact name',
        'Due Amount & Currency: Pending balance and service fee',
        'Payment Due Date: Scheduled date threshold used by conditional IF logic',
        'Telegram Chat ID: Recipient destination ID for targeted bot delivery',
        'Reminder Status & Timestamp: Status flag and dispatch timestamp preventing duplicate alerts',
      ],
      schemaPrinciples: [
        'Tabular normalization ensuring distinct rows for each billing transaction',
        'Explicit status column ("Pending", "Sent", "Paid") ensuring idempotency',
        'Audit timestamp logging recording exactly when the reminder was dispatched',
      ],
    },
    apiArchitecture: {
      overview:
        'Orchestrates RESTful API requests between Google Cloud Sheets API v4 and Telegram Bot API using n8n pre-built credential handlers and secure environment variables in Docker.',
      dataFlowSteps: [
        'Schedule Trigger fires on configured interval (e.g., daily at 09:00 AM)',
        'Google Sheets node retrieves active client rows using OAuth2 credentials',
        'IF node evaluates payment status (e.g., status == "Pending" && dueDate <= today)',
        'Telegram node dispatches formatted message to specific client Chat ID',
        'Google Sheets Update node writes "Reminder Sent" with current ISO timestamp',
      ],
      authMethod: 'Google Cloud OAuth2 & Telegram Bot Token',
    },
    challenges: [
      {
        challenge: 'Preventing duplicate reminder notifications on consecutive automated schedule runs.',
        solution:
          'Engineered a state-tracking update step: after Telegram successfully dispatches the message, the workflow immediately writes back to the Google Sheet row, updating the status to "Sent" and logging the timestamp so subsequent runs skip already-notified clients.',
      },
      {
        challenge: 'Handling rate limits and connection retries when contacting Telegram Bot API.',
        solution:
          'Configured built-in n8n retry-on-failure settings and error output paths to capture transient network blips without crashing the container.',
      },
      {
        challenge: 'Managing secure credentials in a self-hosted Dockerized environment.',
        solution:
          'Created an isolated Docker environment with persistent volume storage for n8n configuration, storing sensitive tokens and API keys securely in n8n encrypted credentials storage.',
      },
    ],
    finalResult: {
      summary:
        'Successfully engineered and tested a production-ready automated payment reminder pipeline using n8n, Google Sheets, and Telegram Bot API. The workflow eliminates manual tracking, guarantees timely client communication, and demonstrates practical API integration and workflow automation capabilities.',
      achievements: [
        '100% automated scheduled payment verification',
        'Zero manual copy-pasting for payment notices',
        'Containerized Docker deployment with persistent state',
        'Idempotent row updates preventing duplicate notifications',
        'Reliable Google Cloud and Telegram Bot API integration',
      ],
    },
  },
  'aurelia-maison-paris-luxury-e-commerce-platform': {
    slug: 'aurelia-maison-paris-luxury-e-commerce-platform',
    shortTitle: 'Aurélia Maison Paris',
    subtitle:
      'Luxury e-commerce storefront and administration application with optional Supabase connectivity and local browser persistence.',
    problemStatement:
      'A premium retail experience needs to make product discovery, shopping actions, customer account workflows, appointments, and store administration feel coherent across a storefront and a separate admin area. The application also needs predictable behavior when a live Supabase connection is not configured.',
    solutionStatement:
      'Built as a React 19 and TypeScript single-page application with Vite, React Router, Tailwind CSS, and a shared ShopContext for customer and store state. Supabase JavaScript services connect directly to PostgreSQL when valid credentials are configured; curated local catalog data and browser storage provide the fallback. The checkout presents payment method selection and order confirmation interfaces, while no external payment processor integration is verified.',
    myRoleDescription:
      'Web Application Developer. The public repository documents a React storefront, customer flows, Supabase data services, PostgreSQL schema, and a dedicated administration interface. The project entry describes the application without attributing unverified team ownership or business outcomes.',
    myContributions: [
      'Implemented a storefront structure for collection browsing, product search, and product quick view.',
      'Coordinated cart, wishlist, order, and appointment state through a shared React context with localStorage persistence.',
      'Connected product, order, account, and appointment services directly to Supabase when credentials are configured.',
      'Maintained local catalog and browser-state fallbacks for offline or unconfigured Supabase use.',
      'Organized customer-facing shopping flows and a standalone admin interface for catalog and order operations.',
    ],
    techStackGrouped: {
      backend: ['Supabase JavaScript Client (direct data access)', 'No separate REST server'],
      frontend: [
        'React 19',
        'TypeScript',
        'Vite',
        'Tailwind CSS 4',
        'React Router',
        'React Context',
      ],
      database: ['Supabase', 'PostgreSQL', 'Row Level Security policies'],
      integrations: ['Supabase Auth (when configured)', 'Netlify hosting'],
    },
    screenshots: {
      platformShowcase: {
        id: 'aurelia-collection-showcase',
        title: 'Collection Discovery',
        subtitle: 'Storefront collection presentation',
        description:
          'The collection page presents the store’s featured categories and product discovery experience in the deployed storefront.',
        src: '/projects/aurelia-maison-paris/product-collections.png',
        alt: 'Aurelia Maison Paris storefront collection showcase with featured bags, fragrance, and fashion imagery',
        badge: 'Storefront',
        route: 'https://luxuryshopbd.netlify.app/#shop',
      },
      dashboards: [
        {
          id: 'aurelia-admin-dashboard',
          title: 'Administration Dashboard',
          subtitle: 'Catalog, orders, and inventory overview',
          description:
            'The administration view brings catalog navigation, order status summaries, inventory alerts, and dashboard analytics into one workspace. The displayed order data is part of the supplied demo capture.',
          src: '/projects/aurelia-maison-paris/admin-dashboard.png',
          alt: 'Aurelia Maison Paris admin dashboard showing analytics panels, order status summaries, and inventory alerts',
          badge: 'Admin Dashboard',
          route: 'https://luxuryshopbd.netlify.app/atelier-admin',
        },
      ],
    },
    databaseArchitecture: {
      overview:
        'The repository contains a Supabase PostgreSQL schema used through the Supabase JavaScript client. Core tables define the product catalog, customer profiles, orders and order items, and salon appointments. The app checks for configured Supabase credentials and otherwise uses local catalog data and browser storage for supported flows.',
      keyEntities: [
        'categories: Product collection identifiers, labels, and images',
        'products: Catalog details, category references, prices, images, and stock status',
        'profiles: Customer records linked to Supabase Auth users, with customer or admin roles',
        'orders: Customer, shipping, total, status, and payment method/status fields',
        'order_items: Product snapshots and quantities linked to an order',
        'appointments: Salon booking details, preferred visit time, advisor, and status',
        'coupons, product_reviews, inventory_logs, store_settings: Additional admin and store modules',
      ],
      schemaPrinciples: [
        'Foreign keys connect products to categories, order items to orders, and profiles to auth.users.',
        'Row Level Security is enabled for the core catalog, profile, order, order item, and appointment tables.',
        'Catalog reads are public; profile and order reads are scoped to the owning user or an admin by policy.',
        'Order creation policies allow inserts; the schema does not establish that a payment has been processed.',
      ],
    },
    apiArchitecture: {
      overview:
        'The browser application calls Supabase directly through the JavaScript client; there is no separate application REST server in the repository. Shared context coordinates interface state, browser persistence, and optional database service calls.',
      dataFlowSteps: [
        'The storefront initializes product and category state from curated local data.',
        'When valid Supabase URL and anon-key configuration is present, product and category services query PostgreSQL and retain local data as a fallback.',
        'Cart and wishlist interactions update shared ShopContext state and persist to localStorage.',
        'Checkout collects shipping details, presents payment method options, creates an order in local application state, and clears the cart.',
        'When Supabase is configured, the order and line items are submitted to the orders and order_items tables in a background request.',
        'Customer and admin data services query Supabase when configured; local state and sample catalog/order data support fallback mode.',
      ],
      authMethod:
        'Supabase Auth sessions and profile roles when configured; local demo profile behavior is used in fallback mode.',
    },
    challenges: [
      {
        challenge:
          'Keeping cart and wishlist actions consistent across storefront components and route changes.',
        solution:
          'The shared ShopContext exposes product actions and state to the storefront, and persists cart and wishlist values in localStorage for browser-session continuity.',
      },
      {
        challenge:
          'Allowing catalog and shopping interfaces to render when a Supabase project is not configured or reachable.',
        solution:
          'The Supabase client checks for valid URL and anon-key configuration; product and category services fall back to curated local data, while cart, wishlist, orders, and appointments use localStorage-backed state.',
      },
      {
        challenge:
          'Supporting customer shopping interactions alongside a broad administration interface in one client application.',
        solution:
          'The code separates customer components, admin routes and pages, data services, and shared state. Database reads and writes are routed through focused Supabase service modules rather than a separate REST backend.',
      },
      {
        challenge:
          'Representing payment selection without an evidenced external transaction processor.',
        solution:
          'The checkout UI models shipping, payment selection, and confirmation states. The case study describes these as interface workflows and does not claim verified gateway processing or successful real transactions.',
      },
    ],
    finalResult: {
      summary:
        'The public repository and deployed Netlify demo present a luxury storefront and administration application with product discovery, cart and wishlist workflows, checkout interfaces, account and appointment flows, and catalog and order management. Supabase persistence is conditional on configuration, and the repository includes a local fallback path. No business performance figures or processed payment results are claimed.',
      achievements: [
        'Deployed demo and source repository linked for review',
        'React storefront and standalone administration interfaces',
        'Optional Supabase PostgreSQL data services with local fallback behavior',
        'Checkout UI with payment method selection; no gateway transaction verified',
      ],
    },
  },
}

