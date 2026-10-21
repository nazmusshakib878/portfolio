'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const [revealed, setRevealed] = useState(false)

  // iOS Safari safety: Ensure content is never permanently hidden if IntersectionObserver stalls
  useEffect(() => {
    if (reduce) return
    const timer = setTimeout(() => {
      setRevealed(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [reduce])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true, amount: 'some', margin: '0px 0px -30px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  )
}
