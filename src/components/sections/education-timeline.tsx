import {
  BookOpen,
  CalendarDays,
  Check,
  GraduationCap,
  MapPin,
  School,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData } from '@/data/portfolio'

export function EducationTimeline() {
  const bsc = portfolioData.education.find((e) => e.type === 'degree')
  const hsc = portfolioData.education.find((e) => e.title.includes('Higher Secondary'))
  const ssc = portfolioData.education.find((e) => e.title.includes('Secondary School'))

  const timelineItems = [
    {
      id: '01',
      isPrimary: true,
      title: 'B.Sc in Computer Science & Engineering',
      institution: bsc?.institution ?? 'Northern University of Business and Technology Khulna (NUBTK)',
      location: bsc?.location ?? 'Khulna, Bangladesh',
      timeline: '2022 – 2026 (Expected: November 2026)',
      status: bsc?.status ?? 'Final year, final semester',
      gradeLabel: 'Current CGPA',
      gradeValue: bsc?.cgpa ?? '3.60 / 4.00',
      category: 'Undergraduate Degree',
      icon: GraduationCap,
      accent: {
        node: 'border-[rgba(43,217,181,0.5)] bg-[#0c1815] text-[#2bd9b5] shadow-[0_0_18px_rgba(43,217,181,0.35)]',
        card: 'border-[rgba(43,217,181,0.25)] bg-[rgba(12,20,22,0.78)] hover:border-[rgba(43,217,181,0.45)] hover:shadow-[0_20px_60px_rgba(43,217,181,0.12)]',
        badge: 'border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.1)] text-[#69e6cd]',
        gradeBadge: 'border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] text-[#2bd9b5]',
      },
      coursework: bsc?.coursework ?? [
        'Distributed Databases',
        'Software Architecture and Design',
        'Advanced Data Structures',
        'Network Routing Protocols',
      ],
    },
    {
      id: '02',
      isPrimary: false,
      title: 'Higher Secondary Certificate (HSC)',
      institution: hsc?.institution ?? 'Satkhira Government College',
      location: hsc?.location ?? 'Satkhira, Bangladesh',
      timeline: `Passing Year: ${hsc?.year ?? '2020'}`,
      status: 'Science Group',
      gradeLabel: 'HSC Result',
      gradeValue: `GPA ${hsc?.cgpa ?? '5.00 / 5.00'}`,
      category: 'Higher Secondary',
      icon: School,
      accent: {
        node: 'border-[rgba(168,130,255,0.4)] bg-[#151122] text-[#c4b5fd]',
        card: 'border-white/10 bg-[rgba(15,18,25,0.72)] hover:border-[rgba(168,130,255,0.35)] hover:bg-[rgba(17,20,30,0.85)]',
        badge: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.08)] text-[#c4b5fd]',
        gradeBadge: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.08)] text-[#c4b5fd]',
      },
    },
    {
      id: '03',
      isPrimary: false,
      title: 'Secondary School Certificate (SSC)',
      institution: ssc?.institution ?? 'Alipur Union Secondary School',
      location: ssc?.location ?? 'Satkhira, Bangladesh',
      timeline: `Passing Year: ${ssc?.year ?? '2018'}`,
      status: 'Science Group',
      gradeLabel: 'SSC Result',
      gradeValue: `GPA ${ssc?.cgpa ?? '5.00 / 5.00'}`,
      category: 'Secondary School',
      icon: BookOpen,
      accent: {
        node: 'border-[rgba(97,218,251,0.4)] bg-[#0d1720] text-[#7dd3fc]',
        card: 'border-white/10 bg-[rgba(15,18,25,0.72)] hover:border-[rgba(97,218,251,0.35)] hover:bg-[rgba(17,20,30,0.85)]',
        badge: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.08)] text-[#7dd3fc]',
        gradeBadge: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.08)] text-[#7dd3fc]',
      },
    },
  ]

  return (
    <section id="education" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">05 / Education</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Academic progression, degree milestones, and verified performance.
              </p>
            </div>
            <div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Academic background &amp; <span className="text-[#9aa6b7]">engineering foundations.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Vertical Timeline Wrapper */}
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          {/* Continuous Vertical Timeline Connecting Spine */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-6 bottom-6 w-px bg-gradient-to-b from-[#2bd9b5]/60 via-[#aa96ff]/40 to-white/10 sm:left-6 lg:left-8"
          />

          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {timelineItems.map((item) => {
              const ItemIcon = item.icon

              return (
                <Reveal key={item.id}>
                  <div className="relative flex items-start gap-4 sm:gap-6 lg:gap-8">
                    {/* Glowing Numbered Node on Timeline Spine */}
                    <div
                      className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-bold sm:size-12 sm:text-sm ${item.accent.node}`}
                    >
                      {item.id}
                    </div>

                    {/* Timeline Content Card */}
                    <article
                      className={`group flex-1 rounded-[24px] border p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${item.accent.card}`}
                    >
                      {/* Top Row: Category + Grade Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${item.accent.badge}`}
                          >
                            {item.category}
                          </span>
                          {item.isPrimary && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-emerald-400">
                              <Sparkles size={11} /> Primary Degree
                            </span>
                          )}
                        </div>

                        {/* Visual Metric Badge */}
                        <div
                          className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 ${item.accent.gradeBadge}`}
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
                            {item.gradeLabel}:
                          </span>
                          <span className="font-mono text-sm sm:text-base font-bold">
                            {item.gradeValue}
                          </span>
                        </div>
                      </div>

                      {/* Degree / Certificate Title */}
                      <h3
                        className={`display mt-4 font-bold text-[#f2f3f7] group-hover:text-white transition ${
                          item.isPrimary
                            ? 'text-xl sm:text-2xl lg:text-3xl'
                            : 'text-lg sm:text-xl'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Institution & Location */}
                      <p className="mt-2 text-sm sm:text-base font-medium text-[#d9dee7]">
                        {item.institution}
                      </p>

                      {/* Meta Specs Grid */}
                      <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#747b8b]">
                        <div className="flex items-center gap-1.5 text-[#d9dee7]">
                          <CalendarDays size={14} className="text-[#69e6cd]" aria-hidden="true" />
                          <span>{item.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#d9dee7]">
                          <MapPin size={14} className="text-[#69e6cd]" aria-hidden="true" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#c4b8ff]">
                          <ItemIcon size={14} aria-hidden="true" />
                          <span>{item.status}</span>
                        </div>
                      </div>

                      {/* Primary Coursework Chips for BSc CSE */}
                      {item.isPrimary && item.coursework && (
                        <div className="mt-6 border-t border-white/[0.08] pt-5">
                          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#747b8b] mb-2.5">
                            Core Engineering Curriculum
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.coursework.map((course) => (
                              <span
                                key={course}
                                className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-xs font-medium text-[#d9dee7] transition hover:border-[rgba(43,217,181,0.3)] hover:bg-white/[0.05]"
                              >
                                <Check size={12} className="text-[#2bd9b5]" />
                                <span>{course}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
