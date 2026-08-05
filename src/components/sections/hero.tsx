import { ArrowDown,ArrowUpRight,Download,MapPin,Sparkles } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'
import { HeroVisual } from './hero-visual'

export function Hero(){
  return <section id="hero" className="relative overflow-hidden pt-20">
    <div aria-hidden className="display pointer-events-none absolute left-1/2 top-[52%] hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(7rem,14vw,14rem)] font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.025)] lg:block">BACKEND</div>

    <div className="shell relative z-10 grid items-center gap-9 py-10 sm:py-14 md:gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:py-16 xl:gap-16">
      <div className="relative z-20">
        <p className="eyebrow flex items-center gap-2.5 leading-5 sm:gap-3"><span className="h-px w-6 shrink-0 bg-[#2bd9b5] sm:w-9"/>Reliable systems / thoughtful interfaces</p>
        <h1 className="display mt-5 max-w-[650px] text-[clamp(2.75rem,13vw,4.9rem)] font-semibold text-[#f2f3f7]">
          Md. Nazmus<br/><span className="text-[#9aa6b7]">Shakib.</span>
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-lg font-semibold sm:text-xl">{portfolioData.primaryRole}</p>
          <Sparkles aria-hidden="true" size={15} className="text-[#9f85ff]"/>
          <p className="muted flex items-center gap-2 text-sm"><MapPin aria-hidden="true" size={15}/>{portfolioData.location}</p>
        </div>
        <p className="muted mt-5 max-w-[560px] text-[15px] leading-7 sm:text-base">{portfolioData.heroDescription}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <a className="button primary col-span-2 sm:col-span-1" href="#projects">View projects <ArrowDown size={15}/></a>
          <a className="button col-span-2 min-[390px]:col-span-1" href={portfolioData.resumeHref} download>Download resume <Download size={15}/></a>
          <a className="contact-link justify-center min-[390px]:justify-start" href="#contact">Contact me <ArrowUpRight size={14}/></a>
        </div>
        <div className="mt-7 flex flex-wrap gap-5 lg:hidden">
          {portfolioData.socialLinks.map(link=><a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[.14em] text-[#aeb6c3] hover:text-white">{link.label}</a>)}
        </div>
      </div>

      <div className="relative mx-auto h-[clamp(300px,95vw,410px)] w-full max-w-[450px] lg:h-[500px] lg:max-w-[460px]">
        <HeroVisual/>
        <div className="absolute bottom-0 left-0 rounded-tr-2xl border border-white/10 bg-[#090d15]/90 p-3.5 backdrop-blur-md sm:p-4">
          <p className="eyebrow">Status</p>
          <p className="mt-2 flex items-center gap-2 text-xs sm:text-sm"><span className="size-2 rounded-full bg-[#2bd9b5]"/>{portfolioData.availability}</p>
        </div>
        <div className="absolute right-3 top-3 rounded-xl border border-white/10 bg-[#090d15]/72 px-3 py-2 text-right backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[.12em] text-[#aeb6c3]">Core stack</p>
          <p className="mt-1 text-xs sm:text-sm">Laravel <span aria-hidden="true">&middot;</span> PHP <span aria-hidden="true">&middot;</span> MySQL</p>
        </div>
      </div>
    </div>
  </section>
}






