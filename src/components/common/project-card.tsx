import {
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  GraduationCap,
  LibraryBig,
  ShieldCheck,
  Truck,
} from 'lucide-react'

import {
  motion,
  useReducedMotion,
} from 'motion/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'

import { cn } from '@/lib/utils'
import type { ProjectItem } from '@/types/portfolio'

type ProjectCardProps = {
  project: ProjectItem
}

function getProjectVisual(title: string) {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('securex')) {
    return {
      icon: ShieldCheck,
      label: 'Security Service Platform',
      gradient:
        'from-sky-500/45 via-cyan-500/25 to-blue-950',
      glow: 'bg-sky-400/30',
      iconStyle:
        'border-sky-300/25 bg-sky-400/15 text-sky-200',
      badgeStyle:
        'border-sky-300/20 bg-sky-400/10 text-sky-200',
    }
  }

  if (normalizedTitle.includes('campus')) {
    return {
      icon: GraduationCap,
      label: 'AI Academic Platform',
      gradient:
        'from-violet-500/45 via-fuchsia-500/25 to-purple-950',
      glow: 'bg-violet-400/30',
      iconStyle:
        'border-violet-300/25 bg-violet-400/15 text-violet-200',
      badgeStyle:
        'border-violet-300/20 bg-violet-400/10 text-violet-200',
    }
  }

  if (normalizedTitle.includes('library')) {
    return {
      icon: LibraryBig,
      label: 'Library Management System',
      gradient:
        'from-amber-500/40 via-orange-500/25 to-stone-950',
      glow: 'bg-amber-400/25',
      iconStyle:
        'border-amber-300/25 bg-amber-400/15 text-amber-200',
      badgeStyle:
        'border-amber-300/20 bg-amber-400/10 text-amber-200',
    }
  }

  if (normalizedTitle.includes('logistica')) {
    return {
      icon: Truck,
      label: 'Internship Collaboration',
      gradient:
        'from-emerald-500/40 via-teal-500/25 to-slate-950',
      glow: 'bg-emerald-400/25',
      iconStyle:
        'border-emerald-300/25 bg-emerald-400/15 text-emerald-200',
      badgeStyle:
        'border-emerald-300/20 bg-emerald-400/10 text-emerald-200',
    }
  }

  return {
    icon: Braces,
    label: 'Software Project',
    gradient:
      'from-sky-500/40 via-violet-500/20 to-slate-950',
    glow: 'bg-sky-400/25',
    iconStyle:
      'border-sky-300/25 bg-sky-400/15 text-sky-200',
    badgeStyle:
      'border-sky-300/20 bg-sky-400/10 text-sky-200',
  }
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const visual = getProjectVisual(project.title)
  const VisualIcon = visual.icon

  const visibleFeatures = project.keyFeatures.slice(
    0,
    project.featured ? 5 : 4,
  )

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 35,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      className={cn(
        'h-full [perspective:1200px]',
        project.featured && 'lg:col-span-2',
      )}
    >
      <Card className="group relative h-full overflow-hidden border-border/60 bg-card/75 p-0 shadow-[0_24px_90px_rgba(15,23,42,0.09)] backdrop-blur-2xl transition-all duration-500 hover:border-sky-400/30 hover:shadow-[0_35px_120px_rgba(14,165,233,0.14)]">
        {/* Border glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 z-10 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div
          className={cn(
            'grid h-full',
            project.featured &&
              'lg:grid-cols-[1.05fr_0.95fr]',
          )}
        >
          {/* Project visual */}
          <CardHeader className="p-3 sm:p-4">
            <div
              className={cn(
                'relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br',
                project.featured
                  ? 'min-h-[21rem] sm:min-h-[25rem]'
                  : 'min-h-[17rem]',
                visual.gradient,
              )}
            >
              <div className="absolute inset-0 bg-slate-950/40" />

              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:34px_34px]" />

              <motion.div
                aria-hidden="true"
                className={cn(
                  'absolute -right-24 -top-24 size-72 rounded-full blur-[90px]',
                  visual.glow,
                )}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.2, 1],
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />

              <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-white/10 blur-[90px]" />

              <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            rotate: -5,
                            scale: 1.05,
                          }
                    }
                    className={cn(
                      'flex size-14 shrink-0 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-xl sm:size-16',
                      visual.iconStyle,
                    )}
                  >
                    <VisualIcon className="size-7 sm:size-8" />
                  </motion.div>

                  <div className="flex flex-col items-end gap-2">
                    {project.liveUrl ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200 backdrop-blur-xl">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>

                        Live
                      </span>
                    ) : null}

                    <span
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-[10px] font-medium backdrop-blur-xl sm:text-xs',
                        visual.badgeStyle,
                      )}
                    >
                      {project.featured
                        ? 'Featured Project'
                        : project.category}
                    </span>
                  </div>
                </div>

                {/* Decorative code window */}
                <div className="my-8 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-rose-400" />
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span className="size-2 rounded-full bg-emerald-400" />

                    <span className="ml-auto text-[10px] text-white/40">
                      project.ts
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="h-2 w-[82%] rounded-full bg-white/15" />
                    <div className="h-2 w-[65%] rounded-full bg-sky-300/25" />
                    <div className="h-2 w-[74%] rounded-full bg-white/10" />
                    <div className="h-2 w-[48%] rounded-full bg-violet-300/25" />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-xs">
                    {visual.label}
                  </p>

                  <h3
                    className={cn(
                      'mt-3 max-w-xl font-heading font-semibold leading-tight tracking-tight text-white',
                      project.featured
                        ? 'text-2xl sm:text-3xl'
                        : 'text-xl sm:text-2xl',
                    )}
                  >
                    {project.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies
                      .slice(0, 4)
                      .map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur-xl"
                        >
                          {technology}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Project information */}
          <div className="flex min-w-0 flex-col">
            <CardContent className="flex-1 space-y-6 p-5 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-600 dark:text-sky-400">
                  <span>{project.category}</span>

                  {project.date ? (
                    <>
                      <span className="text-muted-foreground">
                        •
                      </span>

                      <span className="text-muted-foreground">
                        {project.date}
                      </span>
                    </>
                  ) : null}
                </div>

                <h3 className="mt-3 font-heading text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {project.summary}
                </p>
              </div>

              {project.role || project.supervisor ? (
                <div className="flex flex-wrap gap-2">
                  {project.role ? (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1"
                    >
                      {project.role}
                    </Badge>
                  ) : null}

                  {project.supervisor ? (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1"
                    >
                      {project.supervisor}
                    </Badge>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-3">
                {visibleFeatures.map(
                  (feature, index) => (
                    <motion.div
                      key={feature}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: -10,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      className="flex gap-3 rounded-xl border border-border/50 bg-background/45 px-3.5 py-3 text-sm leading-6 text-muted-foreground"
                    >
                      <span className="mt-2 flex size-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />

                      <span>{feature}</span>
                    </motion.div>
                  ),
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map(
                  (technology) => (
                    <Badge
                      key={technology}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-[10px] font-medium"
                    >
                      {technology}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 border-t border-border/60 bg-muted/20 p-5 sm:flex-row sm:items-center sm:p-6">
              <Button
                variant="outline"
                size="sm"
                render={
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} repository`}
                  />
                }
                className="w-full rounded-full border-border/70 bg-background/60 sm:w-auto"
              >
                <Code2 />
                Repository
                <ArrowUpRight className="size-3.5" />
              </Button>

              {project.liveUrl ? (
                <Button
                  size="sm"
                  render={
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    />
                  }
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 text-white shadow-[0_12px_30px_rgba(14,165,233,0.24)] hover:text-white sm:w-auto"
                >
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                  <span className="relative flex items-center gap-2">
                    Live Demo
                    <ArrowUpRight />
                  </span>
                </Button>
              ) : null}

              <div className="flex items-center gap-2 text-xs text-muted-foreground sm:ml-auto">
                <Database className="size-4 text-sky-500" />

                Database-driven solution
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}