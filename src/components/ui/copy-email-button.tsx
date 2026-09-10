'use client'

import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

export function CopyEmailButton({
  className = '',
  variant = 'badge',
}: {
  className?: string
  variant?: 'button' | 'card' | 'badge'
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(portfolioData.email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        window.location.href = `mailto:${portfolioData.email}`
      }
    } catch {
      window.location.href = `mailto:${portfolioData.email}`
    }
  }

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={`group inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[.025] px-3.5 py-2 text-xs font-semibold text-[#d9dee7] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(43,217,181,.35)] hover:bg-white/[.05] active:translate-y-0 ${className}`}
        aria-label="Copy email address to clipboard"
      >
        {copied ? (
          <Check size={14} className="text-[#2bd9b5]" aria-hidden="true" />
        ) : (
          <Copy size={14} className="text-[#69e6cd] transition group-hover:scale-110" aria-hidden="true" />
        )}
        <span>{copied ? 'Email copied!' : 'Copy email'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/[.08] bg-white/[.025] p-4 text-left transition duration-200 hover:border-[rgba(43,217,181,.25)] hover:bg-white/[.04] ${className}`}
      aria-label="Copy email address to clipboard"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(43,217,181,.08)] text-[#69e6cd]">
          <Mail aria-hidden="true" size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">Email</p>
          <p className="truncate text-sm text-[#d9dee7]">{portfolioData.email}</p>
        </div>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-2.5 py-1.5 text-xs text-[#aeb6c3] transition group-hover:border-[#2bd9b5]/30 group-hover:text-[#69e6cd]">
        {copied ? <Check size={13} className="text-[#2bd9b5]" /> : <Copy size={13} />}
        <span>{copied ? 'Copied!' : 'Copy'}</span>
      </span>
    </button>
  )
}
