import { CalendarDays, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Experience"
        title="One verified internship experience."
        description="The timeline only includes the real backend internship at Appstick Tech Firm and the Logistica project work."
      />

      <div className="space-y-4">
        {portfolioData.experience.map((item) => (
          <Card key={`${item.company}-${item.role}`} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
            <CardContent className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[0.38fr_0.62fr]">
              <div className="space-y-3">
                <div className="font-heading text-xl font-semibold text-foreground">{item.role}</div>
                <div className="text-sm font-medium text-muted-foreground">{item.company}</div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {item.location}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">{item.summary}</p>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/50" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((technology) => (
                    <Badge key={technology} variant="outline" className="rounded-full px-3 py-1 text-[11px] font-medium">
                      {technology}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}