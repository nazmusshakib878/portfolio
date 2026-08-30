import {
  getSystemPrompt,
  getProjectCardDataList,
  getResumeCardData,
  getSkillsData,
  getContactDirectData,
} from './knowledge'
import { portfolioData } from '@/data/portfolio'
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
  if (!cleanQuery) {
    return generateLocalResponse('', mode)
  }

  // 1. Check for Gemini API Key first
  const geminiKey = process.env.GEMINI_API_KEY?.trim()
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
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
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

function formatGeminiContents(
  history: MessageItem[],
  query: string
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []
  let lastRole: 'user' | 'model' | null = null

  const relevantHistory = history.slice(-6)

  for (const m of relevantHistory) {
    const text = m.content?.trim()
    if (!text) continue
    const role: 'user' | 'model' = m.role === 'assistant' ? 'model' : 'user'

    // Gemini requires the first message in contents to be 'user'
    if (contents.length === 0 && role !== 'user') {
      continue
    }

    if (role !== lastRole) {
      contents.push({ role, parts: [{ text }] })
      lastRole = role
    } else {
      contents[contents.length - 1].parts[0].text += `\n\n${text}`
    }
  }

  if (contents.length === 0 || contents[contents.length - 1].role === 'model') {
    contents.push({ role: 'user', parts: [{ text: query }] })
  } else if (contents[contents.length - 1].role === 'user') {
    if (!contents[contents.length - 1].parts[0].text.includes(query)) {
      contents[contents.length - 1].parts[0].text += `\n\n${query}`
    }
  }

  return contents
}

async function callGeminiApi(
  query: string,
  history: MessageItem[],
  apiKey: string
): Promise<string | null> {
  const systemPrompt = getSystemPrompt()
  const contents = formatGeminiContents(history, query)

  const payload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1000,
    },
  }

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash']

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: AbortSignal.timeout(12000),
      })

      if (res.ok) {
        const data = (await res.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
        }
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (text) return text
      }
    } catch {
      continue
    }
  }

  return null
}

async function callOpenAiApi(
  query: string,
  history: MessageItem[],
  apiKey: string
): Promise<string | null> {
  const systemPrompt = getSystemPrompt()
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ]

  const relevantHistory = history.slice(-6)
  for (const m of relevantHistory) {
    if (m.content?.trim()) {
      messages.push({ role: m.role, content: m.content.trim() })
    }
  }

  if (
    messages.length === 1 ||
    messages[messages.length - 1].role !== 'user' ||
    messages[messages.length - 1].content !== query
  ) {
    messages.push({ role: 'user', content: query })
  }

  try {
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
        max_tokens: 1000,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    })

    if (res.ok) {
      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>
      }
      return data.choices?.[0]?.message?.content?.trim() || null
    }
  } catch {
    // Return null to fall back
  }

  return null
}

