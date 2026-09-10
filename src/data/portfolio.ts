import { socialLinks } from '@/constants/social-links'
import { portfolioData as facts } from './portfolio-facts'

export const portfolioData = {
  ...facts,
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

