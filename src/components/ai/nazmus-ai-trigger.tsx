'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'

interface TriggerProps {
  isOpen: boolean
  onClick: () => void
}

/**
 * Unified Shakib AI Logo (S + Sparkle Starburst)
 * Mathematically anchored in SVG viewBox so proportions and spacing stay 100% consistent across all sizes.
 */
export function ShakibOrbLogo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Triple Gradient for S */}
        <linearGradient id="shakib-s-grad-unified" x1="4" y1="4" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="48%" stopColor="#7b5cff" />
          <stop offset="100%" stopColor="#ff4fd8" />
        </linearGradient>

        {/* Soft Bloom Filter */}
        <filter id="shakib-glow-unified" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* S Letter */}
      <text
        x="15.5"
        y="25.5"
        textAnchor="middle"
        fill="url(#shakib-s-grad-unified)"
        fontSize="22"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        filter="url(#shakib-glow-unified)"
      >
        S
      </text>

      {/* Radiant 4-Point AI Sparkle Starburst precisely spaced at top-right of S */}
      <g transform="translate(25.5, 9.5)">
        <circle cx="0" cy="0" r="2.5" fill="#00eaff" opacity="0.6" filter="url(#shakib-glow-unified)" />
        <path
          d="M0 -4.2C0.15 -1.6 1.6 -0.15 4.2 0C1.6 0.15 0.15 1.6 0 4.2C-0.15 1.6 -1.6 0.15 -4.2 0C-1.6 -0.15 -0.15 -1.6 0 -4.2Z"
          fill="#ffffff"
        />
        <circle cx="0" cy="0" r="1.1" fill="#00f5ff" />
      </g>
    </svg>
  )
}

export function NazmusAiTrigger({ isOpen, onClick }: TriggerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="shakib-ai-button">
      {/* Floating Hover Tooltip (Shown on Hover) */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.92 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="pointer-events-none absolute right-[74px] top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2.5 rounded-full border border-[rgba(80,180,255,0.4)] bg-[#0a0f1e]/95 px-3.5 py-1.5 shadow-[0_0_25px_rgba(0,234,255,0.3)] backdrop-blur-xl whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wide text-white">Shakib AI</span>
              <span className="size-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]" />
              <span className="text-[11px] font-medium text-[#9aa6b7]">Portfolio Assistant</span>
            </div>
            <kbd className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-mono font-semibold text-[#00f5ff]">
              Ctrl+J
            </kbd>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AI Orb Button */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="ai-orb focus-visible:outline-2 focus-visible:outline-[#00f5ff]"
        aria-label={isOpen ? 'Close Shakib AI' : 'Open Shakib AI (Ctrl+J)'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={22} className="text-white transition hover:scale-110" />
        ) : (
          <>
            <ShakibOrbLogo className="size-10" />
            <span className="online-dot" />
          </>
        )}
      </button>
    </div>
  )
}