function enrichReplyWithCards(
  query: string,
  reply: string,
  mode: AiMode
): { cards: AiActionCard[]; suggestedQueries: string[] } {
  const q = query.toLowerCase()
  const r = reply.toLowerCase()
  const cards: AiActionCard[] = []
  let suggested: string[] = []

  const projects = getProjectCardDataList()

  if (q.includes('resumate') || q.includes('resume builder') || q.includes('cv builder') || q.includes('ai cv') || r.includes('resumate')) {
    const resumate = projects.find((p) => p.title.toLowerCase().includes('resumate'))
    if (resumate) cards.push({ type: 'project-detail', data: resumate })
    suggested = ['Tell me about Resumate AI', 'Show all projects', 'How to hire Nazmus?']
  } else if (q.includes('securex') || r.includes('securex')) {
    const securex = projects.find((p) => p.title.toLowerCase().includes('securex'))
    if (securex) cards.push({ type: 'project-detail', data: securex })
    suggested = ['Tell me about AI Smart Campus System', 'What backend skills does he have?', 'How to hire him?']
  } else if (q.includes('smart campus') || q.includes('campus') || r.includes('smart campus')) {
    const campus = projects.find((p) => p.title.toLowerCase().includes('smart campus'))
    if (campus) cards.push({ type: 'project-detail', data: campus })
    suggested = ['Tell me about Securex', 'Show all projects', 'What is his tech stack?']
  } else if (q.includes('library') || r.includes('library management')) {
    const library = projects.find((p) => p.title.toLowerCase().includes('library'))
    if (library) cards.push({ type: 'project-detail', data: library })
    suggested = ['Show all projects', 'What database experience does he have?', 'Why should I hire him?']
  } else if (q.includes('logistica') || q.includes('appstick') || r.includes('logistica')) {
    const logistica = projects.find((p) => p.title.toLowerCase().includes('logistica'))
    if (logistica) cards.push({ type: 'project-detail', data: logistica })
    suggested = ['Tell me about his work experience', 'Show his best projects', 'Contact Nazmus']
  } else if (q.includes('project') || q.includes('work') || mode === 'projects') {
    cards.push({ type: 'project-list', data: projects })
    suggested = ['Tell me about Securex', 'Explain AI Smart Campus System', 'Why hire him?']
  } else if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('laravel') ||
    q.includes('next') ||
    q.includes('react') ||
    q.includes('mysql') ||
    q.includes('database') ||
    q.includes('api')
  ) {
    cards.push({ type: 'skills', data: getSkillsData() })
    suggested = ['Show me his best projects', 'Tell me about his experience', 'How to contact him?']
  } else if (
    q.includes('education') ||
    q.includes('cgpa') ||
    q.includes('university') ||
    q.includes('certificate') ||
    q.includes('edge') ||
    q.includes('resume') ||
    q.includes('cv') ||
    mode === 'resume'
  ) {
    cards.push({ type: 'resume-card', data: getResumeCardData() })
    suggested = ['View his projects', 'What is his experience?', 'How to hire him?']
  } else if (q.includes('publication') || q.includes('research') || q.includes('zenodo') || q.includes('doi')) {
    const pubs = portfolioData.publications.map((p) => ({
      title: p.title,
      publisher: p.publisher,
      doi: p.doi,
      url: p.url,
    }))
    cards.push({ type: 'publications', data: pubs })
    suggested = ['Tell me about Securex', 'What is his tech stack?', 'How to contact him?']
  } else if (
    q.includes('hire') ||
    q.includes('service') ||
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('pricing') ||
    mode === 'hire'
  ) {
    cards.push({ type: 'hire-inquiry' })
    cards.push({ type: 'contact-direct', data: getContactDirectData() })
    suggested = ['What services does he offer?', 'Download his resume', 'Show his best projects']
  } else {
    suggested = [
      'Who is Shakib?',
      'Show me his best projects',
      'What technologies does he use?',
      'Why should I hire him?',
    ]
  }

  return { cards, suggestedQueries: suggested }
}

