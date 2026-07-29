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
