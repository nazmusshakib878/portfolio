import type { MetadataRoute } from 'next'
import { portfolioData,projectSlug } from '@/data/portfolio'
import { getSiteUrl } from '@/lib/site-url'

export default function sitemap():MetadataRoute.Sitemap{
  const base=getSiteUrl()
  return [
    {url:base,lastModified:new Date(),priority:1},
    ...portfolioData.projects.map(project=>({url:`${base}/projects/${projectSlug(project.title)}`,lastModified:new Date(),priority:.7})),
  ]
}
