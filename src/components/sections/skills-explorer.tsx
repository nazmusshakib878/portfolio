'use client'

import { useState } from 'react'
import {
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Sparkles,
  Workflow,
} from 'lucide-react'
import {
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { Reveal } from '@/components/ui/reveal'

// Custom authentic OpenAI SVG icon
function OpenAiIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.783a4.485 4.485 0 0 1 2.366-1.973V12.7a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.783zm16.599 3.845L13.1 9.259l2.02-1.164a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.878a.79.79 0 0 0-.407-.685zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 10.12V7.777a.08.08 0 0 1 .033-.062L14.28 4.93a4.5 4.5 0 0 1 6.67 4.675zM8.528 14.894l-2.02-1.168a.071.071 0 0 1-.038-.052V8.09a4.504 4.504 0 0 1 7.37-3.454l-.142.08-4.778 2.758a.795.795 0 0 0-.392.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z" />
    </svg>
  )
}

// Official Google Antigravity gradient arch logo
function AntigravityIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="antigravityGradient" x1="10%" y1="90%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="22%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="78%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path
        d="M21 78C24 48 35.5 18 50 18C64.5 18 76 48 79 78C79.8 81.5 74.5 83.5 71.5 80.5C67 73 59.5 54 50 54C40.5 54 33 73 28.5 80.5C25.5 83.5 20.2 81.5 21 78Z"
        fill="url(#antigravityGradient)"
      />
    </svg>
  )
}

interface ProductionItem {
  name: string
  role: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  iconColor: string
  glowColor: string
  borderColor: string
  badge: string
  accentBadge?: string
}

interface ProductionTier {
  tierNumber: string
  categoryName: string
  tagline: string
  isFlagship: boolean
  items: ProductionItem[]
}

// 4-Tier Production Stack Structure (Pyramid: 2 -> 3 -> 4 -> 5)
const productionTiers: ProductionTier[] = [
  {
    tierNumber: '01',
    categoryName: 'Core Frameworks',
    tagline: 'Primary Full-Stack Production Engines',
    isFlagship: true,
    items: [
      {
        name: 'LARAVEL',
        role: 'Primary Backend Foundation',
        icon: SiLaravel,
        iconColor: 'text-[#f05340]',
        glowColor: 'rgba(240,83,64,0.35)',
        borderColor: 'border-[#f05340]/40 group-hover:border-[#f05340]',
        badge: 'Core Backend MVC',
        accentBadge: 'text-[#ff8a7a] bg-[#f05340]/10 border-[#f05340]/30',
      },
      {
        name: 'NEXT.JS',
        role: 'Modern Full-Stack UI',
        icon: SiNextdotjs,
        iconColor: 'text-white',
        glowColor: 'rgba(255,255,255,0.3)',
        borderColor: 'border-white/35 group-hover:border-white',
        badge: 'React 19 / App Router',
        accentBadge: 'text-white bg-white/10 border-white/30',
      },
    ],
  },
  {
    tierNumber: '02',
    categoryName: 'Backend & Database',
    tagline: 'Server Architecture, Data Integrity & API Contracts',
    isFlagship: false,
    items: [
      {
        name: 'PHP',
        role: 'Server Language',
        icon: SiPhp,
        iconColor: 'text-[#8892bf]',
        glowColor: 'rgba(136,146,191,0.25)',
        borderColor: 'border-[#8892bf]/30 group-hover:border-[#8892bf]',
        badge: 'PHP 8.2+ OOP',
      },
      {
        name: 'MYSQL',
        role: 'Relational Database',
        icon: SiMysql,
        iconColor: 'text-[#00758f]',
        glowColor: 'rgba(0,117,143,0.25)',
        borderColor: 'border-[#00758f]/30 group-hover:border-[#00758f]',
        badge: 'Normalized 1NF–3NF',
      },
      {
        name: 'REST APIS',
        role: 'Endpoint Architecture',
        icon: GitBranch,
        iconColor: 'text-[#2bd9b5]',
        glowColor: 'rgba(43,217,181,0.25)',
        borderColor: 'border-[#2bd9b5]/30 group-hover:border-[#2bd9b5]',
        badge: 'JSON / Sanctum Auth',
      },
    ],
  },
  {
    tierNumber: '03',
    categoryName: 'Frontend Engineering',
    tagline: 'Type-Safe Components, Fluid Styling & Fast Bundling',
    isFlagship: false,
    items: [
      {
        name: 'REACT',
        role: 'Component Architecture',
        icon: SiReact,
        iconColor: 'text-[#61dafb]',
        glowColor: 'rgba(97,218,251,0.22)',
        borderColor: 'border-[#61dafb]/30 group-hover:border-[#61dafb]',
        badge: 'Component UI',
      },
      {
        name: 'TYPESCRIPT',
        role: 'Type Safety System',
        icon: SiTypescript,
        iconColor: 'text-[#3178c6]',
        glowColor: 'rgba(49,120,198,0.22)',
        borderColor: 'border-[#3178c6]/30 group-hover:border-[#3178c6]',
        badge: 'Strict Contracts',
      },
      {
        name: 'TAILWIND',
        role: 'Utility UI Design',
        icon: SiTailwindcss,
        iconColor: 'text-[#38bdf8]',
        glowColor: 'rgba(56,189,248,0.22)',
        borderColor: 'border-[#38bdf8]/30 group-hover:border-[#38bdf8]',
        badge: 'Responsive UI',
      },
      {
        name: 'VITE',
        role: 'Fast Bundling Tool',
        icon: SiVite,
        iconColor: 'text-[#646cff]',
        glowColor: 'rgba(100,108,255,0.22)',
        borderColor: 'border-[#646cff]/30 group-hover:border-[#646cff]',
        badge: 'Dev Tooling',
      },
    ],
  },
  {
    tierNumber: '04',
    categoryName: 'AI & Developer Tools',
    tagline: 'Applied AI Integrations, Testing & Version Control',
    isFlagship: false,
    items: [
      {
        name: 'ANTIGRAVITY',
        role: 'Agentic AI IDE',
        icon: AntigravityIcon,
        iconColor: '',
        glowColor: 'rgba(56,189,248,0.3)',
        borderColor: 'border-white/20 group-hover:border-[#38bdf8]/50',
        badge: 'Agentic AI IDE',
      },
      {
        name: 'OPENAI API',
        role: 'LLM & Embeddings',
        icon: OpenAiIcon,
        iconColor: 'text-[#10a37f]',
        glowColor: 'rgba(16,163,127,0.25)',
        borderColor: 'border-[#10a37f]/30 group-hover:border-[#10a37f]',
        badge: 'GPT Workflows',
      },
      {
        name: 'GEMINI API',
        role: 'Multimodal AI Reasoning',
        icon: SiGooglegemini,
        iconColor: 'text-[#8ab4f8]',
        glowColor: 'rgba(138,180,248,0.25)',
        borderColor: 'border-[#8ab4f8]/30 group-hover:border-[#8ab4f8]',
        badge: 'Multimodal APIs',
      },
      {
        name: 'GIT',
        role: 'Version Control',
        icon: SiGit,
        iconColor: 'text-[#f05032]',
        glowColor: 'rgba(240,80,50,0.22)',
        borderColor: 'border-[#f05032]/30 group-hover:border-[#f05032]',
        badge: 'Branching Strategy',
      },
      {
        name: 'GITHUB',
        role: 'Collaboration & CI',
        icon: SiGithub,
        iconColor: 'text-white',
        glowColor: 'rgba(255,255,255,0.2)',
        borderColor: 'border-white/25 group-hover:border-white',
        badge: 'CI / CD Workflows',
      },
      {
        name: 'POSTMAN',
        role: 'API Testing & Specs',
        icon: SiPostman,
        iconColor: 'text-[#ff6c37]',
        glowColor: 'rgba(255,108,55,0.22)',
        borderColor: 'border-[#ff6c37]/30 group-hover:border-[#ff6c37]',
        badge: 'Endpoint Testing',
      },
    ],
  },
]

