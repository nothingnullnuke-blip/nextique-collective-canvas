
# Phase 1 — Build-ready (corrections applied)

**Corrections from your last message:**
- **Radius cap = 4px.** `--radius-sm: 1px`, `--radius-md: 2px`, `--radius-lg/xl/2xl: 4px`. No 6/8px anywhere. Editorial geometry preserved.
- **Footer newsletter is visually inert.** Replaced the live input + button with a single muted row at 60% opacity, `select-none`, no hover, no pointer: greyed placeholder text on the left, a small "Soon" eyebrow on the right. Reads as "coming," not broken.

All other Phase 1 specs unchanged from the approved plan.

## Files I will write in one batch on build-mode switch

1. `src/styles.css` — full rewrite (tokens, fonts, type scale, utilities, grain, 4px radius cap).
2. `src/components/site/Navbar.tsx` — fixed, transparent → `bg-background/75 backdrop-blur-xl` + hairline after 24px scroll, 500ms transition, serif wordmark + gold dot, ⌘K affordance (non-functional, no fake handler), mobile hamburger placeholder.
3. `src/components/site/Footer.tsx` — hairline-top, 3-column link grid, inert "Soon" newsletter row, copyright + "Issue 001 · Printed in pixels."
4. `src/components/site/PageTransition.tsx` — keyed `motion.main` crossfade (8px y, 450ms, editorial easing).
5. `src/components/site/HeroFeature.tsx` — 100svh, generated server-corridor photograph, 3-layer gradient + grain, top meta strip, Technology category badge (using `--cat-technology`), 3-line serif headline with mask-clip word stagger, standfirst, circular ArrowUpRight CTA + full byline, vertical "Scroll" cue with pulsing hairline. Full entrance choreography on editorial easing.
6. `src/routes/index.tsx` — replace placeholder with `<HeroFeature />` + 40vh Phase 2 spacer + Nextique-branded `head()`.
7. `src/routes/__root.tsx` — surgical edits only: add 3 imports, update `head()` to Nextique meta, wrap `<Outlet />` in `<PageTransition>` and mount `<Navbar />` / `<Footer />` around it. `<Outlet />` preserved.

Dependencies already installed: `motion`, `@fontsource/cormorant-garamond`, `@fontsource/inter`, `lucide-react`. Hero image already generated at `src/assets/hero-technology.jpg`.

## Verification I'll run immediately after writing

1. Wait for build to settle, then `browser--screenshot` of `/` at the 677px viewport you're previewing.
2. Re-screenshot at desktop (1366×768) to confirm hero composition reads at the intended scale.
3. Read console for any motion / font / route warnings.
4. Crop the headline and the category badge to verify type rendering and accent color.
5. Scroll past 24px and re-screenshot to confirm the navbar's blur + hairline transition fires.

If any of those reads generic or off, I fix before handing back to you. No Phase 2 work begins until you approve the visual.

## Action required

**Switch the composer to Build mode**, then send any short confirmation. The full batch lands in a single turn.
