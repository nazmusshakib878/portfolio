import {
  ArrowUp,
  BriefcaseBusiness,
  Code2,
  Mail,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react'

import { Container } from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { socialLinks } from '@/constants/social-links'
import { portfolioData } from '@/data/portfolio'

export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-background/75 py-10 backdrop-blur-xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_35%)]"
      />

      <Container className="relative">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="font-heading text-lg font-semibold text-foreground">
              {portfolioData.name}
            </div>

            <p className="text-sm text-muted-foreground">
              Laravel · PHP · MySQL · REST APIs · React
            </p>

            <p className="text-xs text-muted-foreground">
              © {currentYear} {portfolioData.name}. All
              rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted-foreground hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400"
              render={
                <a
                  href={portfolioData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Code2 />
              GitHub
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted-foreground hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400"
              render={
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <BriefcaseBusiness />
              LinkedIn
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted-foreground hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
              render={
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Users />
              Facebook
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
              render={
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle />
              WhatsApp
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted-foreground hover:text-foreground"
              render={
                <a
                  href={`mailto:${portfolioData.email}`}
                />
              }
            >
              <Mail />
              Email
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted-foreground hover:text-foreground"
              render={
                <a
                  href={`tel:${portfolioData.phone}`}
                />
              }
            >
              <Phone />
              Phone
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full border-border/70 bg-background/80"
              aria-label="Back to top"
              render={<a href="#hero" />}
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  )
}