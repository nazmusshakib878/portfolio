'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useDebugFlags } from '@/lib/debug-flags'

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const flags = useDebugFlags()
  const [revealed, setRevealed] = useState(false)

  const skipMotion = Boolean(reduce || flags.isLite || flags.offReveal || flags.isTouch)

  useEffect(() => {
    if (skipMotion) return

    // iOS Safari safety fallback: Ensure content is never stuck at opacity 0
    const timer = setTimeout(() => {
      setRevealed(true)
    }, 600)
    return () => clearTimeout(timer)
  }, [skipMotion])

  if (skipMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