// 3 Core Pillars Summary
const corePillars = [
  {
    pillar: 'Laravel Backend',
    description: 'Enterprise MVC, Sanctum auth, normalized MySQL schemas & dependable business logic.',
    icon: Server,
    color: 'text-[#f05340]',
    border: 'border-[#f05340]/25 bg-[#f05340]/[0.03]',
  },
  {
    pillar: 'Next.js / React Frontend',
    description: 'Server & client components, TypeScript interfaces, responsive Tailwind CSS & smooth UX.',
    icon: Code2,
    color: 'text-[#61dafb]',
    border: 'border-[#61dafb]/25 bg-[#61dafb]/[0.03]',
  },
  {
    pillar: 'Applied AI Integration',
    description: 'OpenAI & Gemini API integration, prompt engineering, structured streaming & intelligence.',
    icon: Sparkles,
    color: 'text-[#aa96ff]',
    border: 'border-[#aa96ff]/25 bg-[#aa96ff]/[0.03]',
  },
]

// Architectural highlights ribbon
const architecturalCompetencies = [
  { label: 'Relational Schema Design (1NF–3NF)', icon: Database },
  { label: 'Laravel MVC & Sanctum Authentication', icon: Server },
  { label: 'Type-Safe RESTful API Contracts', icon: Workflow },
  { label: 'Next.js App Router & SSR', icon: Layers },
  { label: 'Practical AI & LLM Integration', icon: Sparkles },
]

export function SkillsExplorer() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="shell mt-12 space-y-8 lg:mt-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#080a10]/92 p-6 sm:p-10 lg:p-14 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          {/* Subtle Ambient Background Light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[600px] w-full max-w-[720px] opacity-35 blur-[50px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(139,114,255,0.22) 0%, rgba(43,217,181,0.08) 45%, transparent 75%)',
            }}
          />

          {/* Section Header with Full-Stack Pillars Badge */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,114,255,0.3)] bg-[rgba(139,114,255,0.08)] px-4 py-1 text-xs font-semibold text-[#c4b8ff]">
              <Layers size={14} className="text-[#aa96ff]" />
              <span>Full-Stack Production Stack</span>
            </div>
            <h3 className="display mt-3 text-2xl font-semibold text-[#f2f3f7] sm:text-3xl lg:text-4xl">
              Production Architecture Hierarchy
            </h3>
            <p className="muted mx-auto mt-2 max-w-lg text-xs leading-relaxed sm:text-sm">
              Structured across core full-stack pillars with a strong Laravel backend foundation, modern Next.js frontend, and practical AI integrations.
            </p>
          </div>

          {/* 3 Core Pillars Overview Ribbon */}
          <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
            {corePillars.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.pillar}
                  className={`rounded-2xl border p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/20 ${p.border}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={p.color} aria-hidden="true" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#f2f3f7]">
                      {p.pillar}
                    </h4>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#9aa6b7]">
                    {p.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* The 4-Tier Production Pyramid with Category Labels */}
          <div className="relative z-10 mt-10 sm:mt-14 space-y-6 sm:space-y-7 md:space-y-8">
            {productionTiers.map((tier) => {
              return (
                <div key={tier.categoryName} className="space-y-2.5 sm:space-y-3">
                  {/* Category Section Divider Label */}
                  <div className="flex items-center justify-center gap-2.5">
                    <div className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent to-white/15" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-[#2bd9b5] tracking-widest">
                        {tier.tierNumber}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.18em] text-[#9aa6b7]">
                        {tier.categoryName}
                      </span>
                    </div>
                    <div className="h-px w-6 sm:w-12 bg-gradient-to-l from-transparent to-white/15" />
                  </div>

                  {/* Tier Cards Row */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                    {tier.items.map((item) => {
                      const Icon = item.icon
                      const isHovered = activeItem === item.name
                      const isFlagship = tier.isFlagship

                      return (
                        <div
                          key={item.name}
                          onMouseEnter={() => setActiveItem(item.name)}
                          onMouseLeave={() => setActiveItem(null)}
                          className={`group relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl md:rounded-[18px] border bg-[rgba(13,16,25,0.85)] text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1 active:scale-95 ${
                            isFlagship
                              ? 'w-[62px] h-[62px] sm:w-[76px] sm:h-[76px] md:w-[88px] md:h-[88px] lg:w-[94px] lg:h-[94px] p-2 sm:p-3 border-white/20'
                              : 'w-[62px] h-[62px] sm:w-[76px] sm:h-[76px] md:w-[88px] md:h-[88px] lg:w-[94px] lg:h-[94px] p-2 sm:p-3 border-white/10 hover:border-white/25'
                          }`}
                          style={{
                            boxShadow: isHovered
                              ? `0 10px 25px ${item.glowColor}`
                              : undefined,
                          }}
                        >
                          {/* Brand Icon */}
                          <span className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                            <Icon
                              size={20}
                              className={`${item.iconColor} sm:size-5.5 md:size-6`}
                              aria-hidden="true"
                            />
                          </span>

                          {/* Tool Name */}
                          <span
                            className="mt-1.5 sm:mt-2 block text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[#d0d7e2] transition-colors group-hover:text-white"
                          >
                            {item.name}
                          </span>

                          {/* Sleek Floating Hover Tooltip */}
                          <span className="pointer-events-none absolute -bottom-2.5 z-20 hidden whitespace-nowrap rounded-full border border-white/15 bg-[#090b12] px-2 py-0.5 text-[8.5px] font-semibold text-[#69e6cd] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:inline-block">
                            {item.badge}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Full-Stack Discipline Banner */}
          <div className="relative z-10 mx-auto mt-12 max-w-lg rounded-2xl border border-white/[.07] bg-white/[.02] p-3.5 text-center text-xs text-[#9aa6b7]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#2bd9b5]">
              <Cpu size={14} />
              <span>Full-Stack Architecture:</span>
            </span>{' '}
            Strong Laravel backend foundation paired with high-performance Next.js frontends and practical AI integrations.
          </div>
        </div>
      </Reveal>

      {/* Recruiter Architectural Highlights Ribbon */}
      <Reveal>
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(10,12,18,.7)] p-5 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#aa96ff]">
                Engineering Highlights
              </p>
              <p className="mt-0.5 text-xs text-[#7f8b98]">
                Proven architectural patterns delivered across production projects
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {architecturalCompetencies.map((comp) => {
                const Icon = comp.icon
                return (
                  <span
                    key={comp.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.025] px-3 py-1.5 text-xs font-medium text-[#d9dee7] transition hover:border-[#2bd9b5]/40 hover:bg-white/[.05] hover:text-white"
                  >
                    <Icon size={14} className="text-[#2bd9b5]" aria-hidden="true" />
                    <span>{comp.label}</span>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
