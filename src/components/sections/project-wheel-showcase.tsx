'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { animate } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  ExternalLink,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData, projectSlug } from '@/data/portfolio'
import { projectCovers } from '@/data/project-covers'

const CAROUSEL_GEOMETRY = {
  phone: { step: 18, radius: 420, drop: 72, perspective: 1100 },
  tablet: { step: 24, radius: 570, drop: 120, perspective: 1300 },
  desktop: { step: 30, radius: 680, drop: 150, perspective: 1400 },
} as const

/**
 * Returns tailored color tokens for technology badges based on category/brand
 */
function getTechBadgeStyle(tech: string) {
  if (tech.includes('Laravel')) {
    return 'border-[rgba(240,83,64,0.28)] text-[#ff9c90] bg-[rgba(240,83,64,0.06)]'
  }
  if (tech.includes('React') || tech.includes('Next.js') || tech.includes('Vite') || tech.includes('TypeScript')) {
    return 'border-[rgba(97,218,251,0.28)] text-[#7dd3fc] bg-[rgba(97,218,251,0.06)]'
  }
  if (tech.includes('OpenAI') || tech.includes('Gemini') || tech.includes('AI')) {
    return 'border-[rgba(168,130,255,0.3)] text-[#c4b5fd] bg-[rgba(168,130,255,0.08)]'
  }
  if (
    tech.includes('MySQL') ||
    tech.includes('PostgreSQL') ||
    tech.includes('Supabase') ||
    tech.includes('Relational') ||
    tech.includes('Database')
  ) {
    return 'border-[rgba(43,217,181,0.28)] text-[#69e6cd] bg-[rgba(43,217,181,0.06)]'
  }
  if (
    tech.includes('n8n') ||
    tech.includes('Telegram') ||
    tech.includes('Docker') ||
    tech.includes('Google Sheets') ||
    tech.includes('Workflow')
  ) {
    return 'border-[rgba(234,75,113,0.28)] text-[#ff7597] bg-[rgba(234,75,113,0.06)]'
  }
  return 'border-white/10 text-[#d9dee7] bg-white/[0.025]'
}

interface ProjectCardProps {
  project: (typeof portfolioData.projects)[number]
  index: number
  isActive: boolean
  cover: string
  cardWidth: number
  cardHeight: number
  isMobile: boolean
  isPaused: boolean
  liteMode: boolean
  onSelect: (index: number) => void
  onLinkClick: (e: React.MouseEvent) => void
  setCardRef: (el: HTMLDivElement | null) => void
}

/**
 * Memoized Project Card:
 * Lightened side/inactive cards render only cover thumbnail + index badge + title + select hint.
 * Heavy details (full summary, key highlights, tech badges, action buttons) render ONLY for the active card.
 * Inactive cards omit backdrop-filter and heavy box-shadows to ensure butter-smooth GPU compositing.
 */
