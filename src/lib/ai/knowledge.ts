import { portfolioData, projectSlug } from '@/data/portfolio'
import { socialLinks } from '@/constants/social-links'
import type { ProjectCardData, ResumeCardData, SkillCategoryData, ContactDirectData } from '@/types/ai'

export function getSystemPrompt(): string {
  const {
    name,
    primaryRole,
    supportingRoles,
    location,
    email,
    phone,
    availability,
    academicStatus,
    currentCgpa,
    expectedGraduation,
    resumeHref,
    githubUrl,
    skills,
    projects,
    experience,
    education,
    achievements,
    certifications,
    publications,
  } = portfolioData

  const projectSummaries = projects
    .map(
      (p) => `- **${p.title}** (${p.category}, ${p.date}):
  * Description: ${p.description}
  * Tech Stack: ${p.technologies.join(', ')}
  * Key Highlights: ${p.keyFeatures.slice(0, 4).join('; ')}
  * GitHub: ${p.githubUrl}
  * Live URL: ${p.liveUrl || 'N/A'}`
    )
    .join('\n\n')

  const expSummaries = experience
    .map(
      (e) => `- **${e.role}** at **${e.company}** (${e.period}, ${e.location}):
  * Summary: ${e.summary}
  * Responsibilities: ${e.responsibilities.join('; ')}
  * Technologies: ${e.technologies.join(', ')}
  * Repo: ${e.repositoryUrl || 'N/A'}`
    )
    .join('\n\n')

  const eduSummaries = education
    .map(
      (ed) => `- **${ed.title}** (${ed.institution}, ${ed.location}):
  * Status/CGPA: ${ed.status || ed.year || ''} | ${ed.cgpa || ''}
  * Coursework: ${ed.coursework ? ed.coursework.join(', ') : 'N/A'}`
    )
    .join('\n')

  const certSummaries = certifications
    .map(
      (c) => `- **${c.title}** from ${c.provider} (${c.program ? `${c.program}, ` : ''}${c.issued || c.duration || ''}):
  * Topics: ${c.topics && c.topics.length > 0 ? c.topics.join(', ') : 'Web Development'}
  * Verification/Link: ${c.verifyUrl}${c.certificateId ? `\n  * Certificate ID: ${c.certificateId}` : ''}`
    )
    .join('\n')

  const pubSummaries = publications
    .map(
      (pub) => `- **${pub.title}** (${pub.publisher}, DOI: ${pub.doi}):
  * URL: ${pub.url}`
    )
    .join('\n')

  const skillList = skills
    .map((s) => `* **${s.name}**: ${s.items.join(', ')}`)
    .join('\n')

  return `You are "Shakib AI", the official portfolio & engineering assistant for ${name}.
You represent ${name} to recruiters, hiring managers, clients, and technical leads.

STRICT CONVERSATIONAL GUIDELINES:
1. SHORT, DIRECT & NATURAL (3–5 lines by default):
   - Keep default answers concise and to the point (3–5 lines).
   - Answer the exact question immediately without unnecessary greetings or repetitive boilerplate.
2. DETAILED EXPLANATIONS ONLY WHEN REQUESTED:
   - Provide in-depth technical breakdowns, step-by-step logic, or extensive bullet points ONLY if the user explicitly asks (e.g. "explain in detail", "tell me more", "how does it work?", "deep dive", "বিস্তারিত বলো", "ব্যাখ্যা করো").
3. ANSWER THE EXACT QUESTION ONLY:
   - Do NOT dump unrelated summaries. If the user asks for a Facebook link, provide the Facebook link. If asked for CGPA, provide the CGPA. Do not attach unrelated facts.
4. NATURAL BILINGUAL SUPPORT (BANGLA & ENGLISH):
   - If asked in Bangla script or Banglish (e.g. "facebook link ta daw", "কেমন আছো?", "তোমার প্রজেক্টগুলো বলো", "shakib er stack ki"), answer naturally, fluently, and warmly in Bangla!
   - If asked in English, reply in crisp, professional English.
5. FACTUAL INTEGRITY (ZERO HALLUCINATION):
   - Only state facts documented in the knowledge base below. Never invent employers, metrics, awards, technologies, or outcomes.

=== VERIFIED PORTFOLIO FACTS ===
Name: ${name}
Role: ${primaryRole} (${supportingRoles.join(', ')})
Location: ${location}
Email: ${email}
Phone: ${phone}
WhatsApp: ${socialLinks.whatsapp}
Facebook: ${socialLinks.facebook}
LinkedIn: ${socialLinks.linkedin}
GitHub: ${githubUrl}
Availability: ${availability}
Education: ${academicStatus} at Northern University of Business and Technology Khulna (CGPA: ${currentCgpa} / 4.00, Graduation: ${expectedGraduation})
Experience: Backend Developer Intern at Appstick Tech Firm (Sept 2025 – Dec 2025, Khulna)
Resume Link: ${resumeHref}

=== VERIFIED SKILLS & TECHNOLOGIES ===
${skillList}

=== VERIFIED PROJECTS ===
${projectSummaries}

=== WORK EXPERIENCE ===
${expSummaries}

=== EDUCATION ===
${eduSummaries}

=== CERTIFICATIONS ===
${certSummaries}

=== PUBLICATIONS ===
${pubSummaries}

=== ACHIEVEMENTS ===
${achievements.map((a) => `- ${a.title}: ${a.description}`).join('\n')}

=== CLIENT SERVICES ===
1. Full-Stack Web Development (Laravel + Next.js / React)
2. Custom RESTful API Architecture & Secure Middleware (Sanctum, OAuth 2.0, RBAC)
3. Relational Database Schema Design & 3NF Normalization (MySQL)
4. Workflow Automation (n8n, Google Sheets, Telegram Bot, Docker)
5. Practical AI Integrations (OpenAI & Gemini APIs in web applications)

Provide accurate, direct, and concise answers adhering strictly to these rules!
`
}

export function getProjectCardDataList(): ProjectCardData[] {
  return portfolioData.projects.map((p) => ({
    title: p.title,
    category: p.category,
    date: p.date,
    summary: p.summary,
    description: p.description,
    keyFeatures: p.keyFeatures,
    technologies: p.technologies,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    featured: p.featured,
    slug: projectSlug(p.title),
  }))
}

export function getResumeCardData(): ResumeCardData {
  const primaryDegree = portfolioData.education[0]
  return {
    name: portfolioData.name,
    role: portfolioData.primaryRole,
    cgpa: portfolioData.currentCgpa,
    degree: primaryDegree?.title || 'BSc in CSE',
    institution: primaryDegree?.institution || 'Northern University of Business and Technology Khulna',
    graduation: portfolioData.expectedGraduation,
    resumeHref: portfolioData.resumeHref,
    resumeDownloadHref: portfolioData.resumeDownloadHref,
    certifications: portfolioData.certifications.map((c) => ({
      title: c.title,
      provider: c.provider,
      duration: c.duration,
    })),
  }
}

export function getSkillsData(): SkillCategoryData[] {
  return portfolioData.skills.map((s) => ({
    name: s.name,
    items: s.items,
  }))
}

export function getContactDirectData(): ContactDirectData {
  return {
    email: portfolioData.email,
    phone: portfolioData.phone,
    location: portfolioData.location,
    availability: portfolioData.availability,
    githubUrl: portfolioData.githubUrl,
    linkedinUrl: socialLinks.linkedin,
    facebookUrl: socialLinks.facebook,
    whatsappUrl: socialLinks.whatsapp,
  }
}
