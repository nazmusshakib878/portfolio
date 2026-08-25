import { SmartBackLink } from '@/components/ui/smart-back-link'
import { ArrowLeft } from 'lucide-react'

interface LongFormReturnNavigationProps {
  primaryHref: string
  primaryLabel: string
  className?: string
}

export function LongFormReturnNavigation({
  primaryHref,
  primaryLabel,
  className = '',
}: LongFormReturnNavigationProps) {
  return (
    <div className={`mt-14 sm:mt-16 border-t border-white/[0.08] pt-10 text-center ${className}`}>
      <SmartBackLink
        href={primaryHref}
        className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs sm:text-sm font-semibold text-[#f2f3f7] shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(43,217,181,0.4)] hover:bg-white/[0.08] hover:text-white active:scale-95"
      >
        <ArrowLeft size={15} className="text-[#2bd9b5] transition-transform duration-200 group-hover:-translate-x-1" />
        <span>{primaryLabel}</span>
      </SmartBackLink>
    </div>
  )
}
