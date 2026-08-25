import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileDown,
  Globe,
  Mail,
  Sparkles,
} from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData } from '@/data/portfolio'

interface OpportunityCard {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badges: string[]
  accent: {
    iconBg: string
    iconBorder: string
    iconColor: string
    hoverBorder: string
    badgeColor: string
  }
}

const opportunityCards: OpportunityCard[] = [
  {
    id: 'full-time',
    number: '01',
    title: 'Full-Time Roles',
    subtitle: 'Target Positions',
    description:
      'Ready to contribute full-time to scalable backend architectures, REST API ecosystems, relational database modeling, and modern React/Next.js frontend applications.',
    icon: Briefcase,
    badges: ['Backend Developer', 'Full Stack Developer', 'Laravel Developer'],
    accent: {
      iconBg: 'bg-[rgba(43,217,181,0.1)]',
      iconBorder: 'border-[rgba(43,217,181,0.25)]',
      iconColor: 'text-[#69e6cd]',
      hoverBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      badgeColor: 'border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.06)] text-[#69e6cd]',
    },
  },
  {
    id: 'remote',
    number: '02',
    title: 'Remote Opportunities',
    subtitle: 'Distributed Teams',
    description:
      'Available for remote collaboration across distributed engineering teams. Experienced with asynchronous workflows, clean Git PR discipline, and transparent communication.',
    icon: Globe,
    badges: ['Remote Collaboration', 'Async Git Workflow', 'Timezone Adaptive'],
    accent: {
      iconBg: 'bg-[rgba(97,218,251,0.1)]',
      iconBorder: 'border-[rgba(97,218,251,0.25)]',
      iconColor: 'text-[#7dd3fc]',
      hoverBorder: 'hover:border-[rgba(97,218,251,0.4)]',
      badgeColor: 'border-[rgba(97,218,251,0.2)] bg-[rgba(97,218,251,0.06)] text-[#bae6fd]',
    },
  },
  {
    id: 'freelance',
    number: '03',
    title: 'Freelance & Contract Projects',
    subtitle: 'Custom Web & AI Solutions',
    description:
      'Available for contract engagements delivering custom Laravel backend platforms, database schema designs (3NF), responsive React interfaces, and applied AI API integrations.',
    icon: Sparkles,
    badges: ['Laravel Applications', 'Full Stack Web Apps', 'AI API Integrations'],
    accent: {
      iconBg: 'bg-[rgba(168,130,255,0.1)]',
      iconBorder: 'border-[rgba(168,130,255,0.25)]',
      iconColor: 'text-[#c4b5fd]',
      hoverBorder: 'hover:border-[rgba(168,130,255,0.4)]',
      badgeColor: 'border-[rgba(168,130,255,0.2)] bg-[rgba(168,130,255,0.06)] text-[#ddd6fe]',
    },
  },
]

export function AvailabilitySection() {
  return (
    <section id="availability" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">12 / Availability &amp; Roles</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Current availability, target engineering roles, and engagement models.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently Available &middot; Open for Opportunities</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Open for <span className="text-[#9aa6b7]">opportunities.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 3 Opportunity Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {opportunityCards.map((card) => {
            const Icon = card.icon

            return (
              <Reveal key={card.id}>
                <article
                  className={`group flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.78)] p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,22,32,0.9)] ${card.accent.hoverBorder}`}
                >
                  <div>
                    {/* Top Row: Icon + Number */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl border ${card.accent.iconBorder} ${card.accent.iconBg} ${card.accent.iconColor} transition duration-300 group-hover:scale-105`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="display text-xl font-bold text-white/20 transition group-hover:text-white/40">
                        {card.number}
                      </span>
                    </div>

                    {/* Subtitle Pill */}
                    <div className="mt-5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
                        {card.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="display mt-1 text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="muted mt-3 text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Target Role Badges */}
                  <div className="mt-6 border-t border-white/[0.07] pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b] mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={11} className="text-[#2bd9b5]" />
                      <span>Focus Areas</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`rounded-md border px-2 py-0.5 text-[10.5px] font-medium ${card.accent.badgeColor}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Action / CTA Bar */}
        <Reveal className="mt-8 lg:mt-10">
          <div className="flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.85)] p-6 sm:p-8 backdrop-blur-xl sm:flex-row">
            <div>
              <h3 className="display text-lg sm:text-xl font-bold text-[#f2f3f7]">
                Ready to discuss your project or team opening?
              </h3>
              <p className="muted mt-1 text-xs sm:text-sm">
                Get in touch directly or review my verified credentials.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                className="button primary min-h-11 rounded-xl px-5 text-xs font-semibold"
                href="#contact"
              >
                <Mail size={14} />
                <span>Contact Me</span>
                <ArrowRight size={13} />
              </a>

              <a
                className="button secondary min-h-11 rounded-xl px-4 text-xs font-semibold"
                href={portfolioData.resumeHref}
                download
              >
                <FileDown size={14} />
                <span>Download Resume</span>
              </a>

              <a
                className="button secondary min-h-11 rounded-xl px-4 text-xs font-semibold"
                href={portfolioData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
