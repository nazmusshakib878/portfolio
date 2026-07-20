import { LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Please add a subject.'),
  message: z.string().min(10, 'Please add a longer message.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    reset()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Contact"
        title="Reach out using the real contact details below."
        description="The form is validated on the client, and the direct email and phone links stay visible for immediate contact."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <div className="font-heading text-lg font-semibold text-foreground">Let&apos;s talk</div>
            <p className="text-sm leading-7 text-muted-foreground">{portfolioData.heroDescription}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>{portfolioData.location}</div>
              <a className="block underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60" href={`tel:${portfolioData.phone}`}>
                {portfolioData.phone}
              </a>
              <a className="block underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60" href={`mailto:${portfolioData.email}`}>
                {portfolioData.email}
              </a>
            </div>
            {submitted ? (
              <div className="rounded-2xl border border-border/60 bg-emerald-500/10 p-4 text-sm leading-7 text-foreground">
                Form validation passed. Send this message through the email workflow you connect later.
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4 text-sm leading-7 text-muted-foreground">
                Messages are validated on the client first so the form stays usable even before email integration is added.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <Input id="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} {...register('name')} />
                  {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} {...register('email')} />
                  {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <Input id="subject" placeholder="Project inquiry" aria-invalid={Boolean(errors.subject)} {...register('subject')} />
                {errors.subject ? <p className="text-sm text-destructive">{errors.subject.message}</p> : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <Textarea id="message" placeholder="Tell me about your project, timeline, and goals." rows={6} aria-invalid={Boolean(errors.message)} {...register('message')} />
                {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
              </div>

              <Button type="submit" size="lg" className="rounded-full px-5" disabled={isSubmitting}>
                {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Send />}
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}