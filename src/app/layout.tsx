import type { Metadata } from 'next'
import { Manrope,Space_Grotesk } from 'next/font/google'
import './globals.css'
import { portfolioData } from '@/data/portfolio'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { SocialRail } from '@/components/layout/social-rail'
import { getSiteUrl } from '@/lib/site-url'
const body=Manrope({subsets:['latin'],variable:'--font-body',display:'swap'});const display=Space_Grotesk({subsets:['latin'],variable:'--font-display',display:'swap'});const siteUrl=getSiteUrl()
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Md. Nazmus Shakib | Backend & Laravel Developer',template:'%s | Md. Nazmus Shakib'},description:'Portfolio of Md. Nazmus Shakib, a backend and full-stack developer specializing in Laravel, PHP, MySQL, REST APIs, authentication, and database-driven web applications.',alternates:{canonical:'/'},openGraph:{type:'website',title:'Md. Nazmus Shakib | Backend & Laravel Developer',description:portfolioData.heroDescription,images:['/opengraph-image']},twitter:{card:'summary_large_image',title:'Md. Nazmus Shakib | Backend & Laravel Developer',description:portfolioData.heroDescription,images:['/opengraph-image']}}
export default function RootLayout({children}:{children:React.ReactNode}){const person={'@context':'https://schema.org','@type':'Person',name:portfolioData.name,jobTitle:portfolioData.primaryRole,email:`mailto:${portfolioData.email}`,address:{'@type':'PostalAddress',addressLocality:'Khulna',addressCountry:'Bangladesh'},sameAs:portfolioData.socialLinks.map(link=>link.href)};return <html lang="en"><body className={`${body.variable} ${display.variable}`}><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-white focus:px-4 focus:py-3 focus:text-black">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/><CustomCursor/><SocialRail/>{children}</body></html>}

