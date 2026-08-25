import { ArrowUp, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { portfolioData } from '@/data/portfolio'

export function SiteFooter() {
  const navSections = [
    {
      heading: 'Portfolio',
      links: [
        { label: 'Featured Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
        { label: 'Core Skills', href: '#skills' },
        { label: 'About Me', href: '#about' },
      ],
    },
    {
      heading: 'Engineering',
      links: [
        { label: 'Technical Writing', href: '/blog' },
        { label: 'Education', href: '#education' },
        { label: 'Growth Roadmap', href: '#learning' },
        { label: 'Open Source', href: '#opensource' },
        { label: 'Architecture', href: '#architecture' },
      ],
    },
  ]

  return (
    <footer className="border-t border-white/10 bg-[#090b10] pt-16 pb-10">
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1.1fr] lg:gap-8">
        {/* 1. Personal Identity & Bio */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#2bd9b5] shadow-[0_0_12px_rgba(43,217,181,0.6)]" />
            <p className="display text-xl sm:text-2xl font-bold text-[#f2f3f7]">
              {portfolioData.name}
            </p>
          </div>

          <p className="mt-2 text-xs sm:text-sm font-medium text-[#c4b8ff]">
            {portfolioData.primaryRole}{' '}
            <span aria-hidden="true" className="text-white/30">&middot;</span>{' '}
            <span className="text-[#aeb6c3]">{portfolioData.location}</span>
          </p>

          <p className="muted mt-3 max-w-sm text-xs leading-relaxed">
            Engineering scalable web backends with Laravel, modern frontend interfaces with Next.js &amp; React, and applied AI integrations.
          </p>

          {/* Social Links (GitHub, LinkedIn, Email, WhatsApp) */}
          <div className="mt-6 flex items-center gap-2.5">
            <a
              href={portfolioData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[#aeb6c3] transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              <FaGithub size={16} aria-hidden="true" />
            </a>

            <a
              href={portfolioData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[#aeb6c3] transition hover:border-[rgba(168,130,255,0.3)] hover:bg-[rgba(168,130,255,0.06)] hover:text-[#c4b5fd]"
            >
              <FaLinkedinIn size={16} aria-hidden="true" />
            </a>

            <a
              href={`mailto:${portfolioData.email}`}
              aria-label="Send Email"
              className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[#aeb6c3] transition hover:border-[rgba(43,217,181,0.3)] hover:bg-[rgba(43,217,181,0.06)] hover:text-[#69e6cd]"
            >
              <Mail size={16} aria-hidden="true" />
            </a>

            <a
              href={portfolioData.socialLinks.find((s) => s.icon === 'whatsapp')?.href ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Chat"
              className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-[#aeb6c3] transition hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] hover:text-emerald-400"
            >
              <FaWhatsapp size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 2. Navigation Sections */}
        {navSections.map((group) => (
          <div key={group.heading}>
            <p className="eyebrow text-xs uppercase tracking-wider text-[#747b8b] mb-4">
              {group.heading}
            </p>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-[#8e95a5] transition hover:text-[#f2f3f7]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 3. Availability CTA Card */}
        <div className="rounded-2xl border border-white/10 bg-[rgba(15,18,25,0.7)] p-5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="eyebrow text-emerald-400 text-[10px]">Open to Work</p>
          </div>

          <p className="muted mt-2 text-xs leading-relaxed">
            Available for full-time backend &amp; full-stack roles, remote teams, and projects.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#contact"
              className="button primary min-h-9 justify-center rounded-xl text-xs font-semibold"
            >
              Get in Touch
            </a>
            <a
              href={portfolioData.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="button secondary min-h-9 justify-center rounded-xl text-xs font-semibold"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* 4. Bottom Copyright & Technology Credit Bar */}
      <div className="shell mt-12 border-t border-white/[0.08] pt-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          {/* Copyright */}
          <p className="text-xs text-[#747b8b]">
            &copy; 2026 Md. Nazmus Shakib. All rights reserved.
          </p>

          {/* Technology Credit */}
          <p className="text-xs text-[#8e95a5]">
            Built with{' '}
            <span className="text-[#f2f3f7] font-medium">Next.js</span> +{' '}
            <span className="text-[#38bdf8] font-medium">Tailwind CSS</span>
          </p>

          {/* Back to Top */}
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#aeb6c3] transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}
