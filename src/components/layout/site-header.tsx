'use client'

import { useEffect,useRef,useState } from 'react'
import { Menu,X } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

export function SiteHeader(){
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  const [activeSection,setActiveSection]=useState('hero')
  const menuButton=useRef<HTMLButtonElement>(null)
  const mobileNav=useRef<HTMLElement>(null)

  useEffect(()=>{
    const onScroll=()=>setScrolled(scrollY>24)
    onScroll()
    addEventListener('scroll',onScroll,{passive:true})
    return()=>removeEventListener('scroll',onScroll)
  },[])

  useEffect(()=>{
    const sections=['hero',...portfolioData.navLinks.map(link=>link.href.slice(1))]
      .map(id=>document.getElementById(id))
      .filter((section):section is HTMLElement=>Boolean(section))
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
      if(visible)setActiveSection(visible.target.id)
    },{rootMargin:'-22% 0px -62% 0px',threshold:[0,.15,.35,.6]})
    sections.forEach(section=>observer.observe(section))
    return()=>observer.disconnect()
  },[])

  useEffect(()=>{
    document.body.style.overflow=open?'hidden':''
    if(open)requestAnimationFrame(()=>mobileNav.current?.querySelector<HTMLElement>('a')?.focus())

    const key=(event:KeyboardEvent)=>{
      if(!open)return
      if(event.key==='Escape'){
        setOpen(false)
        requestAnimationFrame(()=>menuButton.current?.focus())
        return
      }
      if(event.key!=='Tab')return
      const focusable=[...(mobileNav.current?.querySelectorAll<HTMLElement>('a,button')??[])]
      if(!focusable.length)return
      const first=focusable[0]
      const last=focusable[focusable.length-1]
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }

    addEventListener('keydown',key)
    return()=>{
      document.body.style.overflow=''
      removeEventListener('keydown',key)
    }
  },[open])

  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition ${scrolled||open?'border-white/10 bg-[#05070be8] backdrop-blur-xl':'border-transparent'}`}>
    <div className="shell flex h-20 items-center justify-between">
      <a href="#hero" className="display text-xl font-bold" aria-label="Home">MS<span className="text-[#2bd9b5]">.</span></a>
      <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
        {portfolioData.navLinks.map(link=>{
          const active=activeSection===link.href.slice(1)
          return <a key={link.href} aria-current={active?'location':undefined} className={`text-xs uppercase tracking-[.14em] transition ${active?'text-[#69e6cd]':'text-[#9aa6b7] hover:text-white'}`} href={link.href}>{link.label}</a>
        })}
      </nav>
      <div className="hidden items-center gap-4 xl:flex">
        <span className="flex items-center gap-2 text-xs text-[#9aa6b7]"><i aria-hidden="true" className="size-2 rounded-full bg-[#2bd9b5]"/>{portfolioData.availability}</span>
        <a className="button" href={portfolioData.resumeHref} target="_blank" rel="noopener noreferrer">View resume</a>
      </div>
      <button ref={menuButton} className="grid size-11 place-items-center xl:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav ref={mobileNav} id="mobile-nav" className="shell flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-6 pb-20" aria-label="Mobile">
      {portfolioData.navLinks.map((link,index)=>{
        const active=activeSection===link.href.slice(1)
        return <a key={link.href} onClick={()=>setOpen(false)} href={link.href} aria-current={active?'location':undefined} className={`display border-b pb-4 text-4xl ${active?'border-[#2bd9b5] text-[#69e6cd]':'border-white/10'}`}><span className="mr-4 text-sm text-[#2bd9b5]">0{index+1}</span>{link.label}</a>
      })}
      <a className="button primary mt-4" href={portfolioData.resumeHref} target="_blank" rel="noopener noreferrer">View resume</a>
    </nav>}
  </header>
}


