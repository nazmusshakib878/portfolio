import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { getFeaturedBlogPosts } from '@/data/blog-posts'

export function TechnicalWritingSection() {
  const featuredPosts = getFeaturedBlogPosts(3)

  return (
    <section id="writing" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">11 / Technical Writing</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Practical notes and engineering insights from building real-world software.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7] mb-3">
                <BookOpen size={13} className="text-[#c4b5fd]" />
                <span>Engineering Notes &amp; Articles</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Technical <span className="text-[#9aa6b7]">Writing.</span>
              </h2>
              <p className="muted mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                Practical notes and engineering insights from the technologies I use to build real-world applications.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 3 Featured Article Cards Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {featuredPosts.map((post, idx) => (
            <Reveal key={post.slug}>
              <article className="group flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.78)] p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[rgba(124,92,255,0.35)] hover:bg-[rgba(17,22,32,0.9)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div>
                  {/* Top Metadata Row: Category Badge + Reading Time + Draft Review Indicator */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5fd]">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-[#747b8b]">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Date & Reading Time */}
                  <div className="mt-4 flex items-center gap-3 text-xs text-[#747b8b]">
                    <span className="inline-flex items-center gap-1.5 text-[#aeb6c3]">
                      <Calendar size={12} className="text-[#69e6cd]" aria-hidden="true" />
                      <span>{post.formattedDate}</span>
                    </span>
                    <span>&middot;</span>
                    <span className="inline-flex items-center gap-1.5 text-[#aeb6c3]">
                      <Clock size={12} className="text-[#aa96ff]" aria-hidden="true" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="display mt-3 text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Summary */}
                  <p className="muted mt-2.5 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div>
                  {/* Technology Tag Chips */}
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-0.5 text-[10.5px] font-medium text-[#d9dee7]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Article Button */}
                  <div className="mt-5 flex items-center justify-between">
                    {post.isDraft && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#747b8b]">
                        <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                        <span>Draft for Review</span>
                      </span>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-[rgba(124,92,255,0.25)] bg-[rgba(124,92,255,0.08)] px-3.5 py-2 text-xs font-semibold text-[#c4b5fd] transition hover:border-[rgba(124,92,255,0.45)] hover:bg-[rgba(124,92,255,0.15)] hover:text-white"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* View All Articles Bar */}
        <Reveal className="mt-8 lg:mt-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.7)] p-5 sm:p-6 backdrop-blur-md sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] text-[#69e6cd]">
                <Sparkles size={16} />
              </span>
              <div>
                <p className="text-xs font-semibold text-[#f2f3f7]">
                  Looking for more engineering insights and tutorials?
                </p>
                <p className="text-[11px] text-[#747b8b] mt-0.5">
                  Browse the complete technical writing index and categories.
                </p>
              </div>
            </div>

            <Link
              href="/blog"
              className="button min-h-10 rounded-xl border-white/15 bg-white/[0.03] px-4 text-xs font-semibold text-[#f2f3f7] hover:border-white/30"
            >
              <span>Explore All Articles</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
