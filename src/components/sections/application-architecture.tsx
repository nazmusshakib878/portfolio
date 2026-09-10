import {
  ArrowDown,
  Bot,
  Database,
  Globe,
  Layers,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import {
  SiLaravel,
  SiMysql,
  SiNextdotjs,
} from 'react-icons/si'
import { Reveal } from '@/components/ui/reveal'

interface ArchitectureLayer {
  number: string
  label: string
  title: string
  description: string
  techBadge: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  accent: {
    nodeBg: string
    nodeBorder: string
    nodeColor: string
    cardBorder: string
    cardGlow: string
  }
}

const architectureLayers: ArchitectureLayer[] = [
  {
    number: '01',
    label: 'Client Layer',
    title: 'User & Browser Interface',
    description:
      'Client interaction layer handling browser requests, mobile/desktop viewports, and interactive user experiences.',
    techBadge: 'Client Interaction · HTTPS',
    icon: Globe,
    accent: {
      nodeBg: 'bg-[rgba(97,218,251,0.1)]',
      nodeBorder: 'border-[rgba(97,218,251,0.3)]',
      nodeColor: 'text-[#7dd3fc]',
      cardBorder: 'hover:border-[rgba(97,218,251,0.4)]',
      cardGlow: 'rgba(97,218,251,0.12)',
    },
  },
  {
    number: '02',
    label: 'Frontend Engine',
    title: 'Next.js & React Applications',
    description:
      'Modern frontend interface, server and client components, dynamic routing, state management, and optimized asset delivery.',
    techBadge: 'Next.js 16 · React 19 · TypeScript · Tailwind',
    icon: SiNextdotjs,
    accent: {
      nodeBg: 'bg-white/[0.08]',
      nodeBorder: 'border-white/25',
      nodeColor: 'text-white',
      cardBorder: 'hover:border-white/35',
      cardGlow: 'rgba(255,255,255,0.1)',
    },
  },
  {
    number: '03',
    label: 'API Contract',
    title: 'REST API & Routing Layer',
    description:
      'Structured communication layer handling JSON request/response payloads, endpoint validation, and token authorization.',
    techBadge: 'RESTful Endpoints · Sanctum Auth · JSON Payloads',
    icon: Workflow,
    accent: {
      nodeBg: 'bg-[rgba(43,217,181,0.1)]',
      nodeBorder: 'border-[rgba(43,217,181,0.3)]',
      nodeColor: 'text-[#2bd9b5]',
      cardBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      cardGlow: 'rgba(43,217,181,0.12)',
    },
  },
  {
    number: '04',
    label: 'Backend Foundation',
    title: 'Laravel Backend Architecture',
    description:
      'Business logic execution, MVC controllers, Eloquent ORM services, authentication workflows, and server-side processing.',
    techBadge: 'Laravel MVC · PHP 8.2+ · Middleware · Service Layer',
    icon: SiLaravel,
    accent: {
      nodeBg: 'bg-[rgba(240,83,64,0.1)]',
      nodeBorder: 'border-[rgba(240,83,64,0.3)]',
      nodeColor: 'text-[#ff9c90]',
      cardBorder: 'hover:border-[rgba(240,83,64,0.45)]',
      cardGlow: 'rgba(240,83,64,0.14)',
    },
  },
  {
    number: '05',
    label: 'Data Persistence',
    title: 'MySQL Relational Database',
    description:
      'Relational database storage, normalized schema design (1NF–3NF), indexing on query keys, and referential data integrity.',
    techBadge: 'MySQL · Relational 3NF · Foreign Keys · Transactions',
    icon: SiMysql,
    accent: {
      nodeBg: 'bg-[rgba(43,217,181,0.1)]',
      nodeBorder: 'border-[rgba(43,217,181,0.3)]',
      nodeColor: 'text-[#69e6cd]',
      cardBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      cardGlow: 'rgba(43,217,181,0.12)',
    },
  },
  {
    number: '06',
    label: 'Applied Intelligence',
    title: 'AI APIs & External Services',
    description:
      'Server-side proxying for OpenAI API, Gemini API, multimodal reasoning, and third-party integrations (OAuth, SMTP).',
    techBadge: 'OpenAI API · Gemini API · OAuth 2.0 · Cloud Services',
    icon: Bot,
    accent: {
      nodeBg: 'bg-[rgba(168,130,255,0.1)]',
      nodeBorder: 'border-[rgba(168,130,255,0.3)]',
      nodeColor: 'text-[#c4b5fd]',
      cardBorder: 'hover:border-[rgba(168,130,255,0.45)]',
      cardGlow: 'rgba(168,130,255,0.14)',
    },
  },
]

const engineeringPrinciples = [
  {
    title: 'Separation of Concerns',
    description:
      'Clear isolation between UI components, routing middleware, domain business logic, and database persistence layers.',
    icon: Layers,
    accent: 'text-[#7dd3fc] border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.06)]',
  },
  {
    title: 'Secure API Communication',
    description:
      'Token-based authentication, FormRequest validation rules, sanitized database queries, and CORS/CSRF protection.',
    icon: ShieldCheck,
    accent: 'text-[#c4b5fd] border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.06)]',
  },
  {
    title: 'Database-Driven Architecture',
    description:
      'Strict relational database normalization (1NF–3NF) with foreign key cascades and transactional safety.',
    icon: Database,
    accent: 'text-[#69e6cd] border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.06)]',
  },
  {
    title: 'Scalable Backend Design',
    description:
      'Modular service architecture, Eloquent relationship eager-loading to eliminate N+1 queries, and clean MVC structure.',
    icon: Server,
    accent: 'text-[#ff9c90] border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.06)]',
  },
]

export function ApplicationArchitecture() {
  return (
    <section id="architecture" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">10 / System Architecture</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                End-to-end full-stack data flow and technical layer integration.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7] mb-3">
                <Layers size={13} />
                <span>Full-Stack Engineering Blueprint</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Application <span className="text-[#9aa6b7]">architecture.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Vertical Architecture Diagram Stack */}
        <div className="mx-auto mt-14 max-w-4xl lg:mt-18">
          <div className="space-y-3 sm:space-y-4">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon
              const isLast = index === architectureLayers.length - 1

              return (
                <div key={layer.number} className="flex flex-col items-center">
                  <Reveal className="w-full">
                    <article
                      className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.78)] p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(17,22,32,0.92)] ${layer.accent.cardBorder}`}
                      style={{
                        boxShadow: `0 10px 30px rgba(0,0,0,0.25)`,
                      }}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left Side: Icon + Layer Info */}
                        <div className="flex items-start gap-4 sm:gap-5">
                          <span
                            className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${layer.accent.nodeBorder} ${layer.accent.nodeBg} ${layer.accent.nodeColor} transition duration-300 group-hover:scale-105`}
                          >
                            <Icon size={22} aria-hidden="true" />
                          </span>

                          <div>
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="font-mono text-xs font-bold text-[#747b8b]">
                                Layer {layer.number}
                              </span>
                              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-[#aeb6c3]">
                                {layer.label}
                              </span>
                            </div>

                            <h3 className="display mt-1 text-lg sm:text-xl font-bold text-[#f2f3f7] group-hover:text-white transition">
                              {layer.title}
                            </h3>

                            <p className="muted mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed">
                              {layer.description}
                            </p>
                          </div>
                        </div>

                        {/* Right Tech Badge */}
                        <div className="shrink-0 self-start sm:self-center">
                          <span className="inline-block rounded-xl border border-white/[0.08] bg-black/40 px-3 py-1.5 font-mono text-[11px] text-[#c4b8ff]">
                            {layer.techBadge}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Reveal>

                  {/* Flow Arrow Between Layers */}
                  {!isLast && (
                    <div className="my-1.5 flex flex-col items-center">
                      <div className="h-4 w-px bg-gradient-to-b from-white/20 to-white/10" />
                      <div className="flex size-6 items-center justify-center rounded-full border border-white/10 bg-[#090b12] text-[#69e6cd] shadow-sm">
                        <ArrowDown size={11} className="animate-pulse" />
                      </div>
                      <div className="h-4 w-px bg-gradient-to-b from-white/10 to-transparent" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Engineering Principles Section */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="border-b border-white/[0.08] pb-5">
            <p className="eyebrow text-[#69e6cd]">Core Design Standards</p>
            <h3 className="display mt-1 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
              Engineering Principles
            </h3>
            <p className="muted mt-1 text-xs sm:text-sm">
              Architectural rules and quality standards upheld across all project implementations.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPrinciples.map((principle) => {
              const Icon = principle.icon
              return (
                <article
                  key={principle.title}
                  className="group flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[rgba(17,22,30,0.88)]"
                >
                  <div>
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-xl border ${principle.accent} transition duration-300 group-hover:scale-105`}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>

                    <h4 className="display mt-5 text-base font-semibold text-[#f2f3f7] group-hover:text-white transition">
                      {principle.title}
                    </h4>

                    <p className="muted mt-2.5 text-xs leading-relaxed">
                      {principle.description}
                    </p>
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
