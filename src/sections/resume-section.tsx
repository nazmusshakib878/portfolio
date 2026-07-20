import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function ResumeSection() {
  return (
    <section id="resume" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Resume"
        title="Download the current resume file when it is available."
        description="The button points to the real /resume.pdf asset and stays truthful about the file being present."
      />

      <Card className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-2">
            <div className="font-heading text-lg font-semibold text-foreground">{portfolioData.name}</div>
            <p className="text-sm leading-7 text-muted-foreground">The portfolio is wired to download /resume.pdf when that file is added to the public directory.</p>
          </div>
          <Button variant="default" className="rounded-full px-5" render={<a href={portfolioData.resumeHref} download />}>
            <Download />
            Download resume
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}