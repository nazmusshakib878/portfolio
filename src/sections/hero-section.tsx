import { BriefcaseBusiness, Code2, MoveRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { portfolioData } from '@/data/portfolio'

function LinkButton({
  href,
  children,
  variant = 'ghost',
  className,
}: {
  href: string
  children: ReactNode
  variant?: 'ghost' | 'outline' | 'default'
  className?: string
}) {
  return (
    <Button
      variant={variant}
      size="sm"
      render={<a href={href} target="_blank" rel="noreferrer" />}
      className={className}
    >
      {children}
    </Button>
  )
}

export function HeroSection() {
  const supportingRoles = portfolioData.supportingRoles.join(' • ')

  return (
    <section
      id="hero"
      className="relative scroll-mt-[7.5rem] overflow-hidden rounded-[2rem] border border-border/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(248,250,252,0.9))] px-6 py-16 shadow-[0_30px_120px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-10 sm:py-20 lg:scroll-mt-40 lg:px-16 lg:py-24 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(17,24,39,0.9))]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-orb aurora-orb-one" />
        <div className="aurora-orb aurora-orb-two" />
        <div className="aurora-orb aurora-orb-three" />

        <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute bottom-8 left-10 h-20 w-20 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="space-y-8"
        >
          <Badge
            variant="outline"
            className="rounded-full border-sky-300/60 bg-white/70 px-3 py-1 text-foreground shadow-sm backdrop-blur-md dark:bg-slate-900/60"
          >
            {portfolioData.availability}
          </Badge>

          <div className="space-y-4">
            <h1 className="font-heading max-w-3xl text-4xl leading-[1.05] font-semibold text-balance tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {portfolioData.name}

              <span className="text-gradient mt-3 block text-2xl leading-tight font-medium sm:text-3xl lg:text-[2rem]">
                {portfolioData.primaryRole}
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {portfolioData.heroDescription}
            </p>

            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {supportingRoles}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-full px-5"
              render={<a href="#projects" />}
            >
              View Projects
              <MoveRight />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border/70 bg-background/70 px-5 backdrop-blur-md"
              render={<a href="#contact" />}
            >
              Contact Me
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LinkButton
              href={portfolioData.githubUrl}
              className="rounded-full border border-border/60 bg-background/70 px-4 text-muted-foreground hover:text-foreground"
            >
              <Code2 />
              GitHub
            </LinkButton>

            {portfolioData.linkedinUrl ? (
              <LinkButton
                href={portfolioData.linkedinUrl}
                className="rounded-full border border-border/60 bg-background/70 px-4 text-muted-foreground hover:text-foreground"
              >
                <BriefcaseBusiness />
                LinkedIn
              </LinkButton>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {portfolioData.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60"
              >
                <div className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </div>

                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.65,
            ease: 'easeOut',
            delay: 0.1,
          }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-white/75 p-5 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:bg-slate-950/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_32%)]" />

            <div className="relative space-y-5">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-sky-400/30 bg-slate-900 shadow-[0_20px_60px_rgba(14,165,233,0.16)]">
                <div className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 blur-3xl" />

                <img
                  src="/images/profile.png"
                  alt={portfolioData.name}
                  width={720}
                  height={720}
                  loading="eager"
                  className="relative h-[20rem] w-full object-cover object-top sm:h-[24rem] lg:h-[26rem]"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent px-5 pb-5 pt-20">
                  <div className="flex items-center gap-3">
                    <span className="size-3 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(34,197,94,0.8)]" />

                    <div>
                      <p className="font-semibold text-white">
                        {portfolioData.primaryRole}
                      </p>

                      <p className="text-sm text-slate-300">
                        Laravel · PHP · MySQL · REST APIs
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 to-violet-50 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-950/70">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-emerald-500" />

                  <span className="text-sm font-medium text-muted-foreground">
                    Laravel, PHP, MySQL and API-driven applications
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {portfolioData.heroBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-md dark:bg-slate-900/70"
                  >
                    {badge.label}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm backdrop-blur-md">
                <p className="text-sm leading-7 text-muted-foreground">
                  {portfolioData.bio}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}