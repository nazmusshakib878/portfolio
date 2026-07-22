import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  MapPin,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import {
  motion,
  useReducedMotion,
} from 'motion/react'

import { Button } from '@/components/ui/button'
import { portfolioData } from '@/data/portfolio'

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const liveProject =
    portfolioData.projects.find(
      (project) => project.liveUrl,
    ) ?? portfolioData.projects[0]

  return (
    <section
      id="hero"
      className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-border/60 bg-background/75 shadow-[0_40px_140px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[2.75rem]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(14,165,233,0.17),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(168,85,247,0.15),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.10),transparent_36%)]" />

        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:50px_50px]" />

        <motion.div
          className="absolute -left-40 -top-40 size-[28rem] rounded-full bg-sky-500/15 blur-[120px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 70, 0],
                  y: [0, 45, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 16,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -right-40 top-0 size-[30rem] rounded-full bg-violet-500/15 blur-[130px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -60, 0],
                  y: [0, 65, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 19,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28 md:px-10 lg:px-14 lg:pb-14 lg:pt-32 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-20">
          {/* Left content */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0"
          >
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-xl sm:text-sm">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>

                Open to new opportunities
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/55 px-3.5 py-2 text-xs text-muted-foreground backdrop-blur-xl sm:text-sm">
                <MapPin className="size-4 text-rose-500" />

                {portfolioData.location}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                <Sparkles className="size-4" />

                Hello, I&apos;m
              </p>

              <h1 className="mt-5 max-w-4xl font-heading text-[2.85rem] font-semibold leading-[0.93] tracking-[-0.055em] text-foreground sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.25rem]">
                Md. Nazmus

                <span className="block bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
                  Shakib
                </span>
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-sky-500 to-cyan-500" />

                <p className="text-lg font-semibold text-foreground sm:text-xl">
                  {portfolioData.primaryRole}
                </p>
              </div>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                I build secure, scalable, and
                database-driven web applications with
                Laravel, PHP, MySQL, REST APIs, and modern
                frontend technologies.
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-7 flex flex-wrap gap-2">
              {portfolioData.heroBadges.map(
                (badge, index) => (
                  <motion.span
                    key={badge.label}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.2 + index * 0.07,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -3,
                            scale: 1.03,
                          }
                    }
                    className="rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-xl transition-colors hover:border-sky-400/40 hover:text-foreground sm:text-sm"
                  >
                    {badge.label}
                  </motion.span>
                ),
              )}
            </div>

            {/* Main buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                render={<a href="#projects" />}
                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 px-7 text-white shadow-[0_18px_40px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_22px_50px_rgba(14,165,233,0.38)] sm:w-auto"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                <span className="relative flex items-center gap-2">
                  Explore Projects

                  <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
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
                className="w-full rounded-full border-border/70 bg-background/60 px-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-background/90 sm:w-auto"
              >
                <ArrowDownToLine />

                Download Resume
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              render={
                <a
                  href={portfolioData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              className="mt-5 rounded-full px-4 text-muted-foreground hover:bg-background/70 hover:text-foreground"
            >
              <Code2 />

              GitHub Profile

              <ArrowUpRight className="size-3.5" />
            </Button>

            {/* Statistics */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {portfolioData.heroStats
                .slice(0, 3)
                .map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 16,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.35 + index * 0.08,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -5,
                          }
                    }
                    className="rounded-2xl border border-border/60 bg-background/55 p-3 shadow-sm backdrop-blur-xl transition-all hover:border-sky-400/30 hover:bg-background/80 sm:p-4"
                  >
                    <p className="text-base font-semibold tracking-tight text-foreground sm:text-xl">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Right profile presentation */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-sky-500/20 via-cyan-500/5 to-violet-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950 p-3 shadow-[0_40px_120px_rgba(2,8,23,0.35)] sm:p-4">
              {/* Browser bar */}
              <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  <CheckCircle2 className="size-3.5 shrink-0 text-emerald-400" />

                  <span className="truncate text-[10px] text-slate-400 sm:text-xs">
                    mdnazmusshakib.me
                  </span>
                </div>

                <Code2 className="hidden size-4 text-slate-500 sm:block" />
              </div>

              {/* Profile image */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.25),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.20),transparent_42%)]" />

                <img
                  src="/images/profile.png"
                  alt={portfolioData.name}
                  width={900}
                  height={1000}
                  loading="eager"
                  className="relative h-[26rem] w-full object-cover object-top sm:h-[34rem] lg:h-[36rem]"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent px-5 pb-6 pt-32 sm:px-7">
                  <p className="text-xl font-semibold text-white sm:text-2xl">
                    Building useful digital products
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    Clean architecture · Secure APIs ·
                    Reliable workflows
                  </p>
                </div>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -8, 0],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                  className="absolute left-4 top-4 hidden rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-xl backdrop-blur-2xl sm:block"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                      <Database className="size-5" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Database Driven
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Laravel · MySQL · APIs
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Project card — separate, no overlap */}
              <div className="mt-3 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(30,41,59,0.98),rgba(15,23,42,0.98))] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300 sm:text-xs">
                      Live Project Spotlight
                    </p>

                    <h2 className="mt-2 text-lg font-semibold leading-snug text-white sm:text-xl">
                      {liveProject.title}
                    </h2>
                  </div>

                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-300">
                    <ShieldCheck className="size-5" />
                  </span>
                </div>

                <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-300 sm:text-sm">
                  {liveProject.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {liveProject.technologies
                    .slice(0, 5)
                    .map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                </div>

                <div
                  className={`mt-5 grid gap-3 ${
                    liveProject.liveUrl
                      ? 'sm:grid-cols-2'
                      : ''
                  }`}
                >
                  <a
                    href={liveProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.12] sm:text-sm"
                  >
                    <Code2 className="size-4" />

                    Repository
                  </a>

                  {liveProject.liveUrl ? (
                    <a
                      href={liveProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-500 px-4 text-xs font-semibold text-slate-950 shadow-[0_14px_35px_rgba(34,211,238,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(34,211,238,0.36)] sm:text-sm"
                    >
                      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                      <span className="relative flex items-center gap-2">
                        Live Demo

                        <ArrowUpRight className="size-4" />
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Static technology strip */}
        <div className="mt-12 grid grid-cols-2 gap-2 border-t border-border/50 pt-6 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
          {[
            'Laravel',
            'PHP',
            'MySQL',
            'REST APIs',
            'React',
            'Git & GitHub',
          ].map((technology) => (
            <div
              key={technology}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/50 px-3 py-3 text-center text-xs font-medium text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/35 hover:text-foreground sm:text-sm"
            >
              <span className="size-1.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />

              {technology}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}