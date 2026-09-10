'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function NavigationTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 1. Mark session as active so intro is never shown on internal navigation
    try {
      if (pathname !== '/') {
        sessionStorage.setItem('portfolio_intro_seen', '1')
      }
    } catch {
      // Storage access exception handling
    }

    // 2. Track internal navigation depth and history
    try {
      const currentDepth = parseInt(sessionStorage.getItem('portfolio_nav_depth') || '0', 10)
      sessionStorage.setItem('portfolio_nav_depth', (currentDepth + 1).toString())
      sessionStorage.setItem('portfolio_last_path', pathname)
    } catch {
      // Storage access exception handling
    }

    // 3. Save scroll position on scroll per path
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        try {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString())
          }
        } catch {
          // Storage access exception handling
        }
      }, 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
