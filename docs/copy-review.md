# Copy review: the four-reviewer dream loop

The copy review runs the dream-loop skill (`.claude/skills/dream-loop/`) on words instead of images. The target is the site fully expressing Sean Dinwiddie's Webmastery as `docs/positioning.md` defines it. Every edit follows the writing rules in `AGENTS.md`.

## The reviewers

Each pass, four reviewers read the whole site, each in a fresh context with no memory of earlier passes beyond the previous scores and objections.

### 1. The local owner

Reads as the first reader in the positioning brief: someone who runs something local, often wearing several hats at once (a county job, a business, a kiosk). Lists every objection that stops them from reaching out, and names, in their own words, what the agency firm's team does for them: why a team of local webmasters under one name beats a lone freelancer or a faraway agency. Scores the site from 0 to 10. Owners meet Sean, the face and guardian of the practice, and the site promises no reply time (`docs/terms.md`). Neither is an objection in itself; the owner judges whether the site makes them clear and reassuring.

### 2. The webmaster or software developer

Reads as an independent webmaster or developer weighing subcontracting under the brand, and as a peer judging the craft. Lists every objection that stops them from joining, and names, in their own words, the benefits of joining the agency firm's team that would bring an independent webmaster in, ranked by pull. Scores the site from 0 to 10.

### 3. The copywriter

Reviews the site through the reading list and the mission below. Reads the other reviewers' findings, finds the distraction behind each objection, and names the sweeping tweaks that remove it. Turns the benefits the webmaster and the CTO name into the recruiting lines, so every line promotes what an independent webmaster gains by joining, and the benefits the local owner names into lines that show owners what the team does for them. Scores the site from 0 to 10.

### 4. The senior CTO

Reads as a senior CTO at an elite, high-end boutique agency firm. Checks every claim for accuracy: technical, legal and factual, and against what the site's own build and code show. Names where the site can be more sophisticated and classy, neo-rustic and homey, boutique, academic and niche, advanced but palatable. Names, from the firm's side, the benefits of an independent webmaster joining the agency firm's team, and checks recruiting wording for accuracy and for words that imply an employee rather than an independent subcontractor. Reviews the community pages as training content: technical accuracy and currency of what they teach (current practice on proven, battle-tested tools), their structure as lessons, what's missing or unfinished, and where a lecture link (`docs/lectures.md`) would help. Names improvements the loop can make there in small tweaks. Scores the site from 0 to 10.

## Distractions

A distraction is anything that moves the reader's attention off the page's one question, or opens a question the page doesn't close. It turns the reader from weighing the offer to counterarguing it or leaving. Distraction helps only weak messages, and the case for Sean Dinwiddie's Webmastery is strong, so every distraction costs persuasion. The kinds (exits, load, open loops, threat, ego, incoherence, hype, hidden hands, machine noise) and what keeps attention are in `docs/reading-list.md`.

Every deliverable carries the feeling it brings the reader, in the reader's own day, and no feeling stands without a deliverable behind it (`docs/reading-list.md`, "Feeling rides on the deliverable"). The copywriter removes distractions and keeps attention moving with honest pulls: a question (SPIN Selling), curiosity or a story (Dan Lok), a bucket brigade (Backlinko), the mission.

Nothing distracts from prices or terms. Nothing is hidden from the customer.

## The mission

The copywriter thinks in missions: Elon Musk's Mars mission and Gandhi's mission. A mission is a purpose big enough that people join it instead of just buying from it.

The mission of Sean Dinwiddie's Webmastery: **Strengthening the service industry of Jefferson State.**

## The copywriter's reading list

The copywriter reads the site through fifteen sources:

- **Selling and persuasion:** SPIN Selling, Influence: 47 Forbidden Psychological Tactics, Ca$hvertising, Backlinko's copywriting guide.
- **Strategy and service:** Blue Ocean Strategy, The Small Firm Roadmap, Zombie Loyalists.
- **Missions:** Elon Musk's Mars mission, Gandhi's mission.
- **The future and machines:** The Future Is Faster Than You Think, Robot Rights, Neuromancer.
- **Mind and flow:** Stealing Fire, Mapping Cloud Nine, Becoming Supernatural, Manifest Now.

