import { useEffect, useState } from 'react'
import { Menu, Send } from 'lucide-react'

import { Container } from '@/components/common/container'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { portfolioData } from '@/data/portfolio'
import { cn } from '@/lib/utils'

type NavbarSectionProps = {
  activeSection: string
}

export function NavbarSection({ activeSection }: NavbarSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 8)
    }

    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', updateScrolledState)
    }
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
        <Container className="pointer-events-auto">
          <div
            className={cn(
              'flex items-center justify-between gap-3 rounded-[1.5rem] border border-border/60 bg-background/70 px-4 py-3 backdrop-blur-2xl transition-[padding,background-color,box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-background/70',
              isScrolled &&
                'border-border/70 bg-background/88 py-2.5 shadow-[0_16px_50px_rgba(15,23,42,0.12)] supports-[backdrop-filter]:bg-background/84',
            )}
          >
            <a
              href="#hero"
              className="group inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img
                src="/images/profile.png"
                alt={portfolioData.name}
                width={40}
                height={40}
                className="size-10 rounded-full border border-sky-400/50 object-cover object-top shadow-sm"
              />

              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-heading text-sm font-semibold">
                  {portfolioData.name}
                </span>

                <span className="text-xs text-muted-foreground">
                  {portfolioData.primaryRole}
                </span>
              </span>
            </a>

            <nav
              className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/75 p-1 shadow-sm backdrop-blur-md lg:flex"
              aria-label="Primary navigation"
            >
              {portfolioData.navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      isActive &&
                        'bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 text-white shadow-[0_10px_24px_rgba(14,165,233,0.24)] hover:text-white',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Button
                variant="outline"
                size="sm"
                render={<a href={portfolioData.resumeHref} download />}
                className="hidden rounded-full border-border/70 bg-background/80 backdrop-blur-md md:inline-flex"
              >
                Resume
              </Button>

              <div className="lg:hidden">
                <Sheet
                  open={mobileMenuOpen}
                  onOpenChange={setMobileMenuOpen}
                >
                  <SheetTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="rounded-full border-border/70 bg-background/80 backdrop-blur-md"
                        aria-label="Open navigation menu"
                      />
                    }
                  >
                    <Menu />
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[min(100vw-1rem,22rem)] border-l border-border/60 bg-background/96 px-4 py-6 backdrop-blur-xl"
                  >
                    <SheetHeader className="px-0 pt-2">
                      <SheetTitle>Navigation</SheetTitle>
                    </SheetHeader>

                    <nav
                      className="mt-6 flex flex-col gap-2"
                      aria-label="Mobile navigation"
                    >
                      {portfolioData.navLinks.map((link) => {
                        const isActive =
                          activeSection === link.href.slice(1)

                        return (
                          <SheetClose
                            key={link.href}
                            render={
                              <a
                                href={link.href}
                                className={cn(
                                  'rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                  isActive &&
                                    'bg-muted text-foreground',
                                )}
                                onClick={() =>
                                  setMobileMenuOpen(false)
                                }
                              />
                            }
                          >
                            {link.label}
                          </SheetClose>
                        )
                      })}
                    </nav>

                    <div className="mt-6 grid gap-3">
                      <Button
                        variant="outline"
                        className="rounded-full"
                        render={
                          <a
                            href={portfolioData.resumeHref}
                            download
                          />
                        }
                      >
                        Resume
                      </Button>

                      <Button
                        className="rounded-full"
                        render={<a href="#contact" />}
                      >
                        Contact
                        <Send />
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}