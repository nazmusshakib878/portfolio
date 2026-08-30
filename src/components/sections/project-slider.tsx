'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { ProjectCard } from '@/components/sections/project-card'
import { Reveal } from '@/components/ui/reveal'
import { portfolioData } from '@/data/portfolio'
import { projectCovers } from '@/data/project-covers'

export function ProjectSlider() {
  const rail = useRef<HTMLDivElement>(null)
  const move = (direction: number) =>
    rail.current?.scrollBy({
      left: direction * Math.min(460, (rail.current.clientWidth || 360) * 0.88),
      behavior: 'smooth',
    })

  return (
    <section id="projects" className="section overflow-hidden">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">01 / Featured Case Studies</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,4vw,4rem)] font-semibold text-[#f2f3f7]">
                Featured <span className="text-[#9aa6b7]">Case Studies</span>
              </h2>
              <p className="muted mt-3 max-w-xl text-sm leading-6">
                Real-world web applications and systems engineered with Laravel, Next.js, and practical AI integrations.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[#aeb6c3] transition hover:border-[#7c5cff] hover:text-white active:scale-95"
                aria-label="Previous projects"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[#aeb6c3] transition hover:border-[#7c5cff] hover:text-white active:scale-95"
                aria-label="Next projects"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={rail}
        tabIndex={0}
        aria-label="Featured project case studies slider"
        className="shell mt-8 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto overscroll-x-contain pb-6 sm:mt-9 [scrollbar-color:rgba(139,114,255,.45)_transparent] [scrollbar-width:thin]"
      >
        {portfolioData.projects.map((project, index) => (
          <div
            key={project.title}
            className="w-[calc(100vw-2.5rem)] max-w-[420px] shrink-0 snap-start sm:w-[400px] lg:w-[410px]"
          >
            <ProjectCard
              project={project}
              cover={projectCovers[index]}
              priority={index < 2}
            />
          </div>
        ))}

        {/* Active Pipeline Card */}
        <article className="group flex min-h-[500px] w-[calc(100vw-2.5rem)] max-w-[420px] shrink-0 snap-start flex-col justify-between rounded-[22px] border border-[rgba(170,150,255,0.22)] bg-[radial-gradient(circle_at_70%_20%,rgba(170,150,255,0.1),transparent_45%),rgba(11,14,20,0.85)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(170,150,255,0.42)] sm:w-[400px] lg:w-[410px]">
          <div className="relative -mx-6 -mt-6 h-[190px] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(139,114,255,0.28),transparent_50%),linear-gradient(145deg,#120e24,#080a10)]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(170,150,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(170,150,255,.15)_1px,transparent_1px)] [background-size:24px_24px]"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-[20px] border border-[rgba(170,150,255,0.4)] bg-[#0e0c1a]/90 text-[#c4b8ff] shadow-[0_12px_40px_rgba(139,114,255,0.35)] backdrop-blur-md">
                <Sparkles size={28} className="text-[#aa96ff]" aria-hidden="true" />
              </span>
            </div>
            <span className="absolute bottom-4 left-5 flex items-center gap-1.5 rounded-full border border-[rgba(170,150,255,0.3)] bg-[#080a10]/85 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#c4b8ff] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#aa96ff]" />
              Currently Building
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-between pt-5">
            <div>
              <p className="eyebrow text-[#aa96ff]">Active Pipeline</p>
              <h3 className="display mt-2 text-2xl font-semibold text-[#f2f3f7]">
                Full-Stack &amp; AI Systems
              </h3>
              <p className="muted mt-3 text-xs leading-6 sm:text-sm">
                Architecting modern full-stack web applications connecting high-throughput Laravel &amp; MySQL services to Next.js 16 App Router interfaces with real-time AI reasoning workflows.
              </p>
            </div>

            <div className="mt-5 border-t border-white/[0.07] pt-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#747b8b]">
                Target Architecture
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                <li className="rounded-md border border-[rgba(170,150,255,0.28)] bg-[rgba(170,150,255,0.07)] px-2.5 py-0.5 text-[11px] font-medium text-[#c4b5fd]">Next.js 16</li>
                <li className="rounded-md border border-[rgba(240,83,64,0.28)] bg-[rgba(240,83,64,0.07)] px-2.5 py-0.5 text-[11px] font-medium text-[#ff9c90]">Laravel 12</li>
                <li className="rounded-md border border-[rgba(170,150,255,0.28)] bg-[rgba(170,150,255,0.07)] px-2.5 py-0.5 text-[11px] font-medium text-[#c4b5fd]">AI APIs</li>
                <li className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-[#d9dee7]">TypeScript</li>
                <li className="rounded-md border border-[rgba(43,217,181,0.28)] bg-[rgba(43,217,181,0.07)] px-2.5 py-0.5 text-[11px] font-medium text-[#69e6cd]">MySQL</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#aeb6c3]">
                <span className="size-2 rounded-full bg-[#aa96ff]" />
                <span>In Development · Updates on GitHub</span>
              </div>
            </div>
          </div>
        </article>

        {/* GitHub Repositories Explorer Card */}
        <a
          href={`${portfolioData.githubUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-[500px] w-[calc(100vw-2.5rem)] max-w-[420px] shrink-0 snap-start flex-col justify-between rounded-[22px] border border-[rgba(43,217,181,0.2)] bg-[radial-gradient(circle_at_70%_20%,rgba(43,217,181,0.1),transparent_42%),rgba(11,14,20,0.82)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(43,217,181,0.4)] sm:w-[400px] lg:w-[410px]"
        >
          <div className="relative -mx-6 -mt-6 h-[190px] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(139,114,255,0.28),transparent_42%),linear-gradient(145deg,#101421,#080a10)]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-[24px] border border-[rgba(170,150,255,0.35)] bg-[#0b0e17]/80 text-[#c4b8ff] shadow-[0_18px_55px_rgba(91,67,207,0.32)] backdrop-blur-md">
                <SiGithub aria-hidden size={38} />
              </span>
            </div>
            <span className="absolute bottom-4 left-5 rounded-full border border-[rgba(43,217,181,0.22)] bg-[#080a10]/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#69e6cd] backdrop-blur-md">
              Repository Collection
            </span>
            <ArrowUpRight
              className="absolute right-5 top-5 text-[#69e6cd] transition group-hover:-translate-y-1 group-hover:translate-x-1"
              size={20}
            />
          </div>
          <div>
            <p className="eyebrow">More on GitHub</p>
            <h3 className="display mt-4 text-3xl font-semibold text-[#f2f3f7]">Other Projects</h3>
            <p className="muted mt-4 text-xs leading-6 sm:text-sm">
              Explore open-source repositories, academic coursework implementations, and backend utilities on GitHub.
            </p>
            <span className="button min-h-10 mt-6 rounded-xl text-xs font-semibold">
              View All Repositories <ArrowUpRight size={14} />
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}
