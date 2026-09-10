import {
  ArrowUpRight,
  FileText,
} from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { WhatIDo } from '@/components/sections/what-i-do'
import { ExperienceSection } from '@/components/sections/experience-section'
import { EducationTimeline } from '@/components/sections/education-timeline'
import { AchievementsSection } from '@/components/sections/achievements-section'
import { CurrentlyLearning } from '@/components/sections/currently-learning'
import { GitHubSection } from '@/components/sections/github-section'
import { DevelopmentProcess } from '@/components/sections/development-process'
import { ApplicationArchitecture } from '@/components/sections/application-architecture'
import { AvailabilitySection } from '@/components/sections/availability-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ProjectSlider } from '@/components/sections/project-slider'
import { SkillsExplorer } from '@/components/sections/skills-explorer'
import { TechnicalWritingSection } from '@/components/sections/technical-writing'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { IntroLoader } from '@/components/ui/intro-loader'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData } from '@/data/portfolio'

export default function Home() {
  return (
    <>
      <IntroLoader />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <WhatIDo />
        <ProjectSlider />
        <ExperienceSection />

        <section id="skills" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">03 / Core Skills</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    Production stack, daily engineering toolchain, and applied AI integrations.
                  </p>
                </div>
                <div>
                  <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                    Production stack, built for <span className="text-[#7f8b98]">reliability &amp; scale.</span>
                  </h2>
                </div>
              </div>
            </Reveal>
          </div>
          <SkillsExplorer />
        </section>

        <section id="about" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-start">
                <div>
                  <p className="eyebrow">04 / About</p>
                  <p className="muted mt-4 max-w-[13rem] text-sm leading-6">
                    The thinking and foundations behind my work.
                  </p>
                </div>
                <h2 className="display max-w-[920px] text-[clamp(2.6rem,4.9vw,4.9rem)] font-semibold text-[#f2f3f7]">
                  Engineering the quiet parts that make products{' '}
                  <span className="text-[#7f8b98]">dependable.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-[1.12fr_.88fr]">
              <Reveal>
                <article className="h-full rounded-[24px] border border-white/10 bg-[rgba(15,18,25,.72)] p-6 backdrop-blur-md sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-2 rounded-full bg-[#2bd9b5] shadow-[0_0_18px_rgba(43,217,181,.7)]" />
                    <p className="eyebrow">About me</p>
                  </div>
                  <p className="mt-8 max-w-3xl text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.55] text-[#d9dee7]">
                    {portfolioData.bio}
                  </p>
                </article>
              </Reveal>

              <Reveal>
                <aside className="h-full rounded-[24px] border border-[rgba(43,217,181,.2)] bg-[rgba(10,20,22,.72)] p-6 backdrop-blur-md sm:p-8 lg:p-10">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <p className="eyebrow">Currently</p>
                      <p className="muted mt-2 text-sm">A quick view of where I am now.</p>
                    </div>
                    <span className="rounded-full border border-[rgba(43,217,181,.24)] bg-[rgba(43,217,181,.08)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#69e6cd]">
                      In progress
                    </span>
                  </div>
                  <dl className="mt-2 grid sm:grid-cols-2 lg:grid-cols-1">
                    {portfolioData.heroStats.map((item, index) => (
                      <div
                        key={item.label}
                        className={`group py-5 ${index % 2 === 0 ? 'sm:border-r sm:pr-5' : 'sm:pl-5'} border-b border-white/10 last:border-b-0 lg:border-r-0 lg:px-0`}
                      >
                        <dt className="muted text-xs uppercase tracking-[.12em]">{item.label}</dt>
                        <dd className="display mt-3 text-[clamp(1.55rem,2.8vw,2.25rem)] font-semibold text-[#f4f6f8] transition-colors group-hover:text-[#69e6cd]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <EducationTimeline />

        <AchievementsSection />

        <CurrentlyLearning />

        <GitHubSection />

        <DevelopmentProcess />

        <ApplicationArchitecture />

        <section id="publications" className="section relative overflow-hidden py-12 lg:py-16">
          <div className="shell relative">
            <Reveal>
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow">11 / Publications</p>
                  <h2 className="display mt-2 text-2xl font-semibold text-[#f2f3f7] sm:text-3xl">
                    Technical Reports &amp; <span className="text-[#7f8b98]">Publications</span>
                  </h2>
                </div>
                <span className="display hidden text-sm font-semibold text-white/30 sm:block">
                  02 records preserved
                </span>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {portfolioData.publications.map((publication, index) => (
                <Reveal key={publication.doi}>
                  <article className="group flex h-full flex-col justify-between rounded-2xl border border-[rgba(124,92,255,0.2)] bg-[rgba(17,15,27,0.65)] p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(124,92,255,0.4)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] sm:p-6">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(124,92,255,0.25)] bg-[rgba(124,92,255,0.1)] text-[#aa96ff]">
                            <FileText aria-hidden="true" size={15} />
                          </span>
                          <span className="rounded-full border border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.08)] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#69e6cd]">
                            {publication.publisher}
                          </span>
                        </div>
                        <span className="display text-sm font-semibold text-white/25">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="display mt-4 text-base font-semibold leading-snug text-[#f2f3f7] group-hover:text-white sm:text-lg">
                        {publication.title}
                      </h3>

                      <p className="mt-2 break-all font-mono text-[11px] text-[#8e95a5]">
                        DOI: {publication.doi}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#aa96ff]">
                        {publication.type} · v{publication.version}
                      </span>
                      <a
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#d9dee7] transition hover:border-[rgba(43,217,181,0.4)] hover:bg-[rgba(43,217,181,0.08)] hover:text-[#2bd9b5]"
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TechnicalWritingSection />

        <AvailabilitySection />

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
