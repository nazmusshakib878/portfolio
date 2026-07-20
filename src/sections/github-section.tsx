import { Code2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function GithubSection() {
  return (
    <section id="github" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="GitHub"
        title="Repository links and profile details without fake metrics."
        description="The section shows the real profile and repository links, while leaving live analytics for a future API integration."
      />

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
          <CardContent className="space-y-5 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-muted/60">
                <Code2 className="size-5" />
              </span>
              <div>
                <div className="font-heading text-lg font-semibold text-foreground">{portfolioData.githubUsername}</div>
                <a
                  href={portfolioData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {portfolioData.githubUrl}
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-1">
              {portfolioData.githubProfile.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/60 bg-background/60 p-4">
                  <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{item.label}</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {portfolioData.githubHighlights.map((highlight) => (
            <Card key={highlight.title} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
              <CardContent className="space-y-3 p-6">
                <div className="font-heading text-lg font-semibold text-foreground">{highlight.title}</div>
                <p className="text-sm leading-7 text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
          <div className="grid gap-3 md:grid-cols-2">
            {portfolioData.githubRepos.map((repo) => (
              <Card key={repo.title} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <CardContent className="space-y-3 p-6">
                  <div className="font-heading text-lg font-semibold text-foreground">{repo.title}</div>
                  <p className="text-sm leading-7 text-muted-foreground">{repo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {repo.technologies.map((technology) => (
                      <span key={technology} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-medium text-foreground">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full" render={<a href={repo.href} target="_blank" rel="noreferrer" />}>
                    View repository
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}