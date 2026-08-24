'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import type {
  AiActionCard,
  ProjectCardData,
  ResumeCardData,
  SkillCategoryData,
  ContactDirectData,
} from '@/types/ai'

export function RenderAiCard({
  card,
  onSelectPrompt,
}: {
  card: AiActionCard
  onSelectPrompt?: (prompt: string) => void
}) {
  switch (card.type) {
    case 'project-detail':
      return <ProjectDetailCard project={card.data} />
    case 'project-list':
      return <ProjectListCard projects={card.data} onSelectPrompt={onSelectPrompt} />
    case 'skills':
      return <SkillsMatrixCard skills={card.data} />
    case 'resume-card':
      return <ResumeSummaryCard resume={card.data} />
    case 'hire-inquiry':
      return <HireInquiryInteractiveCard onSelectPrompt={onSelectPrompt} />
    case 'contact-direct':
      return <ContactDirectCard contact={card.data} />
    case 'publications':
      return <PublicationsCard publications={card.data} />
    default:
      return null
  }
}

export function ProjectDetailCard({ project }: { project: ProjectCardData }) {
  return (
    <div className="mt-3 rounded-2xl border border-[rgba(139,114,255,0.28)] bg-gradient-to-b from-[#111422] to-[#090b14] p-4 text-left shadow-lg backdrop-blur-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-block rounded-md border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd]">
            {project.category}
          </span>
          <h4 className="mt-1.5 text-base font-bold text-white">{project.title}</h4>
        </div>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[#c4cad4]">{project.summary}</p>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aa96ff]">Key Features</p>
          <ul className="mt-1.5 space-y-1">
            {project.keyFeatures.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[#d9dee7]">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-[#2bd9b5]" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-[#c0c7d4]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
        {project.slug && (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(139,114,255,0.4)] bg-[rgba(139,114,255,0.15)] px-3 py-1.5 text-xs font-semibold text-[#d4caff] transition hover:bg-[rgba(139,114,255,0.3)] hover:text-white"
          >
            Full Case Study <ArrowUpRight size={13} />
          </Link>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-[#e2e6ed] transition hover:bg-white/10 hover:text-white"
          >
            <SiGithub size={13} /> GitHub Repo
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(43,217,181,0.4)] bg-[rgba(43,217,181,0.1)] px-3 py-1.5 text-xs font-semibold text-[#69e6cd] transition hover:bg-[rgba(43,217,181,0.2)] hover:text-white"
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export function ProjectListCard({
  projects,
  onSelectPrompt,
}: {
  projects: ProjectCardData[]
  onSelectPrompt?: (prompt: string) => void
}) {
  return (
    <div className="mt-3 space-y-2.5">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.title}
            className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-[rgba(139,114,255,0.4)] hover:bg-white/[0.06]"
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-semibold text-[#2bd9b5]">{p.category}</span>
                {p.featured && (
                  <span className="rounded-full bg-[rgba(240,83,64,0.15)] px-1.5 py-0.5 text-[9px] font-semibold text-[#ff9c90]">
                    Featured
                  </span>
                )}
              </div>
              <h5 className="mt-1 text-xs font-bold text-white group-hover:text-[#c4b8ff]">
                {p.title}
              </h5>
              <p className="mt-1 text-[11px] line-clamp-2 text-[#a4a9b6]">{p.summary}</p>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
              <span className="text-[10px] text-[#747b8b]">{p.technologies.slice(0, 3).join(' · ')}</span>
              <button
                type="button"
                onClick={() => onSelectPrompt?.(`Tell me about ${p.title}`)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#aa96ff] transition hover:text-white"
              >
                Explore <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsMatrixCard({ skills }: { skills: SkillCategoryData[] }) {
  return (
    <div className="mt-3 rounded-2xl border border-[rgba(43,217,181,0.2)] bg-[#0c0e18]/80 p-3.5 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <Layers size={15} className="text-[#2bd9b5]" />
        <span className="text-xs font-bold uppercase tracking-wider text-white">
          Verified Core Skills
        </span>
      </div>
      <div className="mt-3 space-y-3">
        {skills.map((cat) => (
          <div key={cat.name}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aa96ff]">
              {cat.name}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-[#d9dee7] transition hover:border-[#2bd9b5]/40 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ResumeSummaryCard({ resume }: { resume: ResumeCardData }) {
  return (
    <div className="mt-3 rounded-2xl border border-[rgba(139,114,255,0.3)] bg-gradient-to-b from-[#121424] to-[#090b14] p-4 text-left shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[rgba(139,114,255,0.15)] text-[#aa96ff]">
            <GraduationCap size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">{resume.name}</h4>
            <p className="text-[10px] text-[#a4a9b6]">{resume.role}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="rounded-full border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.1)] px-2 py-0.5 text-[11px] font-bold text-[#2bd9b5]">
            CGPA {resume.cgpa}
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#747b8b]">Academic Degree</span>
          <p className="font-medium text-white">{resume.degree}</p>
          <p className="text-[11px] text-[#a4a9b6]">
            {resume.institution} (Graduating {resume.graduation})
          </p>
        </div>

        {resume.certifications && resume.certifications.length > 0 && (
          <div className="pt-1">
            <span className="text-[10px] uppercase tracking-wider text-[#aa96ff]">Key Certification</span>
            <p className="font-medium text-[#e2e6ed]">{resume.certifications[0].title}</p>
            <p className="text-[10px] text-[#8e95a5]">{resume.certifications[0].provider}</p>
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <a
          href={resume.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b72ff] to-[#aa96ff] py-2 text-xs font-bold text-[#090914] shadow-md transition hover:opacity-95 active:scale-98"
        >
          <Download size={14} /> Download Official Resume (PDF)
        </a>
      </div>
    </div>
  )
}

export function HireInquiryInteractiveCard({
  onSelectPrompt,
}: {
  onSelectPrompt?: (prompt: string) => void
}) {
  const [projectType, setProjectType] = useState('Full-Stack Web App')
  const [timeline, setTimeline] = useState('1-2 Weeks')
  const [budget, setBudget] = useState('$500 - $1,500')
  const [submitted, setSubmitted] = useState(false)

  const projectOptions = [
    'Full-Stack Web App',
    'Laravel REST API',
    'Next.js / React Frontend',
    'MySQL Database Schema',
    'AI API Integration',
  ]

  const timelineOptions = ['Immediate', '1-2 Weeks', '1 Month', 'Flexible']
  const budgetOptions = ['<$500', '$500 - $1,500', '$1,500 - $3,000+', 'Custom']

  const handleGenerateInquiry = () => {
    setSubmitted(true)
    const promptMessage = `I'd like to hire Nazmus for a "${projectType}" project. Timeline: ${timeline}, Budget: ${budget}. How do we get started?`
    if (onSelectPrompt) {
      setTimeout(() => onSelectPrompt(promptMessage), 400)
    }
  }

  if (submitted) {
    return (
      <div className="mt-3 rounded-2xl border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.06)] p-4 text-center">
        <Sparkles size={20} className="mx-auto text-[#2bd9b5]" />
        <h5 className="mt-2 text-xs font-bold text-white">Project Scope Captured!</h5>
        <p className="mt-1 text-[11px] text-[#c4cad4]">
          {projectType} · {timeline} · {budget}
        </p>
        <p className="mt-2 text-[10px] text-[#8e95a5]">
          You can also send a direct message via the contact section below.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-2xl border border-[rgba(43,217,181,0.25)] bg-[#0d101d]/90 p-4 text-left shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
        <Sparkles size={16} className="text-[#2bd9b5]" />
        <h5 className="text-xs font-bold uppercase tracking-wider text-white">
          Interactive Project Inquiry
        </h5>
      </div>

      <div className="mt-3 space-y-3">
        {/* Step 1: Project Type */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#a4a9b6]">
            1. What are you building?
          </label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {projectOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setProjectType(opt)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  projectType === opt
                    ? 'border border-[#2bd9b5] bg-[rgba(43,217,181,0.15)] text-[#69e6cd]'
                    : 'border border-white/10 bg-white/[0.03] text-[#a4a9b6] hover:bg-white/[0.08]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Timeline */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#a4a9b6]">
            2. Desired Timeline
          </label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {timelineOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTimeline(opt)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  timeline === opt
                    ? 'border border-[#aa96ff] bg-[rgba(139,114,255,0.15)] text-[#d4caff]'
                    : 'border border-white/10 bg-white/[0.03] text-[#a4a9b6] hover:bg-white/[0.08]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Budget Range */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#a4a9b6]">
            3. Budget Range
          </label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {budgetOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setBudget(opt)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  budget === opt
                    ? 'border border-[#2bd9b5] bg-[rgba(43,217,181,0.15)] text-[#69e6cd]'
                    : 'border border-white/10 bg-white/[0.03] text-[#a4a9b6] hover:bg-white/[0.08]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={handleGenerateInquiry}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2bd9b5] to-[#42d9c2] py-2 text-xs font-bold text-[#050b14] shadow-md transition hover:brightness-110 active:scale-98"
        >
          <Send size={13} /> Submit Requirement Scope
        </button>
      </div>
    </div>
  )
}

export function ContactDirectCard({ contact }: { contact: ContactDirectData }) {
  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-[#0e111d] p-3.5">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <MessageSquare size={15} className="text-[#aa96ff]" />
        <span className="text-xs font-bold uppercase tracking-wider text-white">Direct Contacts</span>
      </div>

      <div className="mt-3 space-y-2">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 transition hover:border-[#2bd9b5]/40 hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-2.5">
            <Mail size={15} className="text-[#2bd9b5]" />
            <div className="text-left">
              <p className="text-[10px] uppercase text-[#747b8b]">Email</p>
              <p className="text-xs font-medium text-white">{contact.email}</p>
            </div>
          </div>
          <ArrowUpRight size={14} className="text-[#a4a9b6]" />
        </a>

        <a
          href={`tel:${contact.phone}`}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 transition hover:border-[#2bd9b5]/40 hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-2.5">
            <Phone size={15} className="text-[#2bd9b5]" />
            <div className="text-left">
              <p className="text-[10px] uppercase text-[#747b8b]">Phone</p>
              <p className="text-xs font-medium text-white">{contact.phone}</p>
            </div>
          </div>
          <ArrowUpRight size={14} className="text-[#a4a9b6]" />
        </a>

        <div className="flex items-center justify-between pt-1 text-[11px] text-[#8e95a5]">
          <span>📍 {contact.location}</span>
          <span className="text-[#2bd9b5]">● {contact.availability}</span>
        </div>
      </div>
    </div>
  )
}

export function PublicationsCard({
  publications,
}: {
  publications: Array<{ title: string; publisher: string; doi: string; url: string }>
}) {
  return (
    <div className="mt-3 space-y-2">
      {publications.map((pub) => (
        <a
          key={pub.doi}
          href={pub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-[rgba(139,114,255,0.25)] bg-[rgba(139,114,255,0.06)] p-3 text-left transition hover:border-[rgba(139,114,255,0.5)] hover:bg-[rgba(139,114,255,0.12)]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="rounded bg-[rgba(43,217,181,0.1)] px-1.5 py-0.5 text-[9px] font-semibold text-[#69e6cd]">
              {pub.publisher}
            </span>
            <ArrowUpRight size={13} className="text-[#aa96ff]" />
          </div>
          <h5 className="mt-1.5 text-xs font-bold text-white">{pub.title}</h5>
          <p className="mt-1 text-[10px] text-[#9aa6b7]">DOI: {pub.doi}</p>
        </a>
      ))}
    </div>
  )
}
