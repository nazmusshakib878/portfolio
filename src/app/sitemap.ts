import type { MetadataRoute } from 'next'
import { portfolioData, projectSlug } from '@/data/portfolio'
import { getAllBlogPosts } from '@/data/blog-posts'
import { getSiteUrl } from '@/lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const blogPosts = getAllBlogPosts()

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.8 },
    ...portfolioData.projects.map((project) => ({
      url: `${base}/projects/${projectSlug(project.title)}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      priority: 0.7,
    })),
  ]
}

