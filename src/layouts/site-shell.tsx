import type { PropsWithChildren } from 'react'

import { Container } from '@/components/common/container'
import { FooterSection } from '@/sections/footer-section'
import { NavbarSection } from '@/sections/navbar-section'

type SiteShellProps = PropsWithChildren<{
  activeSection: string
}>

export function SiteShell({ children, activeSection }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#content"
        className="sr-only rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>
      <NavbarSection activeSection={activeSection} />
      <main id="content" className="relative pt-24 sm:pt-28 lg:pt-32">
        <Container className="space-y-28 py-10 sm:py-14 lg:py-16">{children}</Container>
      </main>
      <FooterSection />
    </div>
  )
}