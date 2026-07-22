import { useState } from 'react'

import {
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { portfolioData } from '@/data/portfolio'

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.'),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),

  subject: z
    .string()
    .trim()
    .min(3, 'Please enter a subject.'),

  message: z
    .string()
    .trim()
    .min(
      10,
      'Please write at least 10 characters.',
    ),
})

type ContactFormValues = z.infer<
  typeof contactSchema
>

type Web3FormsResponse = {
  success?: boolean
  message?: string
}

type SubmissionStatus = {
  type: 'idle' | 'success' | 'error'
  message: string
}

export function ContactSection() {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>({
      type: 'idle',
      message: '',
    })

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (
    values: ContactFormValues,
  ) => {
    setSubmissionStatus({
      type: 'idle',
      message: '',
    })

    const accessKey =
      import.meta.env
        .VITE_WEB3FORMS_ACCESS_KEY?.trim()

    if (!accessKey) {
      setSubmissionStatus({
        type: 'error',
        message:
          'Contact form access key is missing. Please add VITE_WEB3FORMS_ACCESS_KEY to the environment variables.',
      })

      return
    }

    try {
      const formData = new FormData()

      formData.append('access_key', accessKey)

      formData.append(
        'name',
        values.name.trim(),
      )

      formData.append(
        'email',
        values.email.trim(),
      )

      formData.append(
        'replyto',
        values.email.trim(),
      )

      formData.append(
        'subject',
        `Portfolio Contact: ${values.subject.trim()}`,
      )

      formData.append(
        'message',
        values.message.trim(),
      )

      formData.append(
        'Website',
        'mdnazmusshakib.me',
      )

      formData.append(
        'Page URL',
        window.location.href,
      )

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData,
        },
      )

      const data =
        (await response.json()) as Web3FormsResponse

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            'The message could not be sent.',
        )
      }

      reset()

      setSubmissionStatus({
        type: 'success',
        message:
          'Your message was sent successfully. Thank you for contacting me!',
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
        description="Send a message using the form below. Your message will be delivered directly to my email inbox."
        align="center"
      />

      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
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
                Contact me regarding web development,
                Laravel applications, API integration,
                internships, collaborations, or graduate
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

            <div className="mt-auto pt-8">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Direct email delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Form submissions will arrive in my
                      registered email inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact form */}
        <Card className="relative overflow-hidden border-border/60 bg-card/75 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
          />

          <CardContent className="relative p-6 sm:p-8">
            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
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
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={Boolean(
                      errors.name,
                    )}
                    {...register('name')}
                    className="h-12 rounded-xl bg-background/60"
                  />

                  {errors.name ? (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  ) : null}
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
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(
                      errors.email,
                    )}
                    {...register('email')}
                    className="h-12 rounded-xl bg-background/60"
                  />

                  {errors.email ? (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  ) : null}
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
                  type="text"
                  placeholder="Project inquiry"
                  aria-invalid={Boolean(
                    errors.subject,
                  )}
                  {...register('subject')}
                  className="h-12 rounded-xl bg-background/60"
                />

                {errors.subject ? (
                  <p className="text-sm text-destructive">
                    {errors.subject.message}
                  </p>
                ) : null}
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
                  placeholder="Tell me about your project, timeline, and goals."
                  rows={7}
                  aria-invalid={Boolean(
                    errors.message,
                  )}
                  {...register('message')}
                  className="resize-y rounded-xl bg-background/60"
                />

                {errors.message ? (
                  <p className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              {submissionStatus.type !==
              'idle' ? (
                <div
                  role="status"
                  className={
                    submissionStatus.type ===
                    'success'
                      ? 'rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm leading-6 text-foreground'
                      : 'rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm leading-6 text-foreground'
                  }
                >
                  {submissionStatus.message}
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