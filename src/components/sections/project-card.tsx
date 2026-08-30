import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, ExternalLink, Sparkles } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { projectSlug } from '@/data/portfolio'
import type { PortfolioData } from '@/types/portfolio'

type Project = PortfolioData['projects'][number]

function getTechBadgeStyle(tech: string) {
  if (tech.includes('Laravel')) {
    return 'border-[rgba(240,83,64,0.28)] text-[#ff9c90] bg-[rgba(240,83,64,0.06)]'
  }
  if (tech.includes('React') || tech.includes('Next.js') || tech.includes('Vite') || tech.includes('TypeScript')) {
    return 'border-[rgba(97,218,251,0.28)] text-[#7dd3fc] bg-[rgba(97,218,251,0.06)]'
  }
  if (tech.includes('OpenAI') || tech.includes('Gemini') || tech.includes('AI')) {
    return 'border-[rgba(168,130,255,0.3)] text-[#c4b5fd] bg-[rgba(168,130,255,0.08)]'
  }
  if (
    tech.includes('MySQL') ||
    tech.includes('PostgreSQL') ||
    tech.includes('Supabase') ||
    tech.includes('Relational') ||
    tech.includes('Database')
  ) {
    return 'border-[rgba(43,217,181,0.28)] text-[#69e6cd] bg-[rgba(43,217,181,0.06)]'
  }
  return 'border-white/10 text-[#d9dee7] bg-white/[0.025]'
}

export function ProjectCard({
  project,
  cover,
  priority = false,
}: {
  project: Project
  cover: string
  priority?: boolean
}) {
  const caseStudyHref = `/projects/${projectSlug(project.title)}`
  const hasAi = project.technologies.some(
    (t) =>
      t.toLowerCase().includes('ai') ||
      t.toLowerCase().includes('gemini') ||
      t.toLowerCase().includes('openai')
  )
  const isFullStack = project.technologies.some(
    (t) => t.includes('React') || t.includes('Next') || t.includes('Laravel')
  )

  return (
    <article className="project-card group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.78)] backdrop-blur-md transition duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.38)]">
      {/* Project Visual Container */}
      <Link
        href={caseStudyHref}
        className="relative block aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#080b12]"
        aria-label={`View case study for ${project.title}`}
      >
        <Image
          src={cover}
          alt={`${project.title} project preview`}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, 420px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d15]/90 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute left-3.5 top-3.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-white/10 bg-[#080a10]/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd] backdrop-blur-md">
            {project.category}
          </span>
          {project.liveUrl ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-[#080a10]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              Live Demo
            </span>
          ) : hasAi ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(168,130,255,0.35)] bg-[#080a10]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5fd] backdrop-blur-md">
              <Sparkles size={10} className="text-[#a78bfa]" aria-hidden="true" />
              AI Integrated
            </span>
          ) : isFullStack ? (
            <span className="rounded-full border border-[rgba(43,217,181,0.25)] bg-[#080a10]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd] backdrop-blur-md">
              Laravel &amp; MySQL
            </span>
          ) : null}
        </div>

        <span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-lg border border-white/10 bg-[#080a10]/80 text-[#9aa6b7] opacity-0 transition duration-200 group-hover:opacity-100 group-hover:text-white backdrop-blur-sm">
          <ArrowUpRight size={14} />
        </span>
      </Link>

      {/* Case Study Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title */}
        <h3 className="display text-[clamp(1.35rem,2.1vw,1.75rem)] font-semibold text-[#f2f3f7] transition group-hover:text-white">
          <Link href={caseStudyHref} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Purpose / Summary */}
        <p className="muted mt-3 line-clamp-3 text-xs leading-6 sm:text-sm">
          {project.summary}
        </p>

        {/* Role or Context info */}
        {project.role ? (
          <p className="mt-3.5 text-xs text-[#aeb6c3]">
            <span className="text-[#747b8b]">Role:</span>{' '}
            <span className="font-medium text-[#f2f3f7]">{project.role}</span>
          </p>
        ) : null}

        {/* Key Architecture & Capabilities (Checkmark Format) */}
        <div className="mt-4 border-t border-white/[0.07] pt-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#747b8b]">
            Key Architecture &amp; Capabilities
          </p>
          <ul className="mt-2.5 space-y-1.5 text-xs text-[#d9dee7]">
            {project.keyFeatures.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check
                  size={13}
                  className="mt-0.5 shrink-0 text-[#2bd9b5]"
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="mt-4 border-t border-white/[0.07] pt-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#747b8b]">
            Technology Stack
          </p>
          <ul aria-label="Technologies" className="mt-2 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((technology) => (
              <li
                key={technology}
                className={`rounded-md border px-2 py-0.5 text-[11px] font-medium transition ${getTechBadgeStyle(
                  technology
                )}`}
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Action Buttons with Clear Hierarchy */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.liveUrl ? (
            <>
              <a
                className="button primary min-h-10 rounded-xl px-3.5 text-xs font-semibold"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={13} aria-hidden="true" /> Live Demo
              </a>
              <Link
                className="button min-h-10 rounded-xl border-white/15 bg-white/[0.03] px-3.5 text-xs font-semibold text-[#f2f3f7] hover:border-white/30"
                href={caseStudyHref}
              >
                Case Study <ArrowUpRight size={13} />
              </Link>
            </>
          ) : (
            <Link
              className="button primary min-h-10 rounded-xl px-4 text-xs font-semibold"
              href={caseStudyHref}
            >
              Case Study <ArrowUpRight size={13} />
            </Link>
          )}

          {project.githubUrl && (
            <a
              className="button min-h-10 rounded-xl border-white/15 bg-white/[0.03] px-3.5 text-xs font-semibold text-[#d9dee7] hover:border-white/30 hover:text-white"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <SiGithub aria-hidden size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
