import { ArrowUp, Code2, Mail, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/common/container'
import { portfolioData } from '@/data/portfolio'

export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/70 py-10 backdrop-blur-sm">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="font-heading text-lg font-semibold text-foreground">{portfolioData.name}</div>
            <p className="text-sm text-muted-foreground">{portfolioData.primaryRole}</p>
            <p className="text-xs text-muted-foreground">© {currentYear}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-muted-foreground hover:text-foreground" render={<a href={portfolioData.githubUrl} target="_blank" rel="noreferrer" />}>
              <Code2 />
              GitHub
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-muted-foreground hover:text-foreground" render={<a href={`mailto:${portfolioData.email}`} />}>
              <Mail />
              Email
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-muted-foreground hover:text-foreground" render={<a href={`tel:${portfolioData.phone}`} />}>
              <Phone />
              Phone
            </Button>
            <Button variant="outline" size="icon-sm" className="rounded-full border-border/70 bg-background/80" aria-label="Back to top" render={<a href="#hero" />}>
              <ArrowUp />
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  )
}