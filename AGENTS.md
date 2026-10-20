# Agent guide

- Preserve facts in `src/data/portfolio-facts.ts`; consume `src/data/portfolio.ts`.
- Never invent employers, metrics, awards, dates, screenshots or outcomes.
- Never expose provider keys in Client Components or documentation.
- Preserve `public/images/profile.png` and `public/resume.pdf` unless explicitly replaced.
- The hero must use the owner's real portrait. Do not add a generated or procedural face.
- Keep portrait interaction subtle, transform-only and disabled by reduced motion.
- Keep `.reference-assets` and `.reference-analysis` ignored and out of production.
- Maintain keyboard navigation, visible focus, contrast and mobile touch behavior.

Before handoff run `npm run lint`, `npm run typecheck`, and `npm run build`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
