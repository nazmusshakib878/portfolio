'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Cpu,
  GitMerge,
  Layers,
  Package,
  Server,
  Sparkles,
} from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/ui/reveal'

interface LearningArea {
  id: string
  title: string
  status: 'Deepening Knowledge' | 'Currently Exploring' | 'Building Practical Projects'
  statusColor: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  description: string
  topics: string[]
  accent: {
    badge: string
    border: string
    iconColor: string
    iconBg: string
    color: string
  }
}

const learningAreas: LearningArea[] = [
  {
    id: '01',
    title: 'Advanced Laravel',
    status: 'Deepening Knowledge',
    statusColor: 'text-[#69e6cd] bg-[#69e6cd]/10 border-[rgba(43,217,181,0.3)]',
    icon: Server,
    description:
      'Mastering advanced query scopes, database transaction safety, custom service providers, and scalable MVC design patterns.',
    topics: ['Architecture Improvement', 'Advanced Eloquent ORM', 'Scalable Patterns'],
    accent: {
      badge: 'border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.06)] text-[#ff9c90]',
      border: 'hover:border-[rgba(240,83,64,0.35)]',
      iconColor: 'text-[#f05340]',
      iconBg: 'border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.08)]',
      color: '#f05340',
    },
  },
  {
    id: '02',
    title: 'Advanced Next.js',
    status: 'Building Practical Projects',
    statusColor: 'text-[#c4b5fd] bg-[#c4b5fd]/10 border-[rgba(168,130,255,0.3)]',
    icon: Layers,
    description:
      'Exploring React Server Components (RSC), streaming responses, server actions, and Next.js performance tuning.',
    topics: ['App Router Patterns', 'Server Components', 'Performance Optimization'],
    accent: {
      badge: 'border-white/20 bg-white/[0.04] text-white',
      border: 'hover:border-white/30',
      iconColor: 'text-white',
      iconBg: 'border-white/20 bg-white/[0.06]',
      color: '#ffffff',
    },
  },
  {
    id: '03',
    title: 'System Design',
    status: 'Deepening Knowledge',
    statusColor: 'text-[#69e6cd] bg-[#69e6cd]/10 border-[rgba(43,217,181,0.3)]',
    icon: Cpu,
    description:
      'Studying clean system architectures, caching layers, rate limiting strategies, and relational database scalability.',
    topics: ['Backend Architecture', 'Database Scalability', 'API Design Patterns'],
    accent: {
      badge: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.06)] text-[#7dd3fc]',
      border: 'hover:border-[rgba(97,218,251,0.35)]',
      iconColor: 'text-[#7dd3fc]',
      iconBg: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.08)]',
      color: '#7dd3fc',
    },
  },
  {
    id: '04',
    title: 'Docker & Containers',
    status: 'Currently Exploring',
    statusColor: 'text-[#fcd34d] bg-[#fcd34d]/10 border-[rgba(252,211,77,0.3)]',
    icon: Package,
    description:
      'Learning containerization fundamentals, multi-stage Dockerfiles, and standardized local development environments for PHP & Node.',
    topics: ['Containerization Basics', 'Development Environments', 'Compose Services'],
    accent: {
      badge: 'border-[rgba(56,189,248,0.25)] bg-[rgba(56,189,248,0.06)] text-[#38bdf8]',
      border: 'hover:border-[rgba(56,189,248,0.35)]',
      iconColor: 'text-[#38bdf8]',
      iconBg: 'border-[rgba(56,189,248,0.25)] bg-[rgba(56,189,248,0.08)]',
      color: '#38bdf8',
    },
  },
  {
    id: '05',
    title: 'AWS Cloud Fundamentals',
    status: 'Currently Exploring',
    statusColor: 'text-[#fcd34d] bg-[#fcd34d]/10 border-[rgba(252,211,77,0.3)]',
    icon: Cloud,
    description:
      'Understanding essential cloud primitives, S3 static assets, EC2 application hosting, and deployment configurations.',
    topics: ['Cloud Fundamentals', 'Storage & Compute', 'Deployment Workflows'],
    accent: {
      badge: 'border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.06)] text-[#fbbf24]',
      border: 'hover:border-[rgba(245,158,11,0.35)]',
      iconColor: 'text-[#fbbf24]',
      iconBg: 'border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)]',
      color: '#fbbf24',
    },
  },
  {
    id: '06',
    title: 'CI/CD Pipelines',
    status: 'Building Practical Projects',
    statusColor: 'text-[#c4b5fd] bg-[#c4b5fd]/10 border-[rgba(168,130,255,0.3)]',
    icon: GitMerge,
    description:
      'Setting up automated testing suites, code verification checks, and GitHub Actions workflows for continuous delivery.',
    topics: ['Automated Testing', 'Deployment Pipelines', 'GitHub Actions'],
    accent: {
      badge: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.06)] text-[#c4b5fd]',
      border: 'hover:border-[rgba(168,130,255,0.35)]',
      iconColor: 'text-[#c4b5fd]',
      iconBg: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.08)]',
      color: '#c4b5fd',
    },
  },
  {
    id: '07',
    title: 'AI Engineering',
    status: 'Building Practical Projects',
    statusColor: 'text-[#c4b5fd] bg-[#c4b5fd]/10 border-[rgba(168,130,255,0.3)]',
    icon: Bot,
    description:
      'Advancing practical LLM integration techniques, structured streaming responses, function calling, and systematic prompt refinement.',
    topics: ['LLM Application Dev', 'AI API Integration', 'Prompt Engineering'],
    accent: {
      badge: 'border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.06)] text-[#69e6cd]',
      border: 'hover:border-[rgba(43,217,181,0.35)]',
      iconColor: 'text-[#2bd9b5]',
      iconBg: 'border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)]',
      color: '#2bd9b5',
    },
  },
]

