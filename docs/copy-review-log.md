# Copy review log

Each pass of the copy review (`docs/copy-review.md`), newest first. The next pass's reviewers read the previous pass's scores and objections here.

## Pass 14: October 1, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 8 | 9 | |
| Webmaster | 8.5 | 9 | 9 |
| Copywriter | 8.5 | 9 | 9 |
| Senior CTO | 8.5 | 9 | 9 |

These scores read the site after pass 13. The CTO expects 9, 9.5 and 9. The copywriter expects 8.5, 9.5 and 9.5. It holds the whole site at 8.5 until Sean decides what is his: the Secure Payment link, `/about/`, `/examples/` and the facts below.

### The objections that matter most

- **Owner:**
  - the annual engagement never said it can be ended for convenience;
  - the inquiry line asked owners to price their own job;
  - the top bar's "💳 Secure Payment" goes to a personal PayPal.me;
  - "delivery and support" promised more than the terms;
  - the $2,000 menu page named no deliverables;
  - "we'll tell you that instead" and "Let's talk about your website" read as free opinions;
  - the brand-identity article;
  - the homepage's repeats;
  - Redding's first two steps;
  - imported words ("holiday", "the till").
- **Webmaster:**
  - how work reaches a webmaster and who sets the share count;
  - whether peer review is paid;
  - when the 70% is paid;
  - the Introduction promising topics no lesson teaches;
  - Module 3's closings bringing back "asynchronous data streams";
  - BDD and Unit Testing contradicting itself;
  - duplicated openers;
  - BDD Testing Framework's wish list;
  - the offer page's keyword list;
  - the capstone promising a 503 its `Charge` type couldn't produce, with no column for the charge id.
- **CTO:**
  - the same points;
  - `orderNotice`'s chained ternaries;
  - "production" as a place to run scenarios;
  - Introduction to BDD's split list;
  - the View lesson's shared photo.

  The author and category archives were already noindex, and are now guarded.

### Sean's directions this pass

None new. Pass 14 worked within the standing ones:
- **The fee follows the work** (senior CTO, `docs/terms.md`). While Sean covers for a webmaster who is away, that month's 70% goes to whoever delivers the work.
- **The five-day pay term** stays off the site until counsel answers.
- **The inquiry line keeps "serious".** The CTO's draft dropped it, and the coordinator kept it: "Sean answers every serious inquiry, one that says those three things".
- **The brand-identity article is held.** It is Sean's piece for Adobe, so the copywriter's two light tweaks to it were held.
- **Held for Sean:**
  - how work reaches a webmaster, who sets the share count, and whether a webmaster can decline a job;
  - whether peer review is paid;
  - the Secure Payment link.

### Tweaks applied

- **The capstone:**
  - `Charge` gains `Unavailable`, answered 503 with the reason `payments-unavailable`;
  - `orders` gets a `charge_id` column;
  - card fields come from the provider's own script, and Endpoints at the Boundary's second backend is a CMS or a search service.
- **The View Stays Minimal:**
  - `orderNotice` chooses by key: a table over every request status and a `Map` of the API's reasons;
  - a unit test covers every branch (type-checked; 17 tests run against RTK 2.13 and React 19.3);
  - the lesson has its own photo.
