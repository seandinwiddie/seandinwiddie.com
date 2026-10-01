# Sean Dinwiddie's Webmastery

This repo is the site for **Sean Dinwiddie's Webmastery**. These instructions apply to every agent working here. Claude Code reads them through `CLAUDE.md`.

## The docs

| File | Holds |
|---|---|
| `AGENTS.md` | How to work in this repo and the writing rules |
| `docs/positioning.md` | What Sean Dinwiddie's Webmastery is, who the site speaks to, pricing and promises |
| `docs/copy-review.md` | The five-reviewer copy loop (the designer joined after pass 17), its focus, distractions and the mission |
| `docs/reading-list.md` | The audit of the copywriter's fifteen sources: what each teaches, what the copywriter checks, and what they add up to for the site |
| `docs/packages.md` | The package ladder within the prices page's two figures: Sean's working set of offers |
| `docs/terms.md` | Sean's working terms for owners and webmasters, and his direction for counsel to put in legal form |
| `docs/community-plan.md` | The plan for the community pages as training: the functional state layer, the gaps and the lesson-by-lesson tweaks |
| `docs/lectures.md` | Sean's Functional Programming Lectures, and where the community pages link to them |
| `docs/council-verdicts.md` | The llm-council's verdicts on Sean's pending decisions, awaiting his approval |
| `docs/copy-review-log.md` | Each copy review pass: scores, the objections that matter most, the tweaks applied and what waits |
| `todo.md` | Open work on the site |

Read `docs/positioning.md` before any copy work, and `docs/copy-review.md` and `docs/reading-list.md` before any copy review.

Keep Sean's workload light until more webmasters join: decisions the senior CTO reviewer or the llm-council can work out within Sean's directions (pricing lines, payment terms, wording) are worked out there, and only facts only Sean knows, or choices that change his own work, go to him, a few at a time. Sean's pending decisions (`todo.md`, "Facts only Sean has", and the open decisions in `docs/packages.md`) can go through the llm-council skill (`.claude/skills/llm-council/`): five advisors, an anonymous peer review and a chairman's verdict. A verdict is a recommendation. Nothing it recommends lands in the docs or on the site until Sean approves it, and facts only Sean knows never come from a council.

**These files stay current.** Every new instruction lands in the matching file in the same change: working and writing rules here, positioning in `docs/positioning.md`, the copy loop in `docs/copy-review.md`, the reading list in `docs/reading-list.md`, each pass in `docs/copy-review-log.md`, open work in `todo.md`. Finished work leaves `todo.md`.

## Working in this repo

- Work directly on `master`, the main branch. Never create branches.
- Sean owns `/prices/`, `/tools/`, `/resources/`, Training (`/service/training/` and its pages) and the cut-sheet (`/community/from-marketing-to-development/`) and edits them himself. Their content is as he intends it: agents and reviewers never report it as errors or objections for the loop. Training links to `/community/`, and training content the loop adds or adjusts goes on the community pages. The copy loop owns the homepage, the service pages, `/contact/`, the community pages (for training content, `/community/staff/` and the offer page), and changes them only by many small tweaks, never a large change to one section at once. The community's lesson order lives in `LESSONS` in `scripts/sync-shared-page-components.mjs`; lesson links are never edited by hand.
- Sizes can change. Colors change only by small tweaks, such as darkening a shade until text passes WCAG 2.1 AA contrast. The fonts (the typefaces) never change.
- Pushing to `master` deploys the live site through GitHub Pages. Run `npm run build` before every push: it regenerates the social images and sitemaps, runs the site, accessibility and performance checks, and builds the deploy artifact in `_site/`.

## Writing rules

These apply to every doc and all site copy.

- **Full brand name, always.** Write "Sean Dinwiddie's Webmastery". Never shorten it to "Webmastery"; the short form is too ambiguous.
- **Present tense, forward-facing.** Describe Sean Dinwiddie's Webmastery as it operates: "The Sean Dinwiddie's Webmastery team builds the site and hands it over." Never "we plan to", "soon", "eventually", "we're building" or "coming soon".
- **Never rank clients by size.** Junior, mid and senior describe the webmaster career ladder, not who serves whom. Never tie a client's size to a webmaster's level, and never write copy that makes a smaller business feel it gets less experienced help.
- **Never quote Sean.** Sean's words in conversation show where he's coming from. Copy and docs carry the meaning in the site's own voice, never his phrasing as a quotation.
- **Private work stays private.** Never name ForbocAI or its products on the site. Sean's private repositories inform lessons as practices and patterns only, never as quoted code, data, names, figures or business details.
- **No invented specifics.** Present tense describes the model; it never invents facts. No counts of webmasters or clients, named clients, testimonials, credentials or results unless they are real.
