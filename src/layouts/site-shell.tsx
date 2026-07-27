import {
  Children,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

import { ArrowUp } from 'lucide-react'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'

import { Container } from '@/components/common/container'
import { FooterSection } from '@/sections/footer-section'
import { NavbarSection } from '@/sections/navbar-section'

type SiteShellProps = PropsWithChildren<{
  activeSection: string
}>

export function SiteShell({
  children,
  activeSection,
}: SiteShellProps) {
  const shouldReduceMotion = useReducedMotion()
  const sections = Children.toArray(children)

  const [showBackToTop, setShowBackToTop] =
    useState(false)

  const { scrollYProgress } = useScroll()

  const smoothScrollProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 180,
      damping: 32,
      restDelta: 0.001,
    },
  )

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(
        window.scrollY > 700,
      )
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion
        ? 'auto'
        : 'smooth',
    })
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Lightweight scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(56,189,248,0.55)]"
        style={{
          scaleX:
            smoothScrollProgress,
        }}
      />

      {/* Lightweight static background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-background" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_5%,rgba(14,165,233,0.13),transparent_27%),radial-gradient(circle_at_92%_10%,rgba(139,92,246,0.11),transparent_29%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.07),transparent_34%)]" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <a
        href="#content"
        className="sr-only rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110]"
      >
        Skip to content
      </a>

      <NavbarSection
        activeSection={activeSection}
      />

      <main
        id="content"
        className="relative pt-24 sm:pt-28 lg:pt-32"
      >
        <Container className="relative z-10 py-6 sm:py-10 lg:py-12">
          <div className="space-y-10 sm:space-y-14 lg:space-y-20">
            {sections.map(
              (section, index) => {
                const isHero =
                  index === 0

                if (isHero) {
                  return (
                    <motion.div
                      key="hero-section"
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 12,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      {section}
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={`section-${index}`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 24,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.04,
                      margin:
                        '0px 0px -30px 0px',
                    }}
                    transition={{
                      duration: 0.42,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/60 p-5 shadow-[0_24px_75px_rgba(15,23,42,0.06)] transition-colors duration-300 hover:border-sky-400/20 sm:rounded-[2.1rem] sm:p-8 lg:p-10 dark:bg-slate-950/40"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent"
                    />

                    <div className="relative">
                      {section}
                    </div>
                  </motion.div>
                )
              },
            )}
          </div>
        </Container>
      </main>

      <FooterSection />

      {/* Lightweight back-to-top */}
      <AnimatePresence>
        {showBackToTop ? (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                    scale: 0.9,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.9,
            }}
            transition={{
              duration: 0.22,
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
            whileTap={{
              scale: 0.94,
            }}
            className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-sky-500 via-cyan-500 to-violet-600 text-white shadow-[0_15px_38px_rgba(14,165,233,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-7 sm:right-7"
            aria-label="Back to top"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}