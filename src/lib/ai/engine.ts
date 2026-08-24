import {
  getSystemPrompt,
  getProjectCardDataList,
  getResumeCardData,
  getSkillsData,
  getContactDirectData,
} from './knowledge'
import { portfolioData, projectSlug } from '@/data/portfolio'
import type { AiActionCard, ChatResponseBody, AiMode } from '@/types/ai'

interface MessageItem {
  role: 'user' | 'assistant'
  content: string
}

export async function processAiMessage(
  query: string,
  history: MessageItem[] = [],
  mode: AiMode = 'all'
): Promise<ChatResponseBody> {
  const cleanQuery = query.trim()

  // 1. Check for Gemini API Key first
  const geminiKey = process.env.GEMINI_API_KEY
  if (geminiKey) {
    try {
      const response = await callGeminiApi(cleanQuery, history, geminiKey)
      if (response) {
        const enriched = enrichReplyWithCards(cleanQuery, response, mode)
        return {
          reply: response,
          cards: enriched.cards,
          suggestedQueries: enriched.suggestedQueries,
          provider: 'gemini',
        }
      }
    } catch {
      // Fall through to next provider or local engine
    }
  }

  // 2. Check for OpenAI API Key
  const openaiKey = process.env.OPENAI_API_KEY
  if (openaiKey) {
    try {
      const response = await callOpenAiApi(cleanQuery, history, openaiKey)
      if (response) {
        const enriched = enrichReplyWithCards(cleanQuery, response, mode)
        return {
          reply: response,
          cards: enriched.cards,
          suggestedQueries: enriched.suggestedQueries,
          provider: 'openai',
        }
      }
    } catch {
      // Fall through to local engine
    }
  }

  // 3. High-precision Local Knowledge Reasoning Engine
  return generateLocalResponse(cleanQuery, mode)
}

async function callGeminiApi(
  query: string,
  history: MessageItem[],
  apiKey: string
): Promise<string | null> {
  const systemPrompt = getSystemPrompt()
  const contents = [
    {
      role: 'user',
      parts: [{ text: `System Instruction: ${systemPrompt}` }],
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I am Shakib AI, ready to assist.' }],
    },
    ...history.slice(-6).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    {
      role: 'user',
      parts: [{ text: query }],
    },
  ]

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(12000),
  })

  if (!res.ok) return null
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
  return reply || null
}

async function callOpenAiApi(
  query: string,
  history: MessageItem[],
  apiKey: string
): Promise<string | null> {
  const systemPrompt = getSystemPrompt()
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user', content: query },
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.4,
      max_tokens: 800,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(12000),
  })

  if (!res.ok) return null
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  return data.choices?.[0]?.message?.content || null
}

function enrichReplyWithCards(
  query: string,
  _reply: string,
  mode: AiMode
): { cards: AiActionCard[]; suggestedQueries: string[] } {
  const q = query.toLowerCase()
  const cards: AiActionCard[] = []
  let suggested: string[] = []

  const projects = getProjectCardDataList()

  if (q.includes('project') || q.includes('work') || mode === 'projects') {
    const matchedProject = projects.find((p) =>
      q.includes(p.title.toLowerCase()) || q.includes(projectSlug(p.title))
    )
    if (matchedProject) {
      cards.push({ type: 'project-detail', data: matchedProject })
    } else {
      cards.push({ type: 'project-list', data: projects })
    }
    suggested = ['Tell me about Securex', 'Explain AI Smart Campus', 'Why hire him?']
  } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('laravel')) {
    cards.push({ type: 'skills', data: getSkillsData() })
    suggested = ['Show me his best projects', 'Tell me about his experience', 'How to contact him?']
  } else if (q.includes('resume') || q.includes('cv') || q.includes('education') || mode === 'resume') {
    cards.push({ type: 'resume-card', data: getResumeCardData() })
    suggested = ['View his projects', 'What is his experience?', 'How to hire him?']
  } else if (q.includes('hire') || q.includes('service') || q.includes('contact') || q.includes('pricing') || mode === 'hire') {
    cards.push({ type: 'hire-inquiry' })
    cards.push({ type: 'contact-direct', data: getContactDirectData() })
    suggested = ['What services does he offer?', 'Download his resume', 'Show his best projects']
  } else {
    suggested = ['Who is Nazmus?', 'Show me his best projects', 'What technologies does he use?', 'Why should I hire him?']
  }

  return { cards, suggestedQueries: suggested }
}

