import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => Boolean(element))

    const getHeaderOffset = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        return 128
      }

      return 112
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + getHeaderOffset() + 24
      let currentSection = sectionIds[0] ?? ''

      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          currentSection = section.id
        }
      }

      setActiveSection(currentSection)
    }

    let animationFrame = 0

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [sectionIds])

  return activeSection
}