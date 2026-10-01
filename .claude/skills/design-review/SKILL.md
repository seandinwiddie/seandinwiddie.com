---
name: design-review
description: The copy loop's fifth reviewer, the designer. Screenshots sections of seandinwiddie.com at phone and desktop widths and reviews their visual hierarchy, spacing, type scale, consistency and accessibility within the site's typefaces and colors, which move only by minute approved steps, then specifies small CSS and markup tweaks. Use for "review this section's design", a screenshot of a section that reads as a wall of text, or the designer's part of a copy review pass.
---

# Design review: the loop's fifth reviewer

The designer reviews how each section of the site looks and reads, the way a reader meets it on a phone and on a desktop. It works inside the copy loop (`docs/copy-review.md`, reviewer 5) and follows `AGENTS.md`.

Read before reviewing:
- `AGENTS.md` and `docs/positioning.md` (Character): sophisticated and classy, neo-rustic and homey, boutique, academic and niche, advanced but palatable; understated and assured, never loud.
- The vendored skills in `.claude/skills/`: `design-critique` (the critique framework and output), `frontend-design` (type scale, restraint, visual structure as information) and `accessibility-review` (WCAG 2.1 AA).

## What changes, and how fast

- **Sizes, weights, spacing, measure and heading structure** change freely, in small tweaks swept by class.
- **Typefaces and colors change only by minute sweeping steps** (Sean, after pass 17). Propose at most one such step per design pass: one color token moved a little (a few points of lightness or hue), or one typeface role (for example the h1 and h2 display sizes only), never a whole palette or a font swap in one go. The coordinator approves or declines each step against `docs/positioning.md` (Character) and `docs/design.md`, it lands on every page it fits, and the next step waits for a fresh design review. The body text's typeface changes last, if ever. Any new font is self-hosted or from Google Fonts with `font-display: swap`, subsetted, and within the performance budget. Contrast stays at WCAG 2.1 AA.
- Hierarchy comes first from size, weight, spacing, case and position; reach for a typeface or color step only when those can't do the job.

## What never changes

- **Sean's pages** (`/prices/`, `/tools/`, `/resources/`, Training, the cut-sheet, `/about/`, `/examples/`, the brand-identity article) and shared components on them (header, footer, nav, the top bar) change only with his OK.
- **Copy** belongs to the copywriter. The designer may move, group or set apart existing text, and may propose a heading level, but it doesn't rewrite sentences.

Sizes, spacing, weights, line lengths, rules, margins and the heading structure can change, in small tweaks swept across every section that shares the fault, never a large redesign of one section.

## How to review

1. Pick the sections. In a loop pass, review the homepage, each service hub, `/contact/`, Klamath Falls, Redding and one community lesson. When asked about a section, start there and sweep to every section built the same way, by shared class.
2. Screenshot each section at 390 px and 1366 px wide with `scripts/shot.mjs`. Build first (`npm run build`) or serve the repo root.
   ```bash
   SCRATCH=<your scratchpad>/design
   mkdir -p "$SCRATCH" && npm i --prefix "$SCRATCH" playwright-core@1 >/dev/null
   NODE_PATH="$SCRATCH/node_modules" node .claude/skills/design-review/scripts/shot.mjs . "$SCRATCH/shots" \
     "/|.home-services|390|home-services-390" "/|.home-services|1366|home-services-1366"
   ```
   Each spec is `path|selector|width|name`. The script prints each element's font size, weight, line height, color and background, so you can read the type scale off the page rather than guess it. Look at every screenshot with the Read tool before judging.
3. Critique with the `design-critique` framework, in this order:
   - **First impression:** what draws the eye first, and is it the section's one point?
   - **Hierarchy:** do headings read as headings at a glance? A subhead set at body size and weight, as in a list of services, reads as a wall of text. Is there a clear type scale (for example h2, h3 and body as distinct steps)?
   - **Rhythm and spacing:** space above a heading larger than below it, so a heading belongs to what follows; paragraphs and groups separated consistently.
   - **Line length:** body text at roughly 45 to 80 characters a line on desktop.
   - **Consistency:** the same kind of section looks the same on every page.
   - **Accessibility:** contrast of every text and background pair at AA, tap targets, heading order (`scripts/check-accessibility.mjs` enforces no skipped level), and reflow at 320 px.
4. Specify fixes as exact CSS or markup edits (old → new), scoped by class so they reach every section of that kind and nothing else. Check the cascade: a later rule of equal specificity can cancel yours (pass 15 found one on Klamath Falls).
5. Verify on a scratch copy: apply the edits, run `npm run build`, screenshot the same sections again, and compare before and after. Report what changed in pixels as well as in words.

## Report

Use the `design-critique` output (overall impression, usability, visual hierarchy, consistency, accessibility, what works, priority recommendations), then:
- **Score** the site's design from 0 to 10.
- **Tweaks:** each as file, old → new, with the sections it reaches and the before and after screenshot paths.
- **Held:** anything that needs a typeface or palette change, or touches Sean's pages, listed for Sean and not applied.
