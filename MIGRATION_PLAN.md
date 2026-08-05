# Migration plan

The existing Vite portfolio will be migrated in place to Next.js App Router while preserving the typed portfolio content, profile image, CV, project links, education, experience, certification, achievements and contact details.

## Audit

- React 19, Vite, TypeScript and Tailwind CSS v4 currently render one client-only page.
- Large hero, skills, contact and project components are tightly coupled.
- Nearly every section uses the same rounded glass-card shell.
- Social links are split between data and constants.
- A Web3Forms access key is exposed in client source and `.env.local`.
- `/og-image.png` is referenced but missing.
- No reference MP4 exists in the repository.
- The worktree already contains user changes, so no checkpoint commit will be forced.

## Strategy

1. Preserve the centralized facts and user assets.
2. Introduce App Router routes, server-rendered sections and small client islands.
3. Consolidate social links and project slugs in `src/data/portfolio.ts`.
4. Use the real portrait in a lightweight 2.5D cinematic composition.
5. Add a validated, rate-limited server contact route with explicit fallback.
6. Generate SEO routes and Open Graph imagery in code.
7. Run lint, strict type checking and production build before legacy cleanup.

## Target

Routes live in `src/app`, layouts and sections in `src/components`, factual content in `src/data/portfolio.ts`, and shared validation/metadata helpers in `src/lib`.

## Validation

Run `npm run lint`, `npm run typecheck`, and `npm run build`; verify main and project routes, navigation, forms, keyboard access, reduced motion, responsive overflow, assets and metadata.
