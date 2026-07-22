import { Children } from 'react'
import type { PropsWithChildren } from 'react'

import {
  motion,
  useReducedMotion,
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

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Full-page premium background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-background" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(168,85,247,0.14),transparent_30%),radial-gradient(circle_at_50%_95%,rgba(34,211,238,0.10),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:54px_54px]" />

        <motion.div
          className="absolute -left-40 top-[8%] size-[30rem] rounded-full bg-sky-500/10 blur-[130px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 90, 0],
                  y: [0, 60, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -right-48 top-[30%] size-[32rem] rounded-full bg-violet-500/10 blur-[140px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -80, 0],
                  y: [0, 70, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 23,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-[-12rem] left-[30%] size-[34rem] rounded-full bg-cyan-500/10 blur-[150px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 70, 0],
                  y: [0, -50, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Top accent line */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

      <a
        href="#content"
        className="sr-only rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>

      <NavbarSection activeSection={activeSection} />

      <main
        id="content"
        className="relative pt-24 sm:pt-28 lg:pt-32"
      >
        <Container className="relative z-10 py-6 sm:py-10 lg:py-12">
          <div className="space-y-10 sm:space-y-14 lg:space-y-20">
            {sections.map((section, index) => {
              if (index === 0) {
                return (
                  <motion.div
                    key="hero"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {section}
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={index}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 45,
                          scale: 0.985,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.08,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/65 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.07)] backdrop-blur-2xl transition-all duration-500 hover:border-sky-400/25 hover:shadow-[0_36px_120px_rgba(14,165,233,0.10)] sm:rounded-[2.25rem] sm:p-8 lg:p-10 dark:bg-slate-950/45"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.07),transparent_32%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
                  />

                  <div className="relative">
                    {section}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </main>

      <FooterSection />
    </div>
  )
}