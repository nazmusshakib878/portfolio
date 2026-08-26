import {
  Bot,
  Cloud,
  Cpu,
  GitMerge,
  Layers,
  Package,
  Server,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

interface LearningArea {
  id: string
  title: string
  status: 'Deepening Knowledge' | 'Currently Exploring' | 'Building Practical Projects'
  statusColor: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  description: string
  topics: string[]
  accent: {
    badge: string
    border: string
    iconColor: string
    iconBg: string
  }
}

const learningAreas: LearningArea[] = [
  {
    id: '01',
    title: 'Advanced Laravel',
    status: 'Deepening Knowledge',
    statusColor: 'text-[#69e6cd] bg-[#69e6cd]/10 border-[rgba(43,217,181,0.3)]',
    icon: Server,
    description:
      'Mastering advanced query scopes, database transaction safety, custom service providers, and scalable MVC design patterns.',
    topics: ['Architecture Improvement', 'Advanced Eloquent ORM', 'Scalable Patterns'],
    accent: {
      badge: 'border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.06)] text-[#ff9c90]',
      border: 'hover:border-[rgba(240,83,64,0.35)]',
      iconColor: 'text-[#f05340]',
      iconBg: 'border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.08)]',
    },
  },
  {
    id: '02',
    title: 'Advanced Next.js',
    status: 'Building Practical Projects',
    statusColor: 'text-[#c4b5fd] bg-[#c4b5fd]/10 border-[rgba(168,130,255,0.3)]',
    icon: Layers,
    description:
      'Exploring React Server Components (RSC), streaming responses, server actions, and Next.js performance tuning.',
    topics: ['App Router Patterns', 'Server Components', 'Performance Optimization'],
    accent: {
      badge: 'border-white/20 bg-white/[0.04] text-white',
      border: 'hover:border-white/30',
      iconColor: 'text-white',
      iconBg: 'border-white/20 bg-white/[0.06]',
    },
  },
  {
    id: '03',
    title: 'System Design',
    status: 'Deepening Knowledge',
    statusColor: 'text-[#69e6cd] bg-[#69e6cd]/10 border-[rgba(43,217,181,0.3)]',
    icon: Cpu,
    description:
      'Studying clean system architectures, caching layers, rate limiting strategies, and relational database scalability.',
    topics: ['Backend Architecture', 'Database Scalability', 'API Design Patterns'],
    accent: {
      badge: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.06)] text-[#7dd3fc]',
      border: 'hover:border-[rgba(97,218,251,0.35)]',
      iconColor: 'text-[#7dd3fc]',
      iconBg: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.08)]',
    },
  },
  {
    id: '04',
    title: 'Docker & Containers',
    status: 'Currently Exploring',
    statusColor: 'text-[#fcd34d] bg-[#fcd34d]/10 border-[rgba(252,211,77,0.3)]',
    icon: Package,
    description:
      'Learning containerization fundamentals, multi-stage Dockerfiles, and standardized local development environments for PHP & Node.',
    topics: ['Containerization Basics', 'Development Environments', 'Compose Services'],
    accent: {
      badge: 'border-[rgba(56,189,248,0.25)] bg-[rgba(56,189,248,0.06)] text-[#38bdf8]',
      border: 'hover:border-[rgba(56,189,248,0.35)]',
      iconColor: 'text-[#38bdf8]',
      iconBg: 'border-[rgba(56,189,248,0.25)] bg-[rgba(56,189,248,0.08)]',
    },
  },
  {
    id: '05',
    title: 'AWS Cloud Fundamentals',
    status: 'Currently Exploring',
    statusColor: 'text-[#fcd34d] bg-[#fcd34d]/10 border-[rgba(252,211,77,0.3)]',
    icon: Cloud,
    description:
      'Understanding essential cloud primitives, S3 static assets, EC2 application hosting, and deployment configurations.',
    topics: ['Cloud Fundamentals', 'Storage & Compute', 'Deployment Workflows'],
    accent: {
      badge: 'border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.06)] text-[#fbbf24]',
      border: 'hover:border-[rgba(245,158,11,0.35)]',
      iconColor: 'text-[#fbbf24]',
      iconBg: 'border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.08)]',
    },
  },
  {
    id: '06',
    title: 'CI/CD Pipelines',
    status: 'Building Practical Projects',
    statusColor: 'text-[#c4b5fd] bg-[#c4b5fd]/10 border-[rgba(168,130,255,0.3)]',
    icon: GitMerge,
    description:
      'Setting up automated testing suites, code verification checks, and GitHub Actions workflows for continuous delivery.',
    topics: ['Automated Testing', 'Deployment Pipelines', 'GitHub Actions'],
    accent: {
      badge: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.06)] text-[#c4b5fd]',
      border: 'hover:border-[rgba(168,130,255,0.35)]',
      iconColor: 'text-[#c4b5fd]',
      iconBg: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.08)]',
    },
  },
  {
    id: '07',
    title: 'AI Engineering',
    status: 'Building Practical Projects',
    statusColor: 'text-[#c4b5fd] bg-[#c4b5fd]/10 border-[rgba(168,130,255,0.3)]',
    icon: Bot,
    description:
      'Advancing practical LLM integration techniques, structured streaming responses, function calling, and systematic prompt refinement.',
    topics: ['LLM Application Dev', 'AI API Integration', 'Prompt Engineering'],
    accent: {
      badge: 'border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.06)] text-[#69e6cd]',
      border: 'hover:border-[rgba(43,217,181,0.35)]',
      iconColor: 'text-[#2bd9b5]',
      iconBg: 'border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)]',
    },
  },
]

export function CurrentlyLearning() {
  return (
    <section id="learning" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">07 / Growth Roadmap</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Active engineering exploration, continuous learning, and future technical roadmap.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] px-3 py-1 text-xs font-semibold text-[#69e6cd] mb-3">
                <Sparkles size={12} />
                <span>Active Growth Trajectory</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Currently learning <span className="text-[#9aa6b7]">in 2026.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 7 Learning Cards Grid (3-column balanced desktop layout) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {learningAreas.map((area, idx) => {
            const Icon = area.icon
            const isLast = idx === learningAreas.length - 1

            return (
              <Reveal
                key={area.id}
                className={isLast ? 'sm:col-span-2 sm:max-w-md sm:mx-auto lg:max-w-none lg:mx-0 lg:col-span-1 lg:col-start-2 w-full' : ''}
              >
                <article
                  className={`group flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.74)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,22,30,0.88)] ${area.accent.border}`}
                >
                  <div>
                    {/* Top Row: Icon + Number */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`flex size-10 items-center justify-center rounded-xl border ${area.accent.iconBg} ${area.accent.iconColor} transition duration-300 group-hover:scale-105`}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="display text-lg font-semibold text-white/20 transition group-hover:text-white/35">
                        {area.id}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="mt-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${area.statusColor}`}
                      >
                        <span className="size-1.5 rounded-full bg-current animate-pulse" />
                        <span>{area.status}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="display mt-3 text-lg font-semibold text-[#f2f3f7] group-hover:text-white transition">
                      {area.title}
                    </h3>

                    {/* Description */}
                    <p className="muted mt-2 text-xs leading-relaxed">
                      {area.description}
                    </p>
                  </div>

                  {/* Topics List */}
                  <div className="mt-6 border-t border-white/[0.07] pt-4">
                    <ul aria-label={`${area.title} topics`} className="flex flex-wrap gap-1.5">
                      {area.topics.map((topic) => (
                        <li
                          key={topic}
                          className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-0.5 text-[10.5px] font-medium text-[#d9dee7]"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
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
