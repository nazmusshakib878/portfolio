import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  Layers,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

interface ProcessStep {
  id: string
  number: string
  title: string
  phase: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  keyDeliverable: string
  accent: {
    iconBg: string
    iconBorder: string
    iconColor: string
    hoverBorder: string
    badgeColor: string
  }
}

const processSteps: ProcessStep[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    phase: 'Discovery & Requirements',
    description:
      'Understand user requirements, project goals, business problems, and expected outcomes before starting development.',
    icon: Compass,
    keyDeliverable: 'Clear Scope & Requirements',
    accent: {
      iconBg: 'bg-[rgba(97,218,251,0.1)]',
      iconBorder: 'border-[rgba(97,218,251,0.25)]',
      iconColor: 'text-[#7dd3fc]',
      hoverBorder: 'hover:border-[rgba(97,218,251,0.4)]',
      badgeColor: 'border-[rgba(97,218,251,0.2)] bg-[rgba(97,218,251,0.05)] text-[#bae6fd]',
    },
  },
  {
    id: 'plan',
    number: '02',
    title: 'Plan',
    phase: 'Architecture & Modeling',
    description:
      'Plan application architecture, normalized database schema, API contracts, routing flow, and technical stack decisions.',
    icon: Layers,
    keyDeliverable: 'Database Schema & API Specs',
    accent: {
      iconBg: 'bg-[rgba(43,217,181,0.1)]',
      iconBorder: 'border-[rgba(43,217,181,0.25)]',
      iconColor: 'text-[#69e6cd]',
      hoverBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      badgeColor: 'border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.05)] text-[#a7f3d0]',
    },
  },
  {
    id: 'develop',
    number: '03',
    title: 'Develop',
    phase: 'Full-Stack Implementation',
    description:
      'Build responsive frontend interfaces, robust Laravel backend logic, REST APIs, database queries, and third-party integrations.',
    icon: Code2,
    keyDeliverable: 'Clean, Tested Codebase',
    accent: {
      iconBg: 'bg-[rgba(240,83,64,0.1)]',
      iconBorder: 'border-[rgba(240,83,64,0.25)]',
      iconColor: 'text-[#ff9c90]',
      hoverBorder: 'hover:border-[rgba(240,83,64,0.4)]',
      badgeColor: 'border-[rgba(240,83,64,0.2)] bg-[rgba(240,83,64,0.05)] text-[#ffb5ac]',
    },
  },
  {
    id: 'test',
    number: '04',
    title: 'Test',
    phase: 'Quality & Debugging',
    description:
      'Perform functional testing, API endpoint verification, edge-case debugging, and enhance overall application reliability.',
    icon: ShieldCheck,
    keyDeliverable: 'Verified Endpoints & Stability',
    accent: {
      iconBg: 'bg-[rgba(168,130,255,0.1)]',
      iconBorder: 'border-[rgba(168,130,255,0.25)]',
      iconColor: 'text-[#c4b5fd]',
      hoverBorder: 'hover:border-[rgba(168,130,255,0.4)]',
      badgeColor: 'border-[rgba(168,130,255,0.2)] bg-[rgba(168,130,255,0.05)] text-[#ddd6fe]',
    },
  },
  {
    id: 'deploy',
    number: '05',
    title: 'Deploy',
    phase: 'Environment & Release',
    description:
      'Prepare the production hosting environment, configure environment variables, build assets, and release the live application.',
    icon: Rocket,
    keyDeliverable: 'Production Deployment',
    accent: {
      iconBg: 'bg-[rgba(43,217,181,0.1)]',
      iconBorder: 'border-[rgba(43,217,181,0.25)]',
      iconColor: 'text-[#2bd9b5]',
      hoverBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      badgeColor: 'border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.05)] text-[#69e6cd]',
    },
  },
  {
    id: 'maintain',
    number: '06',
    title: 'Maintain',
    phase: 'Monitoring & Optimization',
    description:
      'Monitor application performance, improve features based on feedback, fix reported issues, and maintain codebase quality.',
    icon: RefreshCw,
    keyDeliverable: 'Continuous Refinement',
    accent: {
      iconBg: 'bg-[rgba(139,114,255,0.1)]',
      iconBorder: 'border-[rgba(139,114,255,0.25)]',
      iconColor: 'text-[#aa96ff]',
      hoverBorder: 'hover:border-[rgba(139,114,255,0.4)]',
      badgeColor: 'border-[rgba(139,114,255,0.2)] bg-[rgba(139,114,255,0.05)] text-[#c4b8ff]',
    },
  },
]

export function DevelopmentProcess() {
  return (
    <section id="process" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">09 / Engineering Lifecycle</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                A structured 6-stage engineering workflow from discovery to production maintenance.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7] mb-3">
                <Workflow size={13} />
                <span>Structured Software Workflow</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                My development <span className="text-[#9aa6b7]">process.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 3x2 Process Flow Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {processSteps.map((step, idx) => {
            const Icon = step.icon
            const isLast = idx === processSteps.length - 1

            return (
              <Reveal key={step.id}>
                <article
                  className={`group flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.76)] p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,22,32,0.88)] ${step.accent.hoverBorder}`}
                >
                  <div>
                    {/* Top Row: Icon + Step Number */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl border ${step.accent.iconBorder} ${step.accent.iconBg} ${step.accent.iconColor} transition duration-300 group-hover:scale-105`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="display text-xl font-bold text-white/20 transition group-hover:text-white/40">
                        {step.number}
                      </span>
                    </div>

                    {/* Phase Category Pill */}
                    <div className="mt-5">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${step.accent.badgeColor}`}
                      >
                        {step.phase}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="display mt-3 text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                      {step.number} — {step.title}
                    </h3>

                    {/* Description */}
                    <p className="muted mt-3 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Deliverable & Step Transition */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[#aeb6c3]">
                      <CheckCircle2 size={13} className="text-[#2bd9b5]" />
                      <span className="text-[11px] font-medium">{step.keyDeliverable}</span>
                    </div>

                    {!isLast && (
                      <span className="hidden items-center gap-1 text-[11px] font-mono text-[#747b8b] sm:inline-flex">
                        <span>Next</span>
                        <ArrowRight size={11} />
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
