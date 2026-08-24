export type AiMode = 'all' | 'projects' | 'resume' | 'hire'

export interface ProjectCardData {
  title: string
  category: string
  date: string
  summary: string
  description: string
  keyFeatures: string[]
  technologies: string[]
  githubUrl: string
  liveUrl: string
  featured?: boolean
  slug?: string
}

export interface SkillCategoryData {
  name: string
  items: string[]
}

export interface ResumeCardData {
  name: string
  role: string
  cgpa: string
  degree: string
  institution: string
  graduation: string
  resumeHref: string
  certifications: Array<{ title: string; provider: string; duration?: string }>
}

export interface ContactDirectData {
  email: string
  phone: string
  location: string
  availability: string
  githubUrl: string
  linkedinUrl?: string
}

export type AiActionCard =
  | { type: 'project-list'; data: ProjectCardData[] }
  | { type: 'project-detail'; data: ProjectCardData }
  | { type: 'skills'; data: SkillCategoryData[] }
  | { type: 'resume-card'; data: ResumeCardData }
  | { type: 'hire-inquiry'; data?: { prefillType?: string } }
  | { type: 'contact-direct'; data: ContactDirectData }
  | { type: 'publications'; data: Array<{ title: string; publisher: string; doi: string; url: string }> }

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  cards?: AiActionCard[]
  suggestedQueries?: string[]
  timestamp: number
  isStreaming?: boolean
}

export interface ChatRequestBody {
  message: string
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  mode?: AiMode
}

export interface ChatResponseBody {
  reply: string
  cards?: AiActionCard[]
  suggestedQueries?: string[]
  provider?: 'gemini' | 'openai' | 'local-brain'
}
