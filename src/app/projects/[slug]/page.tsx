import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft,ArrowUpRight,Check,FileText } from 'lucide-react'
import { portfolioData,projectSlug } from '@/data/portfolio'
import { projectCovers } from '@/data/project-covers'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: projectSlug(project.title) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const index = portfolioData.projects.findIndex((item) => projectSlug(item.title) === slug)
  if (index < 0) return {}
  const project = portfolioData.projects[index]
  const coverUrl = projectCovers[index]

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/projects/${slug}`,
      title: `${project.title} | Md. Nazmus Shakib`,
      description: project.summary,
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Md. Nazmus Shakib`,
      description: project.summary,
      images: [coverUrl],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const index = portfolioData.projects.findIndex((item) => projectSlug(item.title) === slug)
  if (index < 0) notFound()
  const project = portfolioData.projects[index]
  const publication = portfolioData.publications.find((item) => item.projectTitle === project.title)
  const previous =
    portfolioData.projects[(index - 1 + portfolioData.projects.length) % portfolioData.projects.length]
  const next = portfolioData.projects[(index + 1) % portfolioData.projects.length]

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    description: project.description,
    author: {
      '@type': 'Person',
      name: portfolioData.name,
    },
    codeRepository: project.githubUrl,
    programmingLanguage: project.technologies,
  }

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <header className="shell flex h-24 items-center justify-between">
        <Link href="/#projects" className="button">
          <ArrowLeft size={15} /> All projects
        </Link>
        <span className="eyebrow">Case study / 0{index + 1}</span>
      </header>

    <section className="shell py-14 lg:py-20">
      <p className="eyebrow">{project.category} <span aria-hidden="true">&middot;</span> {project.date}</p>
      <h1 className="display mt-7 max-w-5xl text-[clamp(3rem,7.5vw,6.8rem)] font-semibold">{project.title}</h1>
      <p className="muted mt-7 max-w-3xl text-lg leading-8">{project.description}</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a className="button primary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={15}/></a>
        {project.liveUrl&&<a className="button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live project <ArrowUpRight size={15}/></a>}
      </div>
    </section>

    <div className="shell relative aspect-[16/9] max-h-[680px] min-h-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-[#05070b]">
      <Image src={projectCovers[index]} alt={`Logo-style cover representing ${project.title}`} fill priority sizes="(max-width:1200px) 100vw, 1180px" className="object-contain object-center"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"/>
      <p className="absolute bottom-5 left-5 eyebrow">Project-specific visual <span aria-hidden="true">&middot;</span> no fabricated screenshot</p>
    </div>

    <section className="section mt-16 lg:mt-20">
      <div className="shell grid gap-12 lg:grid-cols-[.4fr_1fr]">
        <div>
          <p className="eyebrow">Role & context</p>
          <dl className="mt-7 space-y-5 text-sm">
            <div><dt className="muted">Role</dt><dd className="mt-1">{project.role??'Developer'}</dd></div>
            {project.supervisor&&<div><dt className="muted">Supervisor</dt><dd className="mt-1">{project.supervisor}</dd></div>}
            <div><dt className="muted">Date</dt><dd className="mt-1">{project.date}</dd></div>
          </dl>
        </div>
        <div>
          <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold">Solution & implementation</h2>
          <p className="muted mt-6 max-w-3xl leading-8">{project.summary}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {project.keyFeatures.map(feature=><p key={feature} className="flex gap-3 rounded-xl border border-white/[.08] bg-white/[.025] p-4 text-sm leading-6"><Check aria-hidden="true" size={16} className="mt-1 shrink-0 text-[#2bd9b5]"/>{feature}</p>)}
          </div>
          <h3 className="eyebrow mt-12">Technology stack</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.technologies.map(tech=><span key={tech} className="rounded-full border border-white/10 px-3 py-2 text-xs">{tech}</span>)}
            {publication&&<span className="rounded-full border border-[rgba(124,92,255,.28)] bg-[rgba(124,92,255,.08)] px-3 py-2 text-xs font-semibold text-[#aa96ff]">Zenodo / DOI</span>}
          </div>
          {publication&&<aside className="mt-12 overflow-hidden rounded-[22px] border border-[rgba(124,92,255,.24)] bg-[rgba(17,15,27,.72)] p-6 sm:p-8" aria-labelledby="publication-heading">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(124,92,255,.26)] bg-[rgba(124,92,255,.1)] text-[#aa96ff]"><FileText aria-hidden="true" size={20}/></span>
                <div className="min-w-0">
                  <p className="eyebrow text-[#aa96ff]">Technical report / Publication</p>
                  <h3 id="publication-heading" className="display mt-3 text-[clamp(1.45rem,3vw,2.3rem)] font-semibold text-[#f2f3f7]">{publication.title}</h3>
                </div>
              </div>
              <span className="w-fit shrink-0 rounded-full border border-[rgba(43,217,181,.2)] bg-[rgba(43,217,181,.07)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#69e6cd]">Published on {publication.publisher}</span>
            </div>
            <dl className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div><dt className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#7f8b98]">Version</dt><dd className="mt-2 text-sm text-[#d9dee7]">{publication.version}</dd></div>
              <div className="min-w-0"><dt className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#7f8b98]">DOI</dt><dd className="mt-2 break-all text-sm text-[#d9dee7]">{publication.doi}</dd></div>
            </dl>
            <a className="button primary mt-7 w-full justify-center sm:w-auto" href={publication.url} target="_blank" rel="noopener noreferrer">View publication <ArrowUpRight size={15}/></a>
          </aside>}
          <p className="muted mt-10 border-l border-[#f0b45b] pl-5 text-sm leading-7">Outcomes are limited to capabilities documented in the original portfolio data. No performance metrics or user statistics have been invented.</p>
        </div>
      </div>
    </section>

    <nav className="shell grid gap-4 py-14 sm:grid-cols-2" aria-label="Project navigation">
      <Link href={`/projects/${projectSlug(previous.title)}`} className="rounded-[18px] border border-white/10 p-6 transition hover:border-[#7c5cff]"><span className="eyebrow">Previous</span><span className="display mt-3 block text-xl">{previous.title}</span></Link>
      <Link href={`/projects/${projectSlug(next.title)}`} className="rounded-[18px] border border-white/10 p-6 transition hover:border-[#7c5cff] sm:text-right"><span className="eyebrow">Next</span><span className="display mt-3 block text-xl">{next.title}</span></Link>
    </nav>
  </main>
  )
}


