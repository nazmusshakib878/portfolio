import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft,ArrowUpRight,Check } from 'lucide-react'
import { portfolioData,projectSlug } from '@/data/portfolio'
import { projectCovers } from '@/data/project-covers'

type Props={params:Promise<{slug:string}>}

export function generateStaticParams(){
  return portfolioData.projects.map(project=>({slug:projectSlug(project.title)}))
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params
  const index=portfolioData.projects.findIndex(item=>projectSlug(item.title)===slug)
  if(index<0)return{}
  const project=portfolioData.projects[index]
  return {
    title:project.title,
    description:project.summary,
    openGraph:{title:project.title,description:project.summary,images:[projectCovers[index]]},
  }
}

export default async function ProjectPage({params}:Props){
  const {slug}=await params
  const index=portfolioData.projects.findIndex(item=>projectSlug(item.title)===slug)
  if(index<0)notFound()
  const project=portfolioData.projects[index]
  const previous=portfolioData.projects[(index-1+portfolioData.projects.length)%portfolioData.projects.length]
  const next=portfolioData.projects[(index+1)%portfolioData.projects.length]

  return <main id="main-content">
    <header className="shell flex h-24 items-center justify-between">
      <Link href="/#projects" className="button"><ArrowLeft size={15}/> All projects</Link>
      <span className="eyebrow">Case study / 0{index+1}</span>
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
          <div className="mt-5 flex flex-wrap gap-3">{project.technologies.map(tech=><span key={tech} className="rounded-full border border-white/10 px-3 py-2 text-xs">{tech}</span>)}</div>
          <p className="muted mt-10 border-l border-[#f0b45b] pl-5 text-sm leading-7">Outcomes are limited to capabilities documented in the original portfolio data. No performance metrics or user statistics have been invented.</p>
        </div>
      </div>
    </section>

    <nav className="shell grid gap-4 py-14 sm:grid-cols-2" aria-label="Project navigation">
      <Link href={`/projects/${projectSlug(previous.title)}`} className="rounded-[18px] border border-white/10 p-6 transition hover:border-[#7c5cff]"><span className="eyebrow">Previous</span><span className="display mt-3 block text-xl">{previous.title}</span></Link>
      <Link href={`/projects/${projectSlug(next.title)}`} className="rounded-[18px] border border-white/10 p-6 transition hover:border-[#7c5cff] sm:text-right"><span className="eyebrow">Next</span><span className="display mt-3 block text-xl">{next.title}</span></Link>
    </nav>
  </main>
}


