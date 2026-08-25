import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { BlogListing } from '@/components/blog/blog-listing'
import { LongFormReturnNavigation } from '@/components/ui/long-form-return-navigation'
import { SmartBackLink } from '@/components/ui/smart-back-link'
import { BackToTop } from '@/components/ui/back-to-top'
import { getAllBlogPosts, getAllBlogCategories } from '@/data/blog-posts'
import { portfolioData } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Technical Writing & Engineering Articles | Md. Nazmus Shakib',
  description:
    'Practical engineering notes, architectural patterns, and deep dives into Laravel REST APIs, Sanctum authentication, Next.js Server Components, and relational database systems.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Technical Writing | Md. Nazmus Shakib',
    description:
      'Practical engineering notes, architectural patterns, and tutorials on Laravel, Next.js, and modern full-stack development.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Writing | Md. Nazmus Shakib',
    description:
      'Practical engineering notes, architectural patterns, and tutorials on Laravel, Next.js, and modern full-stack development.',
  },
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()
  const categories = getAllBlogCategories()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Md. Nazmus Shakib — Technical Writing',
    description:
      'Practical notes and engineering insights from building real-world Laravel, Next.js, and full-stack web applications.',
    author: {
      '@type': 'Person',
      name: portfolioData.name,
      jobTitle: portfolioData.primaryRole,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.publishedAt,
      url: `/blog/${post.slug}`,
      keywords: post.tags.join(', '),
    })),
  }

  return (
    <main id="main-content" className="min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06070b]/85 backdrop-blur-md">
        <div className="shell flex h-20 items-center justify-between">
          <SmartBackLink
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-[#d9dee7] transition hover:border-[#7c5cff] hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5 text-[#2bd9b5]" />
            <span>Back to Portfolio</span>
          </SmartBackLink>

          <div className="flex items-center gap-3">
            <span className="eyebrow text-xs">
              Technical Writing &middot; {posts.length} Articles
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="shell pt-12 pb-8 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7] mb-4">
          <BookOpen size={13} className="text-[#c4b5fd]" />
          <span>Engineering Notes &amp; Tutorials</span>
        </div>

        <h1 className="display max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold text-[#f2f3f7]">
          Technical <span className="text-[#9aa6b7]">Writing.</span>
        </h1>

        <p className="muted mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
          Practical notes, architectural blueprints, and deep dives into Laravel REST APIs, Next.js App Router patterns, relational database modeling, and applied AI systems.
        </p>

        {/* Client-side Filtered Listing */}
        <BlogListing initialPosts={posts} categories={categories} />

        {/* Bottom Return Navigation */}
        <LongFormReturnNavigation
          primaryHref="/"
          primaryLabel="Back to Portfolio"
        />
      </div>

      <BackToTop />
    </main>
  )
}
