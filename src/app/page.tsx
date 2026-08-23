import {
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  FileText,
  FlaskConical,
  GitBranch,
  GraduationCap,
  MapPin,
  Phone,
  Presentation,
  Users,
} from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { ContactForm } from '@/components/sections/contact-form'
import { ProjectSlider } from '@/components/sections/project-slider'
import { SkillsExplorer } from '@/components/sections/skills-explorer'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { IntroLoader } from '@/components/ui/intro-loader'
import { Reveal } from '@/components/ui/reveal'
import { CopyEmailButton } from '@/components/ui/copy-email-button'
import { portfolioData } from '@/data/portfolio'

const strengthIcons = [Users, FlaskConical, FileText, Presentation]

export default function Home() {
  return (
    <>
      <IntroLoader />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <ProjectSlider />

        <section id="publications" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">Publications</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    Technical writing connected to documented software engineering work.
                  </p>
                </div>
                <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                  Project work, preserved as a <span className="text-[#7f8b98]">technical record.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 lg:mt-16">
              {portfolioData.publications.map((publication, index) => (
                <Reveal key={publication.doi}>
                  <article className="overflow-hidden rounded-[24px] border border-[rgba(124,92,255,.24)] bg-[rgba(17,15,27,.72)] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[rgba(124,92,255,.4)] hover:shadow-[0_24px_70px_rgba(0,0,0,.25)] sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex size-11 items-center justify-center rounded-xl border border-[rgba(124,92,255,.26)] bg-[rgba(124,92,255,.1)] text-[#aa96ff]">
                            <FileText aria-hidden="true" size={20} />
                          </span>
                          <span className="rounded-full border border-[rgba(43,217,181,.2)] bg-[rgba(43,217,181,.07)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#69e6cd]">
                            Published on {publication.publisher}
                          </span>
                          <span className="display ml-auto text-xl font-semibold text-white/20">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="eyebrow mt-7 text-[#aa96ff]">
                          {publication.type} · Version {publication.version}
                        </p>
                        <h3 className="display mt-4 max-w-4xl text-[clamp(1.8rem,3.8vw,3.4rem)] font-semibold text-[#f2f3f7]">
                          {publication.title}
                        </h3>
                        <p className="muted mt-5 break-all text-sm">DOI: {publication.doi}</p>
                      </div>
                      <a
                        className="button primary w-full justify-center lg:w-auto"
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View publication <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">02 / Experience</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    Practical work, responsibilities and the tools used to deliver it.
                  </p>
                </div>
                <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                  Real work, described <span className="text-[#7f8b98]">without inflation.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 space-y-5 lg:mt-16">
              {portfolioData.experience.map((item, index) => (
                <Reveal key={item.company}>
                  <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(15,18,25,.76)] backdrop-blur-md transition duration-300 hover:border-[rgba(124,92,255,.34)] hover:shadow-[0_24px_70px_rgba(0,0,0,.25)]">
                    <div className="grid lg:grid-cols-[.34fr_1fr]">
                      <aside className="border-b border-white/10 bg-white/[.025] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                        <div className="flex items-center justify-between gap-4">
                          <span className="flex size-12 items-center justify-center rounded-2xl border border-[rgba(124,92,255,.28)] bg-[rgba(124,92,255,.1)] text-[#aa96ff]">
                            <BriefcaseBusiness aria-hidden="true" size={21} />
                          </span>
                          <span className="display text-2xl font-semibold text-white/25">0{index + 1}</span>
                        </div>
                        <div className="mt-10 space-y-6">
                          <div className="flex gap-3">
                            <CalendarDays aria-hidden="true" className="mt-0.5 shrink-0 text-[#69e6cd]" size={17} />
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#7f8b98]">Period</p>
                              <p className="mt-2 text-sm leading-6 text-[#d9dee7]">{item.period}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-[#69e6cd]" size={17} />
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#7f8b98]">Location</p>
                              <p className="mt-2 text-sm text-[#d9dee7]">{item.location}</p>
                            </div>
                          </div>
                        </div>
                      </aside>

                      <div className="p-6 sm:p-8 lg:p-10 lg:pl-12">
                        <p className="eyebrow">{item.company}</p>
                        <h3 className="display mt-4 text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold text-[#f2f3f7]">
                          {item.role}
                        </h3>
                        <p className="muted mt-6 max-w-3xl text-base leading-8">{item.summary}</p>

                        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                          {item.responsibilities.map((line) => (
                            <li
                              key={line}
                              className="flex gap-3 rounded-xl border border-white/[.07] bg-white/[.025] p-3.5 text-sm leading-6 text-[#d9dee7]"
                            >
                              <Check aria-hidden="true" size={16} className="mt-1 shrink-0 text-[#2bd9b5]" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                          <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
                            {item.technologies.map((technology) => (
                              <li
                                key={technology}
                                className="rounded-full border border-[rgba(43,217,181,.16)] bg-[rgba(43,217,181,.06)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-[#69e6cd]"
                              >
                                {technology}
                              </li>
                            ))}
                          </ul>
                          {item.repositoryUrl && (
                            <a
                              className="button shrink-0"
                              href={item.repositoryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View repository <ArrowUpRight size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="eyebrow">Professional strengths</p>
                  <p className="muted mt-3 text-sm">Skills developed through collaborative technical work.</p>
                </div>
                <span className="display hidden text-2xl font-semibold text-white/20 sm:block">04 strengths</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {portfolioData.professionalStrengths.map((strength, index) => {
                  const Icon = strengthIcons[index]
                  return (
                    <article
                      key={strength.title}
                      className="group h-full rounded-[18px] border border-white/[.08] bg-white/[.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-[rgba(43,217,181,.25)] hover:bg-white/[.04]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(43,217,181,.18)] bg-[rgba(43,217,181,.07)] text-[#69e6cd]">
                          <Icon aria-hidden="true" size={18} />
                        </span>
                        <span className="display text-lg font-semibold text-white/20">0{index + 1}</span>
                      </div>
                      <h3 className="display mt-6 text-xl font-semibold text-[#f2f3f7]">{strength.title}</h3>
                      <p className="muted mt-3 text-xs leading-6">{strength.description}</p>
                    </article>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">03 / Core Skills</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    Production stack, daily engineering toolchain, and applied AI integrations.
                  </p>
                </div>
                <div>
                  <h2 className="display max-w-[900px] text-[clamp(2.6rem,4.8vw,4.8rem)] font-semibold text-[#f2f3f7]">
                    Production stack, built for <span className="text-[#7f8b98]">reliability &amp; scale.</span>
                  </h2>
                </div>
              </div>
            </Reveal>
          </div>
          <SkillsExplorer />
        </section>

        <section id="about" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-start">
                <div>
                  <p className="eyebrow">04 / About</p>
                  <p className="muted mt-4 max-w-[13rem] text-sm leading-6">
                    The thinking and foundations behind my work.
                  </p>
                </div>
                <h2 className="display max-w-[920px] text-[clamp(2.6rem,4.9vw,4.9rem)] font-semibold text-[#f2f3f7]">
                  Engineering the quiet parts that make products{' '}
                  <span className="text-[#7f8b98]">dependable.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-[1.12fr_.88fr]">
              <Reveal>
                <article className="h-full rounded-[24px] border border-white/10 bg-[rgba(15,18,25,.72)] p-6 backdrop-blur-md sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-2 rounded-full bg-[#2bd9b5] shadow-[0_0_18px_rgba(43,217,181,.7)]" />
                    <p className="eyebrow">About me</p>
                  </div>
                  <p className="mt-8 max-w-3xl text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.55] text-[#d9dee7]">
                    {portfolioData.bio}
                  </p>
                </article>
              </Reveal>

              <Reveal>
                <aside className="h-full rounded-[24px] border border-[rgba(43,217,181,.2)] bg-[rgba(10,20,22,.72)] p-6 backdrop-blur-md sm:p-8 lg:p-10">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <p className="eyebrow">Currently</p>
                      <p className="muted mt-2 text-sm">A quick view of where I am now.</p>
                    </div>
                    <span className="rounded-full border border-[rgba(43,217,181,.24)] bg-[rgba(43,217,181,.08)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#69e6cd]">
                      In progress
                    </span>
                  </div>
                  <dl className="mt-2 grid sm:grid-cols-2 lg:grid-cols-1">
                    {portfolioData.heroStats.map((item, index) => (
                      <div
                        key={item.label}
                        className={`group py-5 ${index % 2 === 0 ? 'sm:border-r sm:pr-5' : 'sm:pl-5'} border-b border-white/10 last:border-b-0 lg:border-r-0 lg:px-0`}
                      >
                        <dt className="muted text-xs uppercase tracking-[.12em]">{item.label}</dt>
                        <dd className="display mt-3 text-[clamp(1.55rem,2.8vw,2.25rem)] font-semibold text-[#f4f6f8] transition-colors group-hover:text-[#69e6cd]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="education" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">05 / Education &amp; proof</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    Academic foundations, verified training and applied achievements.
                  </p>
                </div>
                <h2 className="display max-w-[880px] text-[clamp(2.5rem,4.6vw,4.6rem)] font-semibold text-[#f2f3f7]">
                  Learning backed by <span className="text-[#7f8b98]">applied work.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-[1.05fr_.95fr]">
              <div className="space-y-4">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(43,217,181,.2)] bg-[rgba(43,217,181,.07)] text-[#69e6cd]">
                    <GraduationCap aria-hidden="true" size={19} />
                  </span>
                  <p className="eyebrow">Education</p>
                </div>
                {portfolioData.education.map((item, index) => (
                  <Reveal key={item.title}>
                    <article className="group rounded-[22px] border border-white/10 bg-[rgba(15,18,25,.7)] p-6 transition duration-300 hover:border-[rgba(43,217,181,.26)] hover:bg-[rgba(17,23,29,.88)] sm:p-7">
                      <div className="flex items-start justify-between gap-5">
                        <p className="eyebrow">
                          {item.year ?? (item.graduation ? 'Expected Graduation: ' + item.graduation : item.status)}
                        </p>
                        <span className="display text-xl font-semibold text-white/20">0{index + 1}</span>
                      </div>
                      <h3 className="display mt-4 text-[clamp(1.55rem,2.5vw,2.25rem)] font-semibold text-[#f2f3f7]">
                        {item.title}
                      </h3>
                      <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                        <p className="muted leading-6">
                          {item.institution} · {item.location}
                        </p>
                        {item.cgpa && (
                          <p className="shrink-0 rounded-full border border-[rgba(43,217,181,.18)] bg-[rgba(43,217,181,.06)] px-3 py-1.5 text-xs font-semibold text-[#69e6cd]">
                            GPA / CGPA {item.cgpa}
                          </p>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-[rgba(240,180,91,.22)] bg-[rgba(240,180,91,.08)] text-[#f0b45b]">
                    <Award aria-hidden="true" size={18} />
                  </span>
                  <p className="eyebrow text-[#f0b45b]">Certification &amp; achievements</p>
                </div>
                {portfolioData.certifications.map((cert) => (
                  <Reveal key={cert.certificateId}>
                    <article className="rounded-[22px] border border-[rgba(240,180,91,.2)] bg-[rgba(28,22,14,.58)] p-6 sm:p-7">
                      <div className="flex items-start gap-4">
                        <BookOpen aria-hidden="true" className="mt-1 shrink-0 text-[#f0b45b]" size={21} />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#f0b45b]">
                            Verified training · {cert.duration}
                          </p>
                          <h3 className="display mt-3 text-[clamp(1.65rem,2.7vw,2.45rem)] font-semibold text-[#f2f3f7]">
                            {cert.title}
                          </h3>
                          <p className="muted mt-4 text-sm leading-7">
                            {cert.provider}
                            <br />
                            {cert.program}
                          </p>
                        </div>
                      </div>
                      <a
                        className="button mt-6"
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify certificate <ArrowUpRight size={15} />
                      </a>
                    </article>
                  </Reveal>
                ))}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {portfolioData.achievements.map((item, index) => (
                    <Reveal key={item.title}>
                      <article className="h-full rounded-[18px] border border-white/[.08] bg-white/[.025] p-5 transition duration-300 hover:border-[rgba(124,92,255,.28)] hover:bg-white/[.04]">
                        <span className="display text-lg font-semibold text-[#aa96ff]">0{index + 1}</span>
                        <h3 className="mt-4 font-semibold leading-6 text-[#f2f3f7]">{item.title}</h3>
                        <p className="muted mt-2 text-xs leading-6">{item.description}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">06 / Process</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    A focused workflow that keeps every stage clear and traceable.
                  </p>
                </div>
                <h2 className="display max-w-[900px] text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold text-[#f2f3f7]">
                  A clear path from question to <span className="text-[#7f8b98]">reliable delivery.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {[
                { icon: BookOpen, title: 'Understand', text: 'Clarify users, workflows, constraints and data.' },
                { icon: GitBranch, title: 'Design', text: 'Shape the schema, architecture and interface states.' },
                { icon: Code2, title: 'Develop', text: 'Implement focused increments with traceable changes.' },
                { icon: Check, title: 'Test & deliver', text: 'Verify behavior, integrity, access and deployment.' },
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <Reveal key={step.title}>
                    <article className="group flex h-full min-h-[255px] flex-col rounded-[22px] border border-white/10 bg-[rgba(15,18,25,.7)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(43,217,181,.28)] hover:bg-[rgba(17,23,29,.9)] hover:shadow-[0_20px_55px_rgba(0,0,0,.22)]">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex size-11 items-center justify-center rounded-xl border border-[rgba(43,217,181,.2)] bg-[rgba(43,217,181,.07)] text-[#69e6cd] transition duration-300 group-hover:scale-105 group-hover:bg-[rgba(43,217,181,.12)]">
                          <Icon aria-hidden="true" size={19} />
                        </span>
                        <span className="display text-2xl font-semibold text-white/20">0{index + 1}</span>
                      </div>
                      <div className="mt-auto pt-10">
                        <h3 className="display text-[clamp(1.6rem,2.3vw,2.15rem)] font-semibold text-[#f2f3f7]">
                          {step.title}
                        </h3>
                        <p className="muted mt-4 text-sm leading-7">{step.text}</p>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section relative overflow-hidden">
          <div className="shell relative">
            <Reveal>
              <div className="grid gap-7 lg:grid-cols-[.32fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow">07 / Contact</p>
                  <p className="muted mt-4 max-w-[14rem] text-sm leading-6">
                    For projects, internships, collaboration or new opportunities.
                  </p>
                </div>
                <h2 className="display max-w-[880px] text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold text-[#f2f3f7]">
                  Let&apos;s build something <span className="text-[#7f8b98]">reliable.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-[.72fr_1.28fr]">
              <Reveal>
                <aside className="h-full rounded-[24px] border border-white/10 bg-[rgba(15,18,25,.7)] p-6 sm:p-8">
                  <p className="eyebrow">Direct contact</p>
                  <p className="muted mt-4 max-w-sm text-sm leading-7">
                    Prefer email or phone? Use any of the details below and I will respond promptly.
                  </p>
                  <div className="mt-8 space-y-3">
                    <CopyEmailButton variant="card" />
                    <a
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[.08] bg-white/[.025] p-4 transition hover:border-[rgba(43,217,181,.25)] hover:bg-white/[.04]"
                      href={`tel:${portfolioData.phone}`}
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(43,217,181,.08)] text-[#69e6cd]">
                          <Phone aria-hidden="true" size={18} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">Phone</p>
                          <p className="text-sm text-[#d9dee7]">{portfolioData.phone}</p>
                        </div>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 rounded-2xl border border-white/[.08] bg-white/[.025] p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(43,217,181,.08)] text-[#69e6cd]">
                        <MapPin aria-hidden="true" size={18} />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7f8b98]">Location</p>
                        <p className="text-sm text-[#d9dee7]">{portfolioData.location}</p>
                      </div>
                    </div>
                  </div>
                </aside>
              </Reveal>

              <Reveal>
                <div className="rounded-[24px] border border-[rgba(124,92,255,.2)] bg-[rgba(17,15,27,.72)] p-6 sm:p-8">
                  <div className="mb-7">
                    <p className="eyebrow text-[#aa96ff]">Send a message</p>
                    <p className="muted mt-3 text-sm">Share a few details and I will get back to you.</p>
                  </div>
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
