import { useEffect, useState } from 'react'
import { Download, Menu, Send } from 'lucide-react'

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

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeMenuOnDesktop)

    return () => {
      window.removeEventListener('resize', closeMenuOnDesktop)
    }
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="px-2 pt-2 sm:px-4 sm:pt-3 lg:px-6 lg:pt-4">
        <Container className="pointer-events-auto px-0">
          <div
            className={cn(
              'flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-border/60 bg-background/75 px-3 py-2.5 shadow-sm backdrop-blur-2xl transition-all duration-300 supports-[backdrop-filter]:bg-background/70 sm:gap-3 sm:rounded-[1.5rem] sm:px-4 sm:py-3',
              isScrolled &&
                'border-border/75 bg-background/90 py-2 shadow-[0_16px_50px_rgba(15,23,42,0.12)] supports-[backdrop-filter]:bg-background/85 sm:py-2.5',
            )}
          >
            <a
              href="#hero"
              className="group flex min-w-0 items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-3"
              aria-label={`${portfolioData.name} home`}
            >
              <img
                src="/images/profile.png"
                alt={portfolioData.name}
                width={44}
                height={44}
                className="size-9 shrink-0 rounded-full border border-sky-400/50 object-cover object-top shadow-sm sm:size-10 lg:size-11"
              />

              <span className="hidden min-w-0 flex-col leading-none min-[420px]:flex">
                <span className="truncate font-heading text-xs font-semibold sm:text-sm">
                  {portfolioData.name}
                </span>

                <span className="mt-1 truncate text-[10px] text-muted-foreground sm:text-xs">
                  {portfolioData.primaryRole}
                </span>
              </span>
            </a>

            <nav
              className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/75 p-1 shadow-sm backdrop-blur-md xl:flex"
              aria-label="Primary navigation"
            >
              {portfolioData.navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background 2xl:px-4 2xl:text-sm',
                      isActive &&
                        'bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 text-white shadow-[0_10px_24px_rgba(14,165,233,0.24)] hover:bg-gradient-to-r hover:text-white',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <ThemeToggle />

              <Button
                variant="outline"
                size="sm"
                render={
                  <a
                    href={portfolioData.resumeHref}
                    download
                    aria-label="Download resume"
                  />
                }
                className="hidden rounded-full border-border/70 bg-background/80 backdrop-blur-md lg:inline-flex xl:hidden 2xl:inline-flex"
              >
                <Download className="size-4" />
                Resume
              </Button>

              <div className="xl:hidden">
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
                        className="size-9 rounded-full border-border/70 bg-background/80 backdrop-blur-md sm:size-10"
                        aria-label="Open navigation menu"
                      />
                    }
                  >
                    <Menu className="size-4 sm:size-5" />
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[calc(100vw-1rem)] max-w-sm overflow-y-auto border-l border-border/60 bg-background/96 px-4 py-5 backdrop-blur-xl sm:w-96 sm:px-6 sm:py-6"
                  >
                    <SheetHeader className="border-b border-border/60 px-0 pb-5 pt-1">
                      <SheetTitle className="sr-only">
                        Portfolio navigation
                      </SheetTitle>

                      <a
                        href="#hero"
                        className="flex min-w-0 items-center gap-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <img
                          src="/images/profile.png"
                          alt={portfolioData.name}
                          width={48}
                          height={48}
                          className="size-12 shrink-0 rounded-full border border-sky-400/50 object-cover object-top"
                        />

                        <span className="min-w-0">
                          <span className="block truncate font-heading text-base font-semibold text-foreground">
                            {portfolioData.name}
                          </span>

                          <span className="mt-1 block truncate text-sm text-muted-foreground">
                            {portfolioData.primaryRole}
                          </span>
                        </span>
                      </a>
                    </SheetHeader>

                    <nav
                      className="mt-5 flex flex-col gap-2"
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
                                  'flex min-h-12 items-center rounded-xl border border-transparent px-4 py-3 text-base font-medium text-foreground transition-colors hover:border-border/60 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                                  isActive &&
                                    'border-sky-400/30 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-violet-500/10 text-sky-600 dark:text-sky-400',
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

                    <div className="mt-6 grid gap-3 border-t border-border/60 pt-5">
                      <Button
                        variant="outline"
                        className="min-h-11 w-full rounded-full"
                        render={
                          <a
                            href={portfolioData.resumeHref}
                            download
                            onClick={() =>
                              setMobileMenuOpen(false)
                            }
                          />
                        }
                      >
                        <Download />
                        Download Resume
                      </Button>

                      <SheetClose
                        render={
                          <Button
                            className="min-h-11 w-full rounded-full"
                            render={<a href="#contact" />}
                            onClick={() =>
                              setMobileMenuOpen(false)
                            }
                          />
                        }
                      >
                        Contact Me
                        <Send />
                      </SheetClose>
                    </div>

                    <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                      {portfolioData.location}
                    </p>
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