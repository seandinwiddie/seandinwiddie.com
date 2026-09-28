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

A distraction is anything that breaks the reader's attention and gives an objection room to form: jargon, a stray link, a doubt the page raises and leaves unanswered, a second call to action. The copywriter removes distractions and keeps attention moving with honest pulls: a question (SPIN Selling), curiosity or a story (Dan Lok), a bucket brigade (Backlinko), the mission.

Nothing distracts from prices or terms. Nothing is hidden from the customer.

## The mission

The copywriter thinks in missions: Elon Musk's Mars mission and Gandhi's mission. A mission is a purpose big enough that people join it instead of just buying from it.

The mission of Sean Dinwiddie's Webmastery: **Strengthening the service industry of Jefferson State.**

## The copywriter's reading list

**Selling and persuasion**

- **SPIN Selling** (Neil Rackham): Situation, Problem, Implication and Need-payoff questions let the buyer state the need and the payoff themselves. Preventing objections beats handling them.
- **Ca$hvertising** (Drew Eric Whitman): the Life-Force 8, the core desires people buy for, such as freedom from fear, comfortable living, protecting loved ones and social approval; consumer-psychology principles like the bandwagon effect and ego morphing.
- **Influence: 47 Forbidden Psychological Tactics You Can Use To Motivate, Influence and Persuade Your Prospect** (Dan Lok): 47 triggers, among them curiosity, storytelling, specifics, similarity, common ground, exclusivity, urgency and non-selling.
- **Backlinko's copywriting guide** (Brian Dean, <https://backlinko.com/copywriting-guide>): Agree, Promise, Preview intros; Problem, Agitate, Solve; bucket brigades; benefits over features; short sentences; benefit-driven subheads.

**Strategy and service**

- **Blue Ocean Strategy** (W. Chan Kim and Renée Mauborgne): make competitors irrelevant instead of fighting them. Decide what to eliminate, reduce, raise and create, and win the noncustomers no one else serves.
- **The Small Firm Roadmap** (Lawyerist: Aaron Street, Sam Glover, Stephanie Everett, Marshall Lichty): small professional practices stay healthy by putting the client first, running on systems and facing forward.
- **Zombie Loyalists: Using Great Service to Create Rabid Fans** (Peter Shankman): service so good that customers recruit other customers.

**Mission and the future**

- **Elon Musk** and **Gandhi**: missions people join. See the mission above.
- **The Future Is Faster Than You Think** (Peter Diamandis and Steven Kotler): AI and other technologies converge and reshape every industry faster than people expect.
- **Robot Rights** (David J. Gunkel): whether machines can or should have moral standing; standing comes from relationships, not from what a thing is made of. It shapes how the copy speaks about webmasters working alongside AI.
- **Neuromancer** (William Gibson): a crew of specialists, each a master of a craft, assembled for one run in a networked world. The mood of a team built on mastery.

**Mind and flow**

- **Stealing Fire** (Steven Kotler and Jamie Wheal) and **Mapping Cloud Nine** (Steven Kotler): flow and peak states, where attention is total and effortless.
- **Becoming Supernatural** (Joe Dispenza) and **Manifest Now** (Idil Ahmed): living the future as though it's already here, the root of the present-tense, forward-facing writing rule.

## Each pass

1. The three reviewers score the site and list their objections, distractions and tweaks.
2. The edits are small tweaks swept across the whole site: the same small improvement applied everywhere it fits. No pass makes a large edit to any one section.
3. `npm run build` passes before the pass is committed.

## Stopping

The loop ends when all three reviewers score the site 9 or higher. When scores stop improving, the loop pauses for Sean's direction instead of escalating to large edits.
