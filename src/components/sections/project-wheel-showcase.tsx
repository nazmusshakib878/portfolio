'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

export function ProjectWheelShowcase() {
  const projects = portfolioData.projects
  const total = projects.length

  // Continuous position state (supports drag scrubbing and smooth damping)
  const [pos, setPos] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1200)
  const [lastInteraction, setLastInteraction] = useState(0)

  // Target position for smooth interpolation
  const targetPosRef = useRef(0)
  const posRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const dragRef = useRef<{
    startX: number
    startPos: number
    lastX: number
    lastTime: number
    velocity: number
    hasMoved: boolean
  } | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  // Track window width for responsive arc calculation
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Ensure #projects heading settles with 24-32px clearance below the sticky navbar
  // on direct navigation and refresh without duplicate handlers or repeated jumping
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#projects') return

    const el = document.getElementById('projects')
    if (!el) return

    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)

    return () => clearTimeout(timer)
  }, [])

  // Responsive geometry parameters based on screen size
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  // Radius, angular step, and card dimensions
  // Desktop: 390px wide x 695px high (+90px usable height increase), radius 1020px, stepDeg 21°
  // Tablet: 350px wide x 630px high (+80px), radius 860px, stepDeg 23°
  // Mobile: ~305px wide x 550px high (+55px), radius 660px, stepDeg 27°
  const radius = isMobile ? 660 : isTablet ? 860 : 1020
  const stepDeg = isMobile ? 27 : isTablet ? 23 : 21
  const cardWidth = isMobile ? Math.min(305, Math.max(280, windowWidth - 32)) : isTablet ? 350 : 390
  const cardHeight = isMobile ? 550 : isTablet ? 630 : 695
  const centerOffsetY = radius + (isMobile ? 320 : isTablet ? 360 : 400)
  const stageHeight = isMobile ? 720 : isTablet ? 850 : 970

  // Arc length in pixels per card step
  const arcPerCard = (radius * stepDeg * Math.PI) / 180

  // Modulo wrap helper for N projects
  const wrapN = useCallback(
    (val: number) => {
      let v = val % total
      if (v > total / 2) v -= total
      if (v < -total / 2) v += total
      return v
    },
    [total]
  )

  // Normalized active index (0 to total - 1)
  const activeIndex = ((Math.round(pos) % total) + total) % total

  // Smooth position interpolation loop
  useEffect(() => {
    let active = true

    const updateLoop = () => {
      if (!active) return

      const diff = targetPosRef.current - posRef.current
      if (Math.abs(diff) > 0.0005) {
        // Smooth exponential approach
        posRef.current += diff * 0.12
        setPos(posRef.current)
      } else if (posRef.current !== targetPosRef.current) {
        posRef.current = targetPosRef.current
        setPos(posRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop)
    }

    animationFrameRef.current = requestAnimationFrame(updateLoop)
    return () => {
      active = false
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Reset autoplay timer on manual interactions
  const markInteraction = useCallback(() => {
    setLastInteraction(Date.now())
  }, [])

  // Navigation handlers
  const goTo = useCallback(
    (index: number) => {
      markInteraction()
      const current = targetPosRef.current
      const offset = wrapN(index - current)
      targetPosRef.current = current + offset
    },
    [wrapN, markInteraction]
  )

  const next = useCallback(() => {
    markInteraction()
    targetPosRef.current = Math.round(targetPosRef.current) + 1
  }, [markInteraction])

  const prev = useCallback(() => {
    markInteraction()
    targetPosRef.current = Math.round(targetPosRef.current) - 1
  }, [markInteraction])

  // Autoplay cycle (every 4.2 seconds; pauses on hover or drag, resets on manual interaction)
  useEffect(() => {
    if (isPaused || isHovered || isDragging) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
      return
    }

    autoplayTimerRef.current = setInterval(() => {
      targetPosRef.current = Math.round(targetPosRef.current) + 1
    }, 4200)

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
    }
  }, [isPaused, isHovered, isDragging, lastInteraction])

  // Mouse & Touch Drag Interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return

    dragRef.current = {
      startX: e.clientX,
      startPos: targetPosRef.current,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      hasMoved: false,
    }

    stageRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return

    const dx = e.clientX - dragRef.current.startX
    if (!dragRef.current.hasMoved && Math.abs(dx) > 6) {
      dragRef.current.hasMoved = true
      setIsDragging(true)
    }

    if (dragRef.current.hasMoved) {
      const now = performance.now()
      const dt = Math.max(1, now - dragRef.current.lastTime)
      const v = (e.clientX - dragRef.current.lastX) / dt

      dragRef.current.velocity = dragRef.current.velocity * 0.6 + v * 0.4
      dragRef.current.lastX = e.clientX
      dragRef.current.lastTime = now

      // Immediate scrubbing response
      const target = dragRef.current.startPos - dx / arcPerCard
      targetPosRef.current = target
      posRef.current = target
      setPos(target)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return

    if (stageRef.current?.hasPointerCapture(e.pointerId)) {
      stageRef.current.releasePointerCapture(e.pointerId)
    }

    if (dragRef.current.hasMoved) {
      markInteraction()
      // Release with momentum
      const momentumStep = (dragRef.current.velocity * 240) / arcPerCard
      const snapped = Math.round(targetPosRef.current - momentumStep)
      targetPosRef.current = snapped
    }

    setTimeout(() => {
      setIsDragging(false)
      dragRef.current = null
    }, 60)
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

  // Prevent link navigation if user was performing a drag gesture
  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
    }
  }

  return (
    <section
      id="projects"
      style={{
        scrollMarginTop: isMobile ? '64px' : '72px',
      }}
      className="section relative overflow-hidden !pt-7 sm:!pt-8 pb-16"
    >
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-gradient-to-b from-[#00f5ff]/10 via-[#7c5cff]/08 to-transparent blur-[120px]"
      />

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
                Interactive 3D carousel showcasing production Laravel architectures, Next.js applications, and autonomous n8n workflows.
              </p>
            </div>

            {/* Top HUD Controls */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Autoplay status toggle */}
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#d9dee7] backdrop-blur-md transition hover:border-[#00f5ff]/40 hover:text-white"
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
                  className="grid size-10 sm:size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#d9dee7] backdrop-blur-md transition hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 hover:text-white active:scale-95"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="grid size-10 sm:size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#d9dee7] backdrop-blur-md transition hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 hover:text-white active:scale-95"
                  aria-label="Next project"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 3D Circular Rotary Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          height: `${stageHeight}px`,
        }}
        className={`relative mt-6 sm:mt-8 w-full select-none overflow-hidden touch-pan-y focus:outline-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="3D Rotating Project Wheel — drag, swipe, or use arrow keys"
      >
        {/* Curved Horizon Dial Track (Decorative Background Wheel) */}
        <div
          aria-hidden="true"
          style={{
            top: `${centerOffsetY}px`,
            left: '50%',
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            transform: `translate(-50%, -50%) rotate(${(-pos * stepDeg).toFixed(2)}deg)`,
          }}
          className="pointer-events-none absolute rounded-full border border-dashed border-white/10 [box-shadow:0_0_60px_rgba(0,245,255,0.06),inset_0_0_60px_rgba(124,92,255,0.04)]"
        >
          {/* Subtle concentric inner rings */}
          <div className="absolute inset-[10%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[24%] rounded-full border border-white/[0.03]" />
        </div>

        {/* Top Active Indicator Beacon */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-90"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-[#00f5ff]/35 bg-[#080c18]/90 px-3.5 py-1 shadow-[0_0_24px_rgba(0,245,255,0.28)] backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff] animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#00f5ff]">
              Active Project
            </span>
          </div>
        </div>

        {/* Fanned 3D Project Cards */}
        <div className="absolute inset-0 z-10 [perspective:1400px]">
          {projects.map((project, i) => {
            const rawOffset = wrapN(i - pos)
            const dist = Math.abs(rawOffset)
            const isActive = i === activeIndex

            // Hide cards that are rotated too far off the screen
            const maxVisibleDistance = isMobile ? 1.7 : isTablet ? 2.3 : 2.5
            if (dist > maxVisibleDistance) return null

            // Interpolated prominence coefficient k: 1 at center, 0 at 1 step out
            const k = Math.max(0, 1 - dist)

            // Dynamic 3D transform components
            const angle = rawOffset * stepDeg
            const scale = 1 + 0.05 * k - dist * 0.08
            const rotateY = -rawOffset * (isMobile ? 12 : 15)
            const translateZ = -dist * (isMobile ? 25 : 45)
            const opacity = dist <= 1.2 ? 1 : Math.max(0.48, 1 - (dist - 1.2) * 0.45)
            const zIndex = 100 - Math.round(dist * 20)

            const cover = projectCovers[i]
            const caseStudyHref = `/projects/${projectSlug(project.title)}`

            return (
              <div
                key={project.title}
                onClick={() => {
                  if (isDragging) return
                  if (!isActive) goTo(i)
                }}
                style={{
                  top: `${centerOffsetY}px`,
                  left: '50%',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(-50%, -50%) rotate(${angle.toFixed(
                    2
                  )}deg) translateY(${(-radius - 16 * k).toFixed(1)}px) rotateY(${rotateY.toFixed(
                    2
                  )}deg) translateZ(${translateZ.toFixed(1)}px) scale(${scale.toFixed(3)})`,
                  opacity: opacity.toFixed(3),
                  zIndex,
                }}
                className={`group absolute flex flex-col rounded-[24px] text-left transition-[box-shadow,border-color,background-color] duration-300 will-change-transform ${
                  isActive
                    ? 'border border-[rgba(0,245,255,0.48)] bg-[rgba(13,17,26,0.96)] shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_42px_rgba(0,245,255,0.22)] backdrop-blur-xl ring-1 ring-[#00f5ff]/20'
                    : 'cursor-pointer border border-white/12 bg-[rgba(12,16,25,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-[#00f5ff]/40 hover:bg-[rgba(14,19,30,0.95)]'
                }`}
              >
                {/* Visual Cover Thumbnail */}
                <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden rounded-t-[23px] border-b border-white/[0.08] bg-[#080b12]">
                  {isActive ? (
                    <Link
                      href={caseStudyHref}
                      onClick={handleLinkClick}
                      className="absolute inset-0 block cursor-pointer z-0"
                      aria-label={`View ${project.title} case study`}
                    >
                      <Image
                        src={cover}
                        alt={`${project.title} thumbnail`}
                        fill
                        sizes="(max-width: 640px) 300px, 420px"
                        priority={isActive}
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={cover}
                      alt={`${project.title} thumbnail`}
                      fill
                      sizes="(max-width: 640px) 300px, 420px"
                      priority={false}
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d15] via-transparent to-transparent" />

                  {/* Top Bar Badges */}
                  <div className="pointer-events-none absolute left-3.5 top-3.5 flex items-center gap-1.5 z-10">
                    <span className="rounded-full border border-white/15 bg-black/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                      0{i + 1}
                    </span>
                    <span className="rounded-full border border-[#00f5ff]/35 bg-[#00f5ff]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00f5ff] backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {project.liveUrl && (
                    <span className="pointer-events-none absolute right-3.5 top-3.5 inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-black/80 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                      Live
                    </span>
                  )}
                </div>

                {/* Card Content */}
                {isActive ? (
                  /* Active Card Content — Perfectly balanced vertical layout with natural spacing */
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00f5ff]">
                          {project.category}
                        </span>
                        {project.role && (
                          <span
                            className="text-[11px] font-medium text-[#aeb6c3] truncate max-w-[170px]"
                            title={project.role}
                          >
                            {project.role}
                          </span>
                        )}
                      </div>

                      <h3 className="display text-lg sm:text-[20px] font-bold tracking-tight text-white leading-snug line-clamp-2">
                        <Link
                          href={caseStudyHref}
                          onClick={handleLinkClick}
                          className="hover:text-[#00f5ff] transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      <p className="muted mt-2 text-xs sm:text-[13px] leading-relaxed line-clamp-2 text-[#a4a9b6]">
                        {project.summary}
                      </p>

                      {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <ul className="mt-3 hidden sm:flex flex-col gap-1.5 text-[11.5px] text-[#c4cad4]">
                          {project.keyFeatures.slice(0, 2).map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5 leading-snug">
                              <Check size={12} className="shrink-0 text-[#00f5ff] mt-0.5" />
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies.slice(0, isMobile ? 3 : 4).map((tech) => (
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
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center gap-2.5">
                      <Link
                        href={caseStudyHref}
                        onClick={handleLinkClick}
                        className="button primary flex-1 min-h-[44px] rounded-xl px-4 text-xs sm:text-[13px] font-semibold shadow-[0_0_20px_rgba(0,245,255,0.25)]"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight size={14} />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                          className="grid size-[44px] place-items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition shrink-0"
                          aria-label={`Live Demo of ${project.title}`}
                          title="Live Demo"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                          className="grid size-[44px] place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-[#d9dee7] hover:border-white/30 hover:text-white transition shrink-0"
                          aria-label={`GitHub repo of ${project.title}`}
                          title="GitHub Repository"
                        >
                          <SiGithub size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Side Card Content — Clean, bold thumbnail focus & uncluttered presentation */
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#9aa6b7]">
                        {project.category}
                      </span>
                      <span className="font-mono text-[11px] text-[#747b8b]">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="display mt-2 text-base sm:text-lg font-semibold text-[#f2f3f7] group-hover:text-white leading-snug line-clamp-2 transition-colors">
                      {project.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${getTechBadgeStyle(
                            tech
                          )}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between text-xs font-medium text-[#747b8b] group-hover:text-[#00f5ff] transition-colors border-t border-white/[0.06]">
                      <span>Click to select</span>
                      <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom HUD Reader Bar & Project Position Dots */}
      <div className="shell relative z-20 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
        {/* Left: Project title & position badge */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-[#00f5ff]">
            0{activeIndex + 1}
            <span className="text-white/30"> / 0{total}</span>
          </span>
          <span className="h-4 w-px bg-white/10" />
          <p className="display text-sm sm:text-base font-semibold text-[#f2f3f7] truncate max-w-[260px] sm:max-w-md">
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
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#747b8b]">
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
            <span className="font-mono text-xs text-[#747b8b]">In Progress</span>
          </div>

          <div className="mt-3">
            <h3 className="display text-lg font-semibold text-[#f2f3f7]">
              Full-Stack &amp; AI Systems
            </h3>
            <p className="muted mt-1.5 text-xs sm:text-sm leading-relaxed">
              Architecting high-throughput Laravel &amp; MySQL backends connected to Next.js 16 App Router interfaces with real-time AI reasoning workflows.
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
