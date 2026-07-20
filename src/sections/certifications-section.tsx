import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ExternalLink,
  Hash,
} from 'lucide-react'

import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { portfolioData } from '@/data/portfolio'

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="scroll-mt-[7.5rem] space-y-10 lg:scroll-mt-40"
    >
      <SectionHeading
        eyebrow="Certifications"
        title="Professional training and verified credentials."
        description="Formal Laravel backend development training completed under the EDGE Project of the Bangladesh Computer Council and ICT Division."
      />

      <div className="grid gap-6">
        {portfolioData.certifications.map((item) => (
          <Card
            key={`${item.title}-${item.certificateId}`}
            className="group relative overflow-hidden border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:shadow-[0_28px_100px_rgba(239,68,68,0.12)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_30%)]" />

            <CardContent className="relative p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-500/15 to-amber-500/15 text-red-500 shadow-sm dark:text-red-400">
                      <BadgeCheck className="size-7" />
                    </span>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500 dark:text-red-400">
                        Verified Professional Training
                      </p>

                      <h3 className="font-heading text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-6 text-muted-foreground">
                        Formal PHP and Laravel backend development training
                        focused on practical, database-driven web application
                        development.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur-md">
                      <Building2 className="mt-0.5 size-5 shrink-0 text-sky-500" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Conducted by
                        </p>

                        <p className="mt-1 text-sm font-medium leading-6 text-foreground">
                          {item.provider}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur-md">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-violet-500" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Program
                        </p>

                        <p className="mt-1 text-sm font-medium leading-6 text-foreground">
                          {item.program}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur-md">
                      <CalendarDays className="mt-0.5 size-5 shrink-0 text-amber-500" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {item.duration}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Issued: {item.issued}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur-md">
                      <Hash className="mt-0.5 size-5 shrink-0 text-emerald-500" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Credential ID
                        </p>

                        <p className="mt-1 break-all text-sm font-medium text-foreground">
                          {item.certificateId}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-foreground">
                      Training topics
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-border/60 bg-muted/50 px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-red-400/30 hover:bg-red-500/10"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-3 lg:min-w-56">
                  <div className="rounded-2xl border border-red-400/25 bg-gradient-to-br from-red-500/10 to-amber-500/10 p-5 text-center">
                    <BadgeCheck className="mx-auto size-9 text-red-500 dark:text-red-400" />

                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Official Certificate
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Open the official EDGE certificate verification document.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white shadow-[0_12px_30px_rgba(239,68,68,0.24)] transition-transform hover:scale-[1.02] hover:text-white"
                    render={
                      <a
                        href={item.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View verified certificate for ${item.title}`}
                      />
                    }
                  >
                    View Verified Certificate
                    <ExternalLink />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}