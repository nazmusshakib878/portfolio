'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface SmartBackLinkProps extends React.ComponentProps<typeof Link> {
  href: string
}

export function SmartBackLink({ href, className, children, onClick, ...props }: SmartBackLinkProps) {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If the user has history within the site, use router.back() to natively
    // pop the history stack and perfectly restore their exact scroll position.
    if (typeof window !== 'undefined' && (window.history.length > 2 || document.referrer.includes(window.location.host))) {
      e.preventDefault()
      router.back()
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Link href={href} onClick={handleBack} className={className} {...props}>
      {children}
    </Link>
  )
}
