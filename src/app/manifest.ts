import type { MetadataRoute } from 'next'

export default function manifest():MetadataRoute.Manifest{
  return {
    name: 'Md. Nazmus Shakib — Portfolio',
    short_name: 'MS Portfolio',
    description: 'Full Stack developer portfolio with Laravel & Next.js',
    start_url: '/',
    display:'standalone',
    background_color:'#05070b',
    theme_color:'#05070b',
    icons:[{src:'/favicon.svg',sizes:'any',type:'image/svg+xml'}],
  }
}
