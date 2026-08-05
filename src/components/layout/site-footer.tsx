import { ArrowUp } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

export function SiteFooter(){
  return <footer className="border-t border-white/10 py-10">
    <div className="shell grid gap-8 md:grid-cols-3 md:items-end">
      <div>
        <p className="display text-2xl font-bold">{portfolioData.name}</p>
        <p className="muted mt-2 text-sm">{portfolioData.primaryRole} <span aria-hidden="true">&middot;</span> {portfolioData.location}</p>
      </div>
      <div className="flex flex-wrap gap-4 md:justify-center">
        {portfolioData.socialLinks.map(link=><a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-[#9aa6b7] hover:text-white">{link.label}</a>)}
      </div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between md:justify-end">
        <p className="muted max-w-[22rem] text-xs">&copy; {new Date().getFullYear()} <span aria-hidden="true">&middot;</span> Designed &amp; developed by Md. Nazmus Shakib</p>
        <a href="#hero" className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 transition hover:border-[#2bd9b5]" aria-label="Back to top"><ArrowUp size={17}/></a>
      </div>
    </div>
  </footer>
}
