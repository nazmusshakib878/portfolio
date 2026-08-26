'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Sparkles,
} from 'lucide-react'
import type { BlogPost } from '@/types/blog'

interface BlogListingProps {
  initialPosts: BlogPost[]
  categories: string[]
}

export function BlogListing({ initialPosts, categories }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [initialPosts, selectedCategory, searchQuery])

  return (
    <div>
      {/* Search & Category Filter Controls */}
      <div className="mt-10 flex flex-col gap-5 rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.7)] p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills (horizontally scrollable on mobile, wrapped on desktop) */}
        <div className="flex max-w-full items-center gap-2 overflow-x-auto py-0.5 no-scrollbar flex-nowrap sm:flex-wrap">
          <span className="mr-1 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#747b8b]">
            <Filter size={12} />
            <span>Category:</span>
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? 'border border-[rgba(124,92,255,0.45)] bg-[rgba(124,92,255,0.18)] text-white shadow-[0_0_15px_rgba(124,92,255,0.2)]'
                    : 'border border-white/10 bg-white/[0.025] text-[#aeb6c3] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Quick Keyword Search */}
        <div className="w-full sm:max-w-xs">
          <label htmlFor="blog-search" className="sr-only">
            Search articles by topic, keyword, or tag
          </label>
          <input
            id="blog-search"
            type="text"
            placeholder="Search by topic, keyword, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#7c5cff] focus:outline-none transition"
          />
        </div>
      </div>

      {/* Review Notice Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.05)] p-4 text-xs text-[#fef3c7]">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-[#f59e0b]" />
        <div>
          <span className="font-semibold text-[#fbbf24]">Draft Review Transparency: </span>
          <span>
            Initial technical writing drafts are published with full engineering examples and marked for ongoing editorial refinement.
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.78)] p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[rgba(124,92,255,0.38)] hover:bg-[rgba(17,22,32,0.9)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              <div>
                {/* Header */}
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
                <h2 className="display mt-3 text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* Summary */}
                <p className="muted mt-2.5 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div>
                {/* Technology Tags */}
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

                {/* Action Link */}
                <div className="mt-5 flex items-center justify-between">
                  {post.isDraft && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#747b8b]">
                      <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                      <span>Draft</span>
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
          ))}
        </div>
      ) : (
        <div className="mt-14 rounded-2xl border border-white/10 bg-[rgba(15,18,25,0.7)] p-12 text-center">
          <BookOpen size={32} className="mx-auto text-[#747b8b]" />
          <p className="display mt-4 text-lg font-semibold text-[#f2f3f7]">
            No articles found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="muted mt-1 text-xs">
            Try choosing another category or clearing your search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
            }}
            className="button mt-6 rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
