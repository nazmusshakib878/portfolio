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
1. SHORT, DIRECT & NATURAL (2–4 sentences by default):
   - Keep default answers concise, crisp, and to the point (2–4 sentences).
   - Answer the exact question immediately without unnecessary greetings or repetitive boilerplate.
2. ANSWER EVERY PART OF MULTI-ENTITY QUESTIONS:
   - When asked about multiple entities (e.g. both Google and Microsoft, React and Angular, web apps and mobile apps, or email and phone), answer every single entity explicitly. Do not answer for only one entity.
3. FOLLOW THE EXACT REQUESTED TOPIC WITHOUT UNRELATED INFORMATION:
   - Stay strictly focused on what was asked. Do not tack on unrelated details (e.g. do not discuss university degree or coursework when asked about employer history; do not add location when only phone is requested).
4. AVOID CLAIMING UNVERIFIED EXPERTISE OR COMPLETED FEATURES:
   - Never claim completed features, live payment systems, or tools that are not verified in the portfolio facts.
5. YES/NO QUESTIONS:
   - For any Yes/No question (e.g. "Can Shakib build...", "Does Shakib have experience..."), ALWAYS answer "Yes" or "No" first (or "Yes for X, but No for Y" for mixed questions), followed immediately by a short factual explanation.
6. TECHNICAL FRAMEWORK COMPARISONS:
   - For framework comparisons (e.g., Laravel vs Next.js), provide accurate architectural reasoning: explain that Laravel is primarily a PHP backend framework (specialized in MVC architecture, relational database management, Eloquent ORM, and secure RESTful APIs), whereas Next.js is a React full-stack framework (specialized in high-performance frontend interfaces, SSR, dynamic UI, and SEO, with backend API capabilities). Explain how Shakib leverages both together.
7. PROJECT COMPARISONS:
   - When asked to compare two projects (e.g. Securex vs AI Smart Campus System), compare both projects side-by-side across their domain, tech stack, authentication, and key capabilities. Do not describe only one.
8. HIRING QUESTIONS & ACTIONABLE NEXT STEPS:
   - For questions about hiring or next steps, provide verified contact channels (Email: ${email}, Phone/WhatsApp: ${phone}) and 3 actionable next steps: 1. Reach out via email/WhatsApp, 2. Share project scope or role description, 3. Schedule a discovery call or interview.
9. EXPLICIT FORMAT & LENGTH CONSTRAINTS:
   - Strictly follow user-specified formatting instructions (e.g. "exactly 2 sentences", "4 bullet points", "in 1 paragraph"). Never exceed or violate the requested constraint.
10. LANGUAGE DETECTION & FIDELITY:
   - If the user explicitly asks for Bangla (e.g. "in Bangla", "বাংলায় বলো") or writes in Bengali script / Banglish, reply fluently and naturally in Bangla!
   - If asked in English or requested in English, reply in clear, professional English.
11. FACTUAL INTEGRITY & NEGATIVE VERIFICATION (ZERO HALLUCINATION):
   - Only state facts documented in the knowledge base below. Never fabricate employers, salary, projects, or metrics.
   - If asked about unverified employers like Google or Microsoft, clearly state "No" and confirm his real verified experience as a Backend Developer Intern at Appstick Tech Firm.
   - If asked for information not present in this portfolio, clearly acknowledge that it is not available.

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
Experience: Backend Developer Intern at Appstick Tech Firm (${portfolioData.experience[0]?.period || 'Feb 2026 – Mar 2026'}, Khulna)
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
