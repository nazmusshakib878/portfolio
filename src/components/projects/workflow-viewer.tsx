'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Maximize2, X, ZoomIn, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface WorkflowViewerProps {
  src: string
  alt: string
  title: string
  subtitle?: string
  badge?: string
  route?: string
}

export function WorkflowViewer({
  src,
  alt,
  title,
  subtitle,
  badge = 'n8n Workflow',
  route = 'localhost:5678',
}: WorkflowViewerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#080b11] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#ea4b71]/40">
        {/* Editor Chrome Bar */}
        <div className="flex h-10 sm:h-11 items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-3 sm:px-4 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="size-2.5 sm:size-3 rounded-full bg-[#ff5f56]/80" />
            <span className="size-2.5 sm:size-3 rounded-full bg-[#ffbd2e]/80" />
            <span className="size-2.5 sm:size-3 rounded-full bg-[#27c93f]/80" />
          </div>
          <div className="flex max-w-[150px] xs:max-w-[220px] sm:max-w-md items-center justify-center truncate rounded-md border border-white/[0.08] bg-black/40 px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[10px] sm:text-[11px] text-[#747b8b]">
            <span className="truncate">{route}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-md border border-[rgba(234,75,113,0.35)] bg-[rgba(234,75,113,0.1)] px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-[#ff7597]">
              {badge}
            </span>
          </div>
        </div>

        {/* Screenshot Viewport with Click to Enlarge Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative block w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea4b71]"
          aria-label={`Click to enlarge ${title}`}
        >
          <div className="relative w-full overflow-hidden flex items-center justify-center bg-[#05070b]">
            <Image
              src={src}
              alt={alt}
              width={1024}
              height={576}
              unoptimized
              priority
              className="w-full h-auto max-w-full object-contain block select-none"
            />
          </div>

          {/* Hover Overlay Hint */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#080b12]/90 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <ZoomIn size={15} className="text-[#ff7597]" />
              <span>Click to Enlarge Full View</span>
              <Maximize2 size={13} className="text-[#aeb6c3]" />
            </span>
          </div>
        </button>

        {/* Caption bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-white/[0.02] p-4 text-xs text-[#aeb6c3]">
          <div>
            <span className="font-semibold text-[#f2f3f7]">{title}</span>
            {subtitle && <span className="hidden sm:inline text-[#747b8b]"> &middot; {subtitle}</span>}
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ff7597] hover:text-[#ff9bb5] transition-colors"
          >
            <Maximize2 size={13} />
            <span>Expand Canvas</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 p-4 sm:p-6 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-6xl items-center justify-between pb-3 text-white gap-2"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="shrink-0 rounded-lg border border-[rgba(234,75,113,0.35)] bg-[rgba(234,75,113,0.15)] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-[#ff7597]">
                  {badge}
                </span>
                <h3 className="truncate text-xs sm:text-base font-semibold text-[#f2f3f7]">{title}</h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-2.5 sm:px-3 py-1.5 text-xs text-[#d9dee7] hover:bg-white/15 transition"
                  aria-label="Open image in new tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open Raw</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="grid size-8 sm:size-9 place-items-center rounded-xl border border-white/15 bg-white/[0.08] text-white hover:bg-white/20 active:scale-95 transition"
                  aria-label="Close enlarged view"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/15 bg-[#080b12] p-2 sm:p-4 shadow-[0_25px_80px_rgba(0,0,0,0.8)] flex items-center justify-center"
            >
              <div className="relative w-full flex items-center justify-center">
                <Image
                  src={src}
                  alt={alt}
                  width={1024}
                  height={576}
                  unoptimized
                  priority
                  className="max-h-[80vh] w-auto max-w-full h-auto object-contain select-none"
                />
              </div>
            </motion.div>

            <p className="mt-3 text-center text-xs text-[#747b8b]">
              Press <kbd className="rounded border border-white/15 bg-white/[0.07] px-1.5 py-0.5 font-mono text-[10px] text-white">Esc</kbd> or click anywhere outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
