import { GraduationCap } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Education"
        title="Formal education and academic milestones."
        description="The section lists the real degree, higher secondary, and secondary education records."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {portfolioData.education.map((item) => (
          <Card key={item.institution} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-muted/60">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <div className="font-heading text-lg font-semibold text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.institution}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-muted-foreground">{item.location}</div>
              {item.status ? <div className="text-sm font-medium text-muted-foreground">{item.status}</div> : null}
              {item.cgpa ? <div className="text-sm font-medium text-muted-foreground">CGPA: {item.cgpa}</div> : null}
              {item.graduation ? <div className="text-sm font-medium text-muted-foreground">Expected graduation: {item.graduation}</div> : null}
              {item.year ? <div className="text-sm font-medium text-muted-foreground">Year: {item.year}</div> : null}
              {item.coursework ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.coursework.map((course) => (
                    <span key={course} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-medium text-foreground">
                      {course}
                    </span>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}