export function CurrentlyLearning() {
  const reduceMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const pauseUntilRef = useRef(0)
  const inViewRef = useRef(false)
  const nudgedRef = useRef(false)

  // Drag interaction state
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragScrollLeftRef = useRef(0)
  const hasMovedRef = useRef(false)

  const pauseAutoplay = useCallback((durationMs = 6000) => {
    pauseUntilRef.current = Date.now() + durationMs
  }, [])

  const scrollToCard = useCallback((idx: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current
    const card = cardRefs.current[idx]
    if (!container || !card) return
    const targetScroll = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2
    container.scrollTo({ left: targetScroll, behavior })
  }, [])

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container || container.clientWidth === 0) return
    const containerCenter = container.scrollLeft + container.clientWidth / 2

    let closestIdx = 0
    let minDistance = Infinity

    for (let i = 0; i < cardRefs.current.length; i++) {
      const card = cardRefs.current[i]
      if (!card) continue
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(containerCenter - cardCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIdx = i
      }
    }

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx
      setActiveIndex(closestIdx)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      pauseAutoplay(6000)
      const nextIdx = (activeIndexRef.current + 1) % learningAreas.length
      scrollToCard(nextIdx, 'smooth')
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      pauseAutoplay(6000)
      const prevIdx = activeIndexRef.current === 0 ? learningAreas.length - 1 : activeIndexRef.current - 1
      scrollToCard(prevIdx, 'smooth')
    }
  }

  // Pointer drag to scroll on desktop/tablet
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    dragStartXRef.current = e.clientX
    const container = scrollRef.current
    if (container) {
      dragScrollLeftRef.current = container.scrollLeft
      container.style.scrollSnapType = 'none'
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - dragStartXRef.current
    if (Math.abs(dx) > 6) {
      hasMovedRef.current = true
      pauseAutoplay(6000)
    }
    const container = scrollRef.current
    if (container) {
      container.scrollLeft = dragScrollLeftRef.current - dx
    }
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const container = scrollRef.current
    if (container) {
      container.style.scrollSnapType = 'x mandatory'
      handleScroll()
      scrollToCard(activeIndexRef.current, 'smooth')
    }
  }

  // Active card detection via passive scroll listener throttled with RAF
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        handleScroll()
        rafId = 0
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })

    const onResize = () => {
      handleScroll()
    }
    window.addEventListener('resize', onResize, { passive: true })

    handleScroll()

    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [handleScroll])

  // Autoplay and First-view nudge (at all breakpoints)
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const cleanupTimers: ReturnType<typeof setTimeout>[] = []

    const inViewObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        inViewRef.current = entry.isIntersecting

        // First-view nudge: 60% visibility triggers a subtle 90px nudge forward and back once
        // Crucial: The nudge must NOT count as user interaction (no pauseAutoplay call)
        if (entry.intersectionRatio >= 0.6 && !nudgedRef.current) {
          nudgedRef.current = true
          if (!reduceMotion) {
            const t1 = setTimeout(() => {
              if (!scrollRef.current) return
              scrollRef.current.scrollBy({ left: 90, behavior: 'smooth' })
              const t2 = setTimeout(() => {
                scrollToCard(0, 'smooth')
              }, 600)
              cleanupTimers.push(t2)
            }, 350)
            cleanupTimers.push(t1)
          }
        }
      },
      { threshold: [0, 0.2, 0.6] }
    )

    inViewObserver.observe(container)

    let autoplayInterval: ReturnType<typeof setInterval> | null = null

    if (!reduceMotion) {
      autoplayInterval = setInterval(() => {
        if (
          !inViewRef.current ||
          document.hidden ||
          Date.now() < pauseUntilRef.current
        ) {
          return
        }

        const nextIdx = (activeIndexRef.current + 1) % learningAreas.length
        scrollToCard(nextIdx, 'smooth')
      }, 4000)
    }

    // Pause on user interactions (touch, pointer down, focus in, fine pointer hover)
    const onUserInteraction = () => pauseAutoplay(6000)
    const onMouseEnter = () => {
      if (window.matchMedia('(pointer: fine)').matches) {
        pauseAutoplay(6000)
      }
    }

    container.addEventListener('touchstart', onUserInteraction, { passive: true })
    container.addEventListener('pointerdown', onUserInteraction, { passive: true })
    container.addEventListener('focusin', onUserInteraction, { passive: true })
    container.addEventListener('mouseenter', onMouseEnter, { passive: true })

    return () => {
      inViewObserver.disconnect()
      if (autoplayInterval) clearInterval(autoplayInterval)
      cleanupTimers.forEach(clearTimeout)
      container.removeEventListener('touchstart', onUserInteraction)
      container.removeEventListener('pointerdown', onUserInteraction)
      container.removeEventListener('focusin', onUserInteraction)
      container.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [reduceMotion, pauseAutoplay, scrollToCard])

  const activeArea = learningAreas[activeIndex] || learningAreas[0]
  const ActiveIcon = activeArea.icon

  return (
    <section id="learning" className="section section-cv relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">07 / Growth Roadmap</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Active engineering exploration, continuous learning, and future technical roadmap.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] px-3 py-1 text-xs font-semibold text-[#69e6cd] mb-3">
                <Sparkles size={12} />
                <span>Active Growth Trajectory</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Currently learning <span className="text-[#9aa6b7]">in 2026.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Unified Swipeable Snap Deck & Preview Panel on ALL Screen Sizes */}
        <Reveal className="mt-14 lg:mt-16">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Currently learning areas roadmap"
            className="learning-deck-container relative"
          >
            {/* The Horizontal Snap Deck */}
            <div
              ref={scrollRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              aria-label="Swipeable learning roadmap cards, use arrow keys to navigate"
              className="relative flex snap-x snap-mandatory overflow-x-auto no-scrollbar py-6 outline-none focus-visible:ring-1 focus-visible:ring-white/30 cursor-grab active:cursor-grabbing select-none"
              style={{
                scrollSnapType: 'x mandatory',
                overscrollBehaviorX: 'contain',
                paddingInline: 'calc(50% - var(--card-w) / 2)',
                gap: 'var(--deck-gap)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <ul role="list" className="contents">
                {learningAreas.map((area, idx) => {
                  const Icon = area.icon
                  const isActive = idx === activeIndex

                  return (
                    <li
                      key={area.id}
                      ref={(node) => {
                        cardRefs.current[idx] = node
                      }}
                      role="listitem"
                      aria-current={isActive ? 'true' : undefined}
                      className="flex-none snap-center flex flex-col"
                      style={{ width: 'var(--card-w)' }}
                    >
                      <article
                        onClick={() => {
                          if (hasMovedRef.current) return
                          pauseAutoplay(6000)
                          scrollToCard(idx, 'smooth')
                        }}
                        style={{
                          transform: isActive ? 'scale(1)' : 'scale(0.9)',
                          opacity: isActive ? 1 : 0.5,
                          transition: 'transform 250ms ease, opacity 250ms ease',
                        }}
                        className={`group relative flex h-full min-h-[300px] flex-col justify-between rounded-[22px] border bg-[rgba(15,18,25,0.96)] p-6 overflow-hidden cursor-pointer ${
                          isActive ? 'border-white/25 shadow-none' : 'border-white/10'
                        }`}
                      >
                        {/* Colored Top Accent Bar */}
                        <div
                          className="absolute top-0 inset-x-0 h-[4px] rounded-t-[22px] transition-all duration-250 pointer-events-none"
                          style={{
                            background: isActive
                              ? `linear-gradient(90deg, ${area.accent.color}, transparent)`
                              : 'transparent',
                          }}
                          aria-hidden="true"
                        />

                        <div>
                          {/* Top Row: Icon + Large Faint Number Watermark */}
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`flex size-10 items-center justify-center rounded-xl border ${area.accent.iconBg} ${area.accent.iconColor} transition-transform duration-250 ${
                                isActive ? 'scale-105' : ''
                              }`}
                            >
                              <Icon size={18} aria-hidden="true" />
                            </span>
                            <span
                              className="display text-3xl sm:text-4xl font-bold transition-all duration-250"
                              style={{
                                color: isActive ? area.accent.color : 'rgba(255, 255, 255, 0.15)',
                                opacity: isActive ? 0.35 : 0.12,
                              }}
                            >
                              {area.id}
                            </span>
                          </div>

                          {/* Status Pill */}
                          <div className="mt-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${area.statusColor}`}
                            >
                              <span className="size-1.5 rounded-full bg-current animate-pulse" />
                              <span>{area.status}</span>
                            </span>
                          </div>

                          {/* Title Tinted with Accent Color When Active */}
                          <h3
                            className="display mt-3 text-lg sm:text-xl font-semibold transition-colors duration-250"
                            style={{ color: isActive ? area.accent.color : '#f2f3f7' }}
                          >
                            {area.title}
                          </h3>

                          {/* Description */}
                          <p className="muted mt-2 text-xs leading-relaxed">
                            {area.description}
                          </p>
                        </div>

                        {/* Topics List */}
                        <div className="mt-6 border-t border-white/[0.07] pt-4">
                          <ul aria-label={`${area.title} topics`} className="flex flex-wrap gap-1.5">
                            {area.topics.map((topic) => (
                              <li
                                key={topic}
                                className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-0.5 text-[10.5px] font-medium text-[#d9dee7]"
                              >
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Controls Bar: Counter, Pagination Dots, and Arrow Buttons */}
            <div className="flex items-center justify-between mt-4 px-2 sm:px-6">
              {/* Left Indicator (Tablet/Desktop) */}
              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/40 w-24">
                <span className="font-semibold text-white/80">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span>/</span>
                <span>{String(learningAreas.length).padStart(2, '0')}</span>
              </div>

              {/* Center: Interactive Dots (All Breakpoints) */}
              <div
                className="flex items-center justify-center gap-2 mx-auto"
                role="tablist"
                aria-label="Currently learning roadmap pagination"
              >
                {learningAreas.map((area, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={area.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to ${area.title} (${area.id})`}
                      onClick={() => {
                        pauseAutoplay(6000)
                        scrollToCard(idx, 'smooth')
                      }}
                      className="min-w-[24px] min-h-[24px] p-1 flex items-center justify-center cursor-pointer group focus:outline-none"
                    >
                      <span
                        className={`h-2 rounded-full transition-all duration-250 ${
                          isActive
                            ? 'w-8'
                            : 'w-2 bg-white/20 group-hover:bg-white/40'
                        }`}
                        style={{
                          backgroundColor: isActive ? area.accent.color : undefined,
                        }}
                      />
                    </button>
                  )
                })}
              </div>

              {/* Right: Previous / Next Arrow Buttons (Tablet/Desktop) */}
              <div className="hidden md:flex items-center gap-2 w-24 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    pauseAutoplay(6000)
                    const prevIdx = activeIndex === 0 ? learningAreas.length - 1 : activeIndex - 1
                    scrollToCard(prevIdx, 'smooth')
                  }}
                  aria-label="Previous learning area"
                  className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    pauseAutoplay(6000)
                    const nextIdx = (activeIndex + 1) % learningAreas.length
                    scrollToCard(nextIdx, 'smooth')
                  }}
                  aria-label="Next learning area"
                  className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Preview Window Card (Below Deck, Synced to Active Card, Cross-Fading) */}
            <div className="mt-8">
              <div
                className="overflow-hidden rounded-[22px] border border-white/12 bg-[rgba(15,18,25,0.96)] shadow-xl transition-all duration-250 min-h-[280px] sm:min-h-[250px] md:min-h-[210px] flex flex-col justify-between"
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Browser Window Header with 3 Dots */}
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-[#ff5f56]/70 border border-[#ff5f56]/40" />
                    <span className="size-2.5 rounded-full bg-[#ffbd2e]/70 border border-[#ffbd2e]/40" />
                    <span className="size-2.5 rounded-full bg-[#27c93f]/70 border border-[#27c93f]/40" />
                    <span className="ml-3 font-mono text-[11px] text-white/40 hidden sm:inline-block">
                      growth-roadmap://area/{activeArea.id}-{activeArea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${activeArea.statusColor}`}
                  >
                    <span className="size-1.5 rounded-full bg-current animate-pulse" />
                    <span>{activeArea.status}</span>
                  </span>
                </div>

                {/* Preview Window Body (Cross-fades smoothly on active card change) */}
                <div
                  key={activeArea.id}
                  className="p-6 sm:p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center transition-opacity duration-250 opacity-100"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Large Icon on Accent Gradient */}
                    <div
                      className="flex size-16 sm:size-20 shrink-0 items-center justify-center rounded-2xl border transition-all duration-250 shadow-inner"
                      style={{
                        background: `linear-gradient(135deg, ${activeArea.accent.color}22, ${activeArea.accent.color}06)`,
                        borderColor: `${activeArea.accent.color}45`,
                        color: activeArea.accent.color,
                      }}
                    >
                      <ActiveIcon size={32} aria-hidden="true" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <span
                          className="display text-xs font-semibold tracking-wider uppercase transition-colors duration-250"
                          style={{ color: activeArea.accent.color }}
                        >
                          Area {activeArea.id}
                        </span>
                        <span className="text-white/20">/</span>
                        <span className="text-xs font-medium text-white/60">Active Roadmap Focus</span>
                      </div>
                      <h3 className="display mt-1 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
                        {activeArea.title}
                      </h3>
                      <p className="muted mt-2 text-sm leading-relaxed max-w-xl">
                        {activeArea.description}
                      </p>
                    </div>
                  </div>

                  {/* Focus Areas List */}
                  <div className="border-t md:border-t-0 md:border-l border-white/[0.08] pt-5 md:pt-0 md:pl-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
                      Focus areas
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label={`${activeArea.title} focus areas`}>
                      {activeArea.topics.map((topic) => (
                        <li
                          key={topic}
                          className="rounded-lg border border-white/[0.1] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-[#d9dee7]"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
