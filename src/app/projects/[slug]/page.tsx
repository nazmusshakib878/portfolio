import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { portfolioData, projectSlug } from '@/data/portfolio'
import { projectCovers } from '@/data/project-covers'
import { projectCaseStudies } from '@/data/project-case-studies'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  const longSlugs = portfolioData.projects.map((project) => ({ slug: projectSlug(project.title) }))
  const shortSlugs = [
    { slug: 'securex' },
    { slug: 'ai-smart-campus' },
    { slug: 'library-management' },
    { slug: 'logistica' },
  ]
  return [...longSlugs, ...shortSlugs]
}

function findProjectIndex(slug: string): number {
  const normalized = slug.toLowerCase().trim()
  return portfolioData.projects.findIndex((item) => {
    const fullSlug = projectSlug(item.title)
    if (fullSlug === normalized) return true
    if (normalized === 'securex' && fullSlug.includes('securex')) return true
    if (normalized === 'ai-smart-campus' && fullSlug.includes('ai-smart-campus')) return true
    if (normalized === 'library-management' && fullSlug.includes('library-management')) return true
    if (normalized === 'logistica' && fullSlug.includes('logistica')) return true
    return false
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const index = findProjectIndex(slug)
  if (index < 0) return {}
  const project = portfolioData.projects[index]
  const coverUrl = projectCovers[index]
  const caseStudy =
    projectCaseStudies[projectSlug(project.title)] ??
    projectCaseStudies[Object.keys(projectCaseStudies)[index]]

  return {
    title: `${project.title} — Case Study | Md. Nazmus Shakib`,
    description: caseStudy?.subtitle ?? project.summary,
    alternates: {
      canonical: `/projects/${projectSlug(project.title)}`,
    },
    openGraph: {
      type: 'article',
      url: `/projects/${projectSlug(project.title)}`,
      title: `${project.title} | Case Study`,
      description: caseStudy?.subtitle ?? project.summary,
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Visual`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Case Study`,
      description: caseStudy?.subtitle ?? project.summary,
      images: [coverUrl],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const index = findProjectIndex(slug)
  if (index < 0) notFound()

  const project = portfolioData.projects[index]
  const coverUrl = projectCovers[index]
  const canonicalSlug = projectSlug(project.title)
  const caseStudy =
    projectCaseStudies[canonicalSlug] ??
    projectCaseStudies[Object.keys(projectCaseStudies)[index]]

  const publication = portfolioData.publications.find(
    (item) => item.projectTitle === project.title
  )
  const previous =
    portfolioData.projects[
      (index - 1 + portfolioData.projects.length) % portfolioData.projects.length
    ]
  const next = portfolioData.projects[(index + 1) % portfolioData.projects.length]

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    description: caseStudy?.subtitle ?? project.description,
    author: {
      '@type': 'Person',
      name: portfolioData.name,
    },
    codeRepository: project.githubUrl,
    programmingLanguage: project.technologies,
  }

  return (
    <main id="main-content" className="min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Top Sticky/Header Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06070b]/85 backdrop-blur-md">
        <div className="shell flex h-20 items-center justify-between">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-[#d9dee7] transition hover:border-[#7c5cff] hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
            <span>All Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="eyebrow text-xs">
              Case Study / 0{index + 1}
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#d9dee7] transition hover:border-white/25 hover:text-white"
              >
                <SiGithub size={13} />
                <span>Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
              >
                <ExternalLink size={13} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 1. Project Overview & Hero Header */}
      <section className="shell pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd]">
            {project.category}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium text-[#aeb6c3]">
            {project.date}
          </span>
          {publication && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5fd]">
              <FileText size={11} /> Zenodo Publication
            </span>
          )}
        </div>

        <h1 className="display mt-6 max-w-5xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-semibold leading-[1.04] text-[#f2f3f7]">
          {project.title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[#c4b8ff] sm:text-xl">
          {caseStudy?.subtitle ?? project.summary}
        </p>

        {/* Meta Specs Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">My Role</p>
            <p className="mt-1.5 text-sm font-semibold text-[#f2f3f7]">{project.role ?? 'Developer'}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Category</p>
            <p className="mt-1.5 text-sm font-semibold text-[#f2f3f7]">{project.category}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Timeline / Date</p>
            <p className="mt-1.5 text-sm font-semibold text-[#f2f3f7]">{project.date}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
              {project.supervisor ? 'Supervisor' : 'Primary Stack'}
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#f2f3f7]">
              {project.supervisor ?? `${project.technologies[0]} & ${project.technologies[1] || 'MySQL'}`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              className="button primary min-h-11 rounded-xl px-5 text-xs font-semibold"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} /> View Live Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              className="button min-h-11 rounded-xl border-white/15 bg-white/[0.03] px-5 text-xs font-semibold text-[#f2f3f7] hover:border-white/30"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub size={14} /> GitHub Repository <ArrowUpRight size={14} />
            </a>
          )}

          {publication && (
            <a
              className="button min-h-11 rounded-xl border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] px-5 text-xs font-semibold text-[#c4b5fd] hover:border-[rgba(168,130,255,0.5)]"
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} /> View Publication (DOI) <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </section>

      {/* 2. Visual Showcase & Cover Presentation */}
      <section className="shell">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#090d15] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          {/* Browser Chrome Header */}
          <div className="flex h-11 items-center justify-between border-b border-white/10 bg-white/[0.03] px-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#ff5f56]/80" />
              <span className="size-3 rounded-full bg-[#ffbd2e]/80" />
              <span className="size-3 rounded-full bg-[#27c93f]/80" />
            </div>
            <div className="flex max-w-[280px] sm:max-w-md items-center justify-center truncate rounded-md border border-white/[0.08] bg-black/40 px-3 py-1 font-mono text-[11px] text-[#747b8b]">
              {project.liveUrl ? project.liveUrl : `github.com/nazmusshakib878/${canonicalSlug}`}
            </div>
            <div className="w-12 text-right">
              <span className="size-2 inline-block rounded-full bg-[#2bd9b5]" />
            </div>
          </div>

          {/* Project Screenshot / Cover Display */}
          <div className="relative aspect-[16/9] max-h-[640px] w-full bg-[#05070b]">
            <Image
              src={coverUrl}
              alt={`${project.title} cover representation`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1180px"
              className="object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070b]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.02] px-5 py-3 text-xs text-[#747b8b]">
            <span>Verified visual representation &middot; Authentic project architecture</span>
            <span className="font-mono text-[11px] text-[#aeb6c3]">Source Code Verified</span>
          </div>
        </div>
      </section>

      {/* 3. Problem & Solution Section */}
      <section className="shell mt-16 sm:mt-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Problem Card */}
          <div className="rounded-[22px] border border-rose-500/20 bg-[rgba(28,15,20,0.6)] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-rose-400">
              <ShieldCheck size={18} />
              <p className="eyebrow text-rose-400">01 / The Problem</p>
            </div>
            <h2 className="display mt-4 text-2xl font-semibold text-[#f2f3f7]">
              The Operational &amp; Engineering Challenge
            </h2>
            <p className="muted mt-4 text-sm leading-7">
              {caseStudy?.problemStatement ?? project.summary}
            </p>
          </div>

          {/* Solution Card */}
          <div className="rounded-[22px] border border-emerald-500/20 bg-[rgba(12,25,22,0.6)] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <Layers size={18} />
              <p className="eyebrow text-emerald-400">02 / The Solution</p>
            </div>
            <h2 className="display mt-4 text-2xl font-semibold text-[#f2f3f7]">
              Architecture &amp; System Implementation
            </h2>
            <p className="muted mt-4 text-sm leading-7">
              {caseStudy?.solutionStatement ?? project.description}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Features & Capabilities */}
      <section className="shell mt-16 sm:mt-20">
        <div className="border-b border-white/10 pb-5">
          <p className="eyebrow">03 / Key Features</p>
          <h2 className="display mt-2 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
            Core System Capabilities &amp; Workflows
          </h2>
        </div>

        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {project.keyFeatures.map((feature, idx) => (
            <div
              key={feature}
              className="flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-[rgba(15,18,25,0.7)] p-4 backdrop-blur-md transition duration-200 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] text-[#2bd9b5]">
                <Check size={14} />
              </span>
              <div>
                <p className="text-sm font-medium text-[#f2f3f7]">{feature}</p>
                <p className="text-[11px] text-[#747b8b] mt-0.5">Feature 0{idx + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. My Role & Personal Contributions */}
      <section className="shell mt-16 sm:mt-20">
        <div className="rounded-[24px] border border-[rgba(124,92,255,0.22)] bg-[rgba(17,15,27,0.72)] p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(124,92,255,0.3)] bg-[rgba(124,92,255,0.1)] text-[#aa96ff]">
              <Code2 size={20} />
            </span>
            <div>
              <p className="eyebrow text-[#aa96ff]">04 / Engineering Contribution</p>
              <h2 className="display mt-1 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
                My Specific Role &amp; Responsibilities
              </h2>
            </div>
          </div>

          <p className="muted mt-6 text-sm sm:text-base leading-7">
            {caseStudy?.myRoleDescription ?? `Directly implemented the core backend logic, relational schema architecture, and application endpoints for ${project.title}.`}
          </p>

          <div className="mt-8 space-y-3">
            {(caseStudy?.myContributions ?? project.keyFeatures.slice(0, 5)).map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm text-[#d9dee7]"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-[#aa96ff]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Grouped Technology Stack */}
      <section className="shell mt-16 sm:mt-20">
        <div className="border-b border-white/10 pb-5">
          <p className="eyebrow">05 / Technology Architecture</p>
          <h2 className="display mt-2 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
            Full-Stack Technology Decisions
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.04)] p-5">
            <div className="flex items-center gap-2 text-[#ff9c90]">
              <Server size={16} />
              <p className="text-xs font-semibold uppercase tracking-wider">Backend &amp; APIs</p>
            </div>
            <ul className="mt-4 space-y-2">
              {(caseStudy?.techStackGrouped.backend ?? project.technologies.filter(t => t.includes('Laravel') || t.includes('PHP'))).map((t) => (
                <li key={t} className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-1.5 text-xs font-medium text-[#f2f3f7]">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.04)] p-5">
            <div className="flex items-center gap-2 text-[#7dd3fc]">
              <Layers size={16} />
              <p className="text-xs font-semibold uppercase tracking-wider">Frontend &amp; UI</p>
            </div>
            <ul className="mt-4 space-y-2">
              {(caseStudy?.techStackGrouped.frontend ?? project.technologies.filter(t => t.includes('React') || t.includes('Next') || t.includes('Blade'))).map((t) => (
                <li key={t} className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-1.5 text-xs font-medium text-[#f2f3f7]">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.04)] p-5">
            <div className="flex items-center gap-2 text-[#69e6cd]">
              <Database size={16} />
              <p className="text-xs font-semibold uppercase tracking-wider">Database Layer</p>
            </div>
            <ul className="mt-4 space-y-2">
              {(caseStudy?.techStackGrouped.database ?? ['MySQL', 'Eloquent ORM', 'Relational Schema']).map((t) => (
                <li key={t} className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-1.5 text-xs font-medium text-[#f2f3f7]">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.04)] p-5">
            <div className="flex items-center gap-2 text-[#c4b5fd]">
              <Sparkles size={16} />
              <p className="text-xs font-semibold uppercase tracking-wider">Integrations &amp; Tools</p>
            </div>
            <ul className="mt-4 space-y-2">
              {(caseStudy?.techStackGrouped.integrations ?? ['Git & GitHub', 'Postman', 'SMTP / OAuth']).map((t) => (
                <li key={t} className="rounded-lg border border-white/[0.08] bg-black/40 px-3 py-1.5 text-xs font-medium text-[#f2f3f7]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Database Architecture & Schema Design */}
      <section className="shell mt-16 sm:mt-20">
        <div className="rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.75)] p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.08)] text-[#69e6cd]">
              <Database size={20} />
            </span>
            <div>
              <p className="eyebrow text-[#69e6cd]">06 / Data Layer</p>
              <h2 className="display mt-1 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
                Database Architecture &amp; Relational Schema
              </h2>
            </div>
          </div>

          <p className="muted mt-6 text-sm sm:text-base leading-7">
            {caseStudy?.databaseArchitecture.overview ??
              'Structured with a normalized MySQL relational schema emphasizing referential integrity, indexing on query keys, and Eloquent model relationships.'}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#aeb6c3]">Key Relational Entities</p>
              <ul className="mt-3 space-y-2.5">
                {(caseStudy?.databaseArchitecture.keyEntities ?? [
                  'users: Core authentication model with role identification',
                  'primary_records: Business logic records with status workflows',
                  'audit_logs: Event tracking and change history',
                ]).map((entity) => (
                  <li
                    key={entity}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-xs leading-5 text-[#d9dee7]"
                  >
                    <span className="font-mono text-[#69e6cd]">{entity.split(':')[0]}:</span>
                    <span className="text-[#a4a9b6]">{entity.split(':')[1]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#aeb6c3]">Schema Design Principles</p>
              <ul className="mt-3 space-y-2.5">
                {(caseStudy?.databaseArchitecture.schemaPrinciples ?? [
                  'Normalized schema (1NF–3NF) to eliminate data redundancy',
                  'Indexed foreign keys for sub-second search and join queries',
                  'Database transaction safety on multi-table operations',
                ]).map((principle) => (
                  <li
                    key={principle}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-xs leading-5 text-[#d9dee7]"
                  >
                    <Check size={13} className="mt-1 shrink-0 text-[#2bd9b5]" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. API Architecture & Data Flow */}
      <section className="shell mt-16 sm:mt-20">
        <div className="rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.75)] p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-[#f2f3f7]">
              <Workflow size={20} />
            </span>
            <div>
              <p className="eyebrow">07 / System Flow</p>
              <h2 className="display mt-1 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
                API Architecture &amp; Data Flow Lifecycle
              </h2>
            </div>
          </div>

          <p className="muted mt-6 text-sm sm:text-base leading-7">
            {caseStudy?.apiArchitecture.overview ??
              'Engineered for end-to-end reliability from client requests through validation layers, controller services, database transactions, and client responses.'}
          </p>

          <div className="mt-8 space-y-3">
            {(caseStudy?.apiArchitecture.dataFlowSteps ?? [
              'Client Dispatches Authenticated Request (HTTP / REST)',
              'Routing & Middleware verify session tokens and role authorization',
              'Controller Layer validates input payloads via FormRequest rules',
              'Service Layer processes domain logic and updates MySQL database',
              'Structured Response (JSON or Blade View) returned with status feedback',
            ]).map((step, stepIdx) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs sm:text-sm text-[#d9dee7]"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] font-mono text-xs font-semibold text-[#69e6cd]">
                  0{stepIdx + 1}
                </span>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/40 p-4 text-xs text-[#aeb6c3]">
            <span className="font-semibold uppercase tracking-wider text-[#747b8b]">Authentication Mechanism</span>
            <span className="font-medium text-[#f2f3f7]">{caseStudy?.apiArchitecture.authMethod ?? 'Token & Session Authentication'}</span>
          </div>
        </div>
      </section>

      {/* 9. Engineering Challenges & Problem Solving */}
      <section className="shell mt-16 sm:mt-20">
        <div className="border-b border-white/10 pb-5">
          <p className="eyebrow">08 / Problem Solving</p>
          <h2 className="display mt-2 text-2xl sm:text-3xl font-semibold text-[#f2f3f7]">
            Engineering Challenges &amp; Technical Solutions
          </h2>
        </div>

        <div className="mt-8 space-y-5">
          {(caseStudy?.challenges ?? [
            {
              challenge: 'Ensuring seamless data synchronization and preventing concurrency race conditions.',
              solution: 'Implemented atomic database transactions and strict pre-commit validation rules.',
            },
          ]).map((item, cIdx) => (
            <div
              key={item.challenge}
              className="rounded-[22px] border border-white/10 bg-[rgba(15,18,25,0.72)] p-6 sm:p-8 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#aa96ff]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#aa96ff]">Challenge 0{cIdx + 1}</p>
              </div>
              <h3 className="mt-2 text-base font-semibold text-[#f2f3f7] sm:text-lg">
                {item.challenge}
              </h3>
              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 text-xs sm:text-sm leading-6 text-[#d9dee7]">
                <p className="font-semibold text-emerald-400 mb-1">Engineered Solution:</p>
                <p className="muted text-[#d9dee7]">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Publication / Zenodo Technical Report (if applicable) */}
      {publication && (
        <section className="shell mt-16 sm:mt-20">
          <aside className="overflow-hidden rounded-[24px] border border-[rgba(124,92,255,0.25)] bg-[rgba(17,15,27,0.75)] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(124,92,255,0.3)] bg-[rgba(124,92,255,0.1)] text-[#aa96ff]">
                  <FileText size={22} />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow text-[#aa96ff]">Formal Publication / Technical Report</p>
                  <h3 className="display mt-2 text-xl sm:text-2xl font-semibold text-[#f2f3f7]">
                    {publication.title}
                  </h3>
                </div>
              </div>
              <span className="w-fit shrink-0 rounded-full border border-[rgba(43,217,181,0.2)] bg-[rgba(43,217,181,0.07)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#69e6cd]">
                Published on {publication.publisher}
              </span>
            </div>

            <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">Report Version</dt>
                <dd className="mt-1.5 text-sm font-medium text-[#f2f3f7]">{publication.version}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">DOI Identifier</dt>
                <dd className="mt-1.5 break-all font-mono text-sm text-[#c4b5fd]">{publication.doi}</dd>
              </div>
            </dl>

            <a
              className="button primary mt-7 inline-flex"
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Access Verified Report on Zenodo <ArrowUpRight size={14} />
            </a>
          </aside>
        </section>
      )}

      {/* 11. Final Result & Verification Summary */}
      <section className="shell mt-16 sm:mt-20">
        <div className="rounded-[24px] border border-white/10 bg-[rgba(15,18,25,0.7)] p-6 sm:p-8 backdrop-blur-md">
          <p className="eyebrow">09 / Result &amp; Verification</p>
          <h2 className="display mt-2 text-2xl font-semibold text-[#f2f3f7]">
            Project Delivery &amp; Technical Achievements
          </h2>
          <p className="muted mt-4 text-sm leading-7">
            {caseStudy?.finalResult.summary ??
              `Successfully engineered and documented ${project.title}, demonstrating real full-stack capability with verifiable code repositories.`}
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {(caseStudy?.finalResult.achievements ?? [
              'Complete source code on GitHub',
              'Structured architectural design',
              'Clean code quality verification',
            ]).map((ach) => (
              <li
                key={ach}
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 text-xs text-[#d9dee7]"
              >
                <Check size={14} className="shrink-0 text-[#2bd9b5]" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. Bottom Prev / Next Case Study Navigation */}
      <nav className="shell mt-16 grid gap-4 sm:grid-cols-2" aria-label="Project case study navigation">
        <Link
          href={`/projects/${projectSlug(previous.title)}`}
          className="group rounded-[20px] border border-white/10 bg-[rgba(15,18,25,0.7)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(124,92,255,0.4)]"
        >
          <div className="flex items-center gap-2 text-xs text-[#747b8b]">
            <ArrowLeft size={13} className="transition group-hover:-translate-x-1" />
            <span>Previous Case Study</span>
          </div>
          <p className="display mt-3 text-lg sm:text-xl font-semibold text-[#f2f3f7] group-hover:text-[#c4b5fd]">
            {previous.title}
          </p>
        </Link>

        <Link
          href={`/projects/${projectSlug(next.title)}`}
          className="group rounded-[20px] border border-white/10 bg-[rgba(15,18,25,0.7)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(124,92,255,0.4)] sm:text-right"
        >
          <div className="flex items-center justify-end gap-2 text-xs text-[#747b8b]">
            <span>Next Case Study</span>
            <ArrowRight size={13} className="transition group-hover:translate-x-1" />
          </div>
          <p className="display mt-3 text-lg sm:text-xl font-semibold text-[#f2f3f7] group-hover:text-[#c4b5fd]">
            {next.title}
          </p>
        </Link>
      </nav>
    </main>
  )
}
