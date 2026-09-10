'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface SmartBackLinkProps extends React.ComponentProps<typeof Link> {
  href: string
  fallbackHref?: string
  preferHistory?: boolean
}

export function SmartBackLink({
  href,
  fallbackHref,
  preferHistory = true,
  className,
  children,
  onClick,
  ...props
}: SmartBackLinkProps) {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (!preferHistory) return

    // Check if the user navigated here from another page within this session
    let hasInternalHistory = false
    try {
      if (typeof window !== 'undefined') {
        const navDepth = parseInt(sessionStorage.getItem('portfolio_nav_depth') || '0', 10)
        // If navigation depth > 1, the user navigated internally from within the app
        if (navDepth > 1) {
          hasInternalHistory = true
        }
      }
    } catch {
      // Storage access fallback
    }

    if (hasInternalHistory) {
      e.preventDefault()
      router.back()
    } else {
      // If direct landing from external source / new tab, safely navigate to fallback target
      const target = fallbackHref || href
      if (target !== href) {
        e.preventDefault()
        router.push(target)
      }
    }
  }

  return (
    <Link href={href} onClick={handleBack} className={className} {...props}>
      {children}
    </Link>
  )
}
