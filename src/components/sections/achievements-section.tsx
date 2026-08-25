import {
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  FileCheck2,
  FileText,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData } from '@/data/portfolio'

export function AchievementsSection() {
  const cert = portfolioData.certifications[0]
  const bsc = portfolioData.education.find((e) => e.type === 'degree')
  const hsc = portfolioData.education.find((e) => e.title.includes('Higher Secondary'))
  const ssc = portfolioData.education.find((e) => e.title.includes('Secondary School'))
  const publications = portfolioData.publications

  return (
    <section id="achievements" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">06 / Milestones</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Academic records, specialized training certifications, and research publications.
              </p>
            </div>
            <div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Academic excellence &amp; <span className="text-[#9aa6b7]">technical milestones.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 5 Achievement Cards Grid */}
        <div className="mt-14 space-y-6 lg:mt-16">
          {/* Top Row: 2 Major Featured Pillars (Undergraduate BSc + 80h Laravel Training) */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 01: Current CGPA (BSc CSE) */}
            <Reveal>
              <article className="group flex h-full flex-col justify-between rounded-[26px] border border-[rgba(43,217,181,0.25)] bg-[rgba(15,22,25,0.75)] p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[rgba(43,217,181,0.45)] hover:shadow-[0_20px_50px_rgba(43,217,181,0.12)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.1)] text-[#69e6cd] transition duration-300 group-hover:scale-105">
                        <GraduationCap size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#69e6cd]">
                          Academic Standing &middot; Milestone 01
                        </span>
                        <h3 className="display text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                          Current Undergraduate CGPA
                        </h3>
                      </div>
                    </div>
                    <span className="display text-2xl font-bold text-white/20">01</span>
                  </div>

                  {/* Highlight Value Display */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-3 rounded-2xl border border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.04)] p-4 sm:p-5">
                    <span className="display text-3xl sm:text-4xl font-bold text-[#69e6cd]">
                      {portfolioData.currentCgpa}
                    </span>
                    <span className="text-xs font-semibold text-[#d9dee7]">
                      BSc in Computer Science &amp; Engineering
                    </span>
                  </div>

                  <p className="muted mt-4 text-xs sm:text-sm leading-relaxed">
                    {bsc?.institution} &middot; {bsc?.status}. Expected graduation in {bsc?.graduation}. Maintaining strong performance with a curriculum centered around distributed databases, software architecture, and algorithms.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
                  {bsc?.coursework?.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[10.5px] font-medium text-[#d9dee7]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>

            {/* 04: Professional Laravel Training */}
            <Reveal>
              <article className="group flex h-full flex-col justify-between rounded-[26px] border border-[rgba(240,83,64,0.25)] bg-[rgba(25,16,18,0.75)] p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[rgba(240,83,64,0.45)] hover:shadow-[0_20px_50px_rgba(240,83,64,0.12)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.1)] text-[#ff9c90] transition duration-300 group-hover:scale-105">
                        <Code2 size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff9c90]">
                          Technical Certification &middot; Milestone 04
                        </span>
                        <h3 className="display text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                          Professional Laravel Training
                        </h3>
                      </div>
                    </div>
                    <span className="display text-2xl font-bold text-white/20">04</span>
                  </div>

                  {/* Highlight Value Display */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-3 rounded-2xl border border-[rgba(240,83,64,0.2)] bg-[rgba(240,83,64,0.04)] p-4 sm:p-5">
                    <span className="display text-3xl sm:text-4xl font-bold text-[#ff9c90]">
                      {portfolioData.laravelTrainingHours}
                    </span>
                    <span className="text-xs font-semibold text-[#d9dee7]">
                      Certified Backend Development Program
                    </span>
                  </div>

                  <p className="muted mt-4 text-xs sm:text-sm leading-relaxed">
                    {cert.provider} &middot; {cert.program}. Comprehensive training covering Laravel MVC, Eloquent ORM, Sanctum authentication, REST APIs, and normalized relational database design.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="font-mono text-[10px] text-[#747b8b]">
                    ID: {cert.certificateId}
                  </span>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.08)] px-3 py-1.5 text-xs font-semibold text-[#ffb5ac] transition hover:bg-[rgba(240,83,64,0.15)] hover:text-white"
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileCheck2 size={13} />
                    <span>Verify Certificate</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Bottom Row: 3 Milestone Cards (SSC + HSC + Technical Publications) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 02: SSC Academic Achievement */}
            <Reveal>
              <article className="group flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(97,218,251,0.35)] hover:bg-[rgba(17,22,30,0.85)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.08)] text-[#7dd3fc] transition duration-300 group-hover:scale-105">
                      <BookOpen size={18} aria-hidden="true" />
                    </span>
                    <span className="display text-lg font-semibold text-white/20">02</span>
                  </div>

                  <span className="mt-5 block text-[10px] font-bold uppercase tracking-wider text-[#7dd3fc]">
                    Secondary Education
                  </span>
                  <h4 className="display text-lg font-semibold text-[#f2f3f7] group-hover:text-white transition">
                    SSC Academic Score
                  </h4>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="display text-2xl font-bold text-[#7dd3fc]">
                      GPA {ssc?.cgpa ?? '5.00 / 5.00'}
                    </span>
                  </div>

                  <p className="muted mt-3 text-xs leading-relaxed">
                    {ssc?.institution} &middot; Science Group ({ssc?.year}). Achieved maximum GPA 5.00/5.00 in the nationwide board examination.
                  </p>
                </div>

                <div className="mt-5 border-t border-white/[0.07] pt-3 text-[11px] text-[#747b8b]">
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#69e6cd]" />
                    <span>Verified Science Curriculum</span>
                  </span>
                </div>
              </article>
            </Reveal>

            {/* 03: HSC Academic Achievement */}
            <Reveal>
              <article className="group flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(124,92,255,0.35)] hover:bg-[rgba(17,22,30,0.85)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(124,92,255,0.25)] bg-[rgba(124,92,255,0.08)] text-[#c4b5fd] transition duration-300 group-hover:scale-105">
                      <GraduationCap size={18} aria-hidden="true" />
                    </span>
                    <span className="display text-lg font-semibold text-white/20">03</span>
                  </div>

                  <span className="mt-5 block text-[10px] font-bold uppercase tracking-wider text-[#c4b5fd]">
                    Higher Secondary
                  </span>
                  <h4 className="display text-lg font-semibold text-[#f2f3f7] group-hover:text-white transition">
                    HSC Academic Score
                  </h4>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="display text-2xl font-bold text-[#c4b5fd]">
                      GPA {hsc?.cgpa ?? '5.00 / 5.00'}
                    </span>
                  </div>

                  <p className="muted mt-3 text-xs leading-relaxed">
                    {hsc?.institution} &middot; Science Group ({hsc?.year}). Maintained top-tier academic excellence with GPA 5.00/5.00.
                  </p>
                </div>

                <div className="mt-5 border-t border-white/[0.07] pt-3 text-[11px] text-[#747b8b]">
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#69e6cd]" />
                    <span>Verified Science Curriculum</span>
                  </span>
                </div>
              </article>
            </Reveal>

            {/* 05: Technical Publications & Research */}
            <Reveal>
              <article className="group flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(168,130,255,0.35)] hover:bg-[rgba(17,22,30,0.85)] md:col-span-2 lg:col-span-1">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.08)] text-[#c4b5fd] transition duration-300 group-hover:scale-105">
                      <FileText size={18} aria-hidden="true" />
                    </span>
                    <span className="display text-lg font-semibold text-white/20">05</span>
                  </div>

                  <span className="mt-5 block text-[10px] font-bold uppercase tracking-wider text-[#c4b5fd]">
                    Research &amp; Reports
                  </span>
                  <h4 className="display text-lg font-semibold text-[#f2f3f7] group-hover:text-white transition">
                    Zenodo Publications
                  </h4>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="display text-2xl font-bold text-[#c4b5fd]">
                      0{publications.length} Records
                    </span>
                    <span className="text-[11px] font-mono text-[#747b8b]">Registered DOIs</span>
                  </div>

                  <p className="muted mt-3 text-xs leading-relaxed">
                    Authored technical reports on SecureX system architecture and bias-aware clinical machine learning published on Zenodo.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3 text-[11px] text-[#747b8b]">
                  <span className="flex items-center gap-1 text-[#69e6cd]">
                    <Sparkles size={12} />
                    <span>Zenodo Open Access</span>
                  </span>
                  <a
                    href="#publications"
                    className="inline-flex items-center gap-1 font-semibold text-[#c4b8ff] hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
