'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-24 right-6 sm:bottom-24 sm:right-7 z-30 grid size-10 place-items-center rounded-full border border-white/15 bg-[#0b0e15]/90 text-[#aeb6c3] shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(43,217,181,0.5)] hover:bg-white/[0.08] hover:text-[#2bd9b5] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#2bd9b5]"
    >
      <ArrowUp size={16} />
    </button>
  )
}
