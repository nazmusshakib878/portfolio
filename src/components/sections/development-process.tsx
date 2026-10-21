 'use client'

import { useState } from 'react'
import {
  ArrowLeft,
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

function ProcessGlyph({
  step,
  size = 'default',
}: {
  step: ProcessStep
  size?: 'default' | 'hero' | 'compact'
}) {
  const Icon = step.icon
  const sizing = {
    default: 'size-12 rounded-2xl',
    hero: 'size-28 rounded-[28px]',
    compact: 'size-10 rounded-xl',
  }[size]
  const iconSize = size === 'hero' ? 34 : size === 'compact' ? 16 : 21

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center border ${sizing} ${step.accent.iconBorder} ${step.accent.iconBg} ${step.accent.iconColor} shadow-[inset_0_1px_rgba(255,255,255,.08)]`}
    >
      <span aria-hidden="true" className="absolute inset-1 rounded-[inherit] border border-white/[0.07]" />
      <span aria-hidden="true" className="absolute left-2 top-2 size-1 rounded-full bg-current opacity-80 shadow-[0_0_10px_currentColor]" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 size-1 rounded-full bg-current opacity-45" />
      <Icon size={iconSize} className="relative z-10 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true" />
    </span>
  )
}

export function LegacyDevelopmentProcess() {
  return (
    <section id="process" className="section section-cv relative overflow-hidden">
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
        <Reveal className="mt-14 lg:mt-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, idx) => {
              const Icon = step.icon
              const isLast = idx === processSteps.length - 1

              return (
                <article
                  key={step.id}
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
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function DevelopmentProcess() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = processSteps[activeIndex]
  const selectStep = (index: number) => setActiveIndex((index + processSteps.length) % processSteps.length)

  return (
    <section id="process" className="section section-cv relative overflow-hidden">
      <div className="shell relative">
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">09 / Engineering Lifecycle</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">A structured 6-stage engineering workflow from discovery to production maintenance.</p>
            </div>
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7]">
                <Workflow size={13} /> <span>Structured Software Workflow</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">My development <span className="text-[#9aa6b7]">process.</span></h2>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14 lg:mt-16">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(15,18,25,0.82)] shadow-[0_24px_72px_rgba(0,0,0,0.34)] backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.08fr_.82fr_104px]">
              <article className="relative overflow-hidden p-6 sm:p-9 lg:p-11">
                <div aria-hidden="true" className="absolute -left-28 -top-32 size-72 rounded-full bg-[#7c5cff]/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <ProcessGlyph step={activeStep} />
                    <span className="font-mono text-xs font-semibold tracking-[0.16em] text-[#747b8b]">STAGE {activeStep.number} / 06</span>
                  </div>
                  <span className={`mt-10 inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${activeStep.accent.badgeColor}`}>{activeStep.phase}</span>
                  <h3 className="display mt-5 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[1.02] text-[#f2f3f7]">{activeStep.title}<span className="text-[#7f8b98]">, with intent.</span></h3>
                  <p className="mt-6 max-w-xl text-base leading-8 text-[#c4cad4] sm:text-lg">{activeStep.description}</p>
                  <div className="mt-10 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[rgba(43,217,181,0.26)] bg-[rgba(43,217,181,0.08)] text-[#2bd9b5]"><CheckCircle2 size={15} aria-hidden="true" /></span>
                    <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#747b8b]">Key deliverable</p><p className="mt-0.5 text-sm font-semibold text-[#e2e6ed]">{activeStep.keyDeliverable}</p></div>
                  </div>
                </div>
              </article>

              <div className="relative min-h-[310px] overflow-hidden border-y border-white/[0.08] bg-[radial-gradient(circle_at_58%_28%,rgba(43,217,181,0.18),transparent_38%),linear-gradient(145deg,rgba(13,18,30,.96),rgba(8,11,18,.92))] lg:min-h-0 lg:border-x lg:border-y-0">
                <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="absolute inset-7 rounded-[28px] border border-white/[0.08] bg-[#0b101b]/45" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[34px] bg-[#0c1320]/90 p-2 shadow-[0_0_0_12px_rgba(43,217,181,.04),0_22px_50px_rgba(0,0,0,.42)]"><ProcessGlyph step={activeStep} size="hero" /></div>
                <span className="absolute left-[18%] top-[22%] size-2 rounded-full bg-[#2bd9b5] shadow-[0_0_16px_#2bd9b5]" />
                <span className="absolute right-[18%] top-[30%] size-1.5 rounded-full bg-[#aa96ff] shadow-[0_0_14px_#aa96ff]" />
                <span className="absolute bottom-[22%] left-[27%] size-1.5 rounded-full bg-[#7dd3fc] shadow-[0_0_14px_#7dd3fc]" />
                <p className="absolute bottom-8 left-8 right-8 border-t border-white/[0.1] pt-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#aeb6c3]">Engineering workflow / {activeStep.number}</p>
              </div>

              <div className="flex gap-2 overflow-x-auto border-t border-white/[0.08] bg-[#090c14]/85 p-3 no-scrollbar lg:flex-col lg:overflow-visible lg:border-l lg:border-t-0">
                {processSteps.map((step, index) => {
                  const isActive = index === activeIndex
                  return <button key={step.id} type="button" onClick={() => selectStep(index)} aria-label={`Show stage ${step.number}: ${step.title}`} aria-pressed={isActive} className={`relative flex h-14 min-w-14 flex-1 items-center justify-center overflow-hidden rounded-xl border transition focus-visible:outline-2 focus-visible:outline-[#00f5ff] focus-visible:outline-offset-2 lg:min-h-0 lg:flex-auto ${isActive ? `${step.accent.iconBorder} bg-white/[0.04]` : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'}`}><ProcessGlyph step={step} size="compact" /><span className="sr-only">{step.title}</span><span className={`absolute bottom-1.5 right-1.5 font-mono text-[8px] ${isActive ? step.accent.iconColor : 'text-[#747b8b]'}`}>{step.number}</span></button>
                })}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0a0d15]/75 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2" aria-label="Process stage navigation">
                {processSteps.map((step, index) => <button key={step.id} type="button" onClick={() => selectStep(index)} aria-label={`Go to ${step.title}`} aria-current={index === activeIndex ? 'step' : undefined} className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#00f5ff] ${index === activeIndex ? 'w-8 bg-[#2bd9b5]' : 'w-2 bg-white/20 hover:bg-white/45'}`} />)}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => selectStep(activeIndex - 1)} aria-label="Previous process stage" className="grid size-9 place-items-center rounded-full border border-white/10 text-[#aeb6c3] transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-[#00f5ff]"><ArrowLeft size={15} aria-hidden="true" /></button>
                <button type="button" onClick={() => selectStep(activeIndex + 1)} aria-label="Next process stage" className="grid size-9 place-items-center rounded-full border border-white/10 text-[#aeb6c3] transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-[#00f5ff]"><ArrowRight size={15} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
