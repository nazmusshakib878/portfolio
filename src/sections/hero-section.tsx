import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { LucideIcon } from 'lucide-react'

import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  GraduationCap,
  LibraryBig,
  MapPin,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { portfolioData } from '@/data/portfolio'

const AUTO_PLAY_DURATION = 6000

type ProjectTheme = {
  icon: LucideIcon
  eyebrow: string
  gradient: string
  glow: string
  iconClassName: string
}

const projectThemes: ProjectTheme[] = [
  {
    icon: ShieldCheck,

    eyebrow: 'Security Service Platform',

    gradient:
      'from-sky-500/40 via-cyan-500/15 to-slate-950',

    glow: 'bg-sky-500/25',

    iconClassName:
      'border-sky-300/20 bg-sky-400/15 text-sky-300',
  },

  {
    icon: BrainCircuit,

    eyebrow: 'AI-Powered Campus Platform',

    gradient:
      'from-violet-500/40 via-fuchsia-500/15 to-slate-950',

    glow: 'bg-violet-500/25',

    iconClassName:
      'border-violet-300/20 bg-violet-400/15 text-violet-300',
  },

  {
    icon: LibraryBig,

    eyebrow: 'Library Management System',

    gradient:
      'from-amber-500/35 via-orange-500/15 to-slate-950',

    glow: 'bg-amber-500/20',

    iconClassName:
      'border-amber-300/20 bg-amber-400/15 text-amber-300',
  },

  {
    icon: Truck,

    eyebrow: 'Collaborative Internship Project',

    gradient:
      'from-emerald-500/35 via-teal-500/15 to-slate-950',

    glow: 'bg-emerald-500/20',

    iconClassName:
      'border-emerald-300/20 bg-emerald-400/15 text-emerald-300',
  },
]

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(0)

  const projectCount = portfolioData.projects.length

  const nextSlide = useCallback(() => {
    setActiveIndex((currentIndex) => {
      return (currentIndex + 1) % projectCount
    })
  }, [projectCount])

  const previousSlide = useCallback(() => {
    setActiveIndex((currentIndex) => {
      return (
        (currentIndex - 1 + projectCount) %
        projectCount
      )
    })
  }, [projectCount])

  const selectSlide = useCallback(
    (index: number) => {
      setActiveIndex(index % projectCount)
    },
    [projectCount],
  )

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const autoplayTimer = window.setTimeout(
      nextSlide,
      AUTO_PLAY_DURATION,
    )

    return () => {
      window.clearTimeout(autoplayTimer)
    }
  }, [
    activeIndex,
    nextSlide,
    shouldReduceMotion,
  ])

  const activeProject =
    portfolioData.projects[activeIndex]

  const activeTheme = useMemo(() => {
    return projectThemes[
      activeIndex % projectThemes.length
    ]
  }, [activeIndex])

  const ActiveProjectIcon = activeTheme.icon

  return (
    <section
      id="hero"
      className="relative scroll-mt-[7.5rem] overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/80 px-4 pb-8 pt-24 shadow-[0_30px_120px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:rounded-[2.25rem] sm:px-8 sm:pb-10 sm:pt-28 md:px-10 lg:scroll-mt-40 lg:px-14 lg:pb-14 lg:pt-32 xl:px-16"
    >
      {/* Animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.15),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_30%)]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:44px_44px]" />

        <motion.div
          className="absolute -left-32 -top-32 size-80 rounded-full bg-sky-500/20 blur-[100px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 55, 0],
                  y: [0, 35, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -right-32 top-20 size-96 rounded-full bg-violet-500/20 blur-[120px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -45, 0],
                  y: [0, 60, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-[-12rem] left-1/3 size-96 rounded-full bg-cyan-400/15 blur-[120px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 40, 0],
                  y: [0, -35, 0],
                }
          }
          transition={{
            duration: 11,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-16">
        {/* Left information */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: 'easeOut',
          }}
          className="min-w-0"
        >
          <Badge
            variant="outline"
            className="mb-6 max-w-full rounded-full border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-xl sm:text-sm"
          >
            <span className="mr-2 size-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(34,197,94,0.8)]" />

            <span className="truncate">
              {portfolioData.availability}
            </span>
          </Badge>

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400">
              <Sparkles className="size-4" />

              <span>Hello, I&apos;m</span>
            </div>

            <h1 className="max-w-4xl font-heading text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              {portfolioData.name}

              <span className="mt-4 block bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 bg-clip-text text-2xl font-semibold leading-tight tracking-tight text-transparent sm:text-3xl md:text-4xl">
                {portfolioData.primaryRole}
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {portfolioData.heroDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {portfolioData.heroBadges.map(
                (badge) => (
                  <motion.span
                    key={badge.label}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -3,
                            scale: 1.03,
                          }
                    }
                    className="rounded-full border border-border/60 bg-background/55 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl sm:text-sm"
                  >
                    {badge.label}
                  </motion.span>
                ),
              )}
            </div>
          </div>

          {/* Main buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              render={<a href="#projects" />}
              className="group w-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 px-6 text-white shadow-[0_16px_35px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_20px_45px_rgba(14,165,233,0.36)] sm:w-auto"
            >
              Explore Projects

              <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              render={
                <a
                  href={portfolioData.resumeHref}
                  download
                />
              }
              className="w-full rounded-full border-border/70 bg-background/60 px-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-background/90 sm:w-auto"
            >
              <ArrowDownToLine />

              Download Resume
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              render={
                <a
                  href={portfolioData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              className="rounded-full border-border/60 bg-background/60 px-4 text-muted-foreground shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-background/90 hover:text-foreground"
            >
              <Code2 />

              GitHub

              <ArrowUpRight className="size-3.5" />
            </Button>

            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 text-xs text-muted-foreground backdrop-blur-xl sm:text-sm">
              <MapPin className="size-4 text-rose-500" />

              {portfolioData.location}
            </span>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {portfolioData.heroStats.map(
              (stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.16 + index * 0.07,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className="rounded-2xl border border-border/60 bg-background/55 p-4 shadow-sm backdrop-blur-xl transition-colors hover:border-sky-400/30 hover:bg-background/80"
                >
                  <div className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-xs leading-5 text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>

        {/* Project slider */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.97,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: 'easeOut',
          }}
          className="relative mx-auto w-full max-w-2xl outline-none lg:max-w-none"
          tabIndex={0}
          aria-label="Featured project slider"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              nextSlide()
            }

            if (event.key === 'ArrowLeft') {
              previousSlide()
            }
          }}
        >
          <div
            className={`absolute -inset-6 rounded-[3rem] ${activeTheme.glow} opacity-70 blur-3xl transition-colors duration-700`}
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-3 shadow-[0_35px_120px_rgba(2,8,23,0.35)] sm:p-4">
            {/* Browser header */}
            <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />

                <span className="size-2.5 rounded-full bg-amber-400" />

                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>

              <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <ShieldCheck className="size-3.5 shrink-0 text-emerald-400" />

                <span className="truncate text-[10px] text-slate-400 sm:text-xs">
                  mdnazmusshakib.me/projects
                </span>
              </div>

              <span className="hidden text-xs font-medium text-slate-500 sm:block">
                {String(activeIndex + 1).padStart(
                  2,
                  '0',
                )}{' '}
                /{' '}
                {String(projectCount).padStart(
                  2,
                  '0',
                )}
              </span>
            </div>

            {/* Slider display */}
            <div className="relative min-h-[36rem] overflow-hidden rounded-[1.55rem] border border-white/10 bg-slate-900 sm:min-h-[38rem] lg:min-h-[40rem]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeProject.title}
                  initial={
                    shouldReduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          x: 80,
                          scale: 0.98,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={
                    shouldReduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          x: -80,
                          scale: 0.98,
                        }
                  }
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  drag={
                    shouldReduceMotion ? false : 'x'
                  }
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={0.12}
                  onDragEnd={(_, information) => {
                    if (information.offset.x < -70) {
                      nextSlide()
                    }

                    if (information.offset.x > 70) {
                      previousSlide()
                    }
                  }}
                  className="absolute inset-0 cursor-grab overflow-hidden active:cursor-grabbing"
                  aria-live="polite"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradient}`}
                  />

                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:34px_34px]" />

                  <motion.div
                    aria-hidden="true"
                    className={`absolute -right-24 -top-24 size-72 rounded-full ${activeTheme.glow} blur-[90px]`}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.2, 1],
                            rotate: [0, 20, 0],
                          }
                    }
                    transition={{
                      duration: 8,
                      repeat:
                        Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />

                  <div className="relative flex h-full flex-col p-5 sm:p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-xl sm:size-16 ${activeTheme.iconClassName}`}
                      >
                        <ActiveProjectIcon className="size-7 sm:size-8" />
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300 backdrop-blur-xl sm:text-xs">
                        Selected Project
                      </span>
                    </div>

                    <div className="mt-8">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300 sm:text-sm">
                        {activeTheme.eyebrow}
                      </p>

                      <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                        {activeProject.title}
                      </h2>

                      <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">
                        {activeProject.category}
                      </p>

                      <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                        {activeProject.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeProject.technologies
                        .slice(0, 7)
                        .map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl sm:text-xs"
                          >
                            {technology}
                          </span>
                        ))}
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                              <Database className="size-5" />
                            </span>

                            <div>
                              <p className="text-sm font-semibold text-white">
                                Structured System
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Database-driven workflow
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                              <GraduationCap className="size-5" />
                            </span>

                            <div>
                              <p className="text-sm font-semibold text-white">
                                Practical Project
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Academic and real experience
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* GitHub and live-demo buttons */}
                      <div
                        className={`mt-4 grid gap-3 ${
                          activeProject.liveUrl
                            ? 'sm:grid-cols-2'
                            : ''
                        }`}
                      >
                        <a
                          href={
                            activeProject.githubUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          draggable={false}
                          className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.14]"
                        >
                          <Code2 className="size-4" />

                          GitHub Repository

                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>

                        {activeProject.liveUrl ? (
                          <a
                            href={
                              activeProject.liveUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            draggable={false}
                            className="group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-500 px-5 text-sm font-semibold text-slate-950 shadow-[0_16px_35px_rgba(34,211,238,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(34,211,238,0.38)]"
                          >
                            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                            <span className="relative flex items-center gap-2">
                              Live Demo

                              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Slider controls */}
            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
              <button
                type="button"
                onClick={previousSlide}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Previous project"
              >
                <ArrowLeft className="size-4" />
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-2">
                {portfolioData.projects.map(
                  (project, index) => {
                    const isActive =
                      index === activeIndex

                    return (
                      <button
                        key={project.title}
                        type="button"
                        onClick={() =>
                          selectSlide(index)
                        }
                        className="group relative h-2 flex-1 overflow-hidden rounded-full bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        aria-label={`Show project ${index + 1}: ${project.title}`}
                        aria-current={
                          isActive
                            ? 'true'
                            : undefined
                        }
                      >
                        {isActive ? (
                          <motion.span
                            key={`${activeIndex}-progress`}
                            initial={{
                              scaleX: 0,
                            }}
                            animate={{
                              scaleX: 1,
                            }}
                            transition={{
                              duration:
                                shouldReduceMotion
                                  ? 0
                                  : AUTO_PLAY_DURATION /
                                    1000,
                              ease: 'linear',
                            }}
                            className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-400"
                          />
                        ) : (
                          <span className="absolute inset-0 rounded-full bg-white/0 transition-colors group-hover:bg-white/10" />
                        )}
                      </button>
                    )
                  },
                )}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Next project"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-500 sm:text-xs">
              Swipe on mobile or use keyboard arrow
              keys
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}