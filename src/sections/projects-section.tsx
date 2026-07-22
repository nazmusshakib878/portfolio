import {
  ArrowUpRight,
  Code2,
  Database,
} from 'lucide-react'

import { motion } from 'motion/react'

import { ProjectCard } from '@/components/common/project-card'
import { SectionHeading } from '@/components/common/section-heading'
import { portfolioData } from '@/data/portfolio'

export function ProjectsSection() {
  const projectCount = portfolioData.projects.length

  const liveProjectCount =
    portfolioData.projects.filter(
      (project) => project.liveUrl,
    ).length

  const technologyCount = new Set(
    portfolioData.projects.flatMap(
      (project) => project.technologies,
    ),
  ).size

  return (
    <section
      id="projects"
      className="scroll-mt-[7.5rem] space-y-10 lg:scroll-mt-40"
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects designed around real problems and practical solutions."
        description="Explore selected academic, industrial training, and internship projects with direct repository access and a live demonstration where available."
        align="center"
      />

      {/* Project overview */}
      <div className="grid gap-3 sm:grid-cols-3">
        <motion.div
          whileHover={{
            y: -4,
          }}
          className="rounded-2xl border border-border/60 bg-background/55 p-4 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Code2 className="size-5" />
            </span>

            <div>
              <p className="text-xl font-semibold text-foreground">
                {projectCount}
              </p>

              <p className="text-xs text-muted-foreground">
                Selected Projects
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -4,
          }}
          className="rounded-2xl border border-border/60 bg-background/55 p-4 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="size-5" />
            </span>

            <div>
              <p className="text-xl font-semibold text-foreground">
                {liveProjectCount}
              </p>

              <p className="text-xs text-muted-foreground">
                Live Demonstration
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -4,
          }}
          className="rounded-2xl border border-border/60 bg-background/55 p-4 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Database className="size-5" />
            </span>

            <div>
              <p className="text-xl font-semibold text-foreground">
                {technologyCount}+
              </p>

              <p className="text-xs text-muted-foreground">
                Technologies Used
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}