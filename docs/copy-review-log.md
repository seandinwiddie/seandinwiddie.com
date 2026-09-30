# Copy review log

Each pass of the copy review (`docs/copy-review.md`), newest first. The next pass's reviewers read the previous pass's scores and objections here.

## Pass 7: September 30, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 6 | 8.5 | |
| Webmaster | 5.5 | 7.5 | 4 |
| Copywriter | 6 | 8.5 | 4.5 |
| Senior CTO | 6 | 8.5 | 4.5 |

These scores read the site after pass 6. The copywriter expects 6.5, close to 9 and 5.5 after this pass.

### The objections that matter most

- **Owner:**
  - `/about/` reads as a solo "Independent Web Developer"; outside the focus.
  - No reply times or date for the scope (Sean's).
  - A one-time listing fee read as monthly.
  - The two ADA dates left a county office unsure which was theirs.
  - The long webmaster note read like trial terms.
- **Webmaster:**
  - Where the practice applies.
  - Terms beyond the split.
  - The lessons contradicted themselves: Rx next to Redux Toolkit.
  - "Scenario Outline" was misused.
  - The staff page read like a pay stub.
- **CTO:**
  - 29 of 64 lesson links were wrong, and the lessons ran in publication order.
  - Lines implied one stack for every job.
  - "Technical Archive" leftovers.

### Sean's directions this pass

- **Principles over code:** feature scope → user story → Gherkin test → endpoint, slice and view → the Haskell (Servant) API. Code is evidence, never the authority.
- **Tools:** leading edge on battle-tested tools, always researched and iterated. The stack is chosen by the project: WordPress for many brochure sites, and the full chain for custom apps. The backend is Haskell (Servant) and Rust.
- **The community:** intuitive for every level, in teaching order, with apprentice, journeyman and master marks.
- **Testing:** both ways of running Gherkin, cucumber-js steps and scenario-named tests in Vitest or Hspec.
- **Planning:** hybrid and fluid.
- **ForbocAI** stays out of the lessons for now.
- **Research:** Sean's repositories were researched for the community (`docs/community-plan.md`; private findings stay out of this public repository).

### Tweaks applied

- **Teaching order:**
  - One ordered `LESSONS` list in the sync script renders "Previous lesson" and "Next lesson" inside a labelled nav on all 32 lessons.
  - The offer, staff and Redux pages link back to the community.
  - Closing lines name the real next lesson, and "Stay tuned" is gone.
  - Applying FRP says it ends the course and points to the next lecture.
- **The stack follows the project:**
  - `/development/sites/`: "No platform you rent and can't take with you…", and "Websites built for your business…".
  - The banner says "custom software".
  - The hub's stack line.
  - Module 2: "each feature that holds state".
  - Applying FRP: "In custom apps".
- **The lessons:**
  - The Rx lists give way to FRP's origins (Elliott and Hudak, 1997) and the Redux Toolkit practice.
  - Applying FRP models events as actions and keeps state in the slice.
  - "Scenario Outline" is used correctly, and Gherkin's Examples and Rule are explained.
  - The testing lesson presents both approaches.
  - The curriculum speaks to learners, not "inhouse members".
  - The outline's typo and intro are fixed.
  - "FRP Fundamentals in Software Development".
  - Module 1's collaborative sessions note hybrid planning.
  - "Technical Archive" is gone from the community's titles, sitemap and image text.
- **The focus pages:**
  - "handover" on `/local/` and Redding.
  - Klamath Falls' free first conversation.
  - Custom apps' acceptance criteria become automated checks.
  - "Joining the team": "Your 70% is $4,200…", and outside clients stay the webmaster's.
  - One-time listings say "a flat fee".
  - The ADA dates by office size.
  - The owner-page notes say only "Joining is free".

### Waiting

- **Pass 8:**
  - levels and "Where to start";
  - the outline retitled and linked;
  - module lesson lists;
  - attributions;
  - the password-reset criteria;
  - scenarios below the interface;
  - lecture links on Module 3;
  - the community sitemap in order.
- **Pass 9:**
  - the remaining Rx steps (Fundamentals, Discover, Event streams, Module 3's principles);
  - the archives in order;
  - the register.
- **Sean's:**
  - `/about/`;
  - reply times and days to scope;
  - naming the reviewer;
  - Redding meetings;
  - the KLounge address;
  - how-to calls under Care;
  - how long the team makes good;
  - webmaster pay timing, how jobs reach webmasters, what a rung carries;
  - the offer page's firm name, "inhouse team", SPAs, "+4k/m" and contractor lines;
  - the blog's private-repository link;
  - Next.js.
- **Counsel:** the legal form of the webmaster terms.

## Pass 6: September 30, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 5.5 | 8 | |
| Webmaster | 5 | 7 (8 on pass 5's focus set) | |
| Copywriter | 5.5 | 8 | 3.5 |
| Senior CTO | 5.5 | 8 | 3.5 |

These scores read the site after pass 5 and before this pass's tweaks. The copywriter expects about 6 for the whole site, 8.5 for the focus pages and 4.5 for the community after them.

### The objections that matter most

- **The owner:**
  - A $600 "new hours" example undercut "you can run it yourself".
  - The old payout plan was visible from the community hub.
  - Open questions: what is in a $6,000 site, minimum terms, and the $24,000 year.
- **The webmaster:**
  - Two opposite pay stories: the hub's "Staff" card showed "-0.5% per day" next to "Joining the team".
  - Nothing linked to "Joining the team", which looked like a 2023 post.
  - "Begins with the work itself" read as an unpaid trial.
- **The CTO:** the community pages have no learning path, and they carry technical errors (Elm and FRP, SpecFlow, Gherkin's "But", Rx confused with FRP). They also carry a retired "technical archive" framing, a false comments notice, and no lecture links.

### Sean's directions this pass

- **Memberships and the club.** Memberships are for administrators who keep learning after handover. Team members belong to the club through the quality of their work, never by buying in.
- **Pricing.** Fees pay for results, never time; a retainer grants access and results.
- **Sean's pages.** His pages (prices, tools, resources, Training, and now the cut-sheet, a concept he builds out himself) are as he intends. Reviewers don't count their content.
- **The menu.** It marks the right page for screen readers.
- **The team's practice.** User stories → BDD tests → Redux Toolkit slices and RTK Query endpoints → minimal React views, with Haskell (Servant) and Rust on the backend. The site never recommends tools the team doesn't use.
- **Research.** Sean's repositories and the ForbocAI repositories can be researched for community content.
- **Training.** It links to the community, and the community pages link to the lectures where one fits.

### Tweaks applied

- **Community trust:**
  - The hub card, the "Staff" labels and both sitemaps read "Joining the team", and the stale payout excerpt is gone.
  - The hub is retitled "Community: User Stories, BDD & FRP | Sean Dinwiddie's Webmastery". It opens with how the team builds software and links the lectures.
  - The archive banner becomes "Agency lessons…", replaced by pattern in the sync script so `--check` sees changes. It is left off the staff and offer pages.
  - The comments notice becomes "Questions about this page? Call or email Sean Dinwiddie's Webmastery."
  - The lessons drop tool lists the team doesn't use.
  - Gherkin's "But" is right.
  - Elm is gone from the lists.
  - Applying FRP chooses the Redux Toolkit state layer.
  - The Redux page describes one store and pure reducers, points to Redux Toolkit and links two lectures.
  - The Introduction carries the mission as it stands.
- **Joining the team:**
  - The first job is paid like every other.
  - The fee is split, never "pay" or "share".
  - The ladder is named: junior, mid and senior; moving up on delivered, reviewed results; any rung takes any job.
  - The review checks results, never how the work was done.
  - The club line.
  - "Updated September 30, 2026".
  - The hero points to `/contact/#for-webmasters`.
- **The offer page:** "$1,000 a month" and "$4,000 a month"; membership prices can change, but a fee in a signed scope does not; the 70% never comes from recruiting, memberships or the community's growth.
- **The focus pages:**
  - Changes, not repairs, in six places.
  - "Tell us what the business needs".
  - Accounts in the owner's name.
  - Hosting "managed in your own account".
  - A $600 example an owner wouldn't do alone ("a new field on a form").
  - The team makes good on its own work either way, and changes are scoped.
  - The year share is held for a year.
  - Monthly lines are held month to month, and Care is a twentieth.
  - The long note links to the terms.
  - Custom apps scope each feature as a user story.

### Waiting

- **Sean's:**
  - his pages and the cut-sheet;
  - `/contact/`'s "if it is a repair";
  - the footer's "When something breaks";
  - "Full-Service";
  - "Independent" in the schema;
  - Medford, hours, days to scope, Redding meetings, "over a decade", the KLounge address, notice for ending Care;
  - whether the site may say Sean reviews launches today;
  - the offer page's "+4k/m", "inhouse team", "hiring contractors" and contractor-packages lines.
- **Counsel:** the webmaster terms beyond the notes.
- **Later passes:**
  - the CTO's path for the community (outline links, lesson order, the Rx lessons, modules 1 to 3, register);
  - "Technical Archive" left in page 2–4 titles, the community sitemap and the og alt text;
  - the research brief from Sean's repositories.

## Pass 5: September 30, 2026

| Reviewer | Whole site | Homepage, service pages and contact |
|---|---|---|
| Local owner | 5 | 7.5 |
| Webmaster | 4.5 | 7.5 |
| Copywriter | 5 | 7.5 |
| Senior CTO | 5 | 7.5 |

These scores read the site after pass 4 and before this pass's tweaks. The copywriter expects about 8 on the focus pages after them.

### The objections that matter most

- **The local owner:**
  - `/prices/` and `/about/` read like another business.
  - "Joining is free" made owners wonder whether anyone could sign up and do their job.
  - What Care buys, and whether it pays the host.
  - `/design/new/` priced a clinic's booking page against its own booking rule.
  - "Book a free call" books nothing.
- **The webmaster:** `/community/staff/`'s payout plan and the offer page's "Team Staff Discounts" read as a multi-level scheme next to "Joining is free".
- **The senior CTO:**
  - A sponsored event counted as a vouching link.
  - CRO recordings need a privacy-policy line.
  - Two absolutes on on-site SEO.
  - "Independent … agency".
  - A button at 4.52:1.

### Sean's directions this pass

- **Reviews:** today Sean reviews his own launches, with AI tools. The site says every launch "is reviewed against the written scope before it goes live" and names no second reviewer.
- **Care:** it keeps the site running and never pays the owner's bills. Owners can cancel any month.
- **Changes, not repairs:** the site doesn't lead with repairs; changes are scoped.
- **Joining is beginning:** the vetting is in the work.
- **The register** is a boutique country club's.
- **Page ownership:** Sean owns `/prices/`, `/tools/`, `/resources/` and Training. The loop owns `/community/staff/` and the community offer page, and builds training content on the community pages. Training links to the community.
- **Lectures:** the community pages link to Sean's lectures where one fits (`docs/lectures.md`).

### Tweaks applied

- **One-line fixes on the focus pages:**
  - `/design/new/`'s quarter-share example is an event page or a food truck's menu.
  - The focus pages' hero button reads "Call or email"; Training, `/prices/` and the pages outside the focus keep "Book a free call".
  - The homepage defines the monthly engagement, and one-time jobs are flat fees.
  - `/contact/`'s range reaches the annual engagement.
  - Stacked monthlies are one quarter share per line of work.
- **Care:**
  - it lists the upkeep;
  - the owner's providers bill the owner, never through Care;
  - owners can cancel any month;
  - changes after handover are scoped;
  - upkeep lines no longer lead with breakage;
  - the $600 tier replaces the $300 tier.
- **Examples:** the $600 examples are defined changes, such as new hours carried across a site and its listings.
- **One standard:**
  - The name holds every webmaster to one standard: a written scope, and a review against it before launch.
  - The long note says joining begins with the work, credits webmasters' portfolios and ends on "as long as the owner chooses".
  - The short note on the service and local pages is one sentence, linking to `/contact/#for-webmasters`.
  - On `/service/` the note sits apart from the owner's pricing.
- **Klamath Falls:** the founder line is in the third person.
- **Accuracy:**
  - The sponsored event is gone.
  - Session recordings run "where your privacy policy covers it".
  - The two absolutes on on-site SEO are gone.
  - "Many" replaces "most".
  - `/service/`'s description drops "Independent".
  - "Fractional CTO leadership" is explained as a part-time head of technology.
  - The Klamath Falls button is 5.14:1.
- **`/community/staff/` becomes "Joining the team":**
  - joining is free and begins with the work;
  - 70% of the fee, with 30% to the agency inside the fee;
  - pay comes from client work, never from recruiting or memberships;
  - one worked example ($6,000 × 70% = $4,200, the same at every rung);
  - the negative-percent payout plan is gone.
- **The community offer page:**
  - "Memberships and the team": memberships are separate, and joining never depends on one.
  - "How webmasters on the team are paid".
  - "COMMISSIONS CLOSED" is gone.

### Waiting

- **Sean's:**
  - his pages (an error report is in progress);
  - `/contact/`'s "if it is a repair" line;
  - the footer's "When something breaks";
  - "Full-Service";
  - "Independent" in the Organization schema;
  - Medford, contact hours, days to scope, Redding meetings, "over a decade", the KLounge's address;
  - notice for ending Care.
- **Counsel:** the webmaster terms beyond the notes, the confidentiality sentence and California.
- **Pass 6:**
  - repair wording in lists on `/local/`, Redding, Klamath Falls and the Development meta;
  - the offer page's remaining lines;
  - "Staff" labels elsewhere;
  - lecture links on the community pages;
  - the community hub's "Technical Archive" title and banner.
- **Not a tweak:** image weight, a contrast check in the build, structural markup.

## Pass 4: September 30, 2026

| Reviewer | Whole site | Homepage, service pages and contact |
|---|---|---|
| Local owner | 4.5 | 6.5 |
| Webmaster | 4 | 7 |
| Copywriter | 4.5 | 6.5 |
| Senior CTO | 4.5 | 6.5 |

These scores read the site after pass 3 and before this pass's tweaks. The copywriter expects about 7.5 on the focus pages after them. Every reviewer's scores rose from pass 3.

### The objections that matter most

The local owner:

- `/prices/` in the menu still shows "6k/mo" and "120k/annu".
- A booking site was $6,000 on one page and $12,000 on another.
- "Year share" was undefined, so a county office couldn't tell $24,000 from $120,000.
- Care was priced but never called optional.
- There is one phone number beside "the webmaster who builds it is the one who answers the phone".
- Klamath Falls was written as "I".

The webmaster:

- `/community/staff/` still shows a multi-level pay plan.
- "The client decides every addition" never said additions are paid.
- The short note dropped "from their own practice".
- The homepage note sat inside the owner's call to action.
- The terms stop at the split.

The senior CTO:

- The Klamath Falls green card (3.13:1), the focus ring (1.76:1) and link hovers failed contrast under an accessibility offer.
- The annual engagement left out technology planning.
- Automation's Care line quoted the wrong tier.
- Accuracy lines on on-site SEO, CRO and the Marketing hub.
- Page weight against "lean pages".

### Sean's directions this pass

- Sizes can change, and colors change by small tweaks; the typefaces never change.
- The 🧙 stays.
- "Webmaster" is the craft.
- AI is part of the software craft.
- Owners' accounts are in their own name, with nothing resold or marked up.
- Meetings are at the KLounge.
- The owner and webmaster terms and the direction for counsel are approved (`docs/terms.md`).
- Iterate pass after pass.

### Tweaks applied

- **One booking rule:** a full share ($6,000) with a link to the booking tool the owner already uses; two shares ($12,000) when the site takes orders, bookings or payments itself.
- **The year share, defined:** "a fifth of the $120,000 annual engagement ($24,000 a year)". The annual engagement names technology planning and an accessibility program.
- **Care is optional:** without it, a repair is a tenth share for one named fix.
- **Hosting, domain and tools in the owner's name,** with no third-party cost resold or marked up. Ad spend goes from the owner to Google or Meta directly.
- **Automation upkeep** is the $600 Care tier.
- **`/contact/`:**
  - the scope "opens like a receipt" (the job, the fee, the delivery date and the webmaster);
  - payment terms for one-time jobs;
  - "The number above reaches Sean, the founder";
  - continuity: Sean covers, and the owner can choose another webmaster;
  - meetings at the KLounge or the owner's shop, with Redding by phone, video and email.
- **The homepage:**
  - the mission in the intro;
  - "the one who answers for it";
  - the second webmaster's review before launch;
  - the date in every scope;
  - one-time fees called one-time;
  - fractional CTO leadership alone sent to sdin.dev.
- **Klamath Falls in the team's voice,** with Google Business Profile, "sized to the job" and the five named listing platforms.
- **Training:** handover training is included and leads the page; a session after handover is a tenth share; the claims of a video library and "already done for you" are gone.
- **The notes to webmasters:**
  - "the name brings in local work… so the time on each job goes to the craft";
  - additions quoted in writing and paid;
  - the review before launch;
  - joining is free;
  - "from their own practice" in every form;
  - the builder looks after the site;
  - one label, and the homepage note set apart below the owner's contact details.
- **Accessibility:** the Klamath Falls card background is darker green, the focus ring's halo is stronger, and link hovers use the darker blue; "checked against WCAG 2.1 AA" replaces "works for everyone".
- **Accuracy:**
  - the chalkboard menu;
  - structured data "matching your Business Profile";
  - the five listing platforms;
  - "Google, Facebook and Instagram ads";
  - CRO's "the visits you already get" and "long enough for the numbers to mean something".

### Waiting

- **Sean's:**
  - `/prices/`;
  - Medford, contact hours, days until the written scope, Redding meetings;
  - "over a decade" against "since 2010";
  - Training's remaining content;
  - the Marketing H1's "compound".
- **Counsel:**
  - the webmaster terms beyond the notes;
  - the confidentiality sentence;
  - the assignment of work;
  - the California structure before a California webmaster signs.
- **Outside the focus or not a tweak:**
  - image weight;
  - a contrast check in the build;
  - `/community/staff/`;
  - `/about/`;
  - the PayPal.me top bar;
  - `sameAs`;
  - "Book a free call";
  - numbered steps as lists;
  - stock titles.

## Pass 3: September 29, 2026

| Reviewer | Whole site | Homepage, service pages and contact |
|---|---|---|
| Local owner | 3.5 | 5 |
| Webmaster | 3 | 5 |
| Copywriter | 4 | 5.5 |
| Senior CTO | 3.5 | 5.5 |

These scores read the site before this pass's tweaks. The benefit reviews that followed Sean's directions score the final recruiting note 8 (webmaster), 8 (local owner), 7.5 (senior CTO) and 8 (copywriter).

### The objections that matter most

The local owner:

- The line "$6,000 a month, or $120,000 a year for a larger scope" told a food truck the site isn't for them.
- The recruiting line under the phone number read as upsell and strangers.
- `/contact/` said "You deal with me directly" while the homepage promises a team.

The webmaster:

- There was one price story on the service pages, another on Automation and a third on the prices page.
- There were no terms for joining.
- `/community/staff/` reads as a multi-level scheme.

The senior CTO:

- Claims the site's own code or facts contradict: stars and a map pin from on-site markup, "eight seconds", "five years", "penalized", a daily ad ceiling called hard.
- Review counts were missing.
- `/contact/`'s title and its 2020 date.
- Pages of 1.4 to 2.4 MB against "lean pages".
- Buttons at 3.9:1 contrast against the accessibility claims.

### Sean's directions this pass

- Work with the package ladder in `docs/packages.md`, with amounts, and iron the pricing across the focus pages. Keep fractional CTO work minimal and point it to sdin.dev. Commission: the house keeps 30%.
- The reviewers promote the benefits of an independent webmaster joining the agency firm's team, and owners see the team as a benefit too, through Stealing Fire and the results of compounding group collaboration and learning.
- Feeling belongs in the copy: every deliverable carries the feeling it brings.

### Tweaks applied

- **One ladder on every focus page.** Each page names a defined job at its share of the $6,000 monthly engagement: a kiosk's listings at a tenth ($600), a food truck's menu page at a quarter ($1,500), a family shop's website at a full share ($6,000). It rises to the monthly engagement, and the annual engagement appears on the homepage and Local only. The Year Share appears on Klamath Falls and Redding for a public office's accessibility review. The Care Contract prices upkeep. "Fees are published…" is gone.
- **Automation:** one automation is a quarter share ($1,500), fixed in writing after the free audit. Keeping it running is the Care Contract.
- **The recruiting note:** a labelled "For webmasters" aside, set apart from the client's contact details. It leads with what the team takes off a webmaster's desk: "the name brings the local clients, the fee is published and every job has a written scope, so a webmaster's days go to the craft". The split comes last, "keep 70% of the fee on their work", in the third person. The fuller form on the homepage, `/service/` and `/contact/` adds "The client decides every addition" and "a lesson learned on one job doesn't stop with one webmaster". The note carries a "Joining the team" subject line, and it now also appears on the three hubs, Klamath Falls and `/contact/`.
- **The team as the owner's benefit:** the homepage adds "One team under one name… every job ends the same way: a check that it works and a plain note you can keep", and "brings to it what the whole team has learned".
- **`/contact/` speaks as the team:**
  - "Tell us", and "You know which webmaster does your work".
  - The ladder, and the change rule.
  - "Call or email", one phone format and the service-area phrase.
  - The title "Contact | Sean Dinwiddie's Webmastery", the H1 "Start with a free conversation", and a current date.
- **Feeling on the deliverables:** a fee you know before work begins, the site in your hands at handover, upkeep off your desk, nothing starting without your approval, changing your own hours on a Sunday night.
- **Accuracy:**
  - The homepage review counts: Upwork and Contra, 5.0 from 2 each.
  - On-site markup sets out hours, prices and the address, not stars or the map pin.
  - Speed without borrowed statistics.
  - "a hard monthly ceiling on spend".
  - Review requests to every customer, not only the happy ones.
  - Bought links break Google's spam policies.
  - "widely supported tools"; "Many people find you"; "measuring whether the fix worked".
  - Redding's "Who does your work".

### Waiting

- **Needs Sean** (in `todo.md`, and being counciled):
  - the webmaster terms;
  - joining free;
  - continuity for owners;
  - the learning mechanism and confidentiality;
  - `/community/staff/`'s pay plan;
  - whether Care is optional;
  - the accessibility claims against the button contrast.
- **Sean's wording that clashes:** the Marketing hub's H1 "SEO and campaigns that compound traffic and leads" uses a word the recruiting rules keep away from pay.
- **Held inside the focus:**
  - "Book a free call", the sitewide label, which would also change `/prices/`;
  - the footer and top bar;
  - numbered steps as real lists;
  - the homepage's two service lists;
  - Klamath Falls' stacked calls to action;
  - image weight.
- **Outside the focus, limiting the scores most:** `/prices/` (Sean's), `/community/staff/`, a webmaster page, `/about/`, Training's content.

## Pass 2: September 29, 2026

| Reviewer | Whole site | Homepage and service pages |
|---|---|---|
| Local owner | 4 | 6 |
| Webmaster | 2 | 4 |
| Copywriter | 4 | 6 |

### The objections that matter most

The local owner:

- Every service page points to the prices page, which still shows "6k/mo" and "120k/annu" with nothing attached; the owner still leaves there.
- Team or solo: the homepage now says you know which webmaster does your work, but no other webmaster is named, and `/contact/` still says "You deal with me directly".
- What upkeep costs after handover, and whether it's optional.
- Training reads like a do-it-yourself course, not the handover training the service pages promise.
- Nothing for a county office; enterprise work goes to sdin.dev.

The webmaster:

- Still no way in: no page, link or terms, and the only joining material is `/community/staff/` beside paid memberships.
- Proof and portfolio credited to Sean alone; marketplace sourcing implied on `/resources/`.
- Craft on the focus pages: a homepage close with no next step, emoji in headings read aloud by screen readers, stock agency headlines in mixed case, Training's hype.

What landed from pass 1: "not a stranger who inherited your file", the team promise, the tappable contact blocks, "Ratings of Sean Dinwiddie's own work".

### Tweaks applied

- **Headlines in the reader's words** on Website design, CRO, Website development, Custom apps, On-site SEO, Off-site SEO, Klamath Falls and the services hub. The Development and Marketing hub headlines and intros stay: they follow Sean's own wording.
- **One title pattern** ending in "| Sean Dinwiddie's Webmastery" on the homepage and the service pages.
- **The homepage close** gets a next step: the free first conversation, a tappable phone number and email.
- **The homepage's "What we do"** loses its emoji, and "Search and ads" becomes "Marketing" to match the menu.
- **Plain words:** "Google and Bing ads, set up and tuned, with a hard ceiling on spend"; "a webmaster to call who already knows your site" in place of "a technical lead on call".
- **Hub buttons** named like the Related links ("Website design", "Conversion rate optimization", and so on).
- **The price in writing:** the pages that point to prices say every job starts with a written scope and fee.
- **One service-area phrase:** Klamath Falls, Redding, and the towns in between.
- **Klamath Falls:** "Meet the founder", and tappable contact details.
- **Craft:** "cost", "What it costs" on Automation, "Choose a service", bold-in-heading markup, the brand-identity article's voice and two off-topic links, Training's hype and all-caps labels, and current `dateModified` dates.
- **Sean's direction, pricing sprinkled:** "Fees are published: $6,000 a month, or $120,000 a year for a larger scope, and a flat fee in writing for a defined job." on the homepage, the services hub, the Design, Development, Marketing and Local hubs, six service pages, Klamath Falls and Redding.
- **Sean's direction, recruiting sprinkled:** "Webmasters join the Sean Dinwiddie's Webmastery team as subcontractors on commission, with local clients and a written scope for every job." on the homepage, the services hub, the Local hub, seven service pages and Redding.

### Waiting

- **Held inside the focus:** "Full-Service" in the eyebrow (Sean's tagline beside "agency"); the homepage's "Full-stack development, user experience design, and digital strategy"; numbered steps as real lists; the homepage's two service lists; Klamath Falls' stacked calls to action; the consultant register on `/local/` and Redding; the brand article's Adobe section; the eyebrow missing on `/service/`; benefit-first meta descriptions; homepage image weight.
- **Outside the focus, limiting the scores most:** the prices page, `/contact/`'s "You deal with me directly", the webmaster page, the sitewide call-to-action label and top bar, `/about/`.
- **Facts only Sean has:** in `todo.md`.

## Pass 1: September 29, 2026

| Reviewer | Score |
|---|---|
| Local owner | 3.5 |
| Webmaster | 1 |
| Copywriter | 3 |

### The objections that matter most

The local owner:

- The prices page shows "6k/mo" and "120k/annu" with no engagement attached, while every service page promises it explains costs. The owner leaves there.
- The community pages, reached from the sitemap, read as a retired "technical archive" and don't say how they relate to hiring for a website.
- One person or a team? The homepage said you deal with Sean throughout; the footer says agency.
- The proof isn't local, and the examples are bare domain names.
- What upkeep costs after handover, and whether it's optional.
- Menu pages that look unfinished: training, tools, the store, a blog post titled as a URL.
- Nothing for a county office; enterprise work goes to the sister practice at sdin.dev.

The webmaster:

- No offer to webmasters and no way to join, and the site said only Sean touches client work.
- "Not a junior who inherited your file" told juniors they're what clients are promised they'll avoid.
- The only joining material, `/community/staff/`, shows pay as negative percentages with broken arithmetic.
- Hustle tone on the prices, tools, training and community pages.
- Many names for the business.

The copywriter: the service pages already pass most of the reading list's checks. Identity, prices, the mission as the through-line, and the webmaster reader fail.

Both readers praised the service pages' plain voice: leaving "with the site, not with a hostage situation", the free automation audit, "Anyone promising you page one by Friday is selling you something else", the hard ceiling on ad spend. It stays.

### Tweaks applied

Pass 1 works on the homepage and the service pages only.

- **The webmaster who builds it answers.** The homepage, the Development pages and the Redding page make the promise a team promise. "Not a junior who inherited your file" becomes "not a stranger who inherited your file". "Decades of" goes, since the Klamath Falls page says since 2010.
- **Sean's role named.** The Klamath Falls page introduces Sean as the founder of Sean Dinwiddie's Webmastery.
- **Proof credited to Sean.** "What Sean's clients say", ratings "of Sean Dinwiddie's own work", and "Sites Sean has built" for the examples links.
- **Service cards.** The jargon labels go, and the Local card names Klamath Falls, Redding and the towns in between.
- **Contact blocks on seven service pages.** One tappable phone number and email. "Message on social," goes, and "learn more" lead-ins become "The first conversation is free, and there is nothing to prepare." The one-off "AI automation services" goes with them.
- **Service area.** Automation names the towns in between and keeps Medford. The Redding note speaks to the reader.
- **Size rule.** "The software businesses actually run on".
- **Training.** The all-caps heading, a hype line, "complicated??", "cloths", and a future-tense promise on Page setup.

### Waiting

- **Outside this focus:** the prices page, about, contact, examples, tools, the community pages, the sitemap and the 404 page; the sitewide top bar, `sameAs`, call-to-action labels and community banner; the webmaster page and its footer link. All are in `todo.md`.
- **Facts only Sean has:** in `todo.md`.
