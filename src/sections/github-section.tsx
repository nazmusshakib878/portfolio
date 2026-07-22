import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  Sparkles,
} from 'lucide-react'

import {
  motion,
  useReducedMotion,
} from 'motion/react'

import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function GithubSection() {
  const shouldReduceMotion = useReducedMotion()

  const repositoryCount =
    portfolioData.projects.length

  return (
    <section
      id="github"
      className="scroll-mt-[7.5rem] space-y-10 lg:scroll-mt-40"
    >
      <SectionHeading
        eyebrow="GitHub"
        title="Explore my code, repositories, and development work."
        description="All major projects are already presented in the Projects section. This section provides direct access to my GitHub profile without repeating the same project cards."
        align="center"
      />

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 30,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-slate-950 p-4 shadow-[0_30px_100px_rgba(2,8,23,0.25)] sm:p-6 lg:p-8"
      >
        {/* Background design */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.17),transparent_36%)]" />

          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:38px_38px]" />

          <motion.div
            className="absolute -right-24 -top-24 size-72 rounded-full bg-violet-500/20 blur-[100px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.18, 1],
                    x: [0, -25, 0],
                    y: [0, 25, 0],
                  }
            }
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute -bottom-28 -left-24 size-72 rounded-full bg-sky-500/20 blur-[100px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.15, 1],
                    x: [0, 25, 0],
                  }
            }
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* GitHub profile */}
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: -5,
                        scale: 1.05,
                      }
                }
                className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-gradient-to-br from-sky-400/20 to-violet-500/20 text-sky-300 shadow-[0_15px_35px_rgba(14,165,233,0.18)] sm:size-20"
              >
                <Code2 className="size-8 sm:size-9" />
              </motion.div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-heading text-xl font-semibold text-white sm:text-2xl">
                    {portfolioData.githubUsername}
                  </h3>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                    <CheckCircle2 className="size-3" />
                    Active Profile
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Laravel, PHP, MySQL, REST APIs and
                  database-driven application development.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  {repositoryCount}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Selected Projects
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  Laravel
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Main Framework
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-1">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  MySQL
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Database Focus
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                render={
                  <a
                    href={portfolioData.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 text-white shadow-[0_15px_35px_rgba(14,165,233,0.25)] hover:text-white sm:w-auto"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                <span className="relative flex items-center gap-2">
                  Open GitHub Profile
                  <ArrowUpRight />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                render={<a href="#projects" />}
                className="w-full rounded-full border-white/15 bg-white/[0.06] text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Code2 />
                View Projects
              </Button>
            </div>
          </div>

          {/* Development focus */}
          <div className="grid gap-3">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 5,
                    }
              }
              className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                  <Database className="size-5" />
                </span>

                <div>
                  <h4 className="font-semibold text-white">
                    Database-Driven Systems
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Relational database design, MySQL,
                    Eloquent ORM and secure application
                    workflows.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 5,
                    }
              }
              className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Sparkles className="size-5" />
                </span>

                <div>
                  <h4 className="font-semibold text-white">
                    Practical Development
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Real academic, industrial training and
                    internship projects with accessible
                    source code.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-violet-500/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Development Stack
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Laravel',
                  'PHP',
                  'MySQL',
                  'React',
                  'REST APIs',
                  'Git',
                  'GitHub',
                ].map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-slate-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}