export interface BlogCodeBlock {
  language: string
  filename?: string
  code: string
}

export interface BlogSubsection {
  heading: string
  content: string[]
  codeBlock?: BlogCodeBlock
  tips?: string[]
}

export interface BlogSection {
  heading: string
  content: string[]
  codeBlock?: BlogCodeBlock
  subsections?: BlogSubsection[]
}

export interface BlogRealWorldUseCase {
  title: string
  scenario: string
  implementation: string
  impact: string
}

export interface BlogPost {
  slug: string
  title: string
  summary: string
  category: 'Laravel / Backend' | 'Laravel / Architecture' | 'Next.js / Frontend' | string
  tags: string[]
  publishedAt: string
  formattedDate: string
  readingTime: string
  featured: boolean
  isDraft: boolean
  introduction: string
  sections: BlogSection[]
  realWorldUseCase: BlogRealWorldUseCase
  keyTakeaways: string[]
}
