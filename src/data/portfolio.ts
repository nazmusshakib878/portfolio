import { socialLinks } from '@/constants/social-links'
import { portfolioData as facts } from './portfolio-facts'

const _projectDisplayOrder = [
  'NS ERP â€” Enterprise Resource Planning System',
  'Securex - CCTV & Security Service Management System',
  'AI Smart Campus System',
  'Aurelia Maison Paris â€” Luxury E-Commerce Platform',
  'Nur Foodes â€” Restaurant POS & Store ERP System',
  'Primeor Solutions â€” Internship Program Website',
  'CV Payment Reminder Automation',
  'Logistica',
  'Library Management Project',
  'Resumate AI â€” Conversational AI Resume Builder & ATS Optimization Platform',
  'Assessment Exam Platform',
] as const

const projects = [
  facts.projects[0],
  facts.projects[1],
  facts.projects[2],
  facts.projects[3],
  facts.projects[4],
  facts.projects[5],
  facts.projects[7],
  facts.projects[8],
  facts.projects[9],
  facts.projects[6],
  facts.projects[10],
]

export const portfolioData = {
  ...facts,
  projects,
  resumeHref: '/resume.pdf?v=2',
  resumeDownloadHref: '/MD_Nazmus_Shakib_CV.pdf',
  linkedinUrl: socialLinks.linkedin,
  socialLinks: [
    ...facts.socialLinks,
    { label: 'LinkedIn', href: socialLinks.linkedin, icon: 'linkedin' as const },
    { label: 'Facebook', href: socialLinks.facebook, icon: 'facebook' as const },
    { label: 'WhatsApp', href: socialLinks.whatsapp, icon: 'whatsapp' as const },
  ],
}

export const projectSlug = (title: string) =>
  title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export type PortfolioProject = (typeof portfolioData.projects)[number]

