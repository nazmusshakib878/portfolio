'use client'

import { useState, useId } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

interface TriggerProps {
  isOpen: boolean
  onClick: () => void
}

/**
 * World-class Modern AI Sparkle Icon — Google Gemini / Apple Intelligence inspired.
 * Multi-star cluster with smooth curved arcs, radiant gradient fills, and luminous core.
 * Uses useId() so every instance (trigger, header, avatar, tooltip) renders uniquely without SVG ID collisions.
 */
export function ShakibOrbLogo({ className = 'size-8' }: { className?: string }) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '')

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_10px_rgba(0,245,255,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Main star gradient: Cyan -> Sky -> Electric Violet -> Neon Magenta */}
        <linearGradient id={`ai-main-grad-${uid}`} x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="35%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        {/* Top-right companion sparkle: Violet -> Pink */}
        <linearGradient id={`ai-sparkle-top-${uid}`} x1="30" y1="4" x2="46" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>

        {/* Bottom-left micro sparkle: Bright Cyan -> Sky */}
        <linearGradient id={`ai-sparkle-bot-${uid}`} x1="4" y1="30" x2="16" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Center luminous flare */}
        <radialGradient id={`ai-flare-${uid}`} cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="35%" stopColor="#e0f7ff" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#00f5ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── 1. Primary 4-pointed Curved Starburst (Astroid / Hyperbolic curve) ── */}
      <path
        d="M24 3 C24 14.5 14.5 24 3 24 C14.5 24 24 33.5 24 45 C24 33.5 33.5 24 45 24 C33.5 24 24 14.5 24 3 Z"
        fill={`url(#ai-main-grad-${uid})`}
      />

      {/* Inner sheen highlight for 3D depth */}
      <path
        d="M24 7 C24 16 16 24 7 24 C16 24 24 32 24 41 C24 32 32 24 41 24 C32 24 24 16 24 7 Z"
        fill="white"
        opacity="0.18"
      />

      {/* ── 2. Top-Right Companion Sparkle ── */}
      <path
        d="M38 5 C38 9.5 34.5 13 30 13 C34.5 13 38 16.5 38 21 C38 16.5 41.5 13 46 13 C41.5 13 38 9.5 38 5 Z"
        fill={`url(#ai-sparkle-top-${uid})`}
      />

      {/* ── 3. Bottom-Left Micro Sparkle ── */}
      <path
        d="M10 31 C10 34.5 7.5 37 4 37 C7.5 37 10 39.5 10 43 C10 39.5 12.5 37 16 37 C12.5 37 10 34.5 10 31 Z"
        fill={`url(#ai-sparkle-bot-${uid})`}
      />

      {/* ── 4. Accent Sparkling Diamond Stars ── */}
      <path d="M11 11 L12.5 12.5 L11 14 L9.5 12.5 Z" fill="#00f5ff" opacity="0.75" />
      <path d="M37 36 L38.5 37.5 L37 39 L35.5 37.5 Z" fill="#ec4899" opacity="0.65" />

      {/* ── 5. Center Energy Core ── */}
      <circle cx="24" cy="24" r="6" fill={`url(#ai-flare-${uid})`} />
      <circle cx="24" cy="24" r="2.2" fill="#ffffff" />
    </svg>
  )
}

export function NazmusAiTrigger({ isOpen, onClick }: TriggerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // The dialog has its own close control in the header. Keeping a second
  // floating close button while it is open overlaps the composer on smaller
  // viewports and creates two competing dismissal actions.
  if (isOpen) return null

  return (
    <div className="shakib-ai-button">
      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 14, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute right-[100px] top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 rounded-2xl border border-[rgba(0,245,255,0.35)] bg-[#080c1a]/96 px-4 py-2 shadow-[0_0_30px_rgba(0,245,255,0.25),0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-2xl whitespace-nowrap z-50"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#8b5cf6]/20 border border-[rgba(0,245,255,0.3)]">
                <ShakibOrbLogo className="size-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-wide text-white leading-tight">Shakib AI</span>
                <span className="text-[9px] text-[#69e6cd] font-medium leading-tight">Portfolio Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
              <span className="size-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_6px_#00ff9d] animate-pulse" />
              <kbd className="rounded border border-white/10 bg-white/[0.07] px-1.5 py-0.5 text-[9px] font-mono font-semibold text-[#00f5ff]">
                Ctrl+J
              </kbd>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AI button */}
      <AnimatePresence mode="wait">
        <motion.button
          key="ai-robot-trigger"
          type="button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="ai-robot-trigger focus-visible:outline-2 focus-visible:outline-[#00f5ff] focus-visible:outline-offset-4"
          aria-label="Open Shakib AI Assistant (Ctrl+J)"
          aria-expanded={false}
        >
          <div className="ai-robot-visual relative">
            <Image
              src="/ai-robot-clean.png"
              alt="Shakib AI Assistant"
              width={257}
              height={327}
              priority
              className="ai-robot-img select-none pointer-events-none"
            />
            <Image
              src="/ai-robot-clean.png"
              alt=""
              aria-hidden="true"
              width={257}
              height={327}
              className="ai-robot-head select-none pointer-events-none"
            />
            <Image
              src="/ai-robot-clean.png"
              alt=""
              aria-hidden="true"
              width={257}
              height={327}
              className="ai-robot-arm select-none pointer-events-none"
            />
            <span className="ai-robot-wave-lines" aria-hidden="true" />
          </div>
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
