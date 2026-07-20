import { Briefcase, MapPin, Sparkles } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="About"
        title="Backend-focused, truthful, and built around real experience."
        description="A concise summary of the person behind the work, supported by short factual cards and no fabricated claims."
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-sm">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4" />
              Introduction
            </div>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">{portfolioData.bio}</p>
            <p className="text-sm leading-7 text-muted-foreground">{portfolioData.heroDescription}</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {portfolioData.aboutCards.map((card, index) => {
            const icons = [MapPin, Briefcase, Sparkles]
            const Icon = icons[index] ?? Sparkles

            return (
              <Card key={card.title} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Icon className="size-4 text-muted-foreground" />
                    {card.title}
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}