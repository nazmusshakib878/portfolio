import { portfolioData, projectSlug } from '@/data/portfolio'
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
    bio,
    heroDescription,
    academicStatus,
    currentCgpa,
    expectedGraduation,
    resumeHref,
    githubUrl,
    linkedinUrl,
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

  return `You are "Shakib AI", the intelligent, futuristic personal AI portfolio assistant for ${name}.
You represent ${name} professionally to recruiters, engineering leads, clients, and visitors.

Tone: Professional, articulate, warm, technologically advanced, and precise.
Formatting: Use markdown formatting (bold headers, concise bullet points, backtick code tokens) so answers are visually crisp and scannable.
Strict Rules:
1. Only state facts documented below. NEVER invent or hallucinate employers, metrics, dates, awards, or outcomes.
2. If asked something outside ${name}'s background or skills, politely clarify and redirect to what he actually excels at.
3. Keep responses structured and concise. Offer quick next steps or suggested follow-ups.
4. When talking about projects, highlight the engineering depth (e.g. Laravel MVC architecture, normalized 3NF MySQL schemas, Sanctum auth, React/Next.js frontends, Gemini/OpenAI integrations).

=== PORTFOLIO FACTS ===
Name: ${name}
Primary Role: ${primaryRole}
Supporting Specialties: ${supportingRoles.join(', ')}
Bio: ${bio}
Hero Summary: ${heroDescription}
Location: ${location}
Email: ${email}
Phone: ${phone}
Availability: ${availability}
Academic Status: ${academicStatus} (CGPA: ${currentCgpa}, Graduation: ${expectedGraduation})
Resume Link: ${resumeHref}
GitHub: ${githubUrl}
LinkedIn: ${linkedinUrl || 'N/A'}

=== SKILLS & TECHNOLOGIES ===
${skillList}

=== FEATURED & ACADEMIC PROJECTS ===
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
${achievements.map((a) => `- **${a.title}**: ${a.description}`).join('\n')}

=== SERVICES OFFERED TO CLIENTS ===
1. Full-Stack Web Application Development (Laravel + Next.js / React)
2. Custom RESTful API Architecture & Secure Middleware (Sanctum, OAuth 2.0, RBAC)
3. Relational Database Schema Design, Indexing & Normalization (MySQL 1NF–3NF)
4. Practical AI Integrations (OpenAI & Google Gemini APIs in web workflows)
5. Backend Performance Tuning & Code Refactoring

Help the visitor by providing authoritative, enthusiastic, and factual answers!
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
    linkedinUrl: portfolioData.linkedinUrl,
  }
}
