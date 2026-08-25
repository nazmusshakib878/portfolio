import {
  ArrowDown,
  Compass,
  Database,
  Globe,
  Layers,
  LayoutDashboard,
  Server,
  UserCheck,
} from 'lucide-react'

interface FlowStep {
  number: string
  label: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  accent: {
    border: string
    bg: string
    color: string
    badgeBg: string
  }
}

const flowSteps: FlowStep[] = [
  {
    number: '01',
    label: 'Client Initiation',
    title: 'User / Browser',
    description: 'User submits a form, clicks a link, or triggers an API request from the client.',
    icon: Globe,
    accent: {
      border: 'border-[rgba(97,218,251,0.3)]',
      bg: 'bg-[rgba(97,218,251,0.08)]',
      color: 'text-[#7dd3fc]',
      badgeBg: 'border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.06)] text-[#7dd3fc]',
    },
  },
  {
    number: '02',
    label: 'Request Mapping',
    title: 'Route (routes/web.php / api.php)',
    description: 'Laravel routing engine inspects the HTTP verb and URL, routing it to the targeted controller action.',
    icon: Compass,
    accent: {
      border: 'border-white/20',
      bg: 'bg-white/[0.05]',
      color: 'text-white',
      badgeBg: 'border-white/15 bg-white/[0.03] text-[#d9dee7]',
    },
  },
  {
    number: '03',
    label: 'Traffic Coordinator',
    title: 'Controller',
    description: 'Handles FormRequest validation, invokes business logic/services, and requests data from Models.',
    icon: Server,
    accent: {
      border: 'border-[rgba(240,83,64,0.3)]',
      bg: 'bg-[rgba(240,83,64,0.08)]',
      color: 'text-[#ff9c90]',
      badgeBg: 'border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.06)] text-[#ffb5ac]',
    },
  },
  {
    number: '04',
    label: 'Domain & Eloquent ORM',
    title: 'Model',
    description: 'Eloquent model encapsulates business rules, relationships (hasMany, belongsTo), and builds SQL queries.',
    icon: Layers,
    accent: {
      border: 'border-[rgba(168,130,255,0.3)]',
      bg: 'bg-[rgba(168,130,255,0.08)]',
      color: 'text-[#c4b5fd]',
      badgeBg: 'border-[rgba(168,130,255,0.25)] bg-[rgba(168,130,255,0.06)] text-[#ddd6fe]',
    },
  },
  {
    number: '05',
    label: 'Data Persistence',
    title: 'Database (MySQL)',
    description: 'MySQL executes transactional queries, fetches indexed rows, and returns normalized dataset records.',
    icon: Database,
    accent: {
      border: 'border-[rgba(43,217,181,0.3)]',
      bg: 'bg-[rgba(43,217,181,0.08)]',
      color: 'text-[#69e6cd]',
      badgeBg: 'border-[rgba(43,217,181,0.25)] bg-[rgba(43,217,181,0.06)] text-[#a7f3d0]',
    },
  },
  {
    number: '06',
    label: 'Presentation Layer',
    title: 'View / Response (Blade / JSON)',
    description: 'Controller feeds model data into a Blade template or formats a clean JSON payload with status headers.',
    icon: LayoutDashboard,
    accent: {
      border: 'border-[rgba(124,92,255,0.3)]',
      bg: 'bg-[rgba(124,92,255,0.08)]',
      color: 'text-[#aa96ff]',
      badgeBg: 'border-[rgba(124,92,255,0.25)] bg-[rgba(124,92,255,0.06)] text-[#c4b8ff]',
    },
  },
  {
    number: '07',
    label: 'Feedback Delivery',
    title: 'User / Browser',
    description: 'User receives the rendered HTML page or JSON data response in their browser with instant visual feedback.',
    icon: UserCheck,
    accent: {
      border: 'border-[rgba(43,217,181,0.35)]',
      bg: 'bg-[rgba(43,217,181,0.1)]',
      color: 'text-[#2bd9b5]',
      badgeBg: 'border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] text-[#2bd9b5]',
    },
  },
]

export function MvcArchitectureDiagram() {
  return (
    <section className="my-10 overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(11,14,21,0.85)] p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-2 text-[#69e6cd]">
          <Layers size={16} />
          <p className="eyebrow text-[#69e6cd]">Visual Architecture</p>
        </div>
        <h3 className="display mt-2 text-xl sm:text-2xl font-bold text-[#f2f3f7]">
          Laravel MVC Request &amp; Data Flow Lifecycle
        </h3>
        <p className="muted mt-1.5 text-xs sm:text-sm leading-relaxed">
          How an incoming request travels through Route, Controller, Model, Database, and View back to the User.
        </p>
      </div>

      {/* Sequential Flow Stack */}
      <div className="mx-auto mt-8 max-w-xl space-y-2">
        {flowSteps.map((step, index) => {
          const Icon = step.icon
          const isLast = index === flowSteps.length - 1

          return (
            <div key={`${step.number}-${step.title}`} className="flex flex-col items-center">
              {/* Step Card */}
              <div
                className={`w-full rounded-2xl border ${step.accent.border} bg-[rgba(15,18,25,0.72)] p-4 transition hover:border-white/25 hover:bg-[rgba(18,23,32,0.88)]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${step.accent.border} ${step.accent.bg} ${step.accent.color}`}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#747b8b]">
                          {step.number}
                        </span>
                        <span
                          className={`rounded-full border px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider ${step.accent.badgeBg}`}
                        >
                          {step.label}
                        </span>
                      </div>
                      <h4 className="display mt-0.5 text-sm sm:text-base font-bold text-[#f2f3f7]">
                        {step.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="muted mt-2 pl-12 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connecting Down Arrow */}
              {!isLast && (
                <div className="my-1 flex flex-col items-center">
                  <div className="h-2 w-px bg-white/20" />
                  <div className="flex size-5 items-center justify-center rounded-full border border-white/15 bg-[#090d15] text-[#2bd9b5] shadow-sm">
                    <ArrowDown size={10} />
                  </div>
                  <div className="h-2 w-px bg-white/20" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Explanatory Narrative Box Below Diagram */}
      <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-xs sm:text-[13px] leading-relaxed text-[#d9dee7]">
        <p className="font-semibold text-[#69e6cd] mb-1.5 text-xs uppercase tracking-wider">
          How Data Flows Through Laravel MVC:
        </p>
        <p className="muted text-[#d9dee7]">
          When a <strong className="text-white">User</strong> interacts with the application, their browser issues an HTTP request. The Laravel <strong className="text-white">Route</strong> layer matches the URL to a specific <strong className="text-white">Controller</strong>. The controller validates inputs and coordinates with the <strong className="text-white">Model</strong>, which queries the <strong className="text-white">MySQL Database</strong> using Eloquent ORM. Once the database returns records, the controller passes them to the <strong className="text-white">View</strong> (Blade or JSON serializer), which packages the response and sends it back to the <strong className="text-white">User</strong>.
        </p>
      </div>
    </section>
  )
}
