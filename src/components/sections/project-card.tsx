import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, ExternalLink, Sparkles } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { projectSlug } from '@/data/portfolio'
import type { PortfolioData } from '@/types/portfolio'

type Project = PortfolioData['projects'][number]

function getTechBadgeStyle(tech: string) {
  if (tech.includes('Laravel')) {
    return 'border-[rgba(240,83,64,.35)] text-[#ff9c90] bg-[rgba(240,83,64,.08)]'
  }
  if (tech.includes('React') || tech.includes('Next.js') || tech.includes('Vite')) {
    return 'border-[rgba(97,218,251,.35)] text-[#8be9fd] bg-[rgba(97,218,251,.08)]'
  }
  if (tech.includes('OpenAI') || tech.includes('Gemini') || tech.includes('AI')) {
    return 'border-[rgba(170,150,255,.4)] text-[#c4b8ff] bg-[rgba(170,150,255,.1)]'
  }
  if (tech.includes('MySQL') || tech.includes('Relational')) {
    return 'border-[rgba(43,217,181,.35)] text-[#69e6cd] bg-[rgba(43,217,181,.08)]'
  }
  return 'border-white/10 text-[#d9dee7] bg-white/[.03]'
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
  const hasAi = project.technologies.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini') || t.toLowerCase().includes('openai'))
  const isFullStack = project.technologies.some((t) => t.includes('React') || t.includes('Next') || t.includes('Laravel MVC'))

  return (
    <article className="project-card group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(15,18,25,.8)] backdrop-blur-md transition duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,.4)]">
      <Link
        href={caseStudyHref}
        className="relative block aspect-[16/8.5] overflow-hidden border-b border-white/10 bg-[#0b0d14]"
      >
        <Image
          src={cover}
          alt={`${project.title} project visual`}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14]/80 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-[#080a10]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-[#69e6cd] backdrop-blur-md">
            {project.category}
          </span>
          {hasAi ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(170,150,255,.4)] bg-[#080a10]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b8ff] backdrop-blur-md">
              <Sparkles size={11} className="text-[#aa96ff]" aria-hidden="true" />
              AI Integrated
            </span>
          ) : isFullStack ? (
            <span className="rounded-full border border-[rgba(43,217,181,.3)] bg-[#080a10]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd] backdrop-blur-md">
              Full Stack
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-[clamp(1.45rem,2.2vw,1.95rem)] font-semibold text-[#f2f3f7] transition group-hover:text-[#aa96ff]">
          {project.title}
        </h3>
        <p className="muted mt-3 line-clamp-3 text-sm leading-6">
          {project.summary}
        </p>

        {project.role ? (
          <p className="mt-4 text-xs">
            <span className="text-[#7f8b98]">Role:</span>{' '}
            <span className="text-[#d9dee7]">{project.role}</span>
          </p>
        ) : null}

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#7f8b98]">
            Key architecture &amp; features
          </p>
          <ul className="mt-2 grid gap-1.5 text-xs leading-5 text-[#d9dee7]">
            {project.keyFeatures.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check
                  size={14}
                  className="mt-0.5 shrink-0 text-[#2bd9b5]"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#7f8b98]">
            Tech Stack
          </p>
          <ul aria-label="Technologies" className="mt-2 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((technology) => (
              <li
                key={technology}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition ${getTechBadgeStyle(technology)}`}
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link className="button primary min-h-10 text-xs" href={caseStudyHref}>
            Case study <ArrowUpRight size={14} />
          </Link>
          {project.githubUrl ? (
            <a
              className="button min-h-10 text-xs"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub aria-hidden size={14} /> GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              className="button min-h-10 text-xs"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink aria-hidden size={14} /> Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}