function generateLocalResponse(query: string, mode: AiMode): ChatResponseBody {
  const q = query.toLowerCase().trim()
  const projects = getProjectCardDataList()
  const skills = getSkillsData()
  const resume = getResumeCardData()
  const contact = getContactDirectData()

  // 1. Specific Project Deep Dives
  if (q.includes('securex') || q.includes('cctv') || q.includes('security service')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('securex'))!
    return {
      reply: `### **Securex — CCTV & Security Service Management Platform**\n\n**Securex** is a full-stack production-grade Laravel MVC application built to streamline security system bookings, administration, automated transactional communications, and invoicing.\n\n**Key Engineering Highlights:**\n- **Role-Based Access Control (RBAC)**: Dual portal for clients and administrators.\n- **Conflict-Aware Booking**: Smart algorithm that detects time-slot overlap, prevents duplicate scheduling, and suggests alternative slots.\n- **Google OAuth 2.0 & Sanctum**: Secure social and credential authentication.\n- **Automated Workflow**: Triggers transactional SMTP emails with dynamic PDF invoices upon confirmation.\n\n*Tech Stack: PHP, Laravel MVC, MySQL, Sanctum, Google OAuth 2.0, PDF Generator.*`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Tell me about AI Smart Campus System', 'Show all projects', 'How to hire Nazmus?'],
      provider: 'local-brain',
    }
  }

  if (q.includes('smart campus') || q.includes('campus') || q.includes('ai smart')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('smart campus'))!
    return {
      reply: `### **AI Smart Campus System**\n\n**AI Smart Campus System** is an academic management and student-success web application led by Md. Nazmus Shakib as **Team Leader & Database Lead**.\n\n**Architecture & Features:**\n- **Frontend**: Modern, responsive React + Vite single-page application.\n- **Backend**: Robust Laravel 12 RESTful API with token authentication via Laravel Sanctum.\n- **Database Architecture**: Normalized MySQL schema optimized for student records, enrollment, and grade tracking.\n- **AI Workflows**: Integrated OpenAI and Google Gemini APIs to assist students with course queries and smart academic assistance.\n- **Live Demo**: Deployed and fully accessible online!`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Open Live Demo', 'Tell me about Securex', 'What is his tech stack?'],
      provider: 'local-brain',
    }
  }

  if (q.includes('library') || q.includes('library management')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('library'))!
    return {
      reply: `### **Library Management Project**\n\nDesigned around database integrity and Laravel MVC principles, this application manages multi-entity book checkouts, member catalogs, and inventory.\n\n**Technical Highlights:**\n- Strictly designed to Third Normal Form (**3NF**) in MySQL for zero data redundancy.\n- Eloquent ORM relationships (\`hasManyThrough\`, polymorphic indexing).\n- Role-based permissions for librarians and registered student patrons.\n- Full CRUD operations with server-side validation.`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Show all projects', 'What backend skills does he have?', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  if (q.includes('logistica') || q.includes('appstick') || q.includes('courier') || q.includes('transport')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('logistica'))!
    return {
      reply: `### **Logistica (Internship Project at Appstick Tech Firm)**\n\nAn enterprise transport, courier, and supply-shipment management system developed collaboratively during Nazmus's internship at **Appstick Tech Firm** (Feb 2026 – Mar 2026).\n\n**Nazmus's Contributions:**\n- Implemented reusable PHP & Laravel backend business logic.\n- Conducted relational schema and database integrity checks in MySQL.\n- Built server-side consignment tracking workflows.\n- Utilized Git & GitHub collaborative branching and code review workflows in an Agile team setting.`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Tell me about his work experience', 'Show his best projects', 'Contact Nazmus'],
      provider: 'local-brain',
    }
  }

  // 2. All Projects List
  if (
    q.includes('best project') ||
    q.includes('show me projects') ||
    q.includes('show projects') ||
    q.includes('portfolio projects') ||
    q.includes('all projects') ||
    (q.includes('project') && !q.includes('lead')) ||
    mode === 'projects'
  ) {
    return {
      reply: `Here are **${portfolioData.name}'s** key featured and academic projects. Each project demonstrates practical engineering rigor across Laravel, MySQL database design, modern Next.js/React frontends, and AI API integrations:`,
      cards: [{ type: 'project-list', data: projects }],
      suggestedQueries: [
        'Tell me about Securex',
        'Tell me about AI Smart Campus System',
        'What technologies does he use?',
        'Why should I hire him?',
      ],
      provider: 'local-brain',
    }
  }

  // 3. Personal Intro / Who is Shakib / Nazmus
  if (
    q.includes('who is shakib') ||
    q.includes('who is nazmus') ||
    q.includes('who are you') ||
    q.includes('introduce') ||
    q.includes('about shakib') ||
    q.includes('about nazmus') ||
    q.includes('about') ||
    q.includes('developer journey') ||
    q.includes('background')
  ) {
    return {
      reply: `### **Hello! I am Shakib AI, representing ${portfolioData.name}.**\n\n**${portfolioData.name}** is a **Full Stack Developer** based in ${portfolioData.location}, specializing in:\n- **Backend Systems**: Robust Laravel 12, PHP, MVC architectures, and secure RESTful APIs.\n- **Database Engineering**: Normalized relational schemas (1NF–3NF), query indexing, and data integrity in MySQL.\n- **Frontend Development**: Modern Next.js 16, React 19, and Tailwind CSS applications.\n- **AI API Integrations**: Google Gemini and OpenAI APIs in production-ready web workflows.\n\nHe is currently a **final-semester BSc student in Computer Science and Engineering** with an outstanding academic record (**CGPA: 3.60 / 4.00**) and practical industry internship experience at **Appstick Tech Firm**.\n\nHow can I help you explore his portfolio today?`,
      cards: [
        { type: 'skills', data: skills },
        { type: 'resume-card', data: resume },
      ],
      suggestedQueries: [
        'Show me his best projects',
        'What technologies does he use?',
        'Tell me about his experience',
        'Why should I hire him?',
      ],
      provider: 'local-brain',
    }
  }

  // 4. Skills & Technologies
  if (
    q.includes('technolog') ||
    q.includes('tech stack') ||
    q.includes('skills') ||
    q.includes('tools') ||
    q.includes('framework') ||
    q.includes('laravel') ||
    q.includes('next.js') ||
    q.includes('react') ||
    q.includes('mysql') ||
    q.includes('ai integration')
  ) {
    return {
      reply: `### **Technical Expertise & Engineering Stack**\n\n${portfolioData.name}'s toolkit spans full-stack engineering with deep backend and database foundations:\n\n- **Backend & APIs**: Laravel 12, PHP, Laravel Sanctum, Google OAuth 2.0, RESTful APIs, MVC, RBAC, Middleware.\n- **Frontend & Modern Web**: Next.js 16, React 19, TypeScript, JavaScript, Tailwind CSS, Vite.\n- **Database Architecture**: MySQL, Relational Schema Design (1NF–3NF), Eloquent ORM, Indexing & Query Integrity.\n- **AI Integrations**: OpenAI API, Google Gemini API, Prompt Engineering workflows.\n- **Engineering Tools**: Git, GitHub, Postman, Oxlint, PHPUnit/Pest, Agile/SDLC.`,
      cards: [{ type: 'skills', data: skills }],
      suggestedQueries: [
        'Show projects using Laravel',
        'Tell me about AI Smart Campus System',
        'Why should I hire him?',
      ],
      provider: 'local-brain',
    }
  }

  // 5. Experience & Internship
  if (
    q.includes('experience') ||
    q.includes('work history') ||
    q.includes('internship') ||
    q.includes('appstick') ||
    q.includes('job')
  ) {
    const exp = portfolioData.experience[0]
    return {
      reply: `### **Professional Experience**\n\n**${exp.role}** at **${exp.company}**\n*Period: ${exp.period} | Location: ${exp.location}*\n\n**Summary:**\n${exp.summary}\n\n**Key Responsibilities:**\n${exp.responsibilities.map((r) => `- ${r}`).join('\n')}\n\n**Technologies Used:**\n${exp.technologies.join(', ')}\n\nRepository: [GitHub Logistica](${exp.repositoryUrl})`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: [
        'Show his best projects',
        'Explain his education & CGPA',
        'Why should I hire him?',
      ],
      provider: 'local-brain',
    }
  }

  // 6. Why Hire Him
  if (
    q.includes('why hire') ||
    q.includes('why should i hire') ||
    q.includes('hire him') ||
    q.includes('strengths') ||
    q.includes('stand out') ||
    q.includes('value')
  ) {
    return {
      reply: `### **Why Hire ${portfolioData.name}?**\n\n1. **Deep Backend & Database Engineering Foundation**: Unlike developers with surface-level knowledge, Nazmus designs normalized relational schemas (1NF–3NF), bulletproof validation, and secure Laravel architectures that scale reliably.\n2. **Modern Full-Stack Fluency**: He bridges backend stability with fast, accessible Next.js & React interfaces.\n3. **Practical AI Capability**: Experienced in embedding OpenAI and Gemini APIs for real-world user value (e.g. AI Smart Campus).\n4. **Proven Academic & Industry Discipline**: CGPA 3.60/4.00, 80 hours of formal EDGE Laravel training, published technical reports on Zenodo, and team leadership experience.\n5. **Transparent & Direct Communication**: Dependable work ethic, clear documentation, and clean Git workflows.`,
      cards: [
        { type: 'hire-inquiry' },
        { type: 'contact-direct', data: contact },
      ],
      suggestedQueries: [
        'How can we work together?',
        'Show me his best projects',
        'Download his resume',
      ],
      provider: 'local-brain',
    }
  }

  // 7. Education, CGPA & Certifications
  if (
    q.includes('education') ||
    q.includes('cgpa') ||
    q.includes('university') ||
    q.includes('degree') ||
    q.includes('certification') ||
    q.includes('edge') ||
    q.includes('academic') ||
    mode === 'resume'
  ) {
    const cert = portfolioData.certifications[0]
    return {
      reply: `### **Academic Background & Certifications**\n\n🎓 **${portfolioData.academicStatus}**\n- **Institution**: Northern University of Business and Technology Khulna (NUBTK)\n- **Current CGPA**: **${portfolioData.currentCgpa}** (Expected Graduation: ${portfolioData.expectedGraduation})\n- **Coursework**: Distributed Databases, Software Architecture and Design, Advanced Data Structures, Network Routing Protocols.\n- **Secondary Education**: GPA 5.00/5.00 in both HSC (Satkhira Govt College) and SSC (Alipur Union Secondary School).\n\n📜 **Professional Certifications:**\n- **${cert.title}** (${cert.provider})\n- Program: ${cert.program}\n- Certificate ID: \`${cert.certificateId}\`\n- Topics: ${cert.topics.join(', ')}`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: [
        'View his published research',
        'Show me his best projects',
        'Tell me about his experience',
      ],
      provider: 'local-brain',
    }
  }

  // 8. Publications & Research
  if (
    q.includes('publication') ||
    q.includes('research') ||
    q.includes('paper') ||
    q.includes('zenodo') ||
    q.includes('doi')
  ) {
    const pubs = portfolioData.publications.map((p) => ({
      title: p.title,
      publisher: p.publisher,
      doi: p.doi,
      url: p.url,
    }))
    return {
      reply: `### **Technical Publications & Reports**\n\n${portfolioData.name} preserves documented software engineering and research findings on Zenodo:\n\n1. **SecureX: A CCTV & Security Service Booking and Management System**\n   - Publisher: Zenodo | DOI: \`${portfolioData.publications[0].doi}\`\n2. **Explainable and Bias-Aware Machine Learning for Liver Disease Severity Prediction Using Clinical Data**\n   - Publisher: Zenodo | DOI: \`${portfolioData.publications[1].doi}\``,
      cards: [{ type: 'publications', data: pubs }],
      suggestedQueries: ['Tell me about Securex', 'What is his tech stack?', 'How to contact him?'],
      provider: 'local-brain',
    }
  }

  // 9. Hiring & Services / Contact
  if (
    q.includes('service') ||
    q.includes('hire') ||
    q.includes('work together') ||
    q.includes('freelance') ||
    q.includes('contract') ||
    q.includes('collaborat') ||
    q.includes('cost') ||
    q.includes('quote') ||
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach out') ||
    mode === 'hire'
  ) {
    return {
      reply: `### **Let's Build Something Reliable Together!**\n\n${portfolioData.name} is **${portfolioData.availability}** for full-time roles, contracts, and software engineering projects.\n\n**Services Available:**\n1. **Full-Stack Web Development** (Laravel + Next.js / React)\n2. **Custom RESTful APIs & Microservices** (Sanctum auth, OAuth 2.0, RBAC)\n3. **Relational Database Design & 3NF Optimization** (MySQL)\n4. **Practical AI Integrations** (OpenAI & Gemini APIs)\n5. **Legacy Backend Refactoring & Optimization**\n\nYou can fill in your project details below or contact him directly:`,
      cards: [
        { type: 'hire-inquiry' },
        { type: 'contact-direct', data: contact },
      ],
      suggestedQueries: [
        'Send a direct message',
        'Show me his best projects',
        'Download his resume',
      ],
      provider: 'local-brain',
    }
  }

  // 10. Greetings & Default Catch-All
  return {
    reply: `Hello! I am **Shakib AI**, your personal guide to **${portfolioData.name}'s** developer portfolio.\n\nI can answer questions about:\n- 🚀 **Projects**: Securex, AI Smart Campus System, Library Management, Logistica\n- 💻 **Tech Stack**: Laravel 12, MySQL, Next.js 16, React 19, REST APIs, AI APIs\n- 🎓 **Education & Background**: BSc in CSE (CGPA 3.60), EDGE 80h Laravel Certificate\n- 💼 **Experience**: Backend Developer Intern at Appstick Tech Firm\n- 🤝 **Hiring & Services**: Full-stack web applications, database architecture, API engineering\n\nWhat would you like to explore?`,
    cards: [
      { type: 'project-list', data: projects.slice(0, 2) },
      { type: 'skills', data: skills.slice(0, 2) },
    ],
    suggestedQueries: [
      'Who is Shakib?',
      'Show me his best projects',
      'What technologies does he use?',
      'Why should I hire him?',
    ],
    provider: 'local-brain',
  }
}
