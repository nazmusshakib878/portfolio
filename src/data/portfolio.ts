import type { PortfolioData } from '@/types/portfolio'

export const portfolioData: PortfolioData = {
  name: 'Md. Nazmus Shakib',

  primaryRole: 'Backend Developer',

  supportingRoles: [
    'Full Stack Development',
    'Laravel Applications',
    'Database Systems',
  ],

  location: 'Khulna, Bangladesh',

  phone: '+8801716333670',

  availability: 'Open to new opportunities',

  email: 'nazmusshakib335@gmail.com',

  bio: 'I am a final-semester Computer Science and Engineering student focused on backend development, database systems, and data-driven web applications. I have practical experience building Laravel applications, designing relational databases, implementing authentication and RESTful APIs, and integrating backend services with modern frontend interfaces.',

  heroDescription:
    'I build secure, database-driven web applications using Laravel, PHP, MySQL, RESTful APIs, and modern frontend technologies. My work focuses on clean architecture, reliable application workflows, and practical user experiences.',

  academicStatus:
    'Final-semester BSc student in Computer Science and Engineering',

  currentCgpa: '3.60 / 4.00',

  featuredProjectsCount: '4',

  laravelTrainingHours: '80 Hours',

  expectedGraduation: 'November 2026',

  initials: 'MS',

  resumeHref: '/resume.pdf',

  githubUrl: 'https://github.com/nazmusshakib878',

  linkedinUrl: '',

  githubUsername: 'nazmusshakib878',

  navLinks: [
    {
      label: 'About',
      href: '#about',
    },
    {
      label: 'Skills',
      href: '#skills',
    },
    {
      label: 'Experience',
      href: '#experience',
    },
    {
      label: 'Projects',
      href: '#projects',
    },
    {
      label: 'Education',
      href: '#education',
    },
    {
      label: 'Contact',
      href: '#contact',
    },
  ],

  socialLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/nazmusshakib878',
      icon: 'github',
    },
  ],

  heroStats: [
    {
      label: 'Current CGPA',
      value: '3.60 / 4.00',
    },
    {
      label: 'Selected Projects',
      value: '4',
    },
    {
      label: 'Laravel Training',
      value: '80 Hours',
    },
    {
      label: 'Graduation',
      value: 'Nov 2026',
    },
  ],

  heroBadges: [
    {
      label: 'Laravel',
    },
    {
      label: 'PHP',
    },
    {
      label: 'MySQL',
    },
    {
      label: 'REST APIs',
    },
    {
      label: 'React',
    },
  ],

  aboutCards: [
    {
      title: 'Location',
      description: 'Khulna, Bangladesh',
    },
    {
      title: 'Current Study',
      description: 'Final-semester BSc CSE student',
    },
    {
      title: 'Technical Focus',
      description: 'Backend systems and relational databases',
    },
    {
      title: 'Career Interest',
      description: 'Web applications and software engineering',
    },
  ],

  skills: [
    {
      name: 'Programming',
      items: ['PHP', 'JavaScript', 'C++', 'C'],
    },
    {
      name: 'Backend and APIs',
      items: [
        'Laravel',
        'Laravel 12',
        'Laravel Sanctum',
        'RESTful APIs',
        'MVC Architecture',
        'Authentication',
        'Middleware',
        'Google OAuth 2.0',
        'Blade',
        'CRUD Development',
        'Role-Based Access Control',
      ],
    },
    {
      name: 'Databases',
      items: [
        'MySQL',
        'Eloquent ORM',
        'Relational Schema Design',
        'Database Normalization',
        '1NF',
        '2NF',
        '3NF',
        'SQL Queries',
        'Indexing Fundamentals',
        'Database Integrity',
        'Conflict Detection Workflows',
      ],
    },
    {
      name: 'Frontend',
      items: [
        'React',
        'Vite',
        'Tailwind CSS',
        'Bootstrap',
        'Material UI',
        'HTML5',
        'CSS3',
      ],
    },
    {
      name: 'AI Integration',
      items: [
        'Gemini API',
        'OpenAI API',
        'Hugging Face API Integration',
      ],
    },
    {
      name: 'Tools',
      items: [
        'Git',
        'GitHub',
        'Postman',
        'SMTP and Email Workflows',
        'PDF Invoice Generation',
        'VS Code',
      ],
    },
    {
      name: 'Engineering Practices',
      items: [
        'SDLC',
        'Agile',
        'Scrum',
        'Debugging',
        'Testing',
        'Technical Documentation',
        'Collaborative Development',
      ],
    },
  ],

  experience: [
    {
      company: 'Appstick Tech Firm',

      role: 'Backend Developer Intern',

      period: '01 February 2026 - 04 March 2026',

      location: 'Khulna, Bangladesh',

      summary:
        'Contributed to the Logistica project in a collaborative development environment, supporting Laravel and PHP implementation and database-related tasks.',

      responsibilities: [
        'Supported Laravel and PHP application implementation.',
        'Worked with reusable application logic.',
        'Assisted with debugging and troubleshooting.',
        'Performed database integrity checks.',
        'Used Git and GitHub in a collaborative workflow.',
      ],

      technologies: [
        'PHP',
        'Laravel',
        'MySQL',
        'Git',
        'GitHub',
      ],

      repositoryUrl:
        'https://github.com/nazmusshakib878/Logistica',
    },
  ],

  projects: [
    {
      title:
        'Securex - CCTV & Security Service Management System',

      category: 'Field Work / Industrial Training Project',

      date: 'June 2026',

      supervisor: 'Zahid Hasan Rabbi, Lecturer',

      summary:
        'An end-to-end Laravel MVC platform for CCTV and security service discovery, client bookings, administrative review, status management, automated email notifications, and invoice delivery.',

      description:
        'A complete security service management platform designed to simplify service discovery, booking, administrative review, communication, scheduling, and invoice workflows.',

      keyFeatures: [
        'Email and password authentication',
        'Google OAuth 2.0 authentication',
        'Role-based administration',
        'Dynamic service CRUD operations',
        'Client service booking',
        'Administrative booking review',
        'Booking status updates',
        'Automated email notifications',
        'PDF invoice generation and delivery',
        'Time-slot conflict detection',
        'Alternative available-slot recommendations',
        'Duplicate-booking prevention',
      ],

      technologies: [
        'PHP',
        'Laravel',
        'MySQL',
        'Laravel MVC',
        'Google OAuth 2.0',
        'Authentication',
        'SMTP',
        'PDF Generation',
      ],

      githubUrl:
        'https://github.com/nazmusshakib878/Securex',

      liveUrl: '',

      featured: true,

      accent:
        'from-sky-500/35 via-cyan-500/20 to-blue-500/25',
    },

    {
      title: 'AI Smart Campus System',

      category: 'Academic Team Project',

      date: '2026',

      role: 'Team Leader and Database Lead',

      summary:
        'An AI-powered academic management and student-success platform developed for Northern University of Business and Technology Khulna.',

      description:
        'A modern campus platform that combines academic management, student services, secure API communication, database-driven workflows, and AI-assisted features.',

      keyFeatures: [
        'Led the academic project team.',
        'Designed and coordinated the MySQL-backed data layer.',
        'Integrated a React and Vite frontend with a Laravel 12 REST API.',
        'Used Laravel Sanctum for secure API authentication.',
        'Implemented academic and student-management workflows.',
        'Supported AI-assisted campus features.',
      ],

      technologies: [
        'React',
        'Vite',
        'Laravel 12',
        'Laravel Sanctum',
        'MySQL',
        'RESTful API',
        'AI API Integration',
      ],

      githubUrl:
        'https://github.com/nazmusshakib878/CSE4204-8A-T07-ai-smart-campus-system',

      liveUrl:
        'https://ai-smart-campus-system-ce9i.onrender.com/',

      featured: false,

      accent:
        'from-violet-500/35 via-fuchsia-500/20 to-indigo-500/25',
    },

    {
      title: 'Library Management Project',

      category: 'Laravel Academic Project',

      date: 'Academic Project',

      summary:
        'A Laravel-based library management application using MVC organization and database-backed record-management workflows.',

      description:
        'A structured web application designed to manage library records and demonstrate Laravel MVC architecture, CRUD operations, and MySQL integration.',

      keyFeatures: [
        'Developed structured Laravel application logic.',
        'Used MVC architecture.',
        'Built database-backed record-management workflows.',
        'Organized core library operations.',
        'Implemented CRUD functionality.',
        'Published and maintained the source code on GitHub.',
      ],

      technologies: [
        'PHP',
        'Laravel',
        'MySQL',
        'MVC',
        'CRUD',
      ],

      githubUrl:
        'https://github.com/nazmusshakib878/Library-management-project',

      liveUrl: '',

      featured: false,

      accent:
        'from-amber-500/35 via-orange-500/20 to-rose-500/20',
    },

    {
      title: 'Logistica',

      category: 'Internship Project',

      date: 'Internship Project',

      summary:
        'A collaborative internship project where I supported Laravel and PHP implementation, reusable application logic, debugging, and database integrity workflows.',

      description:
        'A practical team project completed during my internship at Appstick Tech Firm using Laravel, PHP, MySQL, Git, and GitHub.',

      keyFeatures: [
        'Supported Laravel and PHP implementation.',
        'Worked with reusable application logic.',
        'Assisted with debugging and troubleshooting.',
        'Performed database integrity checks.',
        'Used Git and GitHub in a collaborative workflow.',
      ],

      technologies: [
        'PHP',
        'Laravel',
        'MySQL',
        'Git',
        'GitHub',
      ],

      githubUrl:
        'https://github.com/nazmusshakib878/Logistica',

      liveUrl: '',

      featured: false,

      accent:
        'from-emerald-500/35 via-teal-500/20 to-cyan-500/20',
    },
  ],

  education: [
    {
      type: 'degree',

      title:
        'Bachelor of Science in Computer Science and Engineering (BSc CSE)',

      institution:
        'Northern University of Business and Technology Khulna (NUBTK)',

      location: 'Khulna, Bangladesh',

      status: 'Final year, final semester',

      cgpa: '3.60 / 4.00',

      graduation: 'November 2026',

      coursework: [
        'Distributed Databases',
        'Software Architecture and Design',
        'Advanced Data Structures',
        'Network Routing Protocols',
      ],
    },

    {
      type: 'certificate',

      title: 'Higher Secondary Certificate (Science)',

      institution: 'Satkhira Government College',

      location: 'Satkhira, Bangladesh',

      year: '2020',

      cgpa: '5.00 / 5.00',
    },

    {
      type: 'school',

      title: 'Secondary School Certificate (Science)',

      institution: 'Alipur Union Secondary School',

      location: 'Satkhira, Bangladesh',

      year: '2018',

      cgpa: '5.00 / 5.00',
    },
  ],

  achievements: [
    {
      title: 'Current CGPA 3.60 / 4.00',

      description:
        'Maintaining a strong academic record in the final semester of the BSc in Computer Science and Engineering program.',
    },

    {
      title: 'Team Leader and Database Lead',

      description:
        'Led the AI Smart Campus System academic project and coordinated its MySQL-backed data layer.',
    },

    {
      title: 'GPA 5.00 in HSC and SSC',

      description:
        'Achieved GPA 5.00 out of 5.00 in both Higher Secondary and Secondary School Certificate examinations.',
    },

    {
      title: '80 Hours of Formal Laravel Training',

      description:
        'Completed structured Laravel training under the EDGE Project of the Bangladesh Computer Council and ICT Division.',
    },
  ],

  certifications: [
    {
      title: 'PHP (Laravel) Training - 80 Hours',

      provider:
        'Department of Computer Science and Engineering, Khulna University',

      program:
        'EDGE Project, Bangladesh Computer Council, ICT Division',

      duration: 'November 2024 - May 2025',

      issued: '29 May 2025',

      certificateId: 'EDGE-DSTS-103-9880-00009',

      verifyUrl:
        'https://training.edge.gov.bd/storage/certificate/student-training/certificate_683812fc857433.88555020.pdf',

      topics: [
        'Laravel MVC architecture',
        'Authentication',
        'Middleware',
        'CRUD development',
        'Relational schema design',
        'MySQL',
        'SQL',
        'Backend application development',
      ],
    },
  ],

  githubProfile: [
    {
      label: 'Username',
      value: 'nazmusshakib878',
    },
    {
      label: 'Profile',
      value: 'github.com/nazmusshakib878',
    },
    {
      label: 'Primary focus',
      value: 'Laravel, PHP, databases, and API-driven applications',
    },
  ],

  githubHighlights: [
    {
      title: 'Real Project Repositories',

      description:
        'Securex, AI Smart Campus System, Library Management Project, and Logistica are available with direct GitHub repository access.',
    },

    {
      title: 'Live Project Available',

      description:
        'The AI Smart Campus System includes a working live demonstration hosted online.',
    },
  ],

  githubRepos: [
    {
      title: 'Securex',

      description:
        'CCTV and security service management system with authentication, bookings, invoice workflows, and conflict detection.',

      href: 'https://github.com/nazmusshakib878/Securex',

      technologies: [
        'Laravel',
        'MySQL',
        'Google OAuth 2.0',
      ],
    },

    {
      title: 'AI Smart Campus System',

      description:
        'Academic management and student-success platform with a Laravel 12 API and React/Vite frontend.',

      href:
        'https://github.com/nazmusshakib878/CSE4204-8A-T07-ai-smart-campus-system',

      technologies: [
        'React',
        'Vite',
        'Laravel 12',
      ],
    },

    {
      title: 'Library Management Project',

      description:
        'Laravel academic project for database-backed library workflows and structured MVC organization.',

      href:
        'https://github.com/nazmusshakib878/Library-management-project',

      technologies: [
        'PHP',
        'Laravel',
        'MVC',
      ],
    },

    {
      title: 'Logistica',

      description:
        'Internship project where I supported Laravel and PHP implementation and database integrity workflows.',

      href:
        'https://github.com/nazmusshakib878/Logistica',

      technologies: [
        'PHP',
        'Laravel',
        'MySQL',
      ],
    },
  ],

  technologies: [
    'Laravel',
    'PHP',
    'MySQL',
    'React',
    'Vite',
    'REST APIs',
    'Git',
    'GitHub',
    'Postman',
  ],
}