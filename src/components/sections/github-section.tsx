import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  GitBranch,
  Sparkles,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData, projectSlug } from '@/data/portfolio'

interface PinnedRepo {
  name: string
  fullName: string
  description: string
  href: string
  liveUrl?: string
  caseStudySlug?: string
  badge: string
  badgeColor: string
  technologies: string[]
  isPrimary?: boolean
}

const pinnedRepositories: PinnedRepo[] = [
  {
    name: 'SecureX',
    fullName: 'nazmusshakib878/Securex',
    description:
      'CCTV and security service management system with role-based authentication, automated booking conflict detection, and invoice generation workflows.',
    href: 'https://github.com/nazmusshakib878/Securex',
    caseStudySlug: projectSlug('Securex - CCTV & Security Service Management System'),
    badge: 'Zenodo Published · DOI',
    badgeColor: 'border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] text-[#c4b5fd]',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Google OAuth 2.0', 'Blade'],
    isPrimary: true,
  },
  {
    name: 'AI Smart Campus System',
    fullName: 'nazmusshakib878/CSE4204-8A-T07-ai-smart-campus-system',
    description:
      'Full-stack campus management and student assistance platform pairing a React/Vite frontend with a Laravel 12 Sanctum REST API and Gemini AI integration.',
    href: 'https://github.com/nazmusshakib878/CSE4204-8A-T07-ai-smart-campus-system',
    liveUrl: 'https://ai-smart-campus-system-ce9i.onrender.com/',
    caseStudySlug: projectSlug('AI Smart Campus System'),
    badge: 'Live Demo on Render',
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    technologies: ['React', 'Vite', 'Laravel 12', 'Sanctum Auth', 'Gemini API'],
    isPrimary: true,
  },
  {
    name: 'Library Management System',
    fullName: 'nazmusshakib878/Library-management-project',
    description:
      'Structured database-driven Laravel application demonstrating normalized relational database design (3NF), MVC architecture, and role-based catalog checkouts.',
    href: 'https://github.com/nazmusshakib878/Library-management-project',
    caseStudySlug: projectSlug('Library Management Project'),
    badge: '3NF Normalized Schema',
    badgeColor: 'border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] text-[#69e6cd]',
    technologies: ['PHP', 'Laravel', 'MySQL 3NF', 'Eloquent ORM'],
  },
  {
    name: 'Logistica',
    fullName: 'nazmusshakib878/Logistica',
    description:
      'Transport and courier supply management platform developed collaboratively during internship at Appstick, featuring reusable Laravel logic and database integrity checks.',
    href: 'https://github.com/nazmusshakib878/Logistica',
    caseStudySlug: projectSlug('Logistica'),
    badge: 'Appstick Internship',
    badgeColor: 'border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.08)] text-[#ff9c90]',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Database Integrity', 'Git'],
  },
  {
    name: 'Developer Portfolio',
    fullName: 'nazmusshakib878/portfolio',
    description:
      'Modern dark editorial developer portfolio built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, and Google Antigravity agentic workflows.',
    href: 'https://github.com/nazmusshakib878',
    badge: 'Next.js 16 · Production',
    badgeColor: 'border-white/20 bg-white/[0.05] text-white',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS'],
  },
]

export function GitHubSection() {
  return (
    <section id="opensource" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">08 / Open Source &amp; Code</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Authentic source code repositories, open-source work, and verifiable development activity.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7] mb-3">
                <SiGithub size={13} />
                <span>Verified Source Repositories</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Public code, engineered <span className="text-[#9aa6b7]">for production.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* GitHub Profile Highlight Card */}
        <div className="mt-14 lg:mt-16">
          <Reveal>
            <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(15,18,25,0.8)] p-6 sm:p-8 lg:p-10 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Profile Identity */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] text-white">
                    <SiGithub size={28} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="display text-xl sm:text-2xl font-bold text-[#f2f3f7]">
                        Md. Nazmus Shakib
                      </h3>
                      <span className="font-mono text-xs text-[#aeb6c3]">
                        @nazmusshakib878
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#c4b8ff]">
                      Full Stack Developer &middot; Laravel Backend Specialist &amp; Modern React Frontends
                    </p>
                    <p className="muted mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed">
                      Active GitHub repository portfolio featuring normalized relational schemas, secure REST API architectures, and AI integrations with full commit histories.
                    </p>
                  </div>
                </div>

                {/* Right Direct Profile Link Button */}
                <div className="shrink-0">
                  <a
                    className="button primary min-h-11 rounded-xl px-5 text-xs font-semibold"
                    href={portfolioData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGithub size={15} />
                    <span>View GitHub Profile</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* 4 Verified Metric Chips */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/[0.08] pt-6">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-2 text-[#69e6cd]">
                    <Code2 size={15} />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Public Projects</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#f2f3f7]">4+ Major Repositories</p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ExternalLink size={15} />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Live Deployments</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#f2f3f7]">Render Cloud Live</p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-2 text-[#c4b5fd]">
                    <Sparkles size={15} />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Research Output</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#f2f3f7]">2 Zenodo DOIs</p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-2 text-[#7dd3fc]">
                    <GitBranch size={15} />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Team Workflows</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#f2f3f7]">Branching &amp; PR Reviews</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pinned Repositories Grid */}
        <div className="mt-10 sm:mt-12 space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#aeb6c3]">
                Selected Top Repositories
              </p>
              <p className="text-xs text-[#747b8b] mt-0.5">
                Authentic, public source code repositories available for review
              </p>
            </div>
            <span className="font-mono text-xs text-[#69e6cd]">05 Repositories</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinnedRepositories.map((repo, idx) => {
              return (
                <Reveal key={repo.fullName}>
                  <article
                    className={`group flex h-full flex-col justify-between rounded-[22px] border bg-[rgba(15,18,25,0.74)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,22,32,0.88)] ${
                      repo.isPrimary
                        ? 'border-white/15 hover:border-[rgba(124,92,255,0.4)] shadow-[0_12px_40px_rgba(0,0,0,0.25)]'
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      {/* Top Row: Badge + Index */}
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${repo.badgeColor}`}
                        >
                          {repo.badge}
                        </span>
                        <span className="font-mono text-xs text-[#747b8b]">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Repo Name */}
                      <h4 className="display mt-4 text-lg font-bold text-[#f2f3f7] group-hover:text-white transition">
                        {repo.name}
                      </h4>

                      <p className="font-mono text-[11px] text-[#747b8b] mt-0.5">
                        {repo.fullName}
                      </p>

                      {/* Description */}
                      <p className="muted mt-3 text-xs leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Badges */}
                      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-4">
                        {repo.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-0.5 text-[10.5px] font-medium text-[#d9dee7]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {repo.liveUrl && (
                          <a
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                            href={repo.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={12} />
                            <span>Live Demo</span>
                          </a>
                        )}

                        <a
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#d9dee7] transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                          href={repo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiGithub size={12} />
                          <span>Code</span>
                          <ArrowUpRight size={12} />
                        </a>

                        {repo.caseStudySlug && (
                          <Link
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(124,92,255,0.25)] bg-[rgba(124,92,255,0.08)] px-3 py-1.5 text-xs font-semibold text-[#c4b8ff] transition hover:bg-[rgba(124,92,255,0.15)]"
                            href={`/projects/${repo.caseStudySlug}`}
                          >
                            <span>Case Study</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
