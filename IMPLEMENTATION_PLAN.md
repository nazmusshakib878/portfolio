# Implementation plan

## Baseline audit

The repository is now a Next.js App Router portfolio with strict TypeScript and Tailwind CSS v4. Existing lint, type checking and production build passed before this pass. Factual content remains in `src/data/portfolio-facts.ts`, exposed through `src/data/portfolio.ts`. The reference was supplied under a different filename, analyzed successfully, and moved out of `public`.

## Redesign and component plan

- Preserve the editorial near-black one-page layout and factual content.
- Make the hero the visual anchor with a lazy procedural avatar and three-layer pointer response.
- Keep server-rendered sections; isolate Canvas, loader, cursor and form as client components.
- Retain static case-study routes and server contact handling.

## 3D and motion plan

- React Three Fiber Canvas with capped DPR and studio lighting.
- Primitive-based head, eyes, neck and torso; no copied model or external HDR.
- Ref-driven pointer targets and frame-rate-independent damping.
- Strong eye response, moderate head response, subtle neck/torso response.
- Neutral return on pointer leave, hidden tab and loss of active target.
- Portrait fallback for touch, mobile, reduced motion and WebGL failure.
- Motion remains for short section reveals; no scroll-jacking.

## Responsive, security and verification

- Canvas only on fine-pointer desktop; mobile receives the optimized portrait.
- Preserve semantic content, visible focus, skip link and accessible navigation/form states.
- Contact token remains server-only and reference assets remain ignored/outside public.
- Validate lint, strict typecheck, build, rendered viewports, fallback and deployed assets.
