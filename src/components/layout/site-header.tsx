'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { MonogramLogo } from '@/components/ui/monogram-logo'
import { portfolioData } from '@/data/portfolio'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const menuButton = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = portfolioData.navLinks.map((link) => link.href.slice(1))
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((prev, curr) =>
            Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
          )
          setActiveSection(topMost.target.id)
        }
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: [0, 0.25, 0.5],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activateLink = (href: string) => {
    setActiveSection(href.slice(1))
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) requestAnimationFrame(() => mobileNav.current?.querySelector<HTMLElement>('a')?.focus())
    const key = (event: KeyboardEvent) => {
      if (!open) return
      if (event.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => menuButton.current?.focus())
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...(mobileNav.current?.querySelectorAll<HTMLElement>('a,button') ?? [])]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', key)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', key)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-4 sm:pt-3">
      <div className={`site-header-frame shell ${scrolled || open ? 'is-elevated' : ''}`}>
        {/* Logo / Monogram */}
        <a
          href="#hero"
          className="site-logo group flex items-center shrink-0"
          aria-label="Md. Nazmus Shakib — Home"
        >
          <MonogramLogo />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {portfolioData.navLinks.map((link) => {
            const active = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                onClick={() => activateLink(link.href)}
                aria-current={active ? 'location' : undefined}
                data-active={active || undefined}
                className="nav-link whitespace-nowrap"
                href={link.href}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Right side CTA / Availability */}
        <div className="hidden items-center gap-2.5 xl:flex shrink-0">
          <span className="availability-badge whitespace-nowrap">
            <i aria-hidden="true" />
            {portfolioData.availability}
          </span>
          <a
            className="inline-flex h-8 items-center justify-center rounded-full border border-white/15 bg-white/[.04] px-3.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/[.08] active:scale-95 whitespace-nowrap"
            href={portfolioData.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            View resume
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          ref={menuButton}
          className="header-menu-button xl:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile menu overlay panel */}
      {open && (
        <nav
          ref={mobileNav}
          id="mobile-nav"
          className="site-mobile-panel shell flex min-h-[calc(100dvh-5.5rem)] flex-col justify-between overflow-y-auto"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1 py-2">
            {portfolioData.navLinks.map((link, index) => {
              const active = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  onClick={() => activateLink(link.href)}
                  href={link.href}
                  aria-current={active ? 'location' : undefined}
                  data-active={active || undefined}
                  className="nav-link-mobile"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-medium text-[#2bd9b5]">0{index + 1}</span>
                </a>
              )
            })}
          </div>

          <div className="border-t border-white/10 pt-4 pb-3 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 text-xs">
              <span className="text-[#747b8b] font-medium">Status</span>
              <span className="availability-badge">
                <i aria-hidden="true" />
                {portfolioData.availability}
              </span>
            </div>
            <a
              className="button primary w-full justify-center"
              href={portfolioData.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}