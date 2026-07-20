import { MoonStar, SunMedium } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = theme === 'system' ? resolvedTheme : theme
  const isDark = activeTheme === 'dark'

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-border/70 bg-background/80" aria-hidden="true" />
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="rounded-full border-border/70 bg-background/80 backdrop-blur-md"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunMedium /> : <MoonStar />}
    </Button>
  )
}