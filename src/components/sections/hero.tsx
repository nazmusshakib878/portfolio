import { ArrowDown, ArrowUpRight, Download, MapPin, Sparkles } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'
import { CopyEmailButton } from '@/components/ui/copy-email-button'
import { HeroVisual } from './hero-visual'

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-20">
      <div
        aria-hidden
        className="display pointer-events-none absolute left-1/2 top-[52%] hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(7rem,14vw,14rem)] font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.025)] lg:block"
      >
        FULL STACK
      </div>

      <div className="shell relative z-10 grid items-center gap-9 py-10 sm:py-14 md:gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:py-16 xl:gap-16">
        <div className="relative z-20">
          <p className="eyebrow flex items-center gap-2.5 leading-5 sm:gap-3">
            <span className="h-px w-6 shrink-0 bg-[#2bd9b5] sm:w-9" />
            Laravel · Next.js · AI Integration
          </p>

          <h1 className="display mt-5 max-w-[650px] text-[clamp(2.75rem,13vw,4.9rem)] font-semibold text-[#f2f3f7]">
            Md. Nazmus<br />
            <span className="text-[#9aa6b7]">Shakib.</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,114,255,.3)] bg-[rgba(139,114,255,.1)] px-3.5 py-1 text-sm font-semibold text-[#c4b8ff]">
              <span className="size-2 rounded-full bg-[#aa96ff]" />
              {portfolioData.primaryRole}
            </div>
            <Sparkles aria-hidden="true" size={15} className="text-[#9f85ff]" />
            <p className="muted flex items-center gap-2 text-sm">
              <MapPin aria-hidden="true" size={15} />
              {portfolioData.location}
            </p>
          </div>

          <p className="muted mt-5 max-w-[560px] text-[15px] leading-7 sm:text-base">
            {portfolioData.heroDescription}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {portfolioData.heroBadges.map((badge) => {
              const isBackend = badge.label === 'Laravel' || badge.label === 'MySQL'
              const isFrontend = badge.label === 'Next.js' || badge.label === 'React'
              const isAI = badge.label === 'AI Integration'
              return (
                <span
                  key={badge.label}
                  className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-medium transition ${
                    isBackend
                      ? 'border-[rgba(240,83,64,.3)] bg-[rgba(240,83,64,.07)] text-[#ff9c90] hover:border-[rgba(240,83,64,.55)] hover:text-white'
                      : isFrontend
                        ? 'border-[rgba(97,218,251,.3)] bg-[rgba(97,218,251,.07)] text-[#8be9fd] hover:border-[rgba(97,218,251,.55)] hover:text-white'
                        : isAI
                          ? 'border-[rgba(170,150,255,.35)] bg-[rgba(170,150,255,.08)] text-[#c4b8ff] hover:border-[rgba(170,150,255,.6)] hover:text-white'
                          : 'border-white/10 bg-white/[.025] text-[#c4cad4] hover:border-[#2bd9b5]/40 hover:text-white'
                  }`}
                >
                  {badge.label}
                </span>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <a className="button primary min-h-11" href="#projects">
                View projects <ArrowDown size={15} />
              </a>
              <a
                className="button min-h-11"
                href={portfolioData.resumeHref}
                download
              >
                Download resume <Download size={15} />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <CopyEmailButton variant="badge" />
              <a className="contact-link" href="#contact">
                Contact me <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-5 lg:hidden">
            {portfolioData.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[.14em] text-[#aeb6c3] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[clamp(300px,95vw,410px)] w-full max-w-[450px] lg:h-[500px] lg:max-w-[460px]">
          <HeroVisual />
          <div className="absolute bottom-0 left-0 max-w-[calc(100%-1.5rem)] rounded-tr-2xl border border-white/10 bg-[#090d15]/90 p-3.5 backdrop-blur-md sm:max-w-none sm:p-4">
            <p className="eyebrow">Status</p>
            <p className="mt-2 flex items-center gap-2 text-xs sm:text-sm">
              <span className="size-2 rounded-full bg-[#2bd9b5]" />
              {portfolioData.availability}
            </p>
          </div>
          <div className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] rounded-xl border border-white/10 bg-[#090d15]/72 px-3 py-2 text-right backdrop-blur-sm sm:max-w-none">
            <p className="text-[10px] uppercase tracking-[.12em] text-[#aeb6c3]">Core stack</p>
            <p className="mt-1 text-xs leading-5 sm:text-sm">
              Laravel <span aria-hidden="true">&middot;</span> MySQL <span aria-hidden="true">&middot;</span> Next.js <span aria-hidden="true">&middot;</span> AI
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}





