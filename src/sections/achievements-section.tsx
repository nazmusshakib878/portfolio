import { Trophy } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function AchievementsSection() {
  return (
    <section id="achievements" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Achievements"
        title="Academic and training highlights."
        description="The cards summarize the real grades, leadership, and training milestones from the portfolio."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {portfolioData.achievements.map((achievement) => (
          <Card key={achievement.title} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Trophy className="size-4 text-muted-foreground" />
                Achievement
              </div>
              <div className="font-heading text-lg font-semibold text-foreground">{achievement.title}</div>
              <p className="text-sm leading-7 text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {portfolioData.technologies.map((technology) => (
          <Badge key={technology} variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-medium">
            {technology}
          </Badge>
        ))}
      </div>
    </section>
  )
}