- **Depth passages:**
  - BDD and Unit Testing;
  - Writing Clear and Concise User Stories (INVEST);
  - Introduction to BDD (the owner's words, scope to code);
  - User-Centric Design (the payer and the user, and WCAG).
- **The sync:**
  - h2 subheads on Capturing and Translating;
  - a guard that keeps repeated archive pages noindex.
- **The Course Outline's Module 4** matches its five lessons.
- **The Module 2 and 3 openers** keep a map instead of duplicates.
- **The Introduction:**
  - cut to what the course teaches;
  - "never just about the money";
  - one list instead of three.
- **The Module 1–3 bodies**, a few items per lesson:
  - overclaims against their own depth passages;
  - closings that repeat the next opener;
  - the owner, the counter staff and the written scope in place of product managers;
  - Module 3's stream framing in the events, fold and selectors vocabulary;
  - BDD Testing Framework never runs against production.
- **Focus pages:**
  - the annual engagement can be ended for convenience (`/contact/`, the homepage, Klamath Falls, Redding);
  - support after handover under the monthly engagement;
  - the inquiry line asks which example the job comes closest to;
  - the menu page's deliverables, with print artwork kept apart;
  - the paid consultation on `/development/apps/` and Klamath Falls ("Meeting Sean");
  - real h3s on the hubs;
  - Redding and `/local/` in plain words, each town card saying how owners meet Sean;
  - "vacation", "the register" and "around";
  - the public-office paragraph moved to the end of "Why work with us";
  - continuity on the homepage;
  - "the same for a kiosk and a county office" on `/contact/`.
- **Recruiting:**
  - the fee is never lowered to win a job;
  - additions are quoted and paid, so none is unpaid work;
  - the fee follows the work.
- **The offer page:**
  - the stack follows the project;
  - its register.

  The firm name and the tier lines stay.

### Waiting

- **Pass 15:**
  - h2 subheads on Writing Clear and on User-Centric Design;
  - depth passages in Introduction to FRP, Writing BDD Scenarios for Software Modules and Welcome to Module 1;
  - the Module 1–3 bodies;
  - the rest of the Introduction's shorthand;
  - five shared card photos;
  - optionally, an API scenario for the provider-down path;
  - the homepage's two service lists (the cards are a shared block).
- **Sean's:**
  - the Secure Payment link;
  - how work reaches a webmaster, the share count and declining a job;
  - whether peer review is paid;
  - the offer page's firm name;
  - the nav landmark on his pages;
  - memberships for administrators or webmasters;
  - the KLounge;
  - "since 2010";
  - Medford;
  - the testimonial names;
  - `/about/` and `/examples/`;
  - Training's $600;
  - the prices page's floor.

## Pass 13: October 1, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 8 | 9 | |
| Webmaster | 8.5 | 8.5 | 8.5 |
| Copywriter | 8.5 | 9 | 8.5 |
| Senior CTO | 8.5 | 9 | 8.5 |

These scores read the site after pass 12. The CTO expects the community at 9 once the capstone lands. The copywriter expects 9, 9.5 and 9 after this pass.

### The objections that matter most

- **Owner:**
  - who reviews a launch: the owner pages say Sean, and "Joining the team" said a peer;
  - the homepage's public-office paragraph left out what the half share delivers and the invoice terms;
  - the hub pages priced a website at one share only;
  - "its own share" of what;
  - the towns in between had no channel on `/contact/`;
  - the homepage's repeated Design line, and Redding's consultant wording.
- **Webmaster:**
  - the same review conflict, plus "any peer's" and who reviews a senior;
  - the offer page's second business name, its line on contractor packages and competitor reporting, its pseudo-headings and its register;
  - Module 3 opening with the Rx-style definition its own lessons correct, and the Elliott and Hudak paragraph on two pages;
  - hype openers on the overview pages;
  - the declined card stopping at the client;
  - Module 3's empty error-handling bullets;
  - two pairs of duplicated lessons.
- **CTO:**
  - the same points;
  - Servant's `err422` sends no content type, so a JSON matcher fails;
  - the View lesson's fallback claimed the order wasn't placed when a dropped connection can't tell;
  - "Joining the team" said the memberships are for administrators;
  - "Together, we'll transition…" broke the present tense.

### Sean's directions this pass

None new. Pass 13 worked within the standing ones:
- Sean asked that payment terms be settled without adding to his work. Under that, the senior CTO set when a webmaster is paid (`docs/terms.md`): within five business days of the client's payment clearing, and from the office's own payment for a public office, with a note for counsel.
- **Held, as facts only Sean has:**
  - the offer page's firm name;
  - the membership tiers' lines, which positioning leaves as they are.
- The FRP Fundamentals bullet on where to ask points to the team's own community and the Redux documentation, not an outside chat server.
- On the offer page, "three ways in" became "three tiers", because membership is earned through the work and never bought.

### Tweaks applied

- **Module 4's capstone, "One Feature, Scope to Launch":**
  - the written scope names the stories, scenarios, stack and what it leaves out;
  - the declined card runs through all four owners:
    - the API charges the card through a `Payments` record in the shell, outside any transaction, with the order's id as the idempotency key;
    - a decline answers 422 with its reason as JSON;
    - three scenario-named tests cover the four owners;
  - the review against the scope closes the job;
  - its depth passage covers authorize and capture, the customer's retry key and a provider that is down;
  - its last line speaks to webmasters.
- **Module 4's other lessons:**
  - the API lesson's 422 names its content type;
  - the View lesson's fallback says the order wasn't confirmed.
- **The sync:**
  - the Course Outline's Module 4 list renders from `LESSONS`;
  - the archives hold twelve cards a page;
  - h2 subheads on Reviewing as a Group and Writing BDD Scenarios for Software Modules.
- **Depth passages:**
  - Capturing User Requirements;
  - Translating User Needs;
  - Discover (expected failure as data);
  - Master the Fundamentals (events, a fold and a derived value with no library);
  - How BDD Aligns (a scenario that passes while the need fails).
- **Module 3:**
  - its opener and Introduction to FRP open with events and behaviors;
  - the origin paragraph stays on Introduction to FRP only;
  - the error-handling bullets point to Module 4 and the capstone;
  - the FRP overview and Discover lose their overclaims ("automatically propagate", "without the need for complex event handling", "callback hell", "respond promptly").
- **Duplicates:** Writing Clear and Concise User Stories has its own tap-to-call example.
- **Focus pages:**
  - "Joining the team": the rung sets the peer review, then Sean reviews every launch against the written scope;
  - the two-share site on `/development/` and `/design/`;
  - the half share's deliverables and invoice terms on the homepage;
  - "a one-time job, priced in shares";
  - the towns in between on `/contact/`;
  - the homepage's Design line and `/design/`'s panel intro reworded so they no longer repeat;
  - Redding in Klamath Falls' plain register, reviewing against the written scope.
- **Recruiting:**
  - `/contact/` says what the agency's 30% pays for, inside the published fee and never added to the owner's bill;
  - "Joining the team" says the memberships are separate offers that joining never depends on.
- **Register:**
  - the overview openers;
  - the Introduction (nine lines);
  - the Course Outline in the present tense;
  - Module 1's openers;
  - the offer page's register, its h2 and h3 headings, a real list, and the contractor line replaced by the flat 70/30.

### Waiting

- **Pass 14:**
  - h2 subheads on Capturing User Requirements and Translating User Needs;
  - depth passages in BDD and Unit Testing, Writing Clear and Concise User Stories, Introduction to BDD and Understanding the Importance of User-Centric Design;
  - `orderNotice` as a dispatch, with a test for each branch;
  - the Outline's Module 4 objectives;
  - the shared card photo;
  - the hubs' "Our process" pseudo-headings;
  - the rest of the Introduction, offer page, Discover, How BDD Aligns, Apply FRP and BDD and Unit Testing register;
  - Redding's first two steps and "right-sized";
  - where the public-office paragraph sits on the homepage.
- **Sean's:**
  - the offer page's firm name;
  - the nav landmark on his pages;
  - how jobs reach webmasters and who sets the share count;
  - memberships for administrators or webmasters;
  - the KLounge;
  - "since 2010";
  - Medford;
  - the testimonial names;
  - `/about/`;
  - Training's $600;
  - the prices page's floor.

## Pass 12: October 1, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 7.5 | 8.5 | |
| Webmaster | 8 | 8.5 | 8 |
| Copywriter | 8 | 8.5 | 8 |
| Senior CTO | 8 | 8.5 | 8 |

These scores read the site after pass 11. The copywriter expects 8, 9 and 8.5 after this pass.

### The objections that matter most

- **Owner:**
  - the change clause read as $2,000 on top of the $6,000 month;
  - whether upkeep, search, ads and conversion work share one month;
  - when the month is billed;
  - the public-office offer buried on the homepage;
  - "the whole engagement" tripping on `/contact/`.
- **Webmaster:**
  - the slice's cart-empties test cited but never shown;
  - the optimistic cart posted the client's price;
  - the Outline missing a Module 4 lesson;
  - the ladder not saying what a rung carries;
  - whether a custom app needs Haskell.
- **CTO:**
  - the same points;
  - openapi3's `InsOrd.Compat` map for `fromList`;
  - `decodingBaseQuery` used before its declaration in file order;
  - the FRP overview's Rx-style description;
  - a card alt that didn't match its photo.

### Sean's directions this pass

None new. Pass 12 settled what the docs already answered: billing in advance and 30 days' notice (`docs/terms.md`), and what a rung carries.

### Tweaks applied

- **Module 4's fourth lesson, "The View Stays Minimal":**
  - view-model selectors;
  - product and quantity sent, never the price;
  - the mutation hook carrying the request;
  - `selectFromResult` with a stable fallback;
  - the view tested by role and text for the placed order and the declined card;
  - type-checked, with its tests run against RTK 2.13 and React 19.
- **Endpoints at the Boundary:**
  - the test sets up the cart, asserts it empties, and checks the posted body;
  - the optimistic cart posts the product only and takes the server's cart;
  - `FetchBaseQueryMeta` added, `decodingBaseQuery` placed in file order, and the codegen's TypeScript-config note.
- **The API lesson:** `InsOrd.fromList`, and the price snapshot led by "prices change after the sale".
- **Accessibility:** h2 subheads on Collaborative Sessions and Real-World Cases through the sync, and a heading-order check in the build.
- **Depth passages:** Identifying User Needs, Practical Exercises and Principles of BDD.
- **Focus pages:**
  - under the monthly engagement, changes go on the month's written work list;
  - one month covers upkeep, local search, ads and conversion work;
  - the month is billed in advance, and the year monthly at $10,000;
  - a public-office paragraph on the homepage with the ADA dates and sdin.dev;
  - "the monthly engagement itself";
  - a plain Marketing panel intro.
- **Recruiting:** what a rung changes (who reviews whose launch), and that each written scope names the stack.
- **Register:**
  - five Introduction lines;
  - four offer-page lines, with DFY/DWY labelled as the Inner Circle's mentorship.
- **The Course Outline:** lists all four Module 4 lessons, and its duplicate link now points to From Scenario to Slice.
- **Cards:** the FRP overview's description and the Welcome card's alt.

### Waiting

- **Pass 13:**
  - the capstone, "One Feature, Scope to Launch";
  - the next depth passages;
  - h2 subheads on two more lessons;
  - the Outline's Module 4 list from `LESSONS`;
  - the rest of the Introduction and offer page register.
- **Sean's:**
  - the nav landmark on his pages;
  - how jobs reach webmasters and who sets the share count;
  - memberships for administrators or webmasters;
  - the KLounge;
  - "since 2010";
  - Medford;
  - the testimonial names;
  - `/about/`;
  - Training's $600;
  - the prices page's floor.

## Pass 11: September 30, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 7 | 8.5 | |
| Webmaster | 7.5 | 8.5 | 7.5 |
| Copywriter | 7.5 | 8.5 | 7.5 |
| Senior CTO | 7.5 | 8.5 | 7.5 |

These scores read the site after pass 10. The copywriter expects 8, 9 and 8 after this pass.

### The objections that matter most

- **Owner:**
  - the ads page sold a short burst that only runs inside the monthly engagement;
  - no word on ending the monthly engagement;
  - the public-office offer buried in a pricing paragraph;
  - `/development/` read a website as part of a retainer.
- **Webmaster and CTO:**
  - the API lesson's code contradicted its prose: no 403, and no prices read;
  - `toOpenApi` couldn't compile with `Auth`;
  - the foreign-key caveat sat beside `REFERENCES tenants`;
  - the two Module 4 lessons' data didn't meet;
  - the operationId claim;
  - the Introduction and offer page register;
  - what the 30% buys;
  - the accessibility gaps.

### Sean's directions this pass

- **The course's description leads with Sean's messaging** (user stories, BDD and functional programming). The API comes up where it fits, as judgment rather than a rule.
- **Don't be so exacting.**

### Tweaks applied

- **Module 4's third lesson, "Endpoints at the Boundary":**
  - one RTK Query root with the bearer token;
  - endpoints generated from the API's contract and reviewed;
  - responses decoded at the boundary;
  - tags that refetch;
  - the checkout scenario tested at the endpoint;
  - an optimistic cart update and its rollback as the depth passage.
- **The API lesson:**
  - one transaction reads prices, decides and writes, and Nile's refusal answers 403;
  - `orders` and `order_lines` share the client's shapes;
  - a small orphan instance describes `Auth` as a bearer scheme, and the operationIds are named;
  - the Hspec test signs tokens: Ada gets 201, and Grace from another shop gets 403;
  - the foreign-key caveat excepts Nile's built-in `tenants`.
- **From Scenario to Slice:** exports `CartLine` and says where the operation's name is set.
- **The accessibility sweep, through the sync and held by the build:**
  - code blocks take `tabindex="0"`;
  - category links lose their tabs;
  - depth passages become labelled asides;
  - the byline reads "Sean Dinwiddie" beside a decorative avatar.
- **Depth passages:**
  - Reviewing as a Group;
  - Collaborative Sessions;
  - Real-World Cases (the declined card);
  - Event streams (sampling);
  - BDD Testing Framework runs one scenario both ways, as cucumber-js steps and as a Vitest test.
- **Register:**
  - eight Introduction lines;
  - the overview posts' "committed to providing" lines;
  - the offer page's "propel" and closing line, and its title with the site's suffix;
  - the hub and Introduction invite webmasters "at any stage of the craft".
- **Focus pages:**
  - month to month with 30 days' notice (homepage and `/contact/`);
  - "Under the monthly engagement, the webmaster you reach in a year…";
  - ads run month after month;
  - `/development/`'s website is a one-time flat fee;
  - CRO is measured over the scope's period;
  - the city pages' descriptions and public-office lines;
  - "Joining the team" says what the 30% pays for and that each job comes with a written subcontract.

### Waiting

- **Pass 12:**
  - "The View Stays Minimal";
  - depth in Identifying User Needs, Practical Exercises and Principles;
  - `<p><strong>` subheads as real headings;
  - the main menu in a `nav`;
  - the Outline's duplicate link;
  - the rest of the Introduction and offer page register.
- **Sean's:**
  - the KLounge;
  - "since 2010";
  - Medford;
  - procurement wording;
  - the testimonial names;
  - the topbar's PayPal.me link;
  - Training's "$600";
  - the prices page's floor;
  - `/about/`.
- **Counsel:** the legal form of the terms.

## Pass 10: September 30, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 7 | 8.5 | |
| Webmaster | 7 | 8.5 | 6.5 |
| Copywriter | 7.5 | 8.5 | 7 |
| Senior CTO | 7.5 | 8.5 | 7 |

These scores read the site after pass 9. The copywriter expects 8, 9 and 7.5 after this pass.

### The objections that matter most

- **Owner:**
  - payment in full at signing for the smallest job;
  - ads only inside the monthly engagement;
  - "the two published figures";
  - the inquiry recipe not matching itself on `/contact/`.
  - Its after-handover "support" objections are settled as scope creep.
- **Webmaster:**
  - the API example never checked that the caller belongs to the tenant;
  - the Introduction still read as a sales letter;
  - the course never pointed a webmaster to "Joining the team";
  - meta descriptions promised depth the pages lacked;
  - BDD Testing Framework showed no test.
- **CTO:**
  - the same authorization gap;
  - `Pool` without its type argument;
  - the Introduction and Outline leaving out the API;
  - the RxJS hero and its cards;
  - the lesson titles.

### Sean's directions this pass

- **The footer stays.** Knowing the site belongs to a standing agreement, and the site doesn't cater to trolls or looky-loos.
- **A webmaster's clients stay theirs**, which is obvious.
- **"+4k/m" is the Inner Circle mentorship tier**, separate from the $6,000 client retainer.
- **The Adobe Express section stays.**
- **Planning is fluid and hybrid,** with Scrum when a job needs it.
- **Don't be pedantic about software.**
- **The team stands by its work.** After-handover repair questions are scope creep.
- **Payment for the smallest job is the CTO's to settle.** Keep Sean's workload light until more webmasters join.

### Tweaks applied

- **Module 4:** its second lesson, "From Scenario to Slice", lands, and the module is named "The Chain End to End".
- **The API lesson:**
  - The caller is authorized: servant-auth in the type, and `nile.user_id` so Nile checks tenant membership.
  - `SET` is explained: the IDs are safe to write into the statement because they're already parsed as UUIDs.
  - One transaction reads, the pure code decides, and the transaction writes.
  - `validateEveryToJSON` keeps the contract honest, and the tests run against Nile in Docker.
  - Nile's limits on shared tables are named.
- **The sync script:**
  - Lesson titles, og, twitter and the WebPage name follow `LESSONS` with the site's suffix.
  - The banner names the API, and the main sitemap renders from `LESSONS`.
  - The Rx guard reads images and alt text.
  - The RxJS screenshot is gone.
- **FRP:** "Events and Behaviors" in place of "Reactive Streams".
  - Selectors read the state after each action rather than in continuous time.
  - Discover's drag-and-drop becomes an autocomplete that listener middleware debounces.
  - Event streams' examples become a kitchen queue and table bookings.
- **The register:**
  - "Every step of the way" is gone from the overview posts and the Curriculum.
  - The Introduction loses its quote, its empty headings, "Don't hesitate" and "the prime moment", and names four subjects, the API included.
  - The Outline names the API.
- **Layers of depth** in Defining User Stories, Writing BDD Scenarios and BDD Testing Framework.
- **The focus pages:**
  - The payment line keeps a third share paid at signing, against a written scope that names the result and its delivery date (the CTO's decision).
  - "Every fee traces to two figures, $6,000 a month and $120,000 a year".
  - The inquiry ask matches its test.
  - `/service/` reads "the fees above".
  - The homepage drops "digital strategy".
  - `/local/` has a new description.
- **Recruiting:**
  - The hub points webmasters to "Joining the team".
  - The clients a webmaster brings in stay theirs.
  - On a custom app, its passing scenarios are part of the result.
  - "Joining the team" gains three subheads.
  - The offer page drops "inhouse" and names the API.

### Waiting

- **Pass 11:**
  - Module 4's "Endpoints at the Boundary";
  - the next layers of depth;
  - BDD Testing Framework showing one scenario both ways;
  - the rest of the Introduction's register;
  - the offer page's register;
  - "with 30 days' notice" on `/contact/`;
  - the accessibility sweep;
  - the hub's title naming the API;
  - whether servant-openapi3 needs an instance for `Auth`.
- **Sean's:**
  - Training's "$600";
  - the prices page's floor;
  - ads as a one-time job;
  - procurement wording;
  - the KLounge;
  - "since 2010";
  - Medford;
  - the testimonial names;
  - the topbar's PayPal.me link;
  - `/about/`.
- **Counsel:** the legal form of the terms.

## Pass 9: September 30, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 6.5 | 8.5 | |
| Webmaster | 6.5 | 8 | 5.5 |
| Copywriter | 7 | 8.5 | 6 |
| Senior CTO | 7 | 8.5 | 6 |

These scores read the site after pass 8. The copywriter expects 7.5, 9 and 7.5 after this pass.

### The objections that matter most

- **Owner:**
  - what a call after handover costs;
  - "fix what trips them up" after a flat-fee launch;
  - "Book a free call" on the pages around the focus;
  - the automation fee's dangling "or more";
  - what counts as a "serious inquiry".
- **Webmaster:**
  - the Introduction still reads as a sales letter;
  - Module 3 still teaches observables;
  - scenario examples that break the Gherkin lesson's own rule;
  - WordPress missing from recruiting;
  - `/contact/#for-webmasters` as one long paragraph.
- **CTO:**
  - post-launch work with no scope or price;
  - the annual engagement read as 12 months of the monthly one;
  - "Small improvements can make a big difference" against the floors;
  - archives in reverse order with stale hand-copied excerpts;
  - no lesson for the back half of the chain.

### Sean's directions this pass

- **The header button:** "Call or email" on every page, his own and `/about/` included. No button offers a free call or consultation.
- **The API lesson:** focused on Haskell Servant and Nile, and added now.
- **Lecture links** all through the community pages.
- **Work in progress isn't an error.** Lines describing the practice or the course stay while their lessons are built; only what is actually wrong is corrected.

### Tweaks applied

- **The API lesson:** "The API: Haskell Servant and Nile" opens Module 4.
  - The API is a Servant type, and handlers stay thin over a pure core.
  - Each tenant's data is kept apart in Nile (`SET LOCAL nile.tenant_id`, with `tenant_id` in the primary key), checked against Nile's own docs.
  - One OpenAPI contract serves both the server and the client.
  - The scenarios become scenario-named Hspec tests.
  - Apply FRP, the Course Outline and both sitemaps link to it.
- **The sync script:**
  - The archives render from `LESSONS` in teaching order, with excerpts taken from each page's meta description.
  - Pagination is replaced by pattern.
  - The owner-page note to webmasters is one shared constant.
  - The Introduction names the depth passages.
  - Guards fail the sync if a focus page names a retired offer or free work, or a lesson teaches Rx vocabulary.
- **Rx out of Module 3:**
  - Events are actions, and state is a fold.
  - Selectors, listener middleware and RTK Query take the Rx concepts' places.
  - "Efficiency" and "Scalability" become "Predictability" and "Clear ownership".
- **Layers of depth** in the Gherkin lesson, Event streams and Apply FRP.
- **Gherkin:**
  - Feature, Examples and Tags are added.
  - The Given, When and Then lists number correctly.
  - The booking and checkout examples run below the interface, with checkout split into three scenarios.
  - Scenario Outline replaces "Scenario Templates".
  - Gherkin is described as Cucumber's language for Given-When-Then.
- **The register:**
  - The three "Welcome back" openers and the "Software Engineering Consultant" lines are gone.
  - The Introduction's "REFINE AND ELEVATE" and "Then contact us immediately!" are replaced.
- **Lecture links on 34 of 36 lessons**, plus the hub, the outline and the P.S. note (`docs/lectures.md`).
- **The focus pages:**
  - Post-launch testing happens before launch, and adjusting after it is the monthly engagement.
  - Fees trace to the two figures.
  - Automation starts at a third share.
  - A serious inquiry is defined as one that names the job, its timing and the fee it fits.
  - The accessibility review covers the templates the scope names.
  - Klamath Falls says "each improvement is a defined job".
  - The recruiting pages name the stack following the project.
  - "Joining the team" has real subheads and adds "and wants you" and the $1,400 example.

### Waiting

- **Pass 10:**
  - "Our online community is here to support you every step of the way" on the overview posts;
  - "Reactive Streams" becomes "Events and Behaviors";
  - the rest of the Introduction;
  - the Introduction and Outline naming the API;
  - the next Module 4 lessons (scenario to slice, endpoints);
  - the next layers of depth;
  - the RxJS hero image;
  - lesson titles.
- **Sean's:**
  - the footer's "When something breaks";
  - whether a client a webmaster brought can leave with them;
  - the offer page's "+4k/m";
  - Training's "$600";
  - the prices page's floor;
  - Module 1's Scrum ceremonies;
  - the Adobe Express links on the brand article;
  - `/about/`.
- **Counsel:** the legal form of the terms.

## Pass 8: September 30, 2026

| Reviewer | Whole site | Focus pages | Community as training |
|---|---|---|---|
| Local owner | 6.5 | 8.5 | |
| Webmaster | 6 | 8 | 5 |
| Copywriter | 6.5 | 8.5 | 5.5 |
| Senior CTO | 6.5 | 8.5 | 5.5 |

These scores read the site after pass 7. The copywriter and the CTO expect about 7, 9 and 7 after this pass.

### The objections that matter most

- **Owner:**
  - who the team is besides Sean;
  - automation upkeep cost more a month than the build;
  - no reply time;
  - the long webmaster note;
  - what a $6,000 site holds.
- **Webmaster:**
  - two front doors to the community, and lesson 1 read as a sales letter;
  - observables still taught as FRP's core;
  - the outline promised a Module 4;
  - no lesson teaches the back half of the chain;
  - gaps on "Joining the team" (cover when away, team learning, whether the split covers ongoing work).
- **CTO:**
  - free work advertised on eight pages;
  - no-charge fixes;
  - Care tiers that contradicted each other;
  - maintenance and artwork read as included in the build fee;
  - the banner and the lesson order starting in different places.

### Sean's directions this pass

- **Owners meet Sean.** For now he is the face, the owner and the guardian of the practice; the site may say he reviews results before launch.
- **No promised reply time.** Serious inquiries get a reply.
- **No free work:** no free calls, conversations, consultations or audits.
- **Owner copy never advertises fixes** to the team's own work; they invite scope creep.
- **Joining is never called free.** It asks for quality work. The community and the team are one membership; the membership tiers are for webmasters who want more mentorship and camaraderie, which comes much later.
- **The Introduction is the one start**, and **no lesson is gated by level**: every lesson serves every level, with layers of depth.
- **The floors:** no ongoing client below the $6,000 monthly engagement; a one-time job starts at a third share ($2,000), set by demand. Small edits wait on entry-level webmasters, so recruiting comes first. The senior CTO worked out the ladder.

### Tweaks applied

- **Photos:** served at 1600 px, with an image budget in the build; `assets/img` went from 17.2 MB to 6.6 MB.
- **The community's structure, from `LESSONS`:**
  - The banner sends every level to the Introduction and names each lesson's place.
  - The Introduction says how each level reads the course.
  - Each module opener lists its lessons.
  - The community sitemap runs in teaching order.
  - Each lesson's JSON-LD headline and breadcrumb follow its title.
  - The note below each lesson points to work in a written scope.
- **No free work, no fixes, owners meet Sean:**
  - The inquiry line replaces "The first conversation is free" on eight pages.
  - `/contact/` opens "Start with the job".
  - The audit and the consultation are paid third shares.
  - "Makes good… at no charge" and the repair line are gone.
  - Owners speak with Sean, who reviews results against the written scope.
- **Pricing to the floors on every focus page:**
  - One-time jobs from a third share ($2,000).
  - A public office's accessibility review at a half share ($3,000).
  - Ongoing care, search, ads and conversion work in the monthly engagement.
  - The site runs in the owner's own accounts after handover.
  - The tenth, quarter, Care, Standing and Year Share offers are retired.
- **Recruiting first:**
  - The owner-page note invites webmasters at any stage of the craft.
  - `/contact/#for-webmasters` and "Joining the team" say junior included, name the lessons, and show $4,200 a month for each monthly engagement a webmaster holds.
  - Joining asks one thing, quality work.
- **The lessons:**
  - The Course Outline is retitled and every topic linked.
  - The Introduction's first lines soften.
  - Dan North, Bill Wake and Matt Wynne are credited.
  - The password-reset criteria are single use and don't reveal accounts.
  - Scenarios name behavior, not clicks, and run below the interface.
  - Gherkin is the language, and Given, When and Then are its keywords.
  - Apply FRP derives with selectors and tests its slices with Module 2's scenarios.
  - Lecture links on Module 3, Event streams, and BDD and Unit Testing.

### Waiting

- **Pass 9:**
  - the remaining Rx steps;
  - the archives in teaching order;
  - the register ("Welcome back", "Software Engineering Consultant", two or three Introduction lines);
  - the Gherkin follow-ups;
  - the webmaster note as a shared constant.
- **Pass 10:** layers of depth inside lessons; the chain end to end (story to Servant API).
- **Sean's:**
  - Training's "a tenth share ($600)" and the prices page's floor;
  - "Book a free call" on his pages and `/about/`'s "Get a Free Consultation";
  - the footer's "When something breaks";
  - Module 4;
  - days to a written scope;
  - Redding meetings;
  - webmaster pay timing;
  - the offer page's firm name and "inhouse team".
- **Counsel:** the legal form of the terms.

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
