import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl space-y-3', align === 'center' && 'mx-auto text-center', className)}>
      <p className="inline-flex w-fit items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground shadow-sm">
        {eyebrow}
      </p>
      <h2 className="font-heading text-gradient text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </div>
  )
}