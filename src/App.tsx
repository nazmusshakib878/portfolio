import { AboutSection } from '@/sections/about-section'
import { AchievementsSection } from '@/sections/achievements-section'
import { CertificationsSection } from '@/sections/certifications-section'
import { ContactSection } from '@/sections/contact-section'
import { EducationSection } from '@/sections/education-section'
import { ExperienceSection } from '@/sections/experience-section'
import { GithubSection } from '@/sections/github-section'
import { HeroSection } from '@/sections/hero-section'
import { ProjectsSection } from '@/sections/projects-section'
import { ResumeSection } from '@/sections/resume-section'
import { SkillsSection } from '@/sections/skills-section'
import { SiteShell } from '@/layouts/site-shell'
import { useActiveSection } from '@/hooks/use-active-section'
import { portfolioData } from '@/data/portfolio'

const sectionIds = [
  'hero',
  ...portfolioData.navLinks.map((link) => link.href.slice(1)),
  'achievements',
  'certifications',
  'github',
  'resume',
]

function App() {
  const activeSection = useActiveSection(sectionIds)

  return (
    <SiteShell activeSection={activeSection}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <AchievementsSection />
      <CertificationsSection />
      <GithubSection />
      <ResumeSection />
      <ContactSection />
    </SiteShell>
  )
}

export default App