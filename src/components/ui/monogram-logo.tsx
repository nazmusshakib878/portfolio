interface MonogramLogoProps {
  className?: string
}

export function MonogramLogo({ className = '' }: MonogramLogoProps) {
  return (
    <div
      className={`group relative flex size-8.5 sm:size-9 items-center justify-center rounded-[11px] border border-white/15 bg-[#0f131c] shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(43,217,181,0.5)] hover:shadow-[0_4px_16px_rgba(43,217,181,0.22),inset_0_1px_0_rgba(255,255,255,0.2)] ${className}`}
    >
      {/* Subtle top inner glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] bg-[radial-gradient(circle_at_50%_0%,rgba(43,217,181,0.15),transparent_70%)]"
      />

      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-5.5 w-auto select-none transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ns-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="48%" stopColor="#f8fafc" />
            <stop offset="49%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#2bd9b5" />
          </linearGradient>
        </defs>

        <text
          x="18"
          y="25.5"
          textAnchor="middle"
          fill="url(#ns-logo-grad)"
          style={{
            fontFamily: 'var(--font-display), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: '19px',
            letterSpacing: '-0.04em',
          }}
        >
          NS
        </text>
      </svg>
    </div>
  )
}
