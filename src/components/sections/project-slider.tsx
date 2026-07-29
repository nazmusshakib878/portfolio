'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { ProjectCard } from '@/components/sections/project-card'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData } from '@/data/portfolio'
import { projectCovers } from '@/data/project-covers'

export function ProjectSlider(){
  const rail=useRef<HTMLDivElement>(null)
  const move=(direction:number)=>rail.current?.scrollBy({left:direction*Math.min(440,rail.current.clientWidth*.86),behavior:'smooth'})

  return <section id="projects" className="section overflow-hidden">
    <div className="shell">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">01 / Featured Projects</p>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,4rem)] font-semibold">Featured <span className="text-[#9f85ff]">Projects</span></h2>
            <p className="muted mt-3 max-w-xl text-sm leading-6">Selected work with responsibilities, features, technologies and source links.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={()=>move(-1)} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.025] transition hover:border-[#7c5cff] hover:text-white" aria-label="Previous projects"><ArrowLeft size={17}/></button>
            <button type="button" onClick={()=>move(1)} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.025] transition hover:border-[#7c5cff] hover:text-white" aria-label="Next projects"><ArrowRight size={17}/></button>
          </div>
        </div>
      </Reveal>
    </div>

    <div ref={rail} tabIndex={0} aria-label="Featured project slider" className="shell mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-color:rgba(139,114,255,.45)_transparent] [scrollbar-width:thin]">
      {portfolioData.projects.map((project,index)=><div key={project.title} className="w-[86vw] max-w-[390px] shrink-0 snap-start sm:w-[370px]"><ProjectCard project={project} cover={projectCovers[index]} priority={index<2}/></div>)}
      <a href={`${portfolioData.githubUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="group flex min-h-[480px] w-[86vw] max-w-[390px] shrink-0 snap-start flex-col justify-between rounded-[20px] border border-[rgba(43,217,181,.2)] bg-[radial-gradient(circle_at_70%_20%,rgba(43,217,181,.13),transparent_42%),rgba(11,14,20,.82)] p-6 transition hover:-translate-y-1 hover:border-[rgba(43,217,181,.42)] sm:w-[370px]">
        <div className="relative -mx-6 -mt-6 h-[190px] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(139,114,255,.32),transparent_42%),linear-gradient(145deg,#101421,#080a10)]">
          <div aria-hidden className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]"/>
          <div className="absolute inset-0 grid place-items-center"><span className="grid size-20 place-items-center rounded-[24px] border border-[rgba(170,150,255,.35)] bg-[#0b0e17]/80 text-[#c4b8ff] shadow-[0_18px_55px_rgba(91,67,207,.32)] backdrop-blur-md"><SiGithub aria-hidden size={40}/></span></div>
          <span className="absolute bottom-4 left-5 rounded-full border border-[rgba(43,217,181,.22)] bg-[#080a10]/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.14em] text-[#69e6cd] backdrop-blur-md">Repository collection</span>
          <ArrowUpRight className="absolute right-5 top-5 text-[#69e6cd] transition group-hover:-translate-y-1 group-hover:translate-x-1" size={20}/>
        </div>
        <div><p className="eyebrow">More on GitHub</p><h3 className="display mt-4 text-3xl font-semibold">Other Projects</h3><p className="muted mt-4 text-sm leading-7">Explore my other repositories and future projects directly on GitHub.</p><span className="button mt-6">View all repositories <ArrowUpRight size={15}/></span></div>
      </a>
    </div>
  </section>
}


