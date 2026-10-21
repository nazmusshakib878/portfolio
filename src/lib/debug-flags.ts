/**
 * Debug Switch & Lite Mode Configuration for iPhone Safari and Performance Bisecting
 *
 * URL Query Parameters for testing on real devices:
 * - `?lite=1` or `?lite=true`: Forces Lite Mode (disables backdrop-filter, heavy ambient glow, custom cursor, simplifies animations).
 * - `?off=bg,blur,reveal,carousel,robot,cursor`: Selectively disables feature groups for bisecting root causes on physical devices:
 *     - `bg`: Disables fixed grid background, radial ambient aura gradients, and ambient blur blobs.
 *     - `blur`: Forces all `backdrop-filter` and `filter: blur(...)` to `none`.
 *     - `reveal`: Renders all `Reveal` content immediately without Motion initial opacity 0 or scroll delays.
 *     - `carousel`: Forces ultra-lightweight 2D carousel rendering.
 *     - `robot`: Disables floating robot CSS animations and drop-shadow filters.
 *     - `cursor`: Completely disables the custom cursor.
 *
 */

import { useSyncExternalStore } from 'react'

export interface DebugFlags {
  isLite: boolean
  offBg: boolean
  offBlur: boolean
  offReveal: boolean
  offCarousel: boolean
  offRobot: boolean
  offCursor: boolean
  isTouch: boolean
  isIOS: boolean
}

export function parseDebugFlags(): DebugFlags {
  if (typeof window === 'undefined') {
    return {
      isLite: false,
      offBg: false,
      offBlur: false,
      offReveal: false,
      offCarousel: false,
      offRobot: false,
      offCursor: false,
      isTouch: false,
      isIOS: false,
    }
  }

  const search = window.location.search
  const params = new URLSearchParams(search)

  const isLite =
    params.get('lite') === '1' ||
    params.get('lite') === 'true'

  const offList = (params.get('off') || '')
    .toLowerCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const isTouch =
    window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0

  const ua = navigator.userAgent || ''
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  return {
    isLite,
    offBg: isLite || offList.includes('bg'),
    offBlur: isLite || offList.includes('blur'),
    offReveal: isLite || offList.includes('reveal'),
    offCarousel: isLite || offList.includes('carousel'),
    offRobot: isLite || offList.includes('robot'),
    offCursor: isLite || offList.includes('cursor'),
    isTouch,
    isIOS,
  }
}

const emptySubscribe = () => () => {}

const serverSnapshot: DebugFlags = {
  isLite: false,
  offBg: false,
  offBlur: false,
  offReveal: false,
  offCarousel: false,
  offRobot: false,
  offCursor: false,
  isTouch: false,
  isIOS: false,
}

let cachedSnapshot: DebugFlags | null = null

function getClientSnapshot(): DebugFlags {
  if (typeof window === 'undefined') return serverSnapshot
  if (!cachedSnapshot) {
    cachedSnapshot = parseDebugFlags()
  }
  return cachedSnapshot
}

function getServerSnapshot(): DebugFlags {
  return serverSnapshot
}

export function useDebugFlags(): DebugFlags {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)
}
