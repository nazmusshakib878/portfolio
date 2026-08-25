import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Code2,
  Layers,
  Sparkles,
} from 'lucide-react'
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getAdjacentBlogPosts,
} from '@/data/blog-posts'
import { CopyCodeButton } from '@/components/ui/copy-code-button'
import { MvcArchitectureDiagram } from '@/components/blog/mvc-diagram'
import { portfolioData } from '@/data/portfolio'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Md. Nazmus Shakib`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${post.slug}`,
      title: `${post.title} | Technical Writing`,
      description: post.summary,
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Technical Writing`,
      description: post.summary,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const { previous, next } = getAdjacentBlogPosts(post.slug)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: portfolioData.name,
      jobTitle: portfolioData.primaryRole,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    url: `/blog/${post.slug}`,
  }

  return (
    <main id="main-content" className="min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06070b]/85 backdrop-blur-md">
        <div className="shell flex h-20 items-center justify-between">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-[#d9dee7] transition hover:border-[#7c5cff] hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
            <span>All Articles</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-[#aeb6c3]">
            <span className="hidden sm:inline font-mono text-[11px]">
              {post.category}
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="inline-flex items-center gap-1 text-[#aa96ff]">
              <Clock size={12} />
              <span>{post.readingTime}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Article Container */}
      <article className="shell max-w-3xl pt-12 pb-16 sm:pt-16 sm:pb-20">
        {/* Category & Status Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5fd]">
            {post.category}
          </span>
          {post.isDraft && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#fbbf24]">
              <span className="size-1.5 rounded-full bg-[#f59e0b]" />
              Draft for Review
            </span>
          )}
        </div>

        {/* Article Headline */}
        <h1 className="display mt-6 text-[clamp(2.3rem,5vw,3.8rem)] font-bold leading-[1.08] text-[#f2f3f7]">
          {post.title}
        </h1>

        {/* Date & Read Time Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-4 border-b border-white/[0.08] pb-6 text-xs text-[#747b8b]">
          <span className="inline-flex items-center gap-1.5 text-[#d9dee7]">
            <Calendar size={13} className="text-[#69e6cd]" aria-hidden="true" />
            <span>{post.formattedDate}</span>
          </span>
          <span>&middot;</span>
          <span className="inline-flex items-center gap-1.5 text-[#d9dee7]">
            <Clock size={13} className="text-[#aa96ff]" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </span>
          <span>&middot;</span>
          <span className="text-[#aeb6c3]">Author: {portfolioData.name}</span>
        </div>

        {/* Technology Tag Pills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-xs font-medium text-[#d9dee7]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Executive Summary / Introduction */}
        <div className="mt-8 rounded-2xl border border-[rgba(124,92,255,0.2)] bg-[rgba(17,15,27,0.65)] p-6 sm:p-7 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#c4b8ff]">
            <BookOpen size={16} />
            <p className="eyebrow text-[#c4b8ff]">Overview &amp; Context</p>
          </div>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#d9dee7]">
            {post.introduction}
          </p>
        </div>

        {/* Visual Architecture Diagram (for Laravel MVC Article) */}
        {post.slug === 'laravel-mvc-architecture' && <MvcArchitectureDiagram />}

        {/* Main Article Sections with H2/H3 & Code Blocks */}
        <div className="mt-12 space-y-12">
          {post.sections.map((sec, secIdx) => (
            <section key={sec.heading} className="space-y-4">
              <div className="flex items-center gap-2.5 text-[#69e6cd]">
                <span className="font-mono text-xs font-bold text-[#69e6cd]">
                  0{secIdx + 1}
                </span>
                <span className="h-px w-6 bg-[#2bd9b5]/40" />
              </div>

              <h2 className="display text-2xl sm:text-3xl font-bold text-[#f2f3f7]">
                {sec.heading}
              </h2>

              <div className="space-y-3.5 text-sm sm:text-[15px] leading-7 text-[#d1d5db]">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Code Snippet Block */}
              {sec.codeBlock && (
                <div className="mt-6 overflow-hidden rounded-[20px] border border-white/10 bg-[#090c13] shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                  {/* Code Window Header */}
                  <div className="flex h-10 items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-[#ff5f56]/80" />
                      <span className="size-2.5 rounded-full bg-[#ffbd2e]/80" />
                      <span className="size-2.5 rounded-full bg-[#27c93f]/80" />
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#747b8b]">
                      <Code2 size={13} className="text-[#aa96ff]" />
                      <span>{sec.codeBlock.filename ?? sec.codeBlock.language}</span>
                    </div>

                    <CopyCodeButton code={sec.codeBlock.code} />
                  </div>

                  {/* Code Content */}
                  <pre className="overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#e2e8f0] [scrollbar-width:thin]">
                    <code>{sec.codeBlock.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Real-World Use Case Callout Box */}
        <section className="mt-14 rounded-[24px] border border-[rgba(43,217,181,0.25)] bg-[rgba(10,20,22,0.8)] p-6 sm:p-8 backdrop-blur-xl shadow-[0_16px_45px_rgba(43,217,181,0.08)]">
          <div className="flex items-center gap-2.5 text-[#69e6cd]">
            <Layers size={18} />
            <p className="eyebrow text-[#69e6cd]">Production Application</p>
          </div>

          <h3 className="display mt-3 text-xl sm:text-2xl font-bold text-[#f2f3f7]">
            Real-World Use Case: {post.realWorldUseCase.title}
          </h3>

          <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed">
            <div>
              <p className="font-semibold uppercase tracking-wider text-[#747b8b] text-[10px]">
                Engineering Scenario
              </p>
              <p className="mt-1 text-[#d9dee7]">{post.realWorldUseCase.scenario}</p>
            </div>

            <div className="border-t border-white/[0.08] pt-3.5">
              <p className="font-semibold uppercase tracking-wider text-[#747b8b] text-[10px]">
                Technical Implementation
              </p>
              <p className="mt-1 text-[#d9dee7]">{post.realWorldUseCase.implementation}</p>
            </div>

            <div className="border-t border-white/[0.08] pt-3.5">
              <p className="font-semibold uppercase tracking-wider text-[#69e6cd] text-[10px]">
                Architectural Impact
              </p>
              <p className="mt-1 text-[#f2f3f7] font-medium">{post.realWorldUseCase.impact}</p>
            </div>
          </div>
        </section>

        {/* Key Takeaways Checklist */}
        <section className="mt-12 rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.78)] p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#c4b5fd]">
            <Sparkles size={16} />
            <p className="eyebrow text-[#c4b5fd]">Summary</p>
          </div>

          <h3 className="display mt-2 text-xl font-bold text-[#f2f3f7]">
            Key Engineering Takeaways
          </h3>

          <ul className="mt-6 space-y-3">
            {post.keyTakeaways.map((takeaway) => (
              <li
                key={takeaway}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs sm:text-sm leading-relaxed text-[#d9dee7]"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.1)] text-[#2bd9b5] mt-0.5">
                  <Check size={12} />
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Prev / Next Article Navigation Footer */}
        <nav className="mt-14 grid gap-4 sm:grid-cols-2" aria-label="Article navigation">
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group rounded-[20px] border border-white/10 bg-[#0b0e15] p-5 transition hover:border-[rgba(124,92,255,0.4)]"
            >
              <div className="flex items-center gap-2 text-xs text-[#747b8b]">
                <ArrowLeft size={13} className="transition group-hover:-translate-x-1" />
                <span>Previous Article</span>
              </div>
              <p className="display mt-2 text-base sm:text-lg font-semibold text-[#f2f3f7] group-hover:text-[#c4b5fd] line-clamp-1">
                {previous.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-[20px] border border-white/10 bg-[#0b0e15] p-5 transition hover:border-[rgba(124,92,255,0.4)] sm:text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-[#747b8b]">
                <span>Next Article</span>
                <ArrowRight size={13} className="transition group-hover:translate-x-1" />
              </div>
              <p className="display mt-2 text-base sm:text-lg font-semibold text-[#f2f3f7] group-hover:text-[#c4b5fd] line-clamp-1">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* Back to Blog CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="button rounded-xl border-white/15 bg-white/[0.03] px-6 text-xs font-semibold text-[#f2f3f7] hover:border-white/30"
          >
            <ArrowLeft size={14} />
            <span>Back to All Technical Articles</span>
          </Link>
        </div>
      </article>
    </main>
  )
}
