# Md. Nazmus Shakib — cinematic developer portfolio

A production-ready Next.js portfolio for backend developer Md. Nazmus Shakib. The design uses an editorial near-black layout, the owner's real portrait with lightweight interactive depth, an accessible skills explorer and a horizontal project case-study slider.

## Stack and features

- Next.js App Router, React 19, strict TypeScript and Tailwind CSS v4
- Motion-powered portrait parallax, section reveals, loader and custom cursor
- Real profile portrait—no generated or procedural face
- Four static project case studies with optimized WebP covers
- React Hook Form, Zod and a server-side contact Route Handler
- Honeypot validation, throttling and explicit missing-provider fallback
- Open Graph image, manifest, sitemap, robots and JSON-LD
- Responsive navigation, social rail, skills tabs and project slider

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Validation:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL`: canonical production origin.
- `WEB3FORMS_ACCESS_KEY`: optional server-only delivery key.

Without the delivery key, the form returns an honest configuration message and the visible email link remains available. Never expose provider keys in Client Components.

## Updating content

Edit factual content in `src/data/portfolio-facts.ts`; components consume the consolidated `src/data/portfolio.ts` facade.

- Portrait: `public/images/profile.png`
- Resume: `public/resume.pdf`
- Project covers: `public/projects/*.webp`
- Hero portrait interaction: `src/components/sections/hero-visual.tsx`

## Reference policy

The reference MP4 and extracted analysis remain in ignored `.reference-assets/` and `.reference-analysis/`. They are never deployed.

## Vercel deployment

Import the Git repository in Vercel, keep the detected Next.js preset, configure `NEXT_PUBLIC_SITE_URL` and optional `WEB3FORMS_ACCESS_KEY`, deploy, then verify the home page, project routes, resume and contact delivery.
