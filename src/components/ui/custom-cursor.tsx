'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useDebugFlags } from '@/lib/debug-flags'

const emptySubscribe = () => () => {}

function checkCursorCapable(): boolean {
  if (typeof window === 'undefined') return false
  if (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return false
  }
  return true
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const flags = useDebugFlags()

  const cursorCapable = useSyncExternalStore(
    emptySubscribe,
    checkCursorCapable,
    () => false
  )

  const enabled = cursorCapable && !flags.isLite && !flags.offCursor && !flags.isTouch

  useEffect(() => {
    if (!enabled) return

    let x = -30
    let y = -30
    let rx = -30
    let ry = -30
    let raf = 0

    const move = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    const tick = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', move)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-85 lg:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 lg:block"
      />
    </>
  )
}
