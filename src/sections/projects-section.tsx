import { SectionHeading } from '@/components/common/section-heading'
import { ProjectCard } from '@/components/common/project-card'
import { portfolioData } from '@/data/portfolio'

export function ProjectsSection() {
  const featuredProject = portfolioData.projects.find((project) => project.featured)
  const otherProjects = portfolioData.projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="scroll-mt-[7.5rem] lg:scroll-mt-40 space-y-10">
      <SectionHeading
        eyebrow="Projects"
        title="Featured projects backed by real repository links."
        description="The layout keeps the strongest project first while preserving a clear path to the rest of the work."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {featuredProject ? <ProjectCard project={featuredProject} /> : null}
        <div className="grid gap-6">
          {otherProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}