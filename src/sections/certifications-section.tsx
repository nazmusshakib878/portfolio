import { BadgeCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified training and credential details."
        description="The section lists the real Laravel training certificate and its verification link."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {portfolioData.certifications.map((item) => (
          <Card key={`${item.title}-${item.certificateId}`} className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-muted/60">
                  <BadgeCheck className="size-5" />
                </span>
                <div className="space-y-2">
                  <div className="font-heading text-lg font-semibold text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.provider}</div>
                  <div className="text-sm text-muted-foreground">{item.program}</div>
                  <div className="text-sm font-medium text-muted-foreground">{item.duration}</div>
                  <div className="text-sm font-medium text-muted-foreground">Issued: {item.issued}</div>
                  <div className="text-sm text-muted-foreground">Certificate ID: {item.certificateId}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.topics.map((topic) => (
                  <span key={topic} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-medium text-foreground">
                    {topic}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="rounded-full" render={<a href={item.verifyUrl} target="_blank" rel="noreferrer" />}>
                Verify certificate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}