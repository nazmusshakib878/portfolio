export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'email' | 'phone'
}

export interface HeroStat {
  label: string
  value: string
}

export interface HeroBadge {
  label: string
}

export interface AboutCard {
  title: string
  description: string
}

export interface SkillCategory {
  name: string
  items: string[]
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  summary: string
  responsibilities: string[]
  technologies: string[]
  repositoryUrl?: string
}

export interface ProjectItem {
  title: string
  category: string
  date: string
  role?: string
  supervisor?: string
  summary: string
  description: string
  keyFeatures: string[]
  technologies: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  accent: string
}

export interface EducationItem {
  type: 'degree' | 'certificate' | 'school'
  title: string
  institution: string
  location: string
  status?: string
  cgpa?: string
  graduation?: string
  year?: string
  coursework?: string[]
}

export interface AchievementItem {
  title: string
  description: string
}

export interface CertificationItem {
  title: string
  provider: string
  program: string
  duration: string
  issued: string
  certificateId: string
  verifyUrl: string
  topics: string[]
}

export interface GithubRepoLink {
  title: string
  description: string
  href: string
  technologies: string[]
}

export interface GithubProfile {
  label: string
  value: string
}

export interface GithubHighlight {
  title: string
  description: string
}

export interface PortfolioData {
  name: string
  primaryRole: string
  supportingRoles: string[]
  location: string
  phone: string
  availability: string
  email: string
  bio: string
  heroDescription: string
  academicStatus: string
  currentCgpa: string
  featuredProjectsCount: string
  laravelTrainingHours: string
  expectedGraduation: string
  initials: string
  resumeHref: string
  githubUrl: string
  linkedinUrl: string
  githubUsername: string
  navLinks: NavLink[]
  socialLinks: SocialLink[]
  heroStats: HeroStat[]
  heroBadges: HeroBadge[]
  aboutCards: AboutCard[]
  skills: SkillCategory[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  achievements: AchievementItem[]
  certifications: CertificationItem[]
  githubProfile: GithubProfile[]
  githubHighlights: GithubHighlight[]
  githubRepos: GithubRepoLink[]
  technologies: string[]
}