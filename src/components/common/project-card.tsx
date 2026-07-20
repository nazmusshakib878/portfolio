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

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
      glow: 'from-cyan-500/30 via-sky-500/15 to-blue-600/30',
      iconStyle: 'border-cyan-300/30 bg-cyan-400/15 text-cyan-100',
    }
  }

  if (normalizedTitle.includes('campus')) {
    return {
      icon: GraduationCap,
      label: 'AI Academic Platform',
      glow: 'from-violet-500/30 via-purple-500/15 to-fuchsia-600/30',
      iconStyle: 'border-violet-300/30 bg-violet-400/15 text-violet-100',
    }
  }

  if (normalizedTitle.includes('library')) {
    return {
      icon: LibraryBig,
      label: 'Library Management System',
      glow: 'from-amber-500/30 via-orange-500/15 to-rose-600/25',
      iconStyle: 'border-amber-300/30 bg-amber-400/15 text-amber-100',
    }
  }

  if (normalizedTitle.includes('logistica')) {
    return {
      icon: Truck,
      label: 'Logistics Backend Project',
      glow: 'from-emerald-500/30 via-teal-500/15 to-cyan-600/25',
      iconStyle: 'border-emerald-300/30 bg-emerald-400/15 text-emerald-100',
    }
  }

  return {
    icon: Braces,
    label: 'Software Project',
    glow: 'from-sky-500/30 via-violet-500/15 to-purple-600/30',
    iconStyle: 'border-sky-300/30 bg-sky-400/15 text-sky-100',
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const visual = getProjectVisual(project.title)
  const VisualIcon = visual.icon

  const visibleFeatures = project.keyFeatures.slice(
    0,
    project.featured ? 6 : 4,
  )

  const descriptionIsDifferent =
    project.description.trim() !== project.summary.trim()

  return (
    <Card
      className={cn(
        'group flex h-full overflow-hidden border-border/60 bg-card/80 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-[0_26px_90px_rgba(14,165,233,0.12)]',
        project.featured && 'lg:row-span-2',
      )}
    >
      <CardHeader className="space-y-4">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br',
            project.featured ? 'h-64 sm:h-72' : 'h-48 sm:h-52',
            visual.glow,
          )}
        >
          <div className="absolute inset-0 bg-slate-950/55" />

          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 size-52 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div
                className={cn(
                  'flex size-14 items-center justify-center rounded-2xl border backdrop-blur-md',
                  visual.iconStyle,
                )}
              >
                <VisualIcon className="size-7" />
              </div>

              <Badge
                variant="outline"
                className="border-white/20 bg-black/20 text-white backdrop-blur-md"
              >
                {project.featured ? 'Featured Project' : project.category}
              </Badge>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                {visual.label}
              </p>

              <h3 className="mt-2 max-w-md text-xl font-semibold leading-tight text-white sm:text-2xl">
                {project.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <CardTitle className="text-xl leading-snug">
            {project.title}
          </CardTitle>

          <p className="mt-1 text-sm font-medium text-sky-500 dark:text-sky-400">
            {project.category}
          </p>

          <CardDescription className="mt-3 leading-6">
            {project.summary}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        {descriptionIsDifferent ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {project.description}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          {project.date ? <span>{project.date}</span> : null}
          {project.role ? <span>• {project.role}</span> : null}
          {project.supervisor ? <span>• {project.supervisor}</span> : null}
        </div>

        {visibleFeatures.length > 0 ? (
          <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sky-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Badge
              key={technology}
              variant="secondary"
              className="rounded-full px-3 py-1 text-[11px] font-medium"
            >
              {technology}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/30">
        <Button
          variant="outline"
          size="sm"
          render={
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            />
          }
          className="rounded-full"
        >
          <Code2 />
          GitHub
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
            className="rounded-full"
          >
            Live demo
            <ArrowUpRight />
          </Button>
        ) : null}

        <div className="ml-auto hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <Database className="size-4" />
          Database-driven
        </div>
      </CardFooter>
    </Card>
  )
}