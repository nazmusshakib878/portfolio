import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { portfolioData } from '@/data/portfolio'

const icons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
}

export function SocialRail() {
  // Only render links that have a real non-empty href
  const activeLinks = portfolioData.socialLinks.filter(
    (link) => link.href && link.href.startsWith('http')
  )

  return (
    <aside
      aria-label="Social profiles"
      className="fixed bottom-0 left-0 top-20 z-40 hidden w-16 flex-col items-center border-r border-white/10 bg-[#07070b]/72 backdrop-blur-xl lg:flex"
    >
      <div className="mt-auto flex flex-col items-center gap-1 pb-7">
        {activeLinks.map((link) => {
          const Icon = icons[link.icon as keyof typeof icons] ?? FaGithub
          return (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group relative grid size-11 place-items-center text-[#aeb6c3] transition hover:bg-white/[.055] hover:text-white focus-visible:text-white"
            >
              <Icon aria-hidden="true" focusable="false" size={19} />
              <span className="pointer-events-none absolute left-[52px] whitespace-nowrap border border-white/10 bg-[#0b0b10] px-3 py-2 text-[10px] uppercase tracking-[.18em] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {link.label}
              </span>
            </a>
          )
        })}
        <span className="mt-4 h-12 w-px bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </aside>
  )
}
