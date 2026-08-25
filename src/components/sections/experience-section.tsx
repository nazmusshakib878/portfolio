import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  Database,
  GitBranch,
  MapPin,
  Server,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData, projectSlug } from '@/data/portfolio'

const responsibilityDomains = [
  {
    title: 'Laravel Backend Development',
    description: 'Implemented server-side business logic and controller workflows using structured Laravel MVC architecture.',
    icon: Server,
  },
  {
    title: 'REST API & Logic Architecture',
    description: 'Developed and maintained server-side workflows, data transformations, and reusable application modules.',
    icon: Code2,
  },
  {
    title: 'MySQL Database & Integrity',
    description: 'Performed relational database schema validation, integrity checks, and SQL query verifications.',
    icon: Database,
  },
  {
    title: 'Debugging & Code Quality',
    description: 'Assisted in identifying edge-case bugs, tracing application errors, and verifying overall system reliability.',
    icon: Wrench,
  },
  {
    title: 'Git Workflow & Team Collaboration',
    description: 'Collaborated in an Agile team using Git branching conventions, pull request reviews, and repository discipline.',
    icon: GitBranch,
  },
]

const keyContributions = [
  {
    action: 'Built backend features using Laravel MVC architecture and reusable PHP service logic.',
    category: 'Backend Development',
  },
  {
    action: 'Performed relational database integrity checks to validate schema consistency across shipment workflows.',
    category: 'Database Validation',
  },
  {
    action: 'Assisted with debugging and troubleshooting to enhance server-side application reliability.',
    category: 'Quality & Debugging',
  },
  {
    action: 'Collaborated in an Agile team with Git branching discipline and peer code reviews.',
    category: 'Team Workflow',
  },
]

interface EngineeringStrength {
  number: string
  title: string
  description: string
  skills: string[]
  icon: React.ComponentType<{ size?: number; className?: string }>
  accent: {
    iconBg: string
    iconBorder: string
    iconColor: string
    hoverBorder: string
    badgeBg: string
  }
}

const engineeringStrengths: EngineeringStrength[] = [
  {
    number: '01',
    title: 'Backend Architecture',
    description:
      'Designing structured backend systems with Laravel MVC architecture, secure APIs, and authentication workflows.',
    skills: ['Laravel MVC', 'REST API', 'Authentication'],
    icon: Server,
    accent: {
      iconBg: 'bg-[rgba(240,83,64,0.1)]',
      iconBorder: 'border-[rgba(240,83,64,0.25)]',
      iconColor: 'text-[#ff9c90]',
      hoverBorder: 'hover:border-[rgba(240,83,64,0.4)]',
      badgeBg: 'border-[rgba(240,83,64,0.2)] bg-[rgba(240,83,64,0.05)] text-[#ffb5ac]',
    },
  },
  {
    number: '02',
    title: 'Database Engineering',
    description:
      'Building reliable relational database structures with proper schema design and efficient data handling.',
    skills: ['MySQL', 'Database Design', 'Query Optimization'],
    icon: Database,
    accent: {
      iconBg: 'bg-[rgba(43,217,181,0.1)]',
      iconBorder: 'border-[rgba(43,217,181,0.25)]',
      iconColor: 'text-[#69e6cd]',
      hoverBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      badgeBg: 'border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.05)] text-[#a7f3d0]',
    },
  },
  {
    number: '03',
    title: 'Problem Solving',
    description:
      'Analyzing issues, identifying root causes, and improving application reliability through systematic debugging.',
    skills: ['Debugging', 'Troubleshooting'],
    icon: Wrench,
    accent: {
      iconBg: 'bg-[rgba(168,130,255,0.1)]',
      iconBorder: 'border-[rgba(168,130,255,0.25)]',
      iconColor: 'text-[#c4b5fd]',
      hoverBorder: 'hover:border-[rgba(168,130,255,0.45)]',
      badgeBg: 'border-[rgba(168,130,255,0.2)] bg-[rgba(168,130,255,0.05)] text-[#ddd6fe]',
    },
  },
  {
    number: '04',
    title: 'Team Development',
    description:
      'Following professional development workflows through version control, collaboration, review practices, and technical documentation.',
    skills: ['Git', 'GitHub', 'Code Review', 'Documentation'],
    icon: GitBranch,
    accent: {
      iconBg: 'bg-[rgba(97,218,251,0.1)]',
      iconBorder: 'border-[rgba(97,218,251,0.25)]',
      iconColor: 'text-[#7dd3fc]',
      hoverBorder: 'hover:border-[rgba(97,218,251,0.4)]',
      badgeBg: 'border-[rgba(97,218,251,0.2)] bg-[rgba(97,218,251,0.05)] text-[#bae6fd]',
    },
  },
]

export function ExperienceSection() {
  const exp = portfolioData.experience[0]
  const logisticaSlug = projectSlug('Logistica')

  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">02 / Experience</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Hands-on software development experience, responsibilities, and verified contributions.
              </p>
            </div>
            <div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Practical engineering, delivered in <span className="text-[#9aa6b7]">team environments.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Main Experience Showcase Card */}
        <div className="mt-14 lg:mt-16">
          <Reveal>
            <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(15,18,25,0.76)] backdrop-blur-xl transition duration-300 hover:border-[rgba(124,92,255,0.34)] hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
              <div className="grid lg:grid-cols-[0.34fr_1fr]">
                {/* Left Sidebar: Organization & Meta */}
                <aside className="border-b border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl border border-[rgba(124,92,255,0.28)] bg-[rgba(124,92,255,0.1)] text-[#aa96ff]">
                        <BriefcaseBusiness aria-hidden="true" size={21} />
                      </span>
                      <span className="display text-2xl font-semibold text-white/25">01</span>
                    </div>

                    <div className="mt-8">
                      <span className="rounded-full border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd]">
                        Software Firm Internship
                      </span>
                      <h3 className="display mt-3 text-2xl font-bold text-[#f2f3f7]">
                        {exp.company}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#c4b8ff]">
                        {exp.role}
                      </p>
                    </div>

                    <div className="mt-8 space-y-4 border-t border-white/[0.08] pt-6">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 shrink-0 text-[#69e6cd]" size={16} aria-hidden="true" />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">Duration</p>
                          <p className="mt-0.5 text-xs text-[#d9dee7]">{exp.period}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 shrink-0 text-[#69e6cd]" size={16} aria-hidden="true" />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">Location</p>
                          <p className="mt-0.5 text-xs text-[#d9dee7]">{exp.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Anchor in Sidebar */}
                  <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/40 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">Assigned Project</p>
                    <p className="mt-1 text-xs font-semibold text-[#f2f3f7]">Logistica Platform</p>
                    <p className="mt-1 text-[11px] text-[#9aa6b7] leading-relaxed">
                      Transport &amp; courier supply management system.
                    </p>
                    <Link
                      href={`/projects/${logisticaSlug}`}
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#69e6cd] hover:underline"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </aside>

                {/* Right Content Area: Roles, Responsibilities & Contributions */}
                <div className="p-6 sm:p-8 lg:p-10 lg:pl-12">
                  <div className="border-b border-white/[0.08] pb-6">
                    <p className="eyebrow text-[#69e6cd]">Role Overview</p>
                    <h4 className="display mt-2 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
                      {exp.role} &middot; <span className="text-[#aeb6c3] font-normal">{exp.company}</span>
                    </h4>
                    <p className="muted mt-4 max-w-3xl text-sm sm:text-base leading-7">
                      {exp.summary}
                    </p>
                  </div>

                  {/* 1. Responsibilities Breakdown */}
                  <div className="mt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">
                      Core Engineering Responsibilities
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {responsibilityDomains.map((resp) => {
                        const RespIcon = resp.icon
                        return (
                          <div
                            key={resp.title}
                            className="flex items-start gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-white/15 hover:bg-white/[0.035]"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] text-[#2bd9b5]">
                              <RespIcon size={16} />
                            </span>
                            <div>
                              <h5 className="text-xs font-semibold text-[#f2f3f7]">{resp.title}</h5>
                              <p className="mt-1 text-[11px] text-[#9aa6b7] leading-relaxed">{resp.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 2. Key Contributions Area */}
                  <div className="mt-8 rounded-2xl border border-[rgba(124,92,255,0.2)] bg-[rgba(17,15,27,0.6)] p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#aa96ff]">
                      <ShieldCheck size={16} />
                      <p className="text-xs font-semibold uppercase tracking-wider">
                        Key Technical Contributions
                      </p>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {keyContributions.map((contrib, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/30 p-3 text-xs leading-relaxed text-[#d9dee7]"
                        >
                          <Check size={14} className="mt-0.5 shrink-0 text-[#aa96ff]" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-[#f2f3f7]">{contrib.action}</span>
                            <span className="ml-2 rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[9.5px] font-mono text-[#aeb6c3]">
                              {contrib.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Tech Stack & Repository Links */}
                  <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98] mb-2">
                        Technologies Used
                      </p>
                      <ul aria-label="Technologies used" className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.06)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd]"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {exp.repositoryUrl && (
                        <a
                          className="button min-h-10 rounded-xl border-white/15 bg-white/[0.03] px-4 text-xs font-semibold text-[#f2f3f7] hover:border-white/30"
                          href={exp.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiGithub size={13} /> View Repository <ArrowUpRight size={13} />
                        </a>
                      )}
                      <Link
                        className="button primary min-h-10 rounded-xl px-4 text-xs font-semibold"
                        href={`/projects/${logisticaSlug}`}
                      >
                        Case Study <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* 4 Upgraded Engineering Strengths Cards */}
        <Reveal className="mt-12 lg:mt-16">
          <div className="flex items-end justify-between gap-5 border-b border-white/[0.08] pb-5">
            <div>
              <p className="eyebrow">Engineering Foundations</p>
              <h3 className="display mt-1 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
                Engineering Strengths
              </h3>
              <p className="muted mt-1 text-xs sm:text-sm">
                Core engineering principles and technical disciplines applied across production systems.
              </p>
            </div>
            <span className="display hidden text-2xl font-semibold text-white/20 sm:block">04 Strengths</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringStrengths.map((strength) => {
              const Icon = strength.icon
              return (
                <article
                  key={strength.title}
                  className={`group flex h-full flex-col justify-between rounded-[22px] border border-white/[0.08] bg-[rgba(15,18,25,0.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,22,30,0.88)] ${strength.accent.hoverBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`flex size-10 items-center justify-center rounded-xl border ${strength.accent.iconBorder} ${strength.accent.iconBg} ${strength.accent.iconColor} transition duration-300 group-hover:scale-105`}
                      >
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <span className="display text-lg font-semibold text-white/20 transition group-hover:text-white/35">
                        {strength.number}
                      </span>
                    </div>

                    <h4 className="display mt-5 text-lg font-semibold text-[#f2f3f7] group-hover:text-white transition">
                      {strength.title}
                    </h4>

                    <p className="muted mt-2.5 text-xs leading-relaxed">
                      {strength.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.07] pt-4">
                    <ul aria-label={`${strength.title} skills`} className="flex flex-wrap gap-1.5">
                      {strength.skills.map((skill) => (
                        <li
                          key={skill}
                          className={`rounded-md border px-2 py-0.5 text-[10.5px] font-medium transition ${strength.accent.badgeBg}`}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
