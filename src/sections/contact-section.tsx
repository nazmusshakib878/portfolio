import {
  useState,
  type FormEvent,
} from 'react'

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react'

import {
  motion,
  useReducedMotion,
} from 'motion/react'

import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { socialLinks } from '@/constants/social-links'
import { portfolioData } from '@/data/portfolio'

const WEB3FORMS_ACCESS_KEY =
  '7c8b13ce-deb0-4235-bd9a-fe9165dab0fe'

type SubmissionStatus = {
  type: 'idle' | 'success' | 'error'
  message: string
}

type Web3FormsResponse = {
  success?: boolean
  message?: string
}

const socialProfiles = [
  {
    label: 'LinkedIn',
    description: 'Professional network',
    href: socialLinks.linkedin,
    icon: BriefcaseBusiness,
    hoverClass:
      'hover:border-sky-400/40 hover:bg-sky-500/10',
    iconClass:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  {
    label: 'Facebook',
    description: 'Social profile',
    href: socialLinks.facebook,
    icon: Users,
    hoverClass:
      'hover:border-blue-400/40 hover:bg-blue-500/10',
    iconClass:
      'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    label: 'WhatsApp',
    description: 'Direct conversation',
    href: socialLinks.whatsapp,
    icon: MessageCircle,
    hoverClass:
      'hover:border-emerald-400/40 hover:bg-emerald-500/10',
    iconClass:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
]

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion()

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [messageLength, setMessageLength] =
    useState(0)

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>({
      type: 'idle',
      message: '',
    })

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const senderName = String(
      formData.get('name') ?? '',
    ).trim()

    const senderEmail = String(
      formData.get('email') ?? '',
    ).trim()

    const userSubject = String(
      formData.get('subject') ?? '',
    ).trim()

    const message = String(
      formData.get('message') ?? '',
    ).trim()

    setSubmissionStatus({
      type: 'idle',
      message: '',
    })

    if (senderName.length < 2) {
      setSubmissionStatus({
        type: 'error',
        message:
          'Please enter a valid name.',
      })

      return
    }

    if (
      !senderEmail ||
      !senderEmail.includes('@')
    ) {
      setSubmissionStatus({
        type: 'error',
        message:
          'Please enter a valid email address.',
      })

      return
    }

    if (userSubject.length < 3) {
      setSubmissionStatus({
        type: 'error',
        message:
          'Please enter a valid subject.',
      })

      return
    }

    if (message.length < 10) {
      setSubmissionStatus({
        type: 'error',
        message:
          'Please write at least 10 characters.',
      })

      return
    }

    setIsSubmitting(true)

    try {
      formData.set(
        'access_key',
        WEB3FORMS_ACCESS_KEY,
      )

      formData.set(
        'subject',
        `Portfolio Contact: ${userSubject}`,
      )

      formData.set(
        'from_name',
        'Md. Nazmus Shakib Portfolio',
      )

      formData.set(
        'replyto',
        senderEmail,
      )

      formData.set(
        'website',
        'https://mdnazmusshakib.me',
      )

      formData.set(
        'page_url',
        window.location.href,
      )

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData,
        },
      )

      const result =
        (await response.json()) as Web3FormsResponse

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'The message could not be sent.',
        )
      }

      form.reset()
      setMessageLength(0)

      setSubmissionStatus({
        type: 'success',
        message:
          'Your message was sent successfully. I will respond as soon as possible.',
      })
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-[7.5rem] space-y-10 lg:scroll-mt-40"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let’s create something valuable together."
        description="Have a project, collaboration, internship, or career opportunity? Send a message directly from the form or connect through one of my social profiles."
        align="center"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background/55 p-3 shadow-[0_35px_120px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-5 lg:p-6">
        {/* Background decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.11),transparent_35%)]" />

          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:42px_42px]" />

          <motion.div
            className="absolute -right-28 -top-28 size-72 rounded-full bg-violet-500/15 blur-[100px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.15, 1],
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                  }
            }
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute -bottom-28 -left-28 size-72 rounded-full bg-sky-500/15 blur-[100px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.12, 1],
                    x: [0, 25, 0],
                  }
            }
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Left contact panel */}
          <motion.aside
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -25,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 p-5 shadow-[0_25px_80px_rgba(2,8,23,0.25)] sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.20),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_40%)]"
            />

            <div className="relative flex h-full flex-col">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 opacity-50 blur-lg" />

                  <img
                    src="/images/profile.png"
                    alt={portfolioData.name}
                    width={72}
                    height={72}
                    className="relative size-16 rounded-2xl border border-white/15 object-cover object-top shadow-xl sm:size-[4.5rem]"
                  />

                  <span className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-heading text-lg font-semibold text-white">
                    {portfolioData.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Laravel · PHP · MySQL · APIs
                  </p>

                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Available to connect
                  </div>
                </div>
              </div>

              <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  Start a conversation
                </p>

                <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white">
                  Have an idea worth building?
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Contact me regarding Laravel
                  applications, API integration,
                  database systems, internships,
                  collaborations, or professional
                  opportunities.
                </p>
              </div>

              {/* Direct contact */}
              <div className="mt-7 grid gap-3">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:bg-white/[0.09]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                    <Mail className="size-5" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[11px] text-slate-500">
                      Email address
                    </span>

                    <span className="mt-1 block truncate text-sm font-semibold text-white">
                      {portfolioData.email}
                    </span>
                  </span>

                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300" />
                </a>

                <a
                  href={`tel:${portfolioData.phone}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:bg-white/[0.09]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <Phone className="size-5" />
                  </span>

                  <span>
                    <span className="block text-[11px] text-slate-500">
                      Phone number
                    </span>

                    <span className="mt-1 block text-sm font-semibold text-white">
                      {portfolioData.phone}
                    </span>
                  </span>

                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300" />
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                    <MapPin className="size-5" />
                  </span>

                  <span>
                    <span className="block text-[11px] text-slate-500">
                      Current location
                    </span>

                    <span className="mt-1 block text-sm font-semibold text-white">
                      {portfolioData.location}
                    </span>
                  </span>
                </div>
              </div>

              {/* Social profiles */}
              <div className="mt-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Connect with me
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {socialProfiles.map(
                    (profile) => {
                      const SocialIcon =
                        profile.icon

                      return (
                        <motion.a
                          key={profile.label}
                          href={profile.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  y: -4,
                                }
                          }
                          className={`rounded-2xl border border-white/10 bg-white/[0.05] p-3 transition-colors ${profile.hoverClass}`}
                        >
                          <span
                            className={`flex size-9 items-center justify-center rounded-xl ${profile.iconClass}`}
                          >
                            <SocialIcon className="size-4" />
                          </span>

                          <p className="mt-3 truncate text-xs font-semibold text-white">
                            {profile.label}
                          </p>

                          <p className="mt-1 hidden truncate text-[9px] text-slate-500 sm:block">
                            {profile.description}
                          </p>
                        </motion.a>
                      )
                    },
                  )}
                </div>
              </div>

              <div className="mt-auto pt-7">
                <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" />

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Secure form delivery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Messages are delivered directly
                        to my registered email inbox.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Form panel */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 25,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/75 p-5 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-7 lg:p-8"
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

            {/* Form header */}
            <div className="flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                  Send a message
                </p>

                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Tell me about your idea
                </h3>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative size-2 rounded-full bg-emerald-500" />
                </span>

                Usually replies soon
              </div>
            </div>

            <form
              className="mt-7 space-y-5"
              onSubmit={handleSubmit}
            >
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-foreground"
                  >
                    Your name
                  </label>

                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                      minLength={2}
                      className="h-13 rounded-2xl border-border/60 bg-background/60 pl-11 shadow-sm transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-foreground"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-13 rounded-2xl border-border/60 bg-background/60 pl-11 shadow-sm transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-semibold text-foreground"
                >
                  Subject
                </label>

                <div className="relative">
                  <BriefcaseBusiness className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Project inquiry or opportunity"
                    required
                    minLength={3}
                    className="h-13 rounded-2xl border-border/60 bg-background/60 pl-11 shadow-sm transition-all focus:border-violet-400/50 focus:ring-violet-400/15"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-foreground"
                  >
                    Message
                  </label>

                  <span
                    className={`text-xs ${
                      messageLength > 900
                        ? 'text-amber-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {messageLength}/1000
                  </span>
                </div>

                <div className="relative">
                  <MessageCircle className="pointer-events-none absolute left-4 top-4 size-4 text-muted-foreground" />

                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project, timeline, goals, or opportunity."
                    rows={8}
                    required
                    minLength={10}
                    maxLength={1000}
                    onChange={(event) =>
                      setMessageLength(
                        event.target.value.length,
                      )
                    }
                    className="min-h-44 resize-y rounded-2xl border-border/60 bg-background/60 pb-4 pl-11 pt-3.5 shadow-sm transition-all focus:border-cyan-400/50 focus:ring-cyan-400/15"
                  />
                </div>
              </div>

              {submissionStatus.type !==
              'idle' ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  role="status"
                  aria-live="polite"
                  className={
                    submissionStatus.type ===
                    'success'
                      ? 'rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm leading-6 text-foreground'
                      : 'rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm leading-6 text-foreground'
                  }
                >
                  <div className="flex items-start gap-3">
                    {submissionStatus.type ===
                    'success' ? (
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    ) : (
                      <MessageCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    )}

                    <span>
                      {submissionStatus.message}
                    </span>
                  </div>
                </motion.div>
              ) : null}

              <div className="flex flex-col gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-muted-foreground">
                  Your contact information will only be
                  used to reply to this message.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 px-7 text-white shadow-[0_16px_38px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_20px_50px_rgba(14,165,233,0.38)] sm:w-auto"
                >
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                  <span className="relative flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send />
                        Send Message
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}