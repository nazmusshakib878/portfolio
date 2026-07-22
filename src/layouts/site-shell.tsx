import {
  Children,
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type PropsWithChildren,
  type ReactNode,
} from 'react'

import {
  ArrowUp,
  Sparkles,
} from 'lucide-react'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

import { Container } from '@/components/common/container'
import { portfolioData } from '@/data/portfolio'
import { FooterSection } from '@/sections/footer-section'
import { NavbarSection } from '@/sections/navbar-section'

type SiteShellProps = PropsWithChildren<{
  activeSection: string
}>

type InteractiveSectionProps = {
  children: ReactNode
  index: number
  isHero: boolean
  shouldReduceMotion: boolean | null
}

const sideNavigationItems = [
  {
    id: 'hero',
    label: 'Home',
    href: '#hero',
  },

  ...portfolioData.navLinks.map((link) => ({
    id: link.href.replace('#', ''),
    label: link.label,
    href: link.href,
  })),
]

function InteractiveSection({
  children,
  index,
  isHero,
  shouldReduceMotion,
}: InteractiveSectionProps) {
  const [spotlight, setSpotlight] = useState({
    x: 0,
    y: 0,
    visible: false,
  })

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === 'touch') {
      return
    }

    const bounds =
      event.currentTarget.getBoundingClientRect()

    setSpotlight({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      visible: true,
    })
  }

  const handlePointerLeave = () => {
    setSpotlight((currentSpotlight) => ({
      ...currentSpotlight,
      visible: false,
    }))
  }

  if (isHero) {
    return (
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
                scale: 0.99,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    )
  }

  const animationDirection =
    index % 2 === 0 ? 28 : -28

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 55,
              x: animationDirection,
              scale: 0.985,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.08,
        margin: '0px 0px -60px 0px',
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group/section relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/65 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.07)] backdrop-blur-2xl transition-[border-color,box-shadow,transform] duration-500 hover:border-sky-400/30 hover:shadow-[0_40px_130px_rgba(14,165,233,0.13)] sm:rounded-[2.25rem] sm:p-8 lg:p-10 dark:bg-slate-950/45"
      style={
        {
          '--section-index': index,
        } as CSSProperties
      }
    >
      {/* Mouse-following spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: spotlight.visible ? 1 : 0,

          background: `
            radial-gradient(
              520px circle at ${spotlight.x}px ${spotlight.y}px,
              rgba(14, 165, 233, 0.12),
              rgba(34, 211, 238, 0.04) 28%,
              transparent 62%
            )
          `,
        }}
      />

      {/* Permanent section background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.07),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.065),transparent_34%)] opacity-70 transition-opacity duration-500 group-hover/section:opacity-100"
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.018] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:46px_46px]"
      />

      {/* Top glowing line */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 right-8 top-0 z-10 h-px origin-center bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
        initial={{
          scaleX: 0.25,
          opacity: 0.25,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          delay: 0.15,
        }}
      />

      {/* Section number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-4 z-10 font-heading text-5xl font-semibold tracking-[-0.08em] text-foreground/[0.035] transition-colors duration-500 group-hover/section:text-sky-500/[0.07] sm:right-8 sm:top-6 sm:text-7xl"
      >
        {String(index).padStart(2, '0')}
      </div>

      {/* Decorative corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 z-0 size-40 rounded-full bg-gradient-to-br from-sky-500/10 to-violet-500/10 blur-3xl transition-transform duration-700 group-hover/section:scale-125"
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export function SiteShell({
  children,
  activeSection,
}: SiteShellProps) {
  const shouldReduceMotion = useReducedMotion()
  const sections = Children.toArray(children)

  const [showBackToTop, setShowBackToTop] =
    useState(false)

  const pointerX = useMotionValue(-500)
  const pointerY = useMotionValue(-500)

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 90,
    damping: 24,
    mass: 0.55,
  })

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 90,
    damping: 24,
    mass: 0.55,
  })

  const cursorGlowX = useTransform(
    smoothPointerX,
    (value) => value - 190,
  )

  const cursorGlowY = useTransform(
    smoothPointerY,
    (value) => value - 190,
  )

  const { scrollYProgress } = useScroll()

  const smoothScrollProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 28,
      restDelta: 0.001,
    },
  )

  const backgroundOrbOneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -220],
  )

  const backgroundOrbTwoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180],
  )

  useEffect(() => {
    const updatePointerPosition = (
      event: PointerEvent,
    ) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
    }

    const updateScrollState = () => {
      setShowBackToTop(window.scrollY > 700)
    }

    if (!shouldReduceMotion) {
      window.addEventListener(
        'pointermove',
        updatePointerPosition,
        {
          passive: true,
        },
      )
    }

    updateScrollState()

    window.addEventListener(
      'scroll',
      updateScrollState,
      {
        passive: true,
      },
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        updatePointerPosition,
      )

      window.removeEventListener(
        'scroll',
        updateScrollState,
      )
    }
  }, [
    pointerX,
    pointerY,
    shouldReduceMotion,
  ])

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
      {/* JavaScript scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-violet-500 shadow-[0_0_18px_rgba(56,189,248,0.8)]"
        style={{
          scaleX: smoothScrollProgress,
        }}
      />

      {/* Mouse-following ambient glow */}
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[380px] rounded-full bg-gradient-to-br from-sky-400/10 via-cyan-400/5 to-violet-500/10 blur-[80px] lg:block dark:mix-blend-screen"
          style={{
            x: cursorGlowX,
            y: cursorGlowY,
          }}
        />
      ) : null}

      {/* Full-page animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-background" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_4%,rgba(14,165,233,0.17),transparent_29%),radial-gradient(circle_at_92%_10%,rgba(168,85,247,0.15),transparent_30%),radial-gradient(circle_at_50%_96%,rgba(34,211,238,0.11),transparent_36%)]" />

        <div className="absolute inset-0 opacity-[0.022] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px]" />

        <motion.div
          className="absolute -left-44 top-[7%] size-[32rem] rounded-full bg-sky-500/12 blur-[140px]"
          style={{
            y: backgroundOrbOneY,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 100, 0],
                  scale: [1, 1.16, 1],
                }
          }
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -right-52 top-[32%] size-[35rem] rounded-full bg-violet-500/12 blur-[150px]"
          style={{
            y: backgroundOrbTwoY,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -90, 0],
                  scale: [1, 1.17, 1],
                }
          }
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-[-15rem] left-[28%] size-[38rem] rounded-full bg-cyan-500/10 blur-[160px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 80, 0],
                  y: [0, -55, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        {/* Moving light beam */}
        <motion.div
          className="absolute -left-[30%] top-[18%] h-px w-[55%] rotate-[-18deg] bg-gradient-to-r from-transparent via-sky-400/25 to-transparent blur-sm"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ['0%', '260%'],
                  opacity: [0, 1, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Side section navigator */}
      <nav
        aria-label="Page section navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 2xl:flex"
      >
        {sideNavigationItems.map((item) => {
          const isActive =
            activeSection === item.id

          return (
            <a
              key={item.id}
              href={item.href}
              title={item.label}
              aria-label={`Go to ${item.label}`}
              aria-current={
                isActive ? 'page' : undefined
              }
              className="group flex items-center justify-end gap-2"
            >
              <span
                className={`pointer-events-none translate-x-2 rounded-full border px-2.5 py-1 text-[10px] font-medium opacity-0 shadow-sm backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                  isActive
                    ? 'border-sky-400/30 bg-sky-500/10 text-sky-600 dark:text-sky-300'
                    : 'border-border/60 bg-background/75 text-muted-foreground'
                }`}
              >
                {item.label}
              </span>

              <span
                className={`relative flex size-4 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'scale-110 border-sky-400/50 bg-sky-500/15 shadow-[0_0_16px_rgba(14,165,233,0.45)]'
                    : 'border-border/70 bg-background/75 hover:border-sky-400/40'
                }`}
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'size-2 bg-gradient-to-br from-sky-400 to-violet-500'
                      : 'size-1.5 bg-muted-foreground/50 group-hover:bg-sky-500'
                  }`}
                />
              </span>
            </a>
          )
        })}
      </nav>

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
            {sections.map((section, index) => (
              <InteractiveSection
                key={index}
                index={index}
                isHero={index === 0}
                shouldReduceMotion={
                  shouldReduceMotion
                }
              >
                {section}
              </InteractiveSection>
            ))}
          </div>
        </Container>
      </main>

      <FooterSection />

      {/* Smart back-to-top button */}
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
                    y: 20,
                    scale: 0.8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.8,
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -4,
                    scale: 1.05,
                  }
            }
            whileTap={{
              scale: 0.94,
            }}
            className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-sky-500 via-cyan-500 to-violet-600 text-white shadow-[0_18px_45px_rgba(14,165,233,0.35)] backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-7 sm:right-7 sm:size-14"
            aria-label="Back to top"
          >
            <ArrowUp className="size-5" />

            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-white/25"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.35],
                      opacity: [0.5, 0],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeOut',
              }}
            />
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Small loading-style brand decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-5 z-30 hidden items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl xl:flex"
      >
        <Sparkles className="size-3.5 text-sky-500" />

        Crafted with React
      </div>
    </div>
  )
}