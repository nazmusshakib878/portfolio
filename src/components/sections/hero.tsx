import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { portfolioData } from '@/data/portfolio'
import { CopyEmailButton } from '@/components/ui/copy-email-button'
import { HeroVisual } from './hero-visual'

export function Hero() {
  const coreStack = [
    {
      label: 'Laravel',
      badgeClass:
        'border-[rgba(240,83,64,0.28)] bg-[rgba(240,83,64,0.06)] text-[#ff9c90] hover:border-[rgba(240,83,64,0.5)]',
      dotClass: 'bg-[#f05340]',
    },
    {
      label: 'Next.js',
      badgeClass:
        'border-white/15 bg-white/[0.04] text-[#e2e8f0] hover:border-white/30',
      dotClass: 'bg-white',
    },
    {
      label: 'React',
      badgeClass:
        'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.06)] text-[#7dd3fc] hover:border-[rgba(97,218,251,0.45)]',
      dotClass: 'bg-[#61dafb]',
    },
    {
      label: 'AI Integration',
      badgeClass:
        'border-[rgba(168,130,255,0.28)] bg-[rgba(168,130,255,0.07)] text-[#c4b5fd] hover:border-[rgba(168,130,255,0.5)]',
      dotClass: 'bg-[#a78bfa]',
    },
  ]

  return (
    <section id="hero" className="relative overflow-hidden pt-20">
      {/* Background Watermark */}
      <div
        aria-hidden
        className="display pointer-events-none absolute left-1/2 top-[52%] hidden -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(7rem,14vw,14rem)] font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.02)] lg:block"
      >
        FULL STACK
      </div>

      <div className="shell relative z-10 grid items-center gap-10 py-10 sm:py-14 md:gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:py-16 xl:gap-16">
        {/* Left Column: Core Positioning & Identity */}
        <div className="relative z-20">
          {/* Top Status Pill & Location */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              <span>Available for Full-Time &amp; Freelance Roles</span>
            </div>

            <span className="muted inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-xs text-[#9aa6b7]">
              <MapPin aria-hidden="true" size={12} className="text-[#2bd9b5]" />
              {portfolioData.location}
            </span>
          </div>

          {/* Specialization Eyebrow */}
          <p className="eyebrow mt-6 flex items-center gap-2.5 leading-5 sm:gap-3">
            <span className="h-px w-5 shrink-0 bg-[#2bd9b5] sm:w-8" />
            Laravel Backend &middot; Modern Frontend &middot; AI Integration
          </p>

          {/* Name Display */}
          <h1 className="display mt-3.5 max-w-[650px] text-[clamp(2.75rem,10vw,4.5rem)] font-semibold leading-[1.03] text-[#f2f3f7]">
            Md. Nazmus <span className="text-[#9aa6b7]">Shakib</span>
          </h1>

          {/* Role Headline */}
          <h2 className="mt-3.5 max-w-[600px] text-lg font-medium leading-snug text-[#c4b8ff] sm:text-xl md:text-[22px]">
            Full Stack Developer{' '}
            <span className="block text-sm font-normal leading-relaxed text-[#94a3b8] sm:inline sm:text-base md:text-lg">
              &mdash; building scalable web applications with Laravel, Next.js &amp; AI.
            </span>
          </h2>

          {/* Focused Value Proposition */}
          <p className="muted mt-4 max-w-[560px] text-[15px] leading-relaxed sm:text-base">
            Specialized in designing dependable Laravel backend architectures and database systems, paired with responsive Next.js &amp; React interfaces and practical AI integrations.
          </p>

          {/* Simplified 4 Strongest Identity Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-[#747b8b]">
              Core Stack:
            </span>
            {coreStack.map((item) => (
              <span
                key={item.label}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition duration-200 hover:-translate-y-0.5 ${item.badgeClass}`}
              >
                <span className={`size-1.5 rounded-full ${item.dotClass}`} />
                {item.label}
              </span>
            ))}
          </div>

          {/* Refined CTA Hierarchy */}
          <div className="mt-8 flex flex-col gap-3.5">
            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="button primary min-h-11 rounded-xl px-5 text-xs font-semibold shadow-[0_8px_24px_rgba(91,67,207,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(91,67,207,0.32)] active:translate-y-0"
                href="#projects"
              >
                View Projects <ArrowDown size={14} />
              </a>
              <a
                className="button min-h-11 rounded-xl border-white/15 bg-white/[0.03] px-5 text-xs font-semibold text-[#f2f3f7] transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] active:translate-y-0"
                href={portfolioData.resumeHref}
                download="Md_Nazmus_Shakib_Resume.pdf"
              >
                Download Resume <Download size={14} />
              </a>
            </div>

            {/* Quick Supporting Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <CopyEmailButton variant="badge" />

              {portfolioData.githubUrl && (
                <a
                  href={portfolioData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-[#d9dee7] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(124,92,255,0.4)] hover:bg-white/[0.05] active:translate-y-0"
                >
                  <FaGithub size={14} className="text-[#aa96ff] transition group-hover:scale-110" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}

              {portfolioData.linkedinUrl && (
                <a
                  href={portfolioData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-[#d9dee7] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(10,102,194,0.5)] hover:bg-white/[0.05] active:translate-y-0"
                >
                  <FaLinkedinIn size={14} className="text-[#0a66c2] transition group-hover:scale-110" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}

              <a className="contact-link ml-1" href="#contact">
                Contact Me <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Presentation */}
        <div className="relative mx-auto h-[clamp(320px,95vw,440px)] w-full max-w-[450px] lg:h-[500px] lg:max-w-[460px]">
          <HeroVisual />

          {/* Floating Status / Core Stack Badge */}
          <div className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] rounded-xl border border-white/10 bg-[#090d15]/80 px-3.5 py-2.5 text-right backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] sm:max-w-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#aeb6c3]">Core Stack</p>
            <p className="mt-1 flex items-center justify-end gap-1.5 text-xs font-medium text-[#f2f3f7] sm:text-sm">
              <span className="text-[#ff9c90]">Laravel</span>
              <span className="text-white/25">&middot;</span>
              <span className="text-white">Next.js</span>
              <span className="text-white/25">&middot;</span>
              <span className="text-[#7dd3fc]">React</span>
              <span className="text-white/25">&middot;</span>
              <span className="text-[#c4b5fd]">AI</span>
            </p>
          </div>

          <div className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-xl border border-white/10 bg-[#090d15]/85 px-3.5 py-2.5 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] sm:max-w-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2bd9b5]">Engineering Focus</p>
            <p className="mt-1 text-xs font-medium text-[#f2f3f7] sm:text-sm">
              Backend Systems &middot; Full Stack
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
