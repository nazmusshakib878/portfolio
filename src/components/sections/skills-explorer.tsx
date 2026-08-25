'use client'

import { useState } from 'react'
import {
  Bot,
  Check,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Wrench,
} from 'lucide-react'
import {
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiJavascript,
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

// Authentic OpenAI SVG Icon
function OpenAiIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
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

interface SkillItem {
  name: string
  subtitle: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  iconColor: string
  badge?: string
}

interface SkillCategory {
  number: string
  title: string
  tagline: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  accent: {
    badge: string
    hoverBorder: string
    iconBg: string
    iconColor: string
    glow: string
  }
  skills: SkillItem[]
}

const skillCategories: SkillCategory[] = [
  {
    number: '01',
    title: 'Backend Development',
    tagline: 'Building reliable server-side applications, APIs, and database-driven systems.',
    icon: Server,
    accent: {
      badge: 'border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.08)] text-[#ff9c90]',
      hoverBorder: 'hover:border-[rgba(240,83,64,0.4)]',
      iconBg: 'bg-[rgba(240,83,64,0.1)] border-[rgba(240,83,64,0.25)]',
      iconColor: 'text-[#f05340]',
      glow: 'rgba(240,83,64,0.15)',
    },
    skills: [
      { name: 'Laravel', subtitle: 'Backend Framework & Eloquent', icon: SiLaravel, iconColor: 'text-[#f05340]' },
      { name: 'PHP', subtitle: 'Server-Side OOP & Services', icon: SiPhp, iconColor: 'text-[#8892bf]' },
      { name: 'MySQL', subtitle: 'Normalized Schemas (1NF–3NF)', icon: SiMysql, iconColor: 'text-[#00758f]' },
      { name: 'REST API', subtitle: 'Endpoint Architecture & JSON', icon: GitBranch, iconColor: 'text-[#2bd9b5]' },
      { name: 'Authentication', subtitle: 'Laravel Sanctum, OAuth & RBAC', icon: Lock, iconColor: 'text-[#69e6cd]' },
      { name: 'MVC', subtitle: 'Structured Domain Architecture', icon: Layers, iconColor: 'text-[#ff9c90]' },
    ],
  },
  {
    number: '02',
    title: 'Frontend Development',
    tagline: 'Creating modern, responsive, and type-safe user interfaces with the React ecosystem.',
    icon: Code2,
    accent: {
      badge: 'border-[rgba(97,218,251,0.3)] bg-[rgba(97,218,251,0.08)] text-[#7dd3fc]',
      hoverBorder: 'hover:border-[rgba(97,218,251,0.4)]',
      iconBg: 'bg-[rgba(97,218,251,0.1)] border-[rgba(97,218,251,0.25)]',
      iconColor: 'text-[#61dafb]',
      glow: 'rgba(97,218,251,0.15)',
    },
    skills: [
      { name: 'Next.js', subtitle: 'App Router, SSR & Routing', icon: SiNextdotjs, iconColor: 'text-white' },
      { name: 'React', subtitle: 'Component-Driven UI & State', icon: SiReact, iconColor: 'text-[#61dafb]' },
      { name: 'TypeScript', subtitle: 'Strict Static Type Safety', icon: SiTypescript, iconColor: 'text-[#3178c6]' },
      { name: 'Tailwind CSS', subtitle: 'Fluid Responsive Styling', icon: SiTailwindcss, iconColor: 'text-[#38bdf8]' },
      { name: 'JavaScript', subtitle: 'ES6+ Modern Asynchronous Logic', icon: SiJavascript, iconColor: 'text-[#f7df1e]' },
    ],
  },
  {
    number: '03',
    title: 'AI Integration',
    tagline: 'Integrating practical AI models, automated prompts, and multimodal reasoning into modern web applications.',
    icon: Bot,
    accent: {
      badge: 'border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] text-[#c4b5fd]',
      hoverBorder: 'hover:border-[rgba(168,130,255,0.45)]',
      iconBg: 'bg-[rgba(168,130,255,0.1)] border-[rgba(168,130,255,0.25)]',
      iconColor: 'text-[#aa96ff]',
      glow: 'rgba(168,130,255,0.15)',
    },
    skills: [
      { name: 'OpenAI API', subtitle: 'GPT Models & Embeddings', icon: OpenAiIcon, iconColor: 'text-[#10a37f]' },
      { name: 'Gemini API', subtitle: 'Multimodal AI & Reasoning', icon: SiGooglegemini, iconColor: 'text-[#8ab4f8]' },
      { name: 'AI Integration', subtitle: 'Server-Side AI Proxy & Handlers', icon: Sparkles, iconColor: 'text-[#c4b5fd]' },
      { name: 'Prompt Engineering', subtitle: 'Structured System Contexts', icon: Workflow, iconColor: 'text-[#2bd9b5]' },
    ],
  },
  {
    number: '04',
    title: 'Tools & Workflow',
    tagline: 'Modern development environment, version control, API testing, and build toolchain.',
    icon: Wrench,
    accent: {
      badge: 'border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] text-[#69e6cd]',
      hoverBorder: 'hover:border-[rgba(43,217,181,0.4)]',
      iconBg: 'bg-[rgba(43,217,181,0.1)] border-[rgba(43,217,181,0.25)]',
      iconColor: 'text-[#2bd9b5]',
      glow: 'rgba(43,217,181,0.15)',
    },
    skills: [
      { name: 'Git', subtitle: 'Version Control & Branching', icon: SiGit, iconColor: 'text-[#f05032]' },
      { name: 'GitHub', subtitle: 'Code Collaboration & CI/CD', icon: SiGithub, iconColor: 'text-white' },
      { name: 'Postman', subtitle: 'REST API Testing & Verification', icon: SiPostman, iconColor: 'text-[#ff6c37]' },
      { name: 'VS Code', subtitle: 'Primary Development Environment', icon: Terminal, iconColor: 'text-[#007acc]' },
      { name: 'Vite', subtitle: 'Fast Bundling & HMR Tooling', icon: SiVite, iconColor: 'text-[#646cff]' },
    ],
  },
]

const architecturalHighlights = [
  { label: 'Normalized MySQL Schema (1NF–3NF)', icon: Database },
  { label: 'Laravel Sanctum Token Authentication', icon: ShieldCheck },
  { label: 'RESTful API Endpoint Architecture', icon: Workflow },
  { label: 'Next.js 16 App Router & SSR', icon: Layers },
  { label: 'Server-Side OpenAI & Gemini AI Proxy', icon: Sparkles },
]

export function SkillsExplorer() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="shell mt-12 space-y-8 lg:mt-16">
      {/* 4 Core Category Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => {
          const CategoryIcon = category.icon
          const isHovered = hoveredCard === category.number

          return (
            <Reveal key={category.number}>
              <article
                onMouseEnter={() => setHoveredCard(category.number)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.76)] p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,22,32,0.9)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${category.accent.hoverBorder}`}
                style={{
                  boxShadow: isHovered
                    ? `0 16px 48px ${category.accent.glow}`
                    : undefined,
                }}
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl border ${category.accent.iconBg} ${category.accent.iconColor} transition duration-300 group-hover:scale-105`}
                      >
                        <CategoryIcon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#747b8b] uppercase">
                          Category {category.number}
                        </span>
                        <h3 className="display text-xl sm:text-2xl font-semibold text-[#f2f3f7] group-hover:text-white transition">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <span className="display text-2xl font-bold text-white/15 transition group-hover:text-white/30">
                      {category.number}
                    </span>
                  </div>

                  {/* Professional Category Explanation */}
                  <p className="muted mt-4 text-xs sm:text-sm leading-relaxed">
                    {category.tagline}
                  </p>

                  {/* Skill Items Grid */}
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon

                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 transition duration-200 hover:border-white/20 hover:bg-white/[0.05]"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black/40">
                            <SkillIcon size={16} className={skill.iconColor} aria-hidden="true" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#f2f3f7]">
                              {skill.name}
                            </p>
                            <p className="truncate text-[10.5px] text-[#7f8b98]">
                              {skill.subtitle}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Verification Indicator */}
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[11px] text-[#747b8b]">
                  <span className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#2bd9b5]" />
                    <span>Verified Production Toolkit</span>
                  </span>
                  <span className="font-mono text-[10px] text-[#aeb6c3]">
                    {category.skills.length} Core Technologies
                  </span>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* Recruiter Architectural Competencies Bar */}
      <Reveal>
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(10,13,20,0.75)] p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg border border-[rgba(139,114,255,0.3)] bg-[rgba(139,114,255,0.1)] text-[#aa96ff]">
                <Cpu size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#aa96ff]">
                  Engineering Architectural Highlights
                </p>
                <p className="text-xs text-[#7f8b98] mt-0.5">
                  Production architecture standards implemented across projects
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {architecturalHighlights.map((comp) => {
                const Icon = comp.icon
                return (
                  <span
                    key={comp.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-[#d9dee7] transition hover:border-[#2bd9b5]/40 hover:bg-white/[0.05] hover:text-white"
                  >
                    <Icon size={13} className="text-[#2bd9b5]" aria-hidden="true" />
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
