'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

const PARTICLES = [
  { top: '15%', left: '18%', size: 3, delay: '0s', duration: '3.2s', color: 'bg-[#2bd9b5]', shadow: 'shadow-[0_0_8px_#2bd9b5]' },
  { top: '22%', left: '78%', size: 2.5, delay: '0.4s', duration: '3.6s', color: 'bg-[#aa96ff]', shadow: 'shadow-[0_0_8px_#aa96ff]' },
  { top: '35%', left: '12%', size: 2, delay: '0.8s', duration: '4.0s', color: 'bg-[#69e6cd]', shadow: 'shadow-[0_0_6px_#69e6cd]' },
  { top: '28%', left: '85%', size: 3.5, delay: '0.2s', duration: '3.0s', color: 'bg-[#8b72ff]', shadow: 'shadow-[0_0_10px_#8b72ff]' },
  { top: '48%', left: '22%', size: 2, delay: '1.1s', duration: '3.8s', color: 'bg-[#2bd9b5]', shadow: 'shadow-[0_0_6px_#2bd9b5]' },
  { top: '62%', left: '80%', size: 3, delay: '0.6s', duration: '3.4s', color: 'bg-[#aa96ff]', shadow: 'shadow-[0_0_8px_#aa96ff]' },
  { top: '75%', left: '16%', size: 2.5, delay: '0.9s', duration: '3.7s', color: 'bg-[#69e6cd]', shadow: 'shadow-[0_0_8px_#69e6cd]' },
  { top: '82%', left: '72%', size: 2, delay: '0.3s', duration: '4.2s', color: 'bg-[#8b72ff]', shadow: 'shadow-[0_0_6px_#8b72ff]' },
  { top: '18%', left: '48%', size: 2.5, delay: '0.7s', duration: '3.5s', color: 'bg-[#2bd9b5]', shadow: 'shadow-[0_0_8px_#2bd9b5]' },
  { top: '85%', left: '42%', size: 3, delay: '0.5s', duration: '3.9s', color: 'bg-[#aa96ff]', shadow: 'shadow-[0_0_8px_#aa96ff]' },
  { top: '55%', left: '90%', size: 2, delay: '1.3s', duration: '3.3s', color: 'bg-[#69e6cd]', shadow: 'shadow-[0_0_6px_#69e6cd]' },
  { top: '68%', left: '8%', size: 2.5, delay: '0.1s', duration: '4.1s', color: 'bg-[#8b72ff]', shadow: 'shadow-[0_0_8px_#8b72ff]' },
]

export function IntroLoader() {
  const [show, setShow] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!reducedMotion) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 2100)

      return () => clearTimeout(timer)
    }
  }, [reducedMotion])

  // Keyboard escape listener to skip
  useEffect(() => {
    if (!show) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShow(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[200] flex cursor-pointer select-none items-center justify-center overflow-hidden bg-[#05070b]"
          aria-hidden="true"
          title="Click or press Escape to skip"
        >
          {/* Subtle Multi-Point Neon Glow Atmospheres */}
          <div className="pointer-events-none absolute -top-28 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,217,181,0.14)_0%,transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,114,255,0.14)_0%,transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,18,25,0)_0%,#05070b_85%)]" />

          {/* Ambient Floating Dust Particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className={`absolute rounded-full ${p.color} ${p.shadow}`}
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animation: `intro-particle ${p.duration} ease-in-out infinite alternate`,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Intro Content Container */}
          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
            {/* 1. WELCOME Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.06)] px-4 py-1.5 shadow-[0_0_20px_rgba(43,217,181,0.15)] backdrop-blur-md"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-[#2bd9b5] shadow-[0_0_8px_#2bd9b5]" />
              <span className="font-mono text-[10px] font-semibold tracking-[0.38em] text-[#69e6cd] uppercase sm:text-xs">
                WELCOME
              </span>
            </motion.div>

            {/* 2. Main Name - Apple/Vercel Minimal Luxury Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="display mt-6 bg-gradient-to-b from-white via-[#f0f3f8] to-[#929cb0] bg-clip-text text-[clamp(2.5rem,6.5vw,4.6rem)] font-bold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]"
            >
              Md. Nazmus Shakib
            </motion.h1>

            {/* 3. Luminous Accent Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', maxWidth: '240px', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="my-5 h-[1.5px] bg-gradient-to-r from-transparent via-[#2bd9b5] via-[#aa96ff] to-transparent shadow-[0_0_14px_rgba(43,217,181,0.6)]"
            />

            {/* 4. Subtitle: AI × FULL STACK DEVELOPER */}
            <motion.div
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1.5"
            >
              <p className="text-sm font-semibold tracking-[0.24em] text-white/90 uppercase sm:text-base">
                <span className="text-[#2bd9b5] drop-shadow-[0_0_12px_rgba(43,217,181,0.5)]">AI</span>{' '}
                <span className="font-light text-[#aa96ff]">×</span>{' '}
                <span className="text-[#f2f3f7]">FULL STACK</span>
              </p>
              <p className="font-mono text-[10px] font-medium tracking-[0.38em] text-[#7f8b98] uppercase sm:text-xs">
                DEVELOPER
              </p>
            </motion.div>
          </div>

          {/* 5. Minimal Progress Timeline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.05, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#2bd9b5] via-[#7c5cff] to-[#69e6cd] opacity-50 shadow-[0_0_10px_rgba(43,217,181,0.5)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}



