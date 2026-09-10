const localUrl='http://localhost:3000'

export function getSiteUrl(){
  const configured=process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if(configured)return configured.replace(/\/$/,'')
  const vercelHost=(process.env.VERCEL_PROJECT_PRODUCTION_URL??process.env.VERCEL_URL)?.trim()
  if(vercelHost)return `https://${vercelHost.replace(/^https?:\/\//,'').replace(/\/$/,'')}`
  return localUrl
}
