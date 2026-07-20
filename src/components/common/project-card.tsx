import { ArrowUpRight, Code2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ProjectItem } from '@/types/portfolio'

type ProjectCardProps = {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className={cn('h-full border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm')}>
      <CardHeader>
        <div className={cn('mb-4 aspect-[16/10] rounded-2xl border border-border/60 bg-gradient-to-br p-5', project.accent)}>
          <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-black/10 p-4 backdrop-blur-sm dark:bg-white/5">
            <div className="flex items-center justify-between text-xs text-white/80">
              <span>Preview</span>
              <span>{project.featured ? 'Featured' : 'Project'}</span>
            </div>
            <div>
              <div className="mb-3 h-2 w-24 rounded-full bg-white/70" />
              <div className="space-y-2">
                <div className="h-3 w-5/6 rounded-full bg-white/80" />
                <div className="h-3 w-2/3 rounded-full bg-white/60" />
              </div>
            </div>
          </div>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <div className="text-sm font-medium text-muted-foreground">{project.category}</div>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>{project.date}</span>
          {project.role ? <span>• {project.role}</span> : null}
          {project.supervisor ? <span>• {project.supervisor}</span> : null}
        </div>
        <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
          {project.keyFeatures.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/50" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Badge key={technology} variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-medium">
              {technology}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-border/60 bg-muted/40">
        <Button
          variant="outline"
          size="sm"
          render={<a href={project.githubUrl} target="_blank" rel="noreferrer" />}
          className="rounded-full"
        >
          <Code2 />
          GitHub
        </Button>
        {project.liveUrl ? (
          <Button size="sm" render={<a href={project.liveUrl} target="_blank" rel="noreferrer" />} className="rounded-full">
            Live demo
            <ArrowUpRight />
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}