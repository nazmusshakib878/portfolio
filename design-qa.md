# Design QA — A-to-Z audit

## Initial findings

1. Mobile hero was 1440px tall and delayed the rest of the story.
2. Mobile skills reached 2523px; desktop reached 1644px.
3. Project arrow navigation used `scrollIntoView`, causing 95–134px page movement on affected desktop layouts.
4. Project numbers failed WCAG contrast and repository SVGs lacked decorative semantics.
5. Project source images totalled roughly 6.2MB.
6. Social rail was unavailable on common 1024px desktop widths.
7. Slider scroll state performed unnecessarily frequent geometry work.

## Fixes verified

- Mobile hero reduced to approximately 1067px while retaining content and portrait.
- Skills replaced with an accessible category/tab explorer: 930px mobile and ~700px desktop.
- Slider now uses horizontal `scrollTo`; visible-control desktop tests show zero vertical page shift.
- Project number contrast and decorative icon semantics corrected.
- Axe WCAG 2 A/AA scan reports no violations at 390, 768, 1024, 1440 and 1920 widths.
- Covers converted to WebP: approximately 223KB combined; obsolete 6.2MB PNG set removed.
- Social rail appears from 1024px upward; mobile retains social links in hero/footer.
- No horizontal overflow or console errors at audited widths.
- Lint, strict type checking and production build pass.

## Evidence limits

Automated contrast, DOM geometry, interaction and browser-console checks were completed. Screen-reader announcements were checked structurally but not with a human screen-reader session.

final result: passed
