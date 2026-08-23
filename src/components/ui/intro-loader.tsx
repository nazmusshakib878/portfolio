'use client'

import { useEffect, useState } from 'react'

export function IntroLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (
      !sessionStorage.getItem('intro-seen') &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShow(true)
      sessionStorage.setItem('intro-seen', '1')
      const timer = setTimeout(() => setShow(false), 750)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!show) return null

  return (
    <div
      onClick={() => setShow(false)}
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-[#05070b] transition-opacity duration-300"
      aria-hidden="true"
      title="Click to skip"
    >
      <div className="text-center">
        <p className="display text-6xl font-bold">
          MS<span className="text-[#2bd9b5]">.</span>
        </p>
        <div className="mt-6 h-px w-48 overflow-hidden bg-white/15">
          <div className="h-full animate-[loader_.65s_ease_forwards] bg-[#2bd9b5]" />
        </div>
        <p className="eyebrow mt-5">Building reliable full-stack systems</p>
      </div>
    </div>
  )
}

