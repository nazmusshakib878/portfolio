'use client'

import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { Reveal } from '@/components/ui/reveal'
import { CopyEmailButton } from '@/components/ui/copy-email-button'
import { portfolioData } from '@/data/portfolio'
import { socialLinks } from '@/constants/social-links'

const projectTypeOptions = [
  'Full-Time / Engineering Role',
  'Laravel Backend Development',
  'Full Stack Web Application',
  'Next.js & React Frontend',
  'AI API Integration',
  'Technical Consultation / Other',
] as const

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  projectType: z.string().min(1, 'Please select an inquiry topic.'),
  message: z.string().trim().min(10, 'Please write at least 10 characters.').max(1000, 'Maximum 1000 characters.'),
  company: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof schema>

export function ContactSection() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="shell relative">
        {/* Section Header */}
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">13 / Contact &amp; Inquiries</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Let&apos;s discuss your engineering needs, open roles, or project requirements.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-[#d9dee7] mb-3">
                <Sparkles size={13} className="text-[#69e6cd]" />
                <span>Start a Conversation</span>
              </div>
              <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                Have an opportunity <span className="text-[#9aa6b7]">or project in mind?</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[.78fr_1.22fr]">
          {/* Left Column: Direct Contact Methods */}
          <Reveal>
            <aside className="flex h-full flex-col justify-between rounded-[26px] border border-white/10 bg-[rgba(15,18,25,0.78)] p-6 sm:p-8 backdrop-blur-xl">
              <div>
                <p className="eyebrow text-[#69e6cd]">Direct Channels</p>
                <h3 className="display mt-2 text-xl sm:text-2xl font-bold text-[#f2f3f7]">
                  Let&apos;s connect
                </h3>
                <p className="muted mt-2 text-xs sm:text-sm leading-relaxed">
                  Whether you have an open engineering role, an upcoming project, or a technical inquiry, reach out through any of these verified channels.
                </p>

                <div className="mt-7 space-y-3">
                  {/* 1. Email Channel + Copy Button */}
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-white/20">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(43,217,181,0.08)] text-[#69e6cd]">
                          <Mail size={18} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
                            Email Address
                          </p>
                          <a
                            href={`mailto:${portfolioData.email}`}
                            className="text-xs sm:text-sm font-semibold text-[#f2f3f7] hover:text-[#69e6cd] transition"
                          >
                            {portfolioData.email}
                          </a>
                        </div>
                      </div>
                      <CopyEmailButton variant="badge" />
                    </div>
                  </div>

                  {/* 2. WhatsApp Direct Link */}
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-emerald-500/30 hover:bg-emerald-500/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:scale-105">
                        <FaWhatsapp size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
                          WhatsApp
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-[#f2f3f7] group-hover:text-emerald-400 transition">
                          Direct Instant Message
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#747b8b] group-hover:text-emerald-400 transition" />
                  </a>

                  {/* 3. LinkedIn Profile Link */}
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-[rgba(168,130,255,0.3)] hover:bg-[rgba(168,130,255,0.04)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(168,130,255,0.1)] text-[#c4b5fd] transition group-hover:scale-105">
                        <FaLinkedinIn size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
                          LinkedIn
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-[#f2f3f7] group-hover:text-[#c4b5fd] transition">
                          Professional Profile
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#747b8b] group-hover:text-[#c4b5fd] transition" />
                  </a>

                  {/* 4. GitHub Profile Link */}
                  <a
                    href={portfolioData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white transition group-hover:scale-105">
                        <FaGithub size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
                          GitHub
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-[#f2f3f7] group-hover:text-white transition">
                          @nazmusshakib878
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#747b8b] group-hover:text-white transition" />
                  </a>
                </div>
              </div>

              {/* Location & Timezone Indicator */}
              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="flex items-center gap-3 text-[#aeb6c3]">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.04] text-[#69e6cd]">
                    <MapPin size={15} />
                  </span>
                  <div className="text-xs">
                    <p className="font-semibold text-[#f2f3f7]">{portfolioData.location}</p>
                    <p className="text-[#747b8b] text-[11px]">UTC+6 &middot; Remote &amp; Global Availability</p>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* Right Column: Upgraded Validated Form */}
          <Reveal>
            <div className="rounded-[26px] border border-[rgba(124,92,255,0.2)] bg-[rgba(17,15,27,0.78)] p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="mb-7">
                <p className="eyebrow text-[#c4b8ff]">Send a Message</p>
                <h3 className="display mt-1 text-xl sm:text-2xl font-bold text-[#f2f3f7]">
                  Get in touch
                </h3>
                <p className="muted mt-1.5 text-xs sm:text-sm">
                  Fill in your details below and I will get back to you promptly.
                </p>
              </div>

              <ContactFormDetailed />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactFormDetailed() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      projectType: 'Full-Time / Engineering Role',
      message: '',
      company: '',
    },
  })

  const [status, setStatus] = useState<{ kind: 'idle' | 'ok' | 'error'; message: string }>({
    kind: 'idle',
    message: '',
  })

  async function submit(values: FormValues) {
    setStatus({ kind: 'idle', message: '' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          projectType: values.projectType,
          subject: `Inquiry: ${values.projectType}`,
          message: values.message,
          company: values.company,
        }),
      })

      const body = (await response.json().catch(() => ({}))) as {
        success?: boolean
        message?: string
        clientFallback?: boolean
        key?: string
      }

      if (!response.ok) {
        throw new Error(
          typeof body.message === 'string' && body.message.trim()
            ? body.message.trim()
            : 'Message could not be sent. Please try again.'
        )
      }

      if (body.clientFallback && body.key) {
        const web3Response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: `Portfolio Contact: ${values.projectType}`,
            message: `[Inquiry Topic: ${values.projectType}]\n\n${values.message}`,
            access_key: body.key,
            from_name: 'Md. Nazmus Shakib Portfolio',
          }),
        })

        const web3Result = (await web3Response.json().catch(() => ({}))) as {
          success?: boolean
          message?: string
        }

        if (!web3Response.ok || !web3Result.success) {
          throw new Error(
            typeof web3Result.message === 'string' && web3Result.message.trim()
              ? web3Result.message.trim()
              : 'Delivery failed. Please use the direct email button.'
          )
        }
      }

      setStatus({
        kind: 'ok',
        message: 'Your message was sent successfully! I will review your requirements and respond promptly.',
      })
      reset()
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Message delivery failed. Please try direct email.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      {/* Honeypot hidden field */}
      <input {...register('company')} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* 1. Name & Email Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="contact-name" label="Your Name" error={errors.name?.message}>
          <input
            {...register('name')}
            id="contact-name"
            autoComplete="name"
            placeholder="Your name or organization"
            aria-describedby={errors.name?.message ? 'contact-name-error' : undefined}
            aria-invalid={!!errors.name?.message}
            className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#2bd9b5]/70 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#2bd9b5]/30 focus:outline-none transition"
          />
        </FormField>

        <FormField id="contact-email" label="Your Email" error={errors.email?.message}>
          <input
            {...register('email')}
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="your.email@example.com"
            aria-describedby={errors.email?.message ? 'contact-email-error' : undefined}
            aria-invalid={!!errors.email?.message}
            className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#2bd9b5]/70 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#2bd9b5]/30 focus:outline-none transition"
          />
        </FormField>
      </div>

      {/* 2. Inquiry Type Dropdown */}
      <FormField id="contact-project-type" label="Inquiry Topic" error={errors.projectType?.message}>
        <div className="relative">
          <select
            {...register('projectType')}
            id="contact-project-type"
            aria-describedby={errors.projectType?.message ? 'contact-project-type-error' : undefined}
            aria-invalid={!!errors.projectType?.message}
            className="w-full appearance-none rounded-xl border border-white/10 bg-[#0f1219] px-4 py-3 text-sm text-[#f2f3f7] focus:border-[#2bd9b5]/70 focus:ring-1 focus:ring-[#2bd9b5]/30 focus:outline-none transition pr-10"
          >
            {projectTypeOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0f1219] text-[#f2f3f7]">
                {opt}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#747b8b]">
            <ChevronDown size={16} />
          </span>
        </div>
      </FormField>

      {/* 3. Message Area */}
      <FormField id="contact-message" label="Your Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          id="contact-message"
          rows={5}
          placeholder="Share details about the role, project goals, timeline, or engineering inquiry..."
          aria-describedby={errors.message?.message ? 'contact-message-error' : undefined}
          aria-invalid={!!errors.message?.message}
          className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#2bd9b5]/70 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#2bd9b5]/30 focus:outline-none transition"
        />
      </FormField>

      {/* Feedback Banner */}
      {status.kind !== 'idle' && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-medium ${
            status.kind === 'ok'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {status.kind === 'ok'
            ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            : <XCircle size={16} className="shrink-0 mt-0.5" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          disabled={isSubmitting}
          className="button primary min-w-[200px] justify-center rounded-xl py-3 px-6 text-xs font-semibold"
          type="submit"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" size={16} />
              <span>Sending message...</span>
            </>
          ) : (
            <>
              <Send size={15} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  const errorId = `${id}-error`

  return (
    <div className="block min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-[#aeb6c3] mb-2">
        {label}
      </label>
      {children}
      {error && (
        <span id={errorId} role="alert" className="mt-1.5 block text-xs font-medium text-red-300">
          {error}
        </span>
      )}
    </div>
  )
}
