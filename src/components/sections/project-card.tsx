import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { projectSlug } from '@/data/portfolio'
import type { PortfolioData } from '@/types/portfolio'

type Project = PortfolioData['projects'][number]

export function ProjectCard({ project, cover, priority = false }: { project: Project; cover: string; priority?: boolean }) {
  const caseStudyHref = `/projects/${projectSlug(project.title)}`

  return <article className="project-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(15,18,25,.76)]">
    <Link href={caseStudyHref} className="relative block aspect-[16/8.5] overflow-hidden border-b border-white/10 bg-[#0b0d14]">
      <Image src={cover} alt={`${project.title} project visual`} fill priority={priority} sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#080a10]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#69e6cd] backdrop-blur-md">{project.category}</span>
    </Link>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <h3 className="display text-[clamp(1.5rem,2.3vw,2.05rem)] font-semibold text-[#f2f3f7]">{project.title}</h3>
      <p className="muted mt-3 line-clamp-3 text-sm leading-6">{project.summary}</p>
      {project.role ? <p className="mt-4 text-xs"><span className="text-[#7f8b98]">Role:</span> {project.role}</p> : null}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#7f8b98]">Key features</p>
        <ul className="mt-2 grid gap-1.5 text-xs leading-5 text-[#d9dee7] sm:grid-cols-2">
          {project.keyFeatures.slice(0,3).map(feature=><li key={feature} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2bd9b5]"/>{feature}</li>)}
        </ul>
      </div>
      <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0,5).map(technology=><li key={technology} className="chip">{technology}</li>)}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Link className="button primary" href={caseStudyHref}>Case study <ArrowUpRight size={15}/></Link>
        {project.githubUrl ? <a className="button" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><SiGithub aria-hidden size={15}/> GitHub</a> : null}
        {project.liveUrl ? <a className="button" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden size={15}/> Live demo</a> : null}
      </div>
    </div>
  </article>
}

