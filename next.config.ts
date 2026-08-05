import type { NextConfig } from 'next'

const isDevelopment=process.env.NODE_ENV==='development'
const contentSecurityPolicy=[
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment?" 'unsafe-eval'":''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders=[
  {key:'Content-Security-Policy',value:contentSecurityPolicy},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'X-Frame-Options',value:'DENY'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=()'},
  {key:'Cross-Origin-Opener-Policy',value:'same-origin'},
  ...(!isDevelopment?[{key:'Strict-Transport-Security',value:'max-age=63072000; includeSubDomains; preload'}]:[]),
]

const nextConfig:NextConfig={
  poweredByHeader:false,
  reactStrictMode:true,
  experimental:{optimizePackageImports:['lucide-react','motion']},
  async headers(){return[{source:'/(.*)',headers:securityHeaders}]},
}

export default nextConfig
