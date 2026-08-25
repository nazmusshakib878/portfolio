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
}
