import {
  useState,
  type FormEvent,
} from 'react'

import {
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from 'lucide-react'

import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
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

const contactSocialLinks = [
  {
    label: 'LinkedIn',
    description: 'Professional profile',
    href: socialLinks.linkedin,
    icon: BriefcaseBusiness,
    cardClassName:
      'hover:border-sky-400/40 hover:bg-sky-500/10',
    iconClassName:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  {
    label: 'Facebook',
    description: 'Connect socially',
    href: socialLinks.facebook,
    icon: Users,
    cardClassName:
      'hover:border-blue-400/40 hover:bg-blue-500/10',
    iconClassName:
      'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    label: 'WhatsApp',
    description: 'Chat directly',
    href: socialLinks.whatsapp,
    icon: MessageCircle,
    cardClassName:
      'hover:border-emerald-400/40 hover:bg-emerald-500/10',
    iconClassName:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] =
    useState(false)

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

    setIsSubmitting(true)

    setSubmissionStatus({
      type: 'idle',
      message: '',
    })

    try {
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

      if (senderName.length < 2) {
        throw new Error(
          'Please enter your name.',
        )
      }

      if (
        !senderEmail ||
        !senderEmail.includes('@')
      ) {
        throw new Error(
          'Please enter a valid email address.',
        )
      }

      if (userSubject.length < 3) {
        throw new Error(
          'Please enter a valid subject.',
        )
      }

      if (message.length < 10) {
        throw new Error(
          'Please write at least 10 characters.',
        )
      }

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

      let result: Web3FormsResponse = {}

      try {
        result =
          (await response.json()) as Web3FormsResponse
      } catch {
        throw new Error(
          'The email service returned an invalid response.',
        )
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'The message could not be sent.',
        )
      }

      form.reset()

      setSubmissionStatus({
        type: 'success',
        message:
          'Your message was sent successfully. I will respond as soon as possible.',
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'

      setSubmissionStatus({
        type: 'error',
        message: errorMessage,
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
        title="Have a project or opportunity in mind?"
        description="Send a message using the contact form or connect with me through LinkedIn, Facebook, WhatsApp, email, or phone."
        align="center"
      />

      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        {/* Contact information */}
        <Card className="relative overflow-hidden border-border/60 bg-card/75 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_40%)]"
          />

          <CardContent className="relative flex h-full flex-col p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                Let&apos;s Connect
              </p>

              <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground">
                Start a conversation
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Contact me regarding Laravel
                applications, web development, API
                integration, internships,
                collaborations, or graduate
                opportunities.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={`mailto:${portfolioData.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background/55 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/35 hover:bg-background/80"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Mail className="size-5" />
                </span>

                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">
                    Email
                  </span>

                  <span className="mt-1 block truncate text-sm font-semibold text-foreground">
                    {portfolioData.email}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${portfolioData.phone}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background/55 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/35 hover:bg-background/80"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Phone className="size-5" />
                </span>

                <span>
                  <span className="block text-xs text-muted-foreground">
                    Phone
                  </span>

                  <span className="mt-1 block text-sm font-semibold text-foreground">
                    {portfolioData.phone}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/55 p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <MapPin className="size-5" />
                </span>

                <span>
                  <span className="block text-xs text-muted-foreground">
                    Location
                  </span>

                  <span className="mt-1 block text-sm font-semibold text-foreground">
                    {portfolioData.location}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Social Profiles
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {contactSocialLinks.map(
                  (socialLink) => {
                    const SocialIcon =
                      socialLink.icon

                    return (
                      <a
                        key={socialLink.label}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${socialLink.label}`}
                        className={`group rounded-2xl border border-border/60 bg-background/55 p-4 transition-all duration-300 hover:-translate-y-1 ${socialLink.cardClassName}`}
                      >
                        <span
                          className={`flex size-10 items-center justify-center rounded-xl ${socialLink.iconClassName}`}
                        >
                          <SocialIcon className="size-5" />
                        </span>

                        <p className="mt-3 text-sm font-semibold text-foreground">
                          {socialLink.label}
                        </p>

                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {socialLink.description}
                        </p>
                      </a>
                    )
                  },
                )}
              </div>
            </div>

            <div className="mt-auto pt-7">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Direct email delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Your message will arrive directly
                      in my registered email inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="relative overflow-hidden border-border/60 bg-card/75 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
          />

          <CardContent className="relative p-6 sm:p-8">
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Spam protection */}
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
                    Name
                  </label>

                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    minLength={2}
                    className="h-12 rounded-xl bg-background/60"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-foreground"
                  >
                    Email
                  </label>

                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-12 rounded-xl bg-background/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-semibold text-foreground"
                >
                  Subject
                </label>

                <Input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry"
                  required
                  minLength={3}
                  className="h-12 rounded-xl bg-background/60"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-foreground"
                >
                  Message
                </label>

                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project, timeline, and goals."
                  rows={7}
                  required
                  minLength={10}
                  className="resize-y rounded-xl bg-background/60"
                />
              </div>

              {submissionStatus.type !==
              'idle' ? (
                <div
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
                    ) : null}

                    <span>
                      {submissionStatus.message}
                    </span>
                  </div>
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-600 px-7 text-white shadow-[0_15px_35px_rgba(14,165,233,0.25)] hover:text-white sm:w-auto"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Send />
                      Send message
                    </>
                  )}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}