const ProjectCard = memo(function ProjectCard({
  project,
  index,
  isActive,
  cover,
  cardWidth,
  cardHeight,
  isMobile,
  isPaused,
  liteMode,
  onSelect,
  onLinkClick,
  setCardRef,
}: ProjectCardProps) {
  const caseStudyHref = `/projects/${projectSlug(project.title)}`
  const router = useRouter()
  const tiltRafRef = useRef<number | null>(null)

  const handleTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !isActive || event.pointerType !== 'mouse' || liteMode ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) return

    const card = event.currentTarget
    if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current)
    tiltRafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
      card.style.setProperty('--tilt-x', `${Math.round(-y * 40) / 10}deg`)
      card.style.setProperty('--tilt-y', `${Math.round(x * 40) / 10}deg`)
    })
  }

  return (
    <div
      ref={setCardRef}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive ? 'true' : undefined}
      onClick={(e) => {
        if (!isActive) {
          e.preventDefault()
          onSelect(index)
          return
        }

        if (!(e.target as HTMLElement).closest('a, button, [data-action-button="true"]')) {
          router.push(caseStudyHref)
        }
      }}
      onKeyDown={(e) => {
        if (isActive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          router.push(caseStudyHref)
        }
      }}
      onPointerMove={handleTilt}
      onPointerLeave={(event) => {
        if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current)
        event.currentTarget.style.setProperty('--tilt-x', '0deg')
        event.currentTarget.style.setProperty('--tilt-y', '0deg')
      }}
      data-project-card="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        willChange: isActive ? 'transform' : 'auto',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      className={`group absolute flex flex-col overflow-hidden rounded-[24px] text-left select-none touch-pan-y pointer-events-auto transition-[border-color,background-color] duration-300 ${
        isActive
          ? 'cursor-pointer border border-[rgba(0,245,255,0.48)] bg-[rgba(13,17,26,0.98)] shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_36px_rgba(0,245,255,0.18)]'
          : 'cursor-pointer border border-white/10 bg-[#0c1019] hover:border-[#00f5ff]/35'
      }`}
    >
      {/* Static Active Card Glow — Mounted strictly on the active card */}
      {isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[23px] border border-[#aaf8ff]/30"
        />
      )}

      {/* Mouse-Follow Active Sheen — rAF-throttled via CSS variables on active card only */}
      {isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,245,255,0.08), transparent 70%)',
          }}
        />
      )}

      {/* Visual Cover Thumbnail — Optimized Next/Image with responsive sizes & lazy loading */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-t-[23px] border-b border-white/[0.08] bg-[#080b12]">
        <Image
          src={cover}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(max-width: 768px) 78vw, 420px"
          quality={70}
          draggable={false}
          decoding="async"
          loading={isActive || index === 0 ? 'eager' : 'lazy'}
          className={`object-cover select-none pointer-events-none transition-transform duration-[600ms] ${
            isActive ? 'scale-[1.05]' : 'scale-100'
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d15] via-transparent to-transparent" />

        {/* Top Bar Badges */}
        <div className="pointer-events-none absolute left-3.5 top-3.5 flex items-center gap-1.5 z-20">
          <span className="rounded-full border border-white/15 bg-black/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
            0{index + 1}
          </span>
          {isActive && (
            <span className="rounded-full border border-[#00f5ff]/35 bg-[#00f5ff]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00f5ff]">
              {project.category}
            </span>
          )}
        </div>

        {isActive && project.liveUrl && (
          <span className="pointer-events-none absolute right-3.5 top-3.5 inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-black/80 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400 z-20">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            Live
          </span>
        )}
      </div>

      {/* Card Content: Full Details for Active Card vs Lightened Inactive Card */}
      {isActive ? (
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 pb-4 sm:pb-5">
          {/* Top: Category, Role, Title, Summary */}
          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00f5ff] shrink-0">
                {project.category}
              </span>
              {project.role && (
                <span className="text-[11.5px] font-medium text-[#c4cad4] text-right">
                  {project.role}
                </span>
              )}
            </div>

            <h3 className="display text-base sm:text-[18px] font-bold tracking-tight text-white leading-snug">
              {project.title}
            </h3>

            <p className="line-clamp-3 text-[11px] sm:text-[11.5px] leading-relaxed text-[#c4cad4]">
              {project.summary}
            </p>
          </div>

          {/* Middle: Key Architectural Highlights */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="my-auto py-1.5 hidden sm:flex flex-col">
              <ul className="flex flex-col text-[11px] text-[#c4cad4]">
                {project.keyFeatures.slice(0, 1).map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-1.5 leading-snug">
                    <Check size={12} className="shrink-0 text-[#00f5ff] mt-0.5" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom: Tech Stack Badges directly above Button Bar */}
          <div className="mt-auto flex flex-col gap-3 sm:gap-3.5">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.slice(0, isMobile ? 3 : 5).map((tech) => (
                <span
                  key={tech}
                  className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium ${getTechBadgeStyle(
                    tech
                  )}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="justify-end pt-3 border-t border-white/[0.08] flex items-center gap-1.5 relative z-20">
              <Link
                href={caseStudyHref}
                onClick={onLinkClick}
                data-action-button="true"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#00f5ff]/35 bg-[#00f5ff]/[0.07] px-2.5 text-[10px] font-semibold text-[#8ff8ff] hover:bg-[#00f5ff]/[0.13] transition shrink-0"
              >
                <ArrowUpRight size={12} />
                <span>Case Study</span>
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onLinkClick}
                  data-action-button="true"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/20 transition shrink-0"
                  aria-label={`${project.liveLabel ?? 'Live Demo'} of ${project.title}`}
                  title={project.liveLabel ?? 'Live Demo'}
                >
                  <ExternalLink size={13} />
                  <span>{project.liveLabel ?? 'Live'}</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onLinkClick}
                  data-action-button="true"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-2.5 text-[10px] font-semibold text-[#d9dee7] hover:border-white/30 hover:text-white transition shrink-0"
                  aria-label={project.githubLabel ?? `GitHub repo of ${project.title}`}
                  title={project.githubLabel ?? 'GitHub Repository'}
                >
                  <SiGithub size={13} />
                  <span>{project.githubLabel ?? 'GitHub'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Compact inactive preview: cover, identity and stack without an empty lower body. */
        <div className="relative flex flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#9aa6b7]">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-[#aeb6c3]">
              0{index + 1}
            </span>
          </div>

          <h3 className="display mt-2 text-sm sm:text-base font-semibold text-[#f2f3f7] group-hover:text-white leading-snug transition-colors line-clamp-2">
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${getTechBadgeStyle(tech)}`}>
                {tech}
              </span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0c1019] to-transparent" />
          <div className="project-wheel-select-hint relative mt-3 items-center justify-between border-t border-white/[0.06] pt-3 text-xs font-medium text-[#aeb6c3] transition-colors group-hover:text-[#00f5ff]">
            <span>Click to select</span>
            <ArrowRight size={13} className="transition group-hover:translate-x-1" />
          </div>
        </div>
      )}

      {isActive && !liteMode && (
        <div
          aria-hidden="true"
          className="project-wheel-progress absolute inset-x-0 bottom-0 z-40 h-[2px] origin-left bg-[#00f5ff]"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        />
      )}
    </div>
  )
})

export function ProjectWheelShowcase() {
  const projects = portfolioData.projects
  const total = projects.length

  // React state updated strictly on card boundary change (zero per-frame state churn)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [autoplayHeld, setAutoplayHeld] = useState(false)
  const [liteMode, setLiteMode] = useState(false)
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  // Authoritative animation position & interaction tracking refs
  const posRef = useRef(0)
  const activeIndexRef = useRef(0)
  const isPausedRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const hasDraggedRef = useRef(false)
  const isFocusedRef = useRef(false)
  const inViewRef = useRef(true)
  const holdUntilRef = useRef(0)
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Active tween reference (Motion's animate controls)
  const tweenRef = useRef<{ stop: () => void } | null>(null)

  // Kinematic pointer drag tracker
  const dragRef = useRef<{
    pointerId: number
    pointerType: string
    startX: number
    startY: number
    startPos: number
    lastX: number
    lastTime: number
    velocity: number
    captured: boolean
  } | null>(null)

  // DOM node references for direct compositor-level transform and property manipulation
  const stageRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const dialRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Responsive geometry parameters stored in a ref for zero-reconciliation access
  const dimsRef = useRef({
    cardWidth: 370,
    cardHeight: 540,
    radius: 1353,
    step: 0.3274,
    drop: 150,
    gap: 33,
    perspective: 2870,
    stageHeight: 615,
    isMobile: false,
  })

  // Responsive geometry calculations based on current window width (size cards ~80vw on phones)
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024
  const cardWidth = isMobile
    ? Math.min(320, Math.max(270, Math.round(windowWidth * 0.80)))
    : isTablet
    ? 340
    : 370
  const cardHeight = isMobile ? 560 : isTablet ? 545 : 540
  const stageHeight = isMobile ? 620 : isTablet ? 620 : 615
  const perspective = (isMobile ? CAROUSEL_GEOMETRY.phone : isTablet ? CAROUSEL_GEOMETRY.tablet : CAROUSEL_GEOMETRY.desktop).perspective

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    setLiteMode(query.get('lite') === '1' || query.get('off') === 'carousel')
  }, [])

  useEffect(() => () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
  }, [])

  // Symmetric modulo wrap helper for continuous looping [-total/2, total/2]
  const wrapN = useCallback(
    (val: number) => {
      let v = val % total
      if (v > total / 2) v -= total
      if (v < -total / 2) v += total
      return v
    },
    [total]
  )

  // Direct compositor render function: writes transform, opacity, visibility & zIndex directly to card refs
  const render = useCallback(() => {
    const pos = posRef.current
    const { radius, step, drop, isMobile: isMobileDevice } = dimsRef.current

    // 1. Update background decorative rotary dial track
    if (dialRef.current) {
      const stepDeg = (step * 180) / Math.PI
      dialRef.current.style.transform = `translate(-50%, -50%) rotate(${(-pos * stepDeg).toFixed(2)}deg)`
    }

    // 2. Active index check: update React state ONLY when nearest integer changes
    const near = ((Math.round(pos) % total) + total) % total
    if (near !== activeIndexRef.current) {
      const previousCard = cardRefs.current[activeIndexRef.current]
      previousCard?.style.setProperty('--tilt-x', '0deg')
      previousCard?.style.setProperty('--tilt-y', '0deg')
      activeIndexRef.current = near
      setActiveIndex(near)
    }

    // 3. Update each project card with 3D arc position and culling
    // On phones reduce visible neighbours to 3 total (d <= 1.4); on desktop ~5 cards (d <= 2.6)
    const maxDist = isMobileDevice ? 1.4 : 2.6
    const fadeRange = isMobileDevice ? 0.3 : 0.8

    for (let i = 0; i < total; i++) {
      const card = cardRefs.current[i]
      if (!card) continue

      const off = wrapN(i - pos)
      const a = off * step
      const d = Math.abs(off)

      const baseOpacity = d <= 1 ? 1 - d * 0.3 : Math.max(0.35, 0.7 - (d - 1) * 0.35)
      const edgeFade = d <= maxDist - fadeRange ? 1 : Math.max(0, 1 - (d - (maxDist - fadeRange)) / fadeRange)
      const op = baseOpacity * edgeFade
      const isVisible = op > 0.005

      // Cylinder arc: side cards sweep down and back, centre card is lifted forward.
      const tx = Math.round(Math.sin(a) * radius)
      const depth = 1 - Math.cos(a)
      const ty = Math.round(depth * drop)
      const centreLift = Math.max(0, 1 - d) * 92
      const tz = Math.round(-depth * radius + centreLift)
      const rotY = (-a * (180 / Math.PI)).toFixed(2)
      const scale = d <= 1 ? 1 - d * 0.18 : Math.max(0.62, 0.82 - (d - 1) * 0.14)

      card.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${rotY}deg) scale(${scale.toFixed(3)}) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`
      card.style.opacity = op.toFixed(3)
      card.style.visibility = isVisible ? 'visible' : 'hidden'
      card.style.pointerEvents = op > 0.5 ? 'auto' : 'none'
      card.style.zIndex = String(1000 - Math.round(d * 100))
    }
  }, [total, wrapN])

  // Temporarily pause autoplay following manual user interactions
  const holdAutoplay = useCallback((ms = 4500) => {
    holdUntilRef.current = performance.now() + ms
    setAutoplayHeld(true)
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    holdTimerRef.current = setTimeout(() => {
      if (performance.now() >= holdUntilRef.current) setAutoplayHeld(false)
    }, ms + 20)
  }, [])

  // Smooth position tween using Motion's animate() with power3.out easing (~0.9s duration)
  const animateTo = useCallback(
    (target: number, customDuration?: number) => {
      // Kill any in-flight tween
      if (tweenRef.current) {
        tweenRef.current.stop()
        tweenRef.current = null
      }

      const current = posRef.current
      const dist = Math.abs(target - current)
      if (dist < 0.001) {
        posRef.current = target
        render()
        return
      }

      // Check prefers-reduced-motion
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        posRef.current = target
        render()
        return
      }

      // GSAP power3.out equivalent cubic-bezier: [0.215, 0.61, 0.355, 1]
      const duration = customDuration ?? Math.min(1.2, 0.55 + dist * 0.12)
      const anim = animate(current, target, {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
        onUpdate: (latest) => {
          posRef.current = latest
          render()
        },
        onComplete: () => {
          tweenRef.current = null
        },
      })

      tweenRef.current = anim
    },
    [render]
  )

  // Navigation handlers — rapid clicks advance predictably
  const goTo = useCallback(
    (index: number) => {
      holdAutoplay(5000)
      const base = posRef.current
      const offset = wrapN(index - base)
      animateTo(base + offset)
    },
    [wrapN, animateTo, holdAutoplay]
  )

  const next = useCallback(() => {
    holdAutoplay(5000)
    animateTo(Math.round(posRef.current) + 1)
  }, [animateTo, holdAutoplay])

  const prev = useCallback(() => {
    holdAutoplay(5000)
    animateTo(Math.round(posRef.current) - 1)
  }, [animateTo, holdAutoplay])

  // Measure geometry and update perspective
  const measure = useCallback(() => {
    if (typeof window === 'undefined') return
    const w = window.innerWidth
    const mobile = w < 640
    const tablet = w >= 640 && w < 1024

    const cw = mobile
      ? Math.min(320, Math.max(270, Math.round(w * 0.80)))
      : tablet
      ? 340
      : 370
    const ch = mobile ? 560 : tablet ? 545 : 540
    const profile = mobile ? CAROUSEL_GEOMETRY.phone : tablet ? CAROUSEL_GEOMETRY.tablet : CAROUSEL_GEOMETRY.desktop
    const gap = Math.round(cw * (mobile ? 0.05 : 0.07))
    const rad = profile.radius
    const stp = ((liteMode ? profile.step * 0.55 : profile.step) * Math.PI) / 180
    const persp = profile.perspective
    const stgH = mobile ? 620 : tablet ? 620 : 615

    dimsRef.current = {
      cardWidth: cw,
      cardHeight: ch,
      radius: rad,
      step: stp,
      drop: profile.drop,
      gap,
      perspective: persp,
      stageHeight: stgH,
      isMobile: mobile,
    }

    if (stackRef.current) {
      stackRef.current.style.perspective = `${persp}px`
    }
  }, [liteMode])

  // Window resize handler debounced by 150ms
  useEffect(() => {
    measure()
    render()

    let timer: NodeJS.Timeout | null = null
    const handleResize = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        setWindowWidth(window.innerWidth)
        measure()
        render()
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timer) clearTimeout(timer)
    }
  }, [measure, render])

  // Drag interaction: pointerdown on stage, pointermove/pointerup on window with 6px threshold & smoothed velocity
  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return

    // Do not initiate drag if user interacted with a button, link, or action control
    const target = e.target as HTMLElement | null
    if (target?.closest('button, .button, a, [data-action-button="true"]')) {
      holdAutoplay(5000)
      return
    }

    // Kill any in-flight tween immediately
    if (tweenRef.current) {
      tweenRef.current.stop()
      tweenRef.current = null
    }
    holdAutoplay(5000)

    dragRef.current = {
      pointerId: e.pointerId,
      pointerType: e.pointerType,
      startX: e.clientX,
      startY: e.clientY,
      startPos: posRef.current,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      captured: false,
    }
    hasDraggedRef.current = false
  }

  // Window pointer event listeners for seamless drag tracking outside stage boundaries
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== e.pointerId) return

      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY

      if (!drag.captured) {
        // 6px drag threshold
        if (Math.hypot(dx, dy) < 6) return

        // On touch: if vertical movement dominates, allow native vertical page scroll and cancel wheel drag
        if (drag.pointerType === 'touch' && Math.abs(dy) > Math.abs(dx)) {
          dragRef.current = null
          isDraggingRef.current = false
          return
        }

        drag.captured = true
        hasDraggedRef.current = true
        isDraggingRef.current = true
        if (stageRef.current) {
          stageRef.current.classList.add('cursor-grabbing')
          stageRef.current.classList.remove('cursor-grab')
        }
      }

      const now = performance.now()
      const dt = Math.max(1, now - drag.lastTime)
      const instV = (e.clientX - drag.lastX) / dt

      // Smoothed velocity: v = v * 0.6 + new * 0.4
      drag.velocity = drag.velocity * 0.6 + instV * 0.4
      drag.lastX = e.clientX
      drag.lastTime = now

      const stepPx = dimsRef.current.cardWidth + dimsRef.current.gap
      posRef.current = drag.startPos - dx / stepPx
      render()
    }

    const onPointerUp = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== e.pointerId) return

      if (drag.captured) {
        holdAutoplay(4500)
        if (stageRef.current) {
          stageRef.current.classList.remove('cursor-grabbing')
          stageRef.current.classList.add('cursor-grab')
        }

        // If held stationary before releasing (>100ms), zero out momentum
        const timeSinceMove = performance.now() - drag.lastTime
        const effectiveVelocity = timeSinceMove > 100 ? 0 : drag.velocity

        const stepPx = dimsRef.current.cardWidth + dimsRef.current.gap
        const momentumCards = (-effectiveVelocity * 180) / stepPx
        const target = Math.round(posRef.current + momentumCards)
        animateTo(target)
      }

      dragRef.current = null
      isDraggingRef.current = false

      // Keep hasDraggedRef active for 80ms to suppress accidental navigation on drag release
      if (drag.captured) {
        setTimeout(() => {
          hasDraggedRef.current = false
        }, 80)
      }
    }

    const onPointerCancel = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== e.pointerId) return
      if (drag.captured) {
        animateTo(Math.round(posRef.current), 0.4)
      }
      dragRef.current = null
      isDraggingRef.current = false
      hasDraggedRef.current = false
      if (stageRef.current) {
        stageRef.current.classList.remove('cursor-grabbing')
        stageRef.current.classList.add('cursor-grab')
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerCancel, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [animateTo, holdAutoplay, render])

  // Horizontal wheel / trackpad swipe scrubbing
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let wheelTimeout: NodeJS.Timeout | null = null

    const handleWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx || Math.abs(dx) < 2) return

      e.preventDefault()
      holdAutoplay(4500)
      if (tweenRef.current) {
        tweenRef.current.stop()
        tweenRef.current = null
      }

      const stepPx = dimsRef.current.cardWidth + dimsRef.current.gap
      posRef.current += dx / stepPx
      render()

      if (wheelTimeout) clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        animateTo(Math.round(posRef.current), 0.45)
      }, 140)
    }

    stage.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      stage.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [animateTo, holdAutoplay, render])

  // Autoplay management: IntersectionObserver, fine-pointer hover pause, visibilitychange, and reduced motion
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    // 1. IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          holdAutoplay(2500)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(stage)

    // 2. Hover detection for fine pointer devices only
    const isFinePointer = () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && isFinePointer()) {
        isHoveredRef.current = true
        holdAutoplay(4000)
      }
    }

    const handlePointerLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        isHoveredRef.current = false
        holdAutoplay(3500)
      }
    }

    stage.addEventListener('pointerenter', handlePointerEnter)
    stage.addEventListener('pointerleave', handlePointerLeave)

    // 3. Document visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        holdAutoplay(4000)
      } else {
        holdAutoplay(3500)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 4. Autoplay interval (periodic gentle advancement every 4.2 seconds)
    const interval = setInterval(() => {
      const now = performance.now()
      const isReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (
        !isPausedRef.current &&
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        !isFocusedRef.current &&
        inViewRef.current &&
        !document.hidden &&
        !isReducedMotion &&
        now >= holdUntilRef.current &&
        !tweenRef.current
      ) {
        animateTo(Math.round(posRef.current) + 1, 0.9)
      }
    }, 4200)

    return () => {
      observer.disconnect()
      stage.removeEventListener('pointerenter', handlePointerEnter)
      stage.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [animateTo, holdAutoplay])

  // Mouse-follow subtle highlight: rAF-throttled, active card only, fine pointer only
  useEffect(() => {
    if (typeof window === 'undefined') return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return

    const stage = stageRef.current
    if (!stage) return

    let rafId = 0
    const handlePointerMove = (e: PointerEvent) => {
      if (rafId) return
      const activeEl = cardRefs.current[activeIndexRef.current]
      if (!activeEl) return

      rafId = requestAnimationFrame(() => {
        rafId = 0
        const rect = activeEl.getBoundingClientRect()
        const mx = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + '%'
        const my = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + '%'
        activeEl.style.setProperty('--mx', mx)
        activeEl.style.setProperty('--my', my)
      })
    }

    stage.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      stage.removeEventListener('pointermove', handlePointerMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Suppress clicks that immediately follow drag gestures
  const handleStageClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      hasDraggedRef.current = false
    }
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  return (
    <section
      id="projects"
      className="section relative overflow-hidden !pt-7 sm:!pt-8 pb-16"
    >
      {/* Background Ambience */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[410px] w-[min(86vw,900px)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.09),rgba(124,92,255,0.04)_40%,transparent_70%)]" />

      <div className="shell relative z-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#00f5ff]">
                <Sparkles size={16} className="text-[#00f5ff]" />
                <p className="eyebrow text-[#00f5ff]">01 / Featured Case Studies</p>
              </div>
              <h2 className="display mt-2.5 text-[clamp(2.2rem,4.2vw,4.2rem)] font-semibold text-[#f2f3f7]">
                Featured <span className="text-[#9aa6b7]">Case Studies</span>
              </h2>
              <p className="muted mt-3 max-w-xl text-sm leading-6">
                Interactive rotary carousel showcasing production Laravel architectures, Next.js applications, and autonomous n8n workflows.
              </p>
            </div>

            {/* Top HUD Controls */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Autoplay status toggle */}
              <button
                type="button"
                onClick={() => {
                  holdAutoplay(5000)
                  setIsPaused((prev) => {
                    const nextVal = !prev
                    isPausedRef.current = nextVal
                    return nextVal
                  })
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#d9dee7] transition hover:border-[#00f5ff]/40 hover:text-white"
                aria-label={isPaused ? 'Resume auto rotation' : 'Pause auto rotation'}
              >
                {isPaused ? (
                  <>
                    <Play size={12} className="text-[#00f5ff]" />
                    <span className="hidden sm:inline">Autoplay:</span>
                    <span className="text-[#ff9c90]">Paused</span>
                  </>
                ) : (
                  <>
                    <Pause size={12} className="text-[#00f5ff]" />
                    <span className="hidden sm:inline">Autoplay:</span>
                    <span className="text-[#34d399]">Active</span>
                  </>
                )}
              </button>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prev}
                  className="grid size-10 sm:size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#d9dee7] transition hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 hover:text-white active:scale-95"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="grid size-10 sm:size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#d9dee7] transition hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 hover:text-white active:scale-95"
                  aria-label="Next project"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Circular Rotary 3D Stage with touch-action: pan-y for natural iOS page scroll */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handleStagePointerDown}
        onClickCapture={handleStageClickCapture}
        onFocus={() => {
          isFocusedRef.current = true
          holdAutoplay(5000)
        }}
        onBlur={() => {
          isFocusedRef.current = false
          holdAutoplay(3500)
        }}
        style={{
          height: `${stageHeight}px`,
          touchAction: 'pan-y',
        }}
        className="relative mt-6 sm:mt-8 w-full select-none overflow-hidden touch-pan-y focus:outline-none cursor-grab"
        aria-label="Rotating Project Wheel — drag, swipe, or use arrow keys"
      >
        <div aria-hidden="true" className="pointer-events-none absolute bottom-7 left-1/2 h-20 w-[min(92%,980px)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72),rgba(0,245,255,0.08)_36%,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-[#080b12] to-transparent sm:w-28" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-[#080b12] to-transparent sm:w-28" />
        {/* Curved Horizon Dial Track (Decorative Background Wheel) */}
        {!liteMode && <div
          ref={dialRef}
          aria-hidden="true"
          style={{
            top: '50%',
            left: '50%',
            width: `${Math.round(stageHeight * 1.5)}px`,
            height: `${Math.round(stageHeight * 1.5)}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="pointer-events-none absolute rounded-full border border-dashed border-white/10 [box-shadow:0_0_60px_rgba(0,245,255,0.06),inset_0_0_60px_rgba(124,92,255,0.04)]"
        >
          <div className="absolute inset-[10%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[24%] rounded-full border border-white/[0.03]" />
        </div>}

        {/* Top Active Indicator Beacon — Desktop only to prevent stacking over cards on mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1 opacity-90"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-[#00f5ff]/35 bg-[#080c18]/90 px-3.5 py-1 shadow-[0_0_24px_rgba(0,245,255,0.28)]">
            <span className="size-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff] animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#00f5ff]">
              Active Project
            </span>
          </div>
        </div>

        {/* 3D Stack Container with Perspective Set */}
        <div
          ref={stackRef}
          style={{
            perspective: `${perspective}px`,
            perspectiveOrigin: '50% 50%',
          }}
          className="relative w-full h-full select-none pointer-events-none"
        >
          {projects.map((project, i) => {
            const isActive = i === activeIndex
            const cover = projectCovers[i]

            return (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                isActive={isActive}
                cover={cover}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                isMobile={isMobile}
                isPaused={isPaused || autoplayHeld}
                liteMode={liteMode}
                onSelect={goTo}
                onLinkClick={handleLinkClick}
                setCardRef={(el) => {
                  cardRefs.current[i] = el
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Bottom HUD Reader Bar & Project Position Dots */}
      <div className="shell relative z-20 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
        {/* Left: Project title & position badge */}
        <div className="flex items-center gap-3">
          <span key={activeIndex} className="project-wheel-counter font-mono text-sm font-bold text-[#00f5ff]">
            0{activeIndex + 1}
            <span className="text-white/60"> / 0{total}</span>
          </span>
          <span className="h-4 w-px bg-white/10" />
          <p className="display text-sm sm:text-base font-semibold text-[#f2f3f7] max-w-full sm:max-w-md">
            {projects[activeIndex]?.title}
          </p>
        </div>

        {/* Center: Rotary dots indicators */}
        <div className="flex items-center gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-7 bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to project ${idx + 1}: ${p.title}`}
            />
          ))}
        </div>

        {/* Right: Quick action hint */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#aeb6c3] font-medium">
          <Compass size={14} className="text-[#00f5ff]" />
          <span>Drag or swipe horizontally to rotate wheel</span>
        </div>
      </div>

      {/* Supporting Cards: Active Pipeline & GitHub Collection */}
      <div className="shell mt-12 grid gap-5 sm:grid-cols-2">
        {/* 1. Active Pipeline Card */}
        <div className="group flex min-h-[170px] flex-col justify-between rounded-[22px] border border-[rgba(170,150,255,0.22)] bg-[radial-gradient(circle_at_70%_20%,rgba(170,150,255,0.1),transparent_45%),rgba(11,14,20,0.85)] p-5 sm:p-6 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(170,150,255,0.42)]">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(170,150,255,0.3)] bg-[rgba(170,150,255,0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5fd]">
              <span className="size-1.5 rounded-full bg-[#aa96ff] animate-pulse" />
              Active Pipeline
            </span>
            <span className="font-mono text-xs text-[#aeb6c3]">In Progress</span>
          </div>

          <div className="mt-3">
            <h3 className="display text-lg font-semibold text-[#f2f3f7]">
              Full-Stack & AI Systems
            </h3>
            <p className="muted mt-1.5 text-xs sm:text-sm leading-relaxed">
              Architecting high-throughput Laravel & MySQL backends connected to Next.js 16 App Router interfaces with real-time AI reasoning workflows.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-3">
            <span className="rounded-md border border-[rgba(170,150,255,0.28)] bg-[rgba(170,150,255,0.07)] px-2 py-0.5 text-[10px] font-medium text-[#c4b5fd]">
              Next.js 16
            </span>
            <span className="rounded-md border border-[rgba(240,83,64,0.28)] bg-[rgba(240,83,64,0.07)] px-2 py-0.5 text-[10px] font-medium text-[#ff9c90]">
              Laravel 12
            </span>
            <span className="rounded-md border border-[rgba(170,150,255,0.28)] bg-[rgba(170,150,255,0.07)] px-2 py-0.5 text-[10px] font-medium text-[#c4b5fd]">
              AI APIs
            </span>
            <span className="rounded-md border border-[rgba(43,217,181,0.28)] bg-[rgba(43,217,181,0.07)] px-2 py-0.5 text-[10px] font-medium text-[#69e6cd]">
              MySQL
            </span>
          </div>
        </div>

        {/* 2. GitHub Repositories Explorer Card */}
        <a
          href={`${portfolioData.githubUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-[170px] flex-col justify-between rounded-[22px] border border-[rgba(43,217,181,0.2)] bg-[radial-gradient(circle_at_70%_20%,rgba(43,217,181,0.1),transparent_42%),rgba(11,14,20,0.82)] p-5 sm:p-6 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(43,217,181,0.4)]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd]">
              <SiGithub size={11} />
              Open Source
            </span>
            <ArrowUpRight
              size={16}
              className="text-[#69e6cd] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>

          <div className="mt-3">
            <h3 className="display text-lg font-semibold text-[#f2f3f7]">
              GitHub Repository Collection
            </h3>
            <p className="muted mt-1.5 text-xs sm:text-sm leading-relaxed">
              Explore open-source Laravel repositories, academic coursework implementations, and utility automation scripts directly on GitHub.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-xs font-semibold text-[#69e6cd]">
            <span>View All Repositories on GitHub</span>
            <ArrowUpRight size={13} />
          </div>
        </a>
      </div>
    </section>
  )
}
