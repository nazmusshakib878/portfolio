'use client'

import { useEffect } from 'react'
import { parseDebugFlags } from '@/lib/debug-flags'

/**
 * Applies debug and lite-mode classes directly to <html> element
 * so CSS rules can instantaneously adapt without waiting for React re-renders.
 */
export function DebugFlagsProvider() {
  useEffect(() => {
    const flags = parseDebugFlags()
    const doc = document.documentElement

    if (flags.isLite) doc.classList.add('lite-mode')
    if (flags.offBg) doc.classList.add('off-bg')
    if (flags.offBlur) doc.classList.add('off-blur')
    if (flags.offReveal) doc.classList.add('off-reveal')
    if (flags.offCarousel) doc.classList.add('off-carousel')
    if (flags.offRobot) doc.classList.add('off-robot')
    if (flags.offCursor) doc.classList.add('off-cursor')
    if (flags.isTouch) doc.classList.add('is-touch')
    if (flags.isIOS) doc.classList.add('is-ios')
  }, [])

  return null
}
