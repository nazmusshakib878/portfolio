import { Sparkles } from 'lucide-react'

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
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'relative max-w-4xl',
        centered && 'mx-auto text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3',
          centered && 'justify-center',
        )}
      >
        <span className="h-px w-8 bg-gradient-to-r from-sky-500 to-cyan-400" />

        <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sky-700 shadow-sm backdrop-blur-xl dark:text-sky-300">
          <Sparkles className="size-3.5" />

          {eyebrow}
        </p>

        <span className="h-px w-8 bg-gradient-to-l from-violet-500 to-cyan-400" />
      </div>

      <h2 className="mt-5 font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p
        className={cn(
          'mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8',
          centered && 'mx-auto',
        )}
      >
        {description}
      </p>
    </div>
  )
}