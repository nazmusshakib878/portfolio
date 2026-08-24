'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'

interface TriggerProps {
  isOpen: boolean
  onClick: () => void
}

/**
 * 4-Point Radiant AI Starburst Sparkle
 */
export function AiSparkleIcon({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id="sparkle-aura" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Soft outer glow */}
      <circle cx="12" cy="12" r="3.5" fill="#00eaff" opacity="0.5" filter="url(#sparkle-aura)" />
      {/* Precision 4-pointed diamond star */}
      <path
        d="M12 2C12.3 7 17 11.7 22 12C17 12.3 12.3 17 12 22C11.7 17 7 12.3 2 12C7 11.7 11.7 7 12 2Z"
        fill="#ffffff"
        filter="url(#sparkle-aura)"
      />
      <circle cx="12" cy="12" r="1.4" fill="#00f5ff" />
    </svg>
  )
}

export function ShakibOrbLogo({ className = 'size-9' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <span className="s-logo text-[22px] font-extrabold leading-none pr-1">S</span>
      <span className="sparkle">
        <AiSparkleIcon className="size-3 text-white" />
      </span>
    </div>
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
            <div className="s-logo pr-1">S</div>
            <div className="sparkle">
              <AiSparkleIcon className="size-3.5 drop-shadow-[0_0_6px_#00eaff]" />
            </div>
            <span className="online-dot" />
          </>
        )}
      </button>
    </div>
  )
}
