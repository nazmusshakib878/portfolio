import type { Metadata } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { portfolioData } from '@/data/portfolio'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { SocialRail } from '@/components/layout/social-rail'
import { NazmusAiAssistant } from '@/components/ai/nazmus-ai-assistant'
import { NavigationTracker } from '@/components/providers/navigation-tracker'
import { getSiteUrl } from '@/lib/site-url'

const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Md. Nazmus Shakib | Full Stack Developer (Laravel & Next.js)',
    template: '%s | Md. Nazmus Shakib',
  },
  description:
    'Portfolio of Md. Nazmus Shakib, a Full Stack Developer with a strong Laravel & MySQL backend foundation, building modern Next.js, React, and AI-integrated web applications.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Md. Nazmus Shakib | Full Stack Developer (Laravel & Next.js)',
    description: portfolioData.heroDescription,
    siteName: 'Md. Nazmus Shakib Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Md. Nazmus Shakib — Full Stack Developer Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md. Nazmus Shakib | Full Stack Developer (Laravel & Next.js)',
    description: portfolioData.heroDescription,
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.name,
    jobTitle: portfolioData.primaryRole,
    description: portfolioData.heroDescription,
    email: `mailto:${portfolioData.email}`,
    telephone: portfolioData.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Khulna',
      addressCountry: 'Bangladesh',
    },
    url: siteUrl,
    sameAs: portfolioData.socialLinks.map((link) => link.href),
    knowsAbout: [
      'Laravel',
      'PHP',
      'MySQL',
      'Next.js',
      'React',
      'TypeScript',
      'REST APIs',
      'AI Integration',
      'RESTful APIs',
      'AI API Integration',
      'Relational Database Design',
      'Database Normalization (1NF–3NF)',
      'Eloquent ORM',
      'Tailwind CSS',
      'Git & GitHub',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Northern University of Business and Technology Khulna',
    },
  }

  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-white focus:px-4 focus:py-3 focus:text-black"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
        <CustomCursor />
        <NavigationTracker />
        <SocialRail />
        <NazmusAiAssistant />
        {children}
      </body>
    </html>
  )
}