export function generateLocalResponse(query: string, mode: AiMode = 'all'): ChatResponseBody {
  const q = query.toLowerCase().trim()
  const projects = getProjectCardDataList()
  const skills = getSkillsData()
  const resume = getResumeCardData()
  const contact = getContactDirectData()

  // 1. Specific Project Deep Dives
  if (q.includes('resumate') || q.includes('resume builder') || q.includes('cv builder') || q.includes('ai cv')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('resumate'))!
    return {
      reply: `### **Resumate AI — Conversational Resume Platform & ATS Optimizer**\n\n**Resumate AI** is a full-stack AI SaaS platform built with **Next.js 16**, **Google Gemini AI**, **Supabase PostgreSQL**, and **Playwright** that transforms natural-language conversations and existing CV documents into recruiter-ready resumes.\n\n**Key Engineering Highlights:**\n- **Trilingual AI Dialogue**: Multi-turn conversational editing in Bengali, Banglish, and English with live diff previews.\n- **Multimodal Document Parsing**: Ingests PDF, DOCX, TXT, and scanned image resumes via Gemini Multimodal Vision.\n- **8 Regional CV Formats**: Tailored templates for Bangladesh, Global ATS, International, Germany (Lebenslauf), Nordic, Australia/NZ, Europass, and MNCs.\n- **Containerized Playwright PDF**: Server-side zero-margin A4 PDF rendering via headless Chromium on Render.\n- **Security & Data Layer**: Supabase PostgreSQL with Row Level Security (RLS), HMAC-signed guest sessions, and verified payment authorization.\n\n*Live Demo: [ai-cv-builder-sli4.onrender.com](https://ai-cv-builder-sli4.onrender.com)*\n*GitHub: [github.com/nazmusshakib878/ai-cv-builder](https://github.com/nazmusshakib878/ai-cv-builder)*`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Tell me about Securex', 'Show all projects', 'How to hire Nazmus?'],
      provider: 'local-brain',
    }
  }

  if (q.includes('securex') || q.includes('cctv') || q.includes('security service')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('securex'))!
    return {
      reply: `### **Securex — CCTV & Security Service Management Platform**\n\n**Securex** is a full-stack production-grade Laravel MVC application built to streamline security system bookings, administration, automated transactional communications, and invoicing.\n\n**Key Engineering Highlights:**\n- **Role-Based Access Control (RBAC)**: Dual portal for clients and administrators.\n- **Conflict-Aware Booking**: Smart algorithm that detects time-slot overlap, prevents duplicate scheduling, and suggests alternative slots.\n- **Google OAuth 2.0 & Sanctum**: Secure social and credential authentication.\n- **Automated Workflow**: Triggers transactional SMTP emails with dynamic PDF invoices upon confirmation.\n\n*Tech Stack: PHP, Laravel MVC, MySQL, Sanctum, Google OAuth 2.0, PDF Generator.*`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Tell me about AI Smart Campus System', 'Show all projects', 'How to hire Nazmus?'],
      provider: 'local-brain',
    }
  }

  if (
    q.includes('smart campus') ||
    q.includes('campus system') ||
    (q.includes('campus') && !q.includes('education') && !q.includes('university')) ||
    q.includes('ai smart')
  ) {
    const project = projects.find((p) => p.title.toLowerCase().includes('smart campus'))!
    return {
      reply: `### **AI Smart Campus System**\n\n**AI Smart Campus System** is an academic management and student-success web application led by Md. Nazmus Shakib as **Team Leader & Database Lead**.\n\n**Architecture & Features:**\n- **Frontend**: Modern, responsive React + Vite single-page application.\n- **Backend**: Robust Laravel 12 RESTful API with token authentication via Laravel Sanctum.\n- **Database Architecture**: Normalized MySQL schema optimized for student records, enrollment, and grade tracking.\n- **AI Workflows**: Integrated OpenAI and Google Gemini APIs to assist students with course queries and smart academic assistance.\n- **Live Demo**: [Online Live Demonstration](https://ai-smart-campus-system-ce9i.onrender.com/)`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Tell me about Securex', 'What is his tech stack?', 'Show all projects'],
      provider: 'local-brain',
    }
  }

  if (q.includes('library') || q.includes('library management') || q.includes('book checkout')) {
    const project = projects.find((p) => p.title.toLowerCase().includes('library'))!
    return {
      reply: `### **Library Management Project**\n\nDesigned around database integrity and Laravel MVC principles, this application manages multi-entity book checkouts, member catalogs, and inventory.\n\n**Technical Highlights:**\n- Strictly designed to Third Normal Form (**3NF**) in MySQL for zero data redundancy.\n- Eloquent ORM relationships (\`hasManyThrough\`, polymorphic indexing).\n- Role-based permissions for librarians and registered student patrons.\n- Full CRUD operations with server-side validation.`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Show all projects', 'What backend skills does he have?', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  if (
    q.includes('logistica') ||
    (q.includes('appstick') && (q.includes('project') || q.includes('courier') || q.includes('transport')))
  ) {
    const project = projects.find((p) => p.title.toLowerCase().includes('logistica'))!
    return {
      reply: `### **Logistica (Internship Project at Appstick Tech Firm)**\n\nAn enterprise transport, courier, and supply-shipment management system developed collaboratively during Nazmus's internship at **Appstick Tech Firm** (Feb 2026 – Mar 2026).\n\n**Nazmus's Contributions:**\n- Implemented reusable PHP & Laravel backend business logic.\n- Conducted relational schema and database integrity checks in MySQL.\n- Built server-side consignment tracking workflows.\n- Utilized Git & GitHub collaborative branching and code review workflows in an Agile team setting.`,
      cards: [{ type: 'project-detail', data: project }],
      suggestedQueries: ['Tell me about his work experience', 'Show his best projects', 'Contact Nazmus'],
      provider: 'local-brain',
    }
  }

  // 2. Specific Technology Deep Dives
  if (
    q.includes('laravel') ||
    q.includes('php') ||
    (q.includes('backend') && !q.includes('experience') && !q.includes('job')) ||
    q.includes('sanctum') ||
    q.includes('blade') ||
    q.includes('mvc')
  ) {
    return {
      reply: `### **Laravel & Backend Engineering Expertise**\n\n${portfolioData.name} has specialized depth in **PHP & Laravel 12** backend systems:\n\n- **Architecture**: Clean MVC design patterns, service layers, and modular architectures.\n- **Authentication & Security**: Laravel Sanctum for API token management, Google OAuth 2.0 via Socialite, RBAC (Role-Based Access Control), and custom Middleware.\n- **APIs**: RESTful API design with structured JSON responses, status code precision, and validation schemas.\n- **Database Layer**: Eloquent ORM relations, transactional operations, and query optimization.\n- **Formal Training**: **80 hours of formal PHP/Laravel training** completed through Khulna University under the EDGE Project (ICT Division).`,
      cards: [{ type: 'skills', data: skills }],
      suggestedQueries: ['Tell me about Securex', 'Tell me about AI Smart Campus System', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  if (
    q.includes('next.js') ||
    q.includes('nextjs') ||
    q.includes('react') ||
    q.includes('typescript') ||
    q.includes('javascript') ||
    q.includes('tailwind') ||
    q.includes('vite') ||
    (q.includes('frontend') && !q.includes('experience'))
  ) {
    return {
      reply: `### **Modern Frontend & Full-Stack Capabilities**\n\n${portfolioData.name} creates fast, responsive, and accessible client interfaces:\n\n- **Next.js 16 & React 19**: App Router, Server Components, Client Islands, and static/dynamic rendering.\n- **TypeScript & JavaScript**: Strict type safety, clean asynchronous flows, and robust error handling.\n- **Styling & UI**: Tailwind CSS, CSS3 modern layouts, dark-mode styling, and accessible component architectures.\n- **Build Tools**: Vite, Turbopack, and Next.js optimization pipelines.`,
      cards: [{ type: 'skills', data: skills }],
      suggestedQueries: ['Show projects using Next.js & React', 'What backend skills does he have?', 'Contact Nazmus'],
      provider: 'local-brain',
    }
  }

  if (
    q.includes('mysql') ||
    q.includes('database') ||
    q.includes('sql') ||
    q.includes('3nf') ||
    q.includes('normalization') ||
    q.includes('relational') ||
    q.includes('eloquent') ||
    q.includes('schema')
  ) {
    return {
      reply: `### **Database Architecture & MySQL Engineering**\n\nDatabase design and data integrity are core strengths of ${portfolioData.name}:\n\n- **Relational Normalization**: Designing schemas strictly to **Third Normal Form (3NF)** to eliminate redundancy and prevent anomalies.\n- **Integrity & Constraints**: Primary/foreign key constraints, cascade rules, indexing on search columns, and ACID compliance.\n- **Team Leadership**: Served as **Database Lead** for the AI Smart Campus System, designing and coordinating the multi-entity MySQL schema.\n- **Coursework**: Completed formal academic coursework in *Distributed Databases* and *Software Architecture*.`,
      cards: [{ type: 'skills', data: skills }],
      suggestedQueries: ['Tell me about Library Management Project', 'Tell me about Securex', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  if (
    q.includes('ai integration') ||
    q.includes('openai') ||
    q.includes('gemini') ||
    q.includes('prompt engineering') ||
    q.includes('machine learning') ||
    q.includes('liver disease')
  ) {
    return {
      reply: `### **AI & Machine Learning Engineering**\n\n${portfolioData.name} actively bridges modern web systems with practical AI capabilities:\n\n- **AI API Integrations**: Deployed Google Gemini and OpenAI APIs in production web applications (e.g. AI Smart Campus System and this portfolio assistant).\n- **Prompt Engineering**: Crafting strict system contexts, structured JSON outputs, and fallback pipelines.\n- **Research & Publications**: Published technical research on Zenodo: "Explainable and Bias-Aware Machine Learning for Liver Disease Severity Prediction Using Clinical Data" (DOI: ${portfolioData.publications[1].doi}).`,
      cards: [
        { type: 'skills', data: skills },
        {
          type: 'publications',
          data: portfolioData.publications.map((p) => ({
            title: p.title,
            publisher: p.publisher,
            doi: p.doi,
            url: p.url,
          })),
        },
      ],
      suggestedQueries: ['Tell me about AI Smart Campus System', 'Show his publications', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  // 3. Skills & Full Tech Stack Overview
  if (
    q.includes('skill') ||
    q.includes('tech stack') ||
    q.includes('technolog') ||
    q.includes('tools') ||
    q.includes('toolkit') ||
    q.includes('framework') ||
    q.includes('what tech') ||
    q.includes('what technologies')
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

  // 4. Experience & Appstick Internship
  if (
    q.includes('experience') ||
    q.includes('internship') ||
    q.includes('appstick') ||
    q.includes('work history') ||
    q.includes('job') ||
    q.includes('career')
  ) {
    const exp = portfolioData.experience[0]
    const certText = exp.certificateUrl
      ? `\n\n📜 **Verified Industrial Certificate**: [View Appstick Certificate](${exp.certificateUrl})`
      : ''
    return {
      reply: `### **Professional Experience**\n\n**${exp.role}** at **${exp.company}**\n*Period: ${exp.period} | Location: ${exp.location}*\n\n**Summary:**\n${exp.summary}\n\n**Key Responsibilities:**\n${exp.responsibilities.map((r) => `- ${r}`).join('\n')}\n\n**Technologies Used:**\n${exp.technologies.join(', ')}\n\nRepository: [GitHub Logistica](${exp.repositoryUrl})${certText}`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: [
        'Show his best projects',
        'Explain his education & CGPA',
        'Why should I hire him?',
      ],
      provider: 'local-brain',
    }
  }

  // 5. Education & Academic Background
  if (
    q.includes('education') ||
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('university') ||
    q.includes('nubtk') ||
    q.includes('degree') ||
    q.includes('academic') ||
    q.includes('bsc') ||
    q.includes('cse') ||
    q.includes('coursework') ||
    q.includes('graduation') ||
    q.includes('study')
  ) {
    const primaryDegree = portfolioData.education[0]
    return {
      reply: `### **Academic Background & Education**\n\n🎓 **${portfolioData.academicStatus}**\n- **Institution**: Northern University of Business and Technology Khulna (NUBTK)\n- **Current CGPA**: **${portfolioData.currentCgpa}**\n- **Expected Graduation**: ${portfolioData.expectedGraduation}\n- **Core Coursework**: ${primaryDegree?.coursework?.join(', ') || 'Distributed Databases, Software Architecture and Design, Advanced Data Structures, Network Routing Protocols'}\n\n📚 **Secondary Education:**\n- **HSC (Science)**: Satkhira Government College | **GPA: 5.00 / 5.00** (2020)\n- **SSC (Science)**: Alipur Union Secondary School | **GPA: 5.00 / 5.00** (2018)`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: [
        'What certifications does he hold?',
        'Show his published research',
        'Tell me about his experience',
      ],
      provider: 'local-brain',
    }
  }

  // 6. Certifications & Training
  if (
    q.includes('certificat') ||
    q.includes('edge') ||
    q.includes('training') ||
    q.includes('programming hero') ||
    q.includes('bootcamp') ||
    q.includes('21 days') ||
    q.includes('khulna university') ||
    q.includes('ict division') ||
    q.includes('80 hour') ||
    q.includes('bangladesh computer council')
  ) {
    const certList = portfolioData.certifications
      .map(
        (c) =>
          `📜 **${c.title}**\n- **Provider / Organization**: ${c.provider}\n- **Program**: ${c.program || 'Technical Training'}\n- **Duration / Date**: ${c.duration || c.issued}${c.certificateId ? `\n- **Credential ID**: \`${c.certificateId}\`` : ''}\n- **Verification**: [View Official Certificate](${c.verifyUrl})`
      )
      .join('\n\n')

    return {
      reply: `### **Professional Certifications & Training**\n\n${certList}`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: ['Tell me about his Laravel projects', 'Explain his education', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  // 7. Publications & Research
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
      reply: `### **Technical Publications & Research Reports**\n\n${portfolioData.name} has published 2 technical reports on Zenodo:\n\n1. **SecureX: A CCTV & Security Service Booking and Management System**\n   - Publisher: Zenodo | DOI: [\`${portfolioData.publications[0].doi}\`](${portfolioData.publications[0].url})\n2. **Explainable and Bias-Aware Machine Learning for Liver Disease Severity Prediction Using Clinical Data**\n   - Publisher: Zenodo | DOI: [\`${portfolioData.publications[1].doi}\`](${portfolioData.publications[1].url})`,
      cards: [{ type: 'publications', data: pubs }],
      suggestedQueries: ['Tell me about Securex', 'What is his tech stack?', 'How to contact him?'],
      provider: 'local-brain',
    }
  }

  // 8. Achievements & Honors
  if (
    q.includes('achievement') ||
    q.includes('award') ||
    q.includes('honor') ||
    q.includes('recognition') ||
    q.includes('highlight')
  ) {
    return {
      reply: `### **Key Achievements & Honors**\n\n${portfolioData.achievements.map((a) => `- **${a.title}**: ${a.description}`).join('\n')}`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: ['Explain his education & CGPA', 'Show me his best projects', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  // 9. Why Hire & Strengths
  if (
    q.includes('why hire') ||
    q.includes('why should i hire') ||
    q.includes('hire him') ||
    q.includes('strengths') ||
    q.includes('stand out') ||
    q.includes('value proposition')
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

  // 10. Services & Hiring Inquiries
  if (
    q.includes('service') ||
    q.includes('hire') ||
    q.includes('work together') ||
    q.includes('freelance') ||
    q.includes('contract') ||
    q.includes('pricing') ||
    q.includes('rate') ||
    q.includes('quote') ||
    q.includes('collaborat') ||
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

  // 11. Contact Info, Location & Socials
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('reach out') ||
    q.includes('message') ||
    q.includes('location') ||
    q.includes('address') ||
    q.includes('where do you live') ||
    q.includes('where are you') ||
    q.includes('github') ||
    q.includes('linkedin')
  ) {
    return {
      reply: `### **Contact & Connect with ${portfolioData.name}**\n\n- 📧 **Email**: [${portfolioData.email}](mailto:${portfolioData.email})\n- 📞 **Phone**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 📍 **Location**: ${portfolioData.location}\n- 💼 **Availability**: **${portfolioData.availability}**\n- 🐙 **GitHub**: [github.com/${portfolioData.githubUsername}](${portfolioData.githubUrl})\n\nFeel free to send a message directly using the contact form or through the channels above!`,
      cards: [{ type: 'contact-direct', data: contact }],
      suggestedQueries: ['Show his best projects', 'Download his resume', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  // 12. Resume & CV Download
  if (q.includes('resume') || q.includes('cv') || q.includes('curriculum vitae') || mode === 'resume') {
    return {
      reply: `### **Resume & Curriculum Vitae**\n\nYou can review ${portfolioData.name}'s complete academic and professional credentials:\n\n- **Current Status**: ${portfolioData.academicStatus}\n- **Current CGPA**: ${portfolioData.currentCgpa}\n- **Expected Graduation**: ${portfolioData.expectedGraduation}\n- **Primary Role**: ${portfolioData.primaryRole}\n\n📄 [Click here to download/view the official Resume PDF](${portfolioData.resumeHref})`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: ['Show his best projects', 'What is his experience?', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  // 13. Projects Overview / All Projects
  if (
    q.includes('project') ||
    q.includes('portfolio') ||
    q.includes('best work') ||
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

  // 14. Identity / Who is Shakib / Bio
  if (
    q.includes('who is') ||
    q.includes('who are you') ||
    q.includes('introduce') ||
    q.includes('tell me about yourself') ||
    q.includes('about shakib') ||
    q.includes('about nazmus') ||
    q.includes('about yourself') ||
    q.includes('developer journey') ||
    q.includes('bio')
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

  // 15. Greetings & Small Talk
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q.includes('good morning') ||
    q.includes('good afternoon') ||
    q.includes('good evening') ||
    q.includes('greetings')
  ) {
    return {
      reply: `Hello! I am **Shakib AI**, the personal portfolio and engineering assistant for **${portfolioData.name}**.\n\nI can provide verified facts about his **Laravel & Next.js projects**, **database schemas**, **internship experience**, **academic CGPA (3.60)**, and **availability for hire**.\n\nWhat would you like to explore?`,
      cards: [{ type: 'project-list', data: projects.slice(0, 2) }],
      suggestedQueries: [
        'Show me his best projects',
        'What technologies does he use?',
        'Tell me about his experience',
        'Why should I hire him?',
      ],
      provider: 'local-brain',
    }
  }

  if (q.includes('thank') || q.includes('thanks') || q.includes('bye') || q.includes('goodbye')) {
    return {
      reply: `You are very welcome! If you have any further questions or would like to discuss an opportunity, feel free to reach out to **${portfolioData.name}** at [${portfolioData.email}](mailto:${portfolioData.email}) or connect on [GitHub](${portfolioData.githubUrl}). Have a wonderful day!`,
      cards: [{ type: 'contact-direct', data: contact }],
      suggestedQueries: ['Show his best projects', 'Download his resume', 'Who is Shakib?'],
      provider: 'local-brain',
    }
  }

  // 16. Contextual Semantic Search Fallback for Specific or Composite Inquiries
  const matchingTech = portfolioData.technologyShowcase.filter((t) =>
    q.includes(t.name.toLowerCase())
  )
  const matchingProjects = projects.filter((p) =>
    q.includes(p.title.toLowerCase()) || p.technologies.some((tech) => q.includes(tech.toLowerCase()))
  )

  let dynamicReply = `### **Information regarding "${query}"**\n\n`

  if (matchingTech.length > 0) {
    dynamicReply += `**Matching Technologies in Nazmus's Stack:**\n${matchingTech.map((t) => `- **${t.name}**${t.description ? `: ${t.description}` : ''}`).join('\n')}\n\n`
  }

  if (matchingProjects.length > 0) {
    dynamicReply += `**Relevant Projects:**\n${matchingProjects.map((p) => `- **${p.title}**: ${p.summary}`).join('\n')}\n\n`
  }

  dynamicReply += `**Portfolio Summary:**\n- **Role**: ${portfolioData.primaryRole} specializing in ${portfolioData.supportingRoles.join(', ')}.\n- **Education**: ${portfolioData.academicStatus} (CGPA: ${portfolioData.currentCgpa}).\n- **Experience**: Backend Developer Intern at ${portfolioData.experience[0].company}.\n\nFor more details or to discuss custom project requirements, feel free to send a direct message below!`

  return {
    reply: dynamicReply,
    cards: matchingProjects.length > 0
      ? [{ type: 'project-list', data: matchingProjects }]
      : [{ type: 'skills', data: skills }],
    suggestedQueries: [
      'Show me his best projects',
      'What technologies does he use?',
      'Tell me about his experience',
      'Why should I hire him?',
    ],
    provider: 'local-brain',
  }
}
