import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Skills"
        title="Practical backend, frontend, and engineering skills."
        description="The categories mirror the tools and practices actually used in the portfolio content."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.skills.map((skillCategory) => (
          <Card key={skillCategory.name} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{skillCategory.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pb-6">
              {skillCategory.items.map((item) => (
                <Badge key={item} variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-medium">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}