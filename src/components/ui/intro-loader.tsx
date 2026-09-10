'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export function IntroLoader() {
  const [show, setShow] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // 1. Skip completely if reduced motion is requested
    if (reducedMotion) return

    // 2. Show only once per browser session (skip on internal navigation / reload)
    try {
      if (sessionStorage.getItem('portfolio_intro_seen')) {
        return
      }
      sessionStorage.setItem('portfolio_intro_seen', '1')
    } catch {
      // Graceful fallback for strict environments
    }

    setShow(true)

    // 3. Fast duration: ~950ms before initiating clean 250ms opacity fade-out (~1.2s total)
    const timer = setTimeout(() => {
      setShow(false)
    }, 950)

    return () => clearTimeout(timer)
  }, [reducedMotion])

  // Instant dismiss on any user interaction (Click, Escape, Touch, Scroll)
  useEffect(() => {
    if (!show) return

    const dismiss = () => setShow(false)

    window.addEventListener('keydown', dismiss, { passive: true })
    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('touchstart', dismiss, { passive: true })

    return () => {
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('touchstart', dismiss)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="portfolio-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[200] flex cursor-pointer select-none items-center justify-center bg-[#05070b] will-change-opacity"
          aria-hidden="true"
        >
          {/* Subtle Ambient Radial Lighting (clean hardware-accelerated CSS gradient, 0 blur filters) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(43,217,181,0.06)_0%,rgba(124,92,255,0.035)_45%,transparent_70%)]" />

          {/* Intro Content Hierarchy */}
          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
            {/* 1. WELCOME */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.06)] px-3.5 py-1"
            >
              <span className="size-1.5 rounded-full bg-[#2bd9b5]" />
              <span className="font-mono text-[10px] font-semibold tracking-[0.32em] text-[#69e6cd] uppercase sm:text-xs">
                WELCOME
              </span>
            </motion.div>

            {/* 2. Main Name (Primary Visual Focus) */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.08, ease: 'easeOut' }}
              className="display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] font-bold tracking-tight text-white sm:mt-6"
            >
              Md. Nazmus Shakib
            </motion.h1>

            {/* 3. Primary Role */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.16, ease: 'easeOut' }}
              className="mt-3 text-sm font-semibold tracking-[0.14em] text-[#d9dee7] uppercase sm:text-base"
            >
              <span className="text-[#2bd9b5]">Laravel</span>
              <span className="mx-1.5 text-white/40">&amp;</span>
              <span className="text-white">Next.js</span>
              <span className="mx-2 text-[#aa96ff]">·</span>
              <span className="text-[#f2f3f7]">Full Stack Developer</span>
            </motion.p>

            {/* Subtle Divider Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.22, ease: 'easeOut' }}
              className="my-4 h-[1px] w-24 origin-center bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            {/* 4. Small Supporting Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.26, ease: 'easeOut' }}
              className="font-mono text-[11px] font-medium tracking-[0.28em] text-[#7f8b98] uppercase sm:text-xs"
            >
              Building Reliable Systems
            </motion.p>
          </div>

          {/* Minimal Bottom Progress Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.95, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#2bd9b5] via-[#7c5cff] to-[#2bd9b5] opacity-50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
