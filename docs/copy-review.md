# Copy review: the three-reviewer dream loop

The copy review runs the dream-loop skill (`.claude/skills/dream-loop/`) on words instead of images. The target is the site fully expressing Sean Dinwiddie's Webmastery as `docs/positioning.md` defines it. Every edit follows the writing rules in `AGENTS.md`.

## The reviewers

Each pass, three reviewers read the whole site, each in a fresh context with no memory of earlier passes beyond the previous scores and objections.

### 1. The local owner

Reads as the first reader in the positioning brief: someone who runs something local, often wearing several hats at once (a county job, a business, a kiosk). Lists every objection that stops them from reaching out. Scores the site from 0 to 10.

### 2. The webmaster or software developer

Reads as an independent webmaster or developer weighing subcontracting under the brand, and as a peer judging the craft. Lists every objection that stops them from joining. Scores the site from 0 to 10.

### 3. The copywriter

Reviews the site through the reading list and the mission below. Reads both objection lists, finds the distraction behind each objection, and names the sweeping tweaks that remove it. Scores the site from 0 to 10.

## Distractions

A distraction is anything that moves the reader's attention off the page's one question, or opens a question the page doesn't close. It turns the reader from weighing the offer to counterarguing it or leaving. Distraction helps only weak messages, and the case for Sean Dinwiddie's Webmastery is strong, so every distraction costs persuasion. The kinds (exits, load, open loops, threat, ego, incoherence, hype, hidden hands, machine noise) and what keeps attention are in `docs/reading-list.md`.

The copywriter removes distractions and keeps attention moving with honest pulls: a question (SPIN Selling), curiosity or a story (Dan Lok), a bucket brigade (Backlinko), the mission.

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

## Each pass

1. The three reviewers score the site and list their objections, distractions and tweaks.
2. The edits are small tweaks swept across the whole site: the same small improvement applied everywhere it fits. No pass makes a large edit to any one section. This holds for every page, the prices page and the footer included, and before the first pass too: nothing is rewritten all at once. A page the site doesn't have yet starts small and grows a little each pass.
3. `npm run build` passes before the pass is committed.

## Stopping

The loop ends when all three reviewers score the site 9 or higher. When scores stop improving, the loop pauses for Sean's direction instead of escalating to large edits.
