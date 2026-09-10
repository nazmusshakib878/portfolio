import { Bot, Database, Layout, LayoutDashboard } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const services = [
  {
    number: '01',
    title: 'Backend Development',
    description: 'Building reliable backend systems, relational schemas, and secure APIs with Laravel.',
    icon: Database,
    skills: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Authentication'],
    accent: {
      iconBg: 'bg-[rgba(240,83,64,0.08)]',
      iconBorder: 'border-[rgba(240,83,64,0.22)]',
      iconText: 'text-[#ff9c90]',
      hoverBorder: 'hover:border-[rgba(240,83,64,0.38)]',
      badgeBorder: 'border-[rgba(240,83,64,0.18)] bg-[rgba(240,83,64,0.04)] text-[#ffb5ac]',
    },
  },
  {
    number: '02',
    title: 'Frontend Development',
    description: 'Creating modern, responsive, and type-safe interfaces with the React ecosystem.',
    icon: Layout,
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    accent: {
      iconBg: 'bg-[rgba(97,218,251,0.08)]',
      iconBorder: 'border-[rgba(97,218,251,0.22)]',
      iconText: 'text-[#7dd3fc]',
      hoverBorder: 'hover:border-[rgba(97,218,251,0.38)]',
      badgeBorder: 'border-[rgba(97,218,251,0.18)] bg-[rgba(97,218,251,0.04)] text-[#bae6fd]',
    },
  },
  {
    number: '03',
    title: 'AI Integration',
    description: 'Integrating practical OpenAI and Gemini AI capabilities and automations into web apps.',
    icon: Bot,
    skills: ['OpenAI API', 'Gemini API', 'AI Applications', 'Automation'],
    accent: {
      iconBg: 'bg-[rgba(168,130,255,0.08)]',
      iconBorder: 'border-[rgba(168,130,255,0.22)]',
      iconText: 'text-[#c4b5fd]',
      hoverBorder: 'hover:border-[rgba(168,130,255,0.38)]',
      badgeBorder: 'border-[rgba(168,130,255,0.18)] bg-[rgba(168,130,255,0.04)] text-[#ddd6fe]',
    },
  },
  {
    number: '04',
    title: 'Business Applications',
    description: 'Developing real-world management systems, booking workflows, and administrative dashboards.',
    icon: LayoutDashboard,
    skills: ['Management Systems', 'Booking Systems', 'Dashboards', 'Admin Panels'],
    accent: {
      iconBg: 'bg-[rgba(43,217,181,0.08)]',
      iconBorder: 'border-[rgba(43,217,181,0.22)]',
      iconText: 'text-[#69e6cd]',
      hoverBorder: 'hover:border-[rgba(43,217,181,0.38)]',
      badgeBorder: 'border-[rgba(43,217,181,0.18)] bg-[rgba(43,217,181,0.04)] text-[#a7f3d0]',
    },
  },
]

export function WhatIDo() {
  return (
    <section id="what-i-do" className="section relative overflow-hidden">
      <div className="shell relative">
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">What I Do</p>
              <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                Core solutions and technical capabilities I deliver for modern web products.
              </p>
            </div>
            <div>
              <h2 className="display max-w-[900px] text-[clamp(2.5rem,4.6vw,4.6rem)] font-semibold text-[#f2f3f7]">
                Engineering solutions from <span className="text-[#9aa6b7]">architecture to interface.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Reveal key={service.number}>
                <article
                  className={`group flex h-full flex-col justify-between rounded-[22px] border border-white/10 bg-[rgba(15,18,25,.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-[rgba(17,23,29,.9)] hover:shadow-[0_20px_50px_rgba(0,0,0,.28)] ${service.accent.hoverBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl border ${service.accent.iconBorder} ${service.accent.iconBg} ${service.accent.iconText} transition duration-300 group-hover:scale-105`}
                      >
                        <Icon aria-hidden="true" size={20} />
                      </span>
                      <span className="display text-xl font-semibold text-white/20 transition group-hover:text-white/35">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="display mt-6 text-xl font-semibold text-[#f2f3f7] transition group-hover:text-white sm:text-[22px]">
                      {service.title}
                    </h3>

                    <p className="muted mt-3 text-xs leading-6 sm:text-sm">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.07] pt-4">
                    <ul aria-label={`${service.title} technologies`} className="flex flex-wrap gap-1.5">
                      {service.skills.map((skill) => (
                        <li
                          key={skill}
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-medium transition ${service.accent.badgeBorder}`}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