`docs/reading-list.md` holds the full audit: what each source teaches, the checks the copywriter runs because of it, and what they add up to for Sean Dinwiddie's Webmastery. That covers the identity, public prices, distractions, objection seeds for both reviewers, the mission, and what never appears on the site.

## Focus

The loop works on the homepage, the service pages (the services hub, Design, Development, Marketing, Automation and Local, with their sub-pages), the contact page, and two community pages the loop owns: `/community/staff/` and `/community/our-community-unveiling-our-offer-and-prices/`. Sean owns `/prices/`, `/tools/`, `/resources/`, Training (`/service/training/` and its pages) and the cut-sheet (`/community/from-marketing-to-development/`), a concept he builds out himself; the loop never edits them, and their content is as he intends it (shared components on his pages, such as the header button and the footer, change only with his OK; since pass 8 the button reads "Call or email" there too, with his OK), so reviewers don't count it among their objections. Training links to `/community/`, and any training content the loop adds or adjusts goes on the community pages, in small tweaks, keeping the community a quiet part of the brand. The community is intuitive and friendly for every skill level. The Introduction (`/community/introduction/`) is where every level starts: it comes first in the lesson order, the banner and the hub point to it, and any guidance by level lives on it. The course outline is the course's map, not its start. Lessons run in teaching order (an introduction before the lessons that build on it, never publication order or reverse), each module lists its lessons in order, and every lesson's previous and next links follow that order. The order lives in one list, `LESSONS` in `scripts/sync-shared-page-components.mjs`: never edit a lesson's previous/next links by hand, and add a new lesson to the list (the sync fails otherwise). Pages off the path (the offer, "Joining the team", the Redux note) link back to `/community/`. No lesson is gated by level. Every lesson is a reference for every level of practice, and a more practiced reader simply brings more practice and experience to it, so a lesson can carry layers of depth for each level, the way a skill is learned in stages. The levels echo the craft's ladder: **apprentice** (junior; beginner), **journeyman** (mid; initiate; intermediate) and **master** (senior; adept; advanced), matching the lectures' Beginner, Intermediate and Advanced. They describe how deep a reader goes, never which lessons a reader may take: no lesson is labelled with a level, and no page tells a reader to skip or skim by level. On "Joining the team" the webmaster ladder stays junior, mid and senior. The Introduction says how each level reads the course. The banner names each lesson's place in the course, and the module lesson lists and the community sitemap render from `LESSONS`. Where a lecture fits a community page's topic, the page carries at least one link to it (`docs/lectures.md`); it is not a rule for every page. Content for the community pages can be researched in Sean's repositories (the lectures, his course and app templates, the ForbocAI repositories): the repositories are evidence of the practice, never its authority (the lessons teach the principles in `docs/positioning.md`, "How the team builds software"); private repositories inform the lessons as practices and patterns only, never quoted code, keys, data or business details, and anything unsure waits for Sean's OK. The reviewers read the whole site, but tweaks land on these pages. Shared blocks that belong to them, such as the service cards and the service pages' related links, change with them.

Pricing and recruiting are sprinkled across these pages: a pricing line near each page's next step, ironed from the package ladder in `docs/packages.md` into one consistent, understated line with a defined job that fits the page (a small package for one defined job at a flat fee, up to the published retainers), and a short note addressed to webmasters that promotes the benefits of joining the team, set apart from the client's contact details. The fee lines carry no link: Sean reworks the prices page himself, so the loop never edits it and never points a call to action at it.

## Each pass

1. The four reviewers score the site and list their objections, accuracy findings, distractions and tweaks.
2. The edits are small tweaks swept across the whole site: the same small improvement applied everywhere it fits. No pass makes a large edit to any one section. This holds for every page, the prices page and the footer included, and before the first pass too: nothing is rewritten all at once. A page the site doesn't have yet starts small and grows a little each pass.
3. `npm run build` passes before the pass is committed.
4. The pass is recorded in `docs/copy-review-log.md`: the four reviewers' scores, the objections that matter most, the tweaks applied and what waits.

## Stopping

The loop proceeds pass after pass without waiting to be asked: each pass is applied, built, pushed and logged, and the next one starts. It ends when all four reviewers score the site 9 or higher. A tweak that needs a fact only Sean has waits for it while the rest of the pass goes ahead. When scores stop improving, the loop pauses for Sean's direction instead of escalating to large edits.
