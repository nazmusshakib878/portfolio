import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { portfolioData } from '@/data/portfolio'

const socialIconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
}

export function SiteFooter() {
  const activeLinks = portfolioData.socialLinks.filter(
    (link) => link.href && link.href.startsWith('http')
  )

  const navGroups = [
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
      heading: 'More',
      links: [
        { label: 'Education', href: '#education' },
        { label: 'Process', href: '#process' },
        { label: 'Publications', href: '#publications' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ]

  return (
    <footer className="border-t border-white/10 pt-14 pb-10">
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="display text-2xl font-bold text-[#f2f3f7]">{portfolioData.name}</p>
          <p className="muted mt-2 text-sm leading-6">
            {portfolioData.primaryRole}{' '}
            <span aria-hidden="true">&middot;</span>{' '}
            {portfolioData.location}
          </p>
          <p className="muted mt-4 max-w-xs text-xs leading-6">
            Building reliable full-stack applications with Laravel, Next.js, and practical AI integrations.
          </p>
          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-3">
            {activeLinks.map((link) => {
              const Icon = socialIconMap[link.icon as keyof typeof socialIconMap] ?? FaGithub
              return (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[.025] text-[#aeb6c3] transition hover:border-[rgba(43,217,181,.3)] hover:bg-white/[.05] hover:text-white"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Nav groups */}
        {navGroups.map((group) => (
          <div key={group.heading}>
            <p className="eyebrow mb-5">{group.heading}</p>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="muted text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA */}
        <div>
          <p className="eyebrow mb-5">Open to work</p>
          <p className="muted mb-5 text-sm leading-6">Available for full-stack projects, internships, and collaborations.</p>
          <a href="#contact" className="button primary inline-flex">
            Get in touch
          </a>
          <a
            href={portfolioData.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="button mt-3 inline-flex w-full justify-center"
          >
            View resume
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shell mt-10 flex flex-col items-start gap-4 border-t border-white/[.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="muted text-xs">
          &copy; {new Date().getFullYear()}{' '}
          <span aria-hidden="true">&middot;</span> Designed &amp; developed by Md. Nazmus Shakib
        </p>
        <a
          href="#hero"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-[#aeb6c3] transition hover:border-[#2bd9b5] hover:text-white"
          aria-label="Back to top"
        >
          ↑
        </a>
      </div>
    </footer>
  )
}
