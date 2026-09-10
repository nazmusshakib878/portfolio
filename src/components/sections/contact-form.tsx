'use client'

import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoaderCircle, Send } from 'lucide-react'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Enter a valid email.'),
  subject: z.string().trim().min(3, 'Add a short subject.'),
  message: z.string().trim().min(10, 'Please write at least 10 characters.').max(1000),
  company: z.string().max(0).optional(),
})

type Values = z.infer<typeof schema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '', company: '' },
  })
  const [status, setStatus] = useState<{ kind: 'idle' | 'ok' | 'error'; message: string }>({
    kind: 'idle',
    message: '',
  })

  async function submit(values: Values) {
    setStatus({ kind: 'idle', message: '' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
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
            subject: `Portfolio Contact: ${values.subject}`,
            message: values.message,
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
              : 'Delivery failed. Please use the email link.'
          )
        }
      }

      setStatus({
        kind: 'ok',
        message:
          typeof body.message === 'string' && body.message.trim()
            ? body.message.trim()
            : 'Your message was sent successfully. I will respond as soon as possible.',
      })
      reset()
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Message could not be sent.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="min-w-0 space-y-4" noValidate>
      {/* Honeypot hidden field */}
      <input {...register('company')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <input {...register('name')} id="contact-name" autoComplete="name" placeholder="Your name" />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <input {...register('email')} id="contact-email" type="email" autoComplete="email" placeholder="your@email.com" />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" error={errors.subject?.message}>
        <input {...register('subject')} id="contact-subject" placeholder="Project discussion / Opportunity" />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <textarea {...register('message')} id="contact-message" rows={5} placeholder="Tell me about your project..." />
      </Field>

      {/* Always rendered so screen readers catch dynamic updates */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={status.kind === 'ok' ? 'text-sm text-[#2bd9b5]' : status.kind === 'error' ? 'text-sm text-red-300' : 'sr-only'}
      >
        {status.message}
      </p>

      <button
        disabled={isSubmitting}
        className="button primary min-w-[180px] justify-center sm:w-auto"
        type="submit"
      >
        {isSubmitting ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />}{' '}
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}

function Field({
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
    <div className="block min-w-0 text-sm font-semibold text-[#dfe3ea]">
      <label htmlFor={id}>{label}</label>
      <span className="mt-2 block min-w-0 [&_input]:box-border [&_input]:min-w-0 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-white/[.035] [&_input]:px-4 [&_input]:py-3.5 [&_input]:text-white [&_input]:outline-none [&_input]:transition [&_input]:focus:border-[#7c5cff] [&_input]:focus:bg-white/[.05] [&_textarea]:box-border [&_textarea]:min-w-0 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-white/[.035] [&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-white [&_textarea]:outline-none [&_textarea]:transition [&_textarea]:focus:border-[#7c5cff] [&_textarea]:focus:bg-white/[.05]">
        {children}
      </span>
      {error && (
        <span id={errorId} role="alert" className="mt-2 block text-xs text-red-300">
          {error}
        </span>
      )}
    </div>
  )
}
