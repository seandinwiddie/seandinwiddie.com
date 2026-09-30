# Sean's pages: errors to fix

An audit of the pages Sean owns and edits himself: Training (`/service/training/` and its pages), `/prices/`, `/tools/` and `/resources/`. Run on September 30, 2026, report only; the copy loop never edits these pages. Each item is marked **error** (clearly wrong) or **suggestion** (a judgment call). Line numbers refer to each page's `index.html` as of that date. Fixed items leave this file.

**Links:** I checked every internal `href` and `src` on the seven pages. All of them resolve to files in the repo, and the only anchor (`#main`) exists. I couldn't reach the internet, so these external links are **unverified**:
- YouTube `XcS-LdEBUkE` (FRP) and `5fPnmcYBSPI` (Prices)
- Vimeo `35150918` (Resources)
- `millyuns.com/quotes-sam/` (Tools)
- `aweber.com/permission.htm`, `aweber.com/thankyou-coi.htm?m=text` and `aweber.com/scripts/addlead.pl` (all four Training pages)
- `paypal.me/seandinwiddie` and the social links

Line numbers refer to each page's `index.html`.

## /service/training/ (`service/training/index.html`)

- **error**: first person where the site speaks as the team.
  - L99 "I created this training…"
  - L102 "This is why I've also created…"
  - L110 "I've also provided all of the access…"
  - L116 "I'll leave you with some food for thought..."
  - L166 button "Join my email list"
  - Fix: "the team" / "we"; the button reads "Join the email list".
- **error**: L102–115 describe things that don't exist anywhere in Training: "a section of ready-to-adjust solutions", "these blank assets through other partners", "Pre-prepared files", "Walk-throughs", "Sample documents of each asset". Fix: cut them, or point to what exists (the community modules).
- **error**: L99 "help local businesses who are struggling with development, and show them how to create niche software applications with a little bit of practice and guidance". This contradicts the handover promise, where owners run their own sites and don't build apps. Also "businesses who" → "businesses that". Fix: cut, or reframe as handover.
- **error**: L130, L132, L133, L138, L140. `<h4>Copywriting</h4>`, `Email`, `Ads`, `Single-page apps` and `Databases` are placeholder topics with no link and nothing under them. Fix: link them to real content or remove them.
- **error**: headings out of order. L123 `<h3>Topics covered</h3>` is followed by `<h2>Marketing</h2>` (L126) and `<h2>Development</h2>` (L136). The topics themselves are marked up as h3/h4 headings. Fix: "Topics covered" as h2, card titles as h3, topics in a `<ul>`.
- **error**: L103–109 and L111–115 are lists typed as separate `<p>` ("Concepting", "Wireframing", "Testing", "Programming", "Social", "Emails"). Fix: `<ul><li>`.
- **error**: L113 "So you can practice engineering in any application." is a fragment with no item of its own. Fix: join it to L112 or cut it.
- **error**: L101 "professional-level work-flows, practicing their development". Fix: "workflows"; the dangling "practicing their development" needs rewording.
- **error**: L114 "Walk-throughs" vs L98 "walkthrough". Fix: "Walkthroughs".
- **error**: L112 "Pre-prepared" is redundant. Fix: "Prepared" or "Ready-made".
- **error**: L117 `<h3 id="systems-thinking"><strong>Systems-thinking.</strong></h3>` has three problems:
  - the noun takes no hyphen
  - a heading takes no period
  - `<strong>` doesn't belong inside a heading
  - Fix: `<h3 id="systems-thinking">Systems thinking</h3>`.
- **error**: L119 has broken spacing and brackets: "Leverage( a machine... engine )", "side-effects(impurity)", "byproduct[, preferably positive, ]-affecting". Only "Leverage" is capitalized. Fix: "Leverage (a machine, an engine): …", "side effects (impurity)", set out as a `<dl>` or `<ul>`.
- **error**: L120–121 have three wording errors, and the items are separated with `<br/>` instead of a list:
  - "High return samples" / "Low return samples" → "High-return examples" / "Low-return examples"
  - "non-consistent" → "inconsistent"
  - "micro-managed" → "micromanaged"
- **error**: the form at L158–166 has three accessibility gaps:
  - Inputs have no `autocomplete="name"` / `autocomplete="email"`. WCAG 2.1 SC 1.3.5 (AA) requires it, and that is the standard the site sells.
  - The email field is `type="text"`. Fix: `type="email"`.
  - Name and email are required (`meta_required`), but neither field is marked `required` or labelled as required (SC 3.3.2).
- **error**: the meta description, og and twitter tags and the JSON-LD (L8, L12, L22) read "Practical training materials… maintained by Sean Dinwiddie." This is stale: the page now leads with handover training and the $600 session, the materials mostly don't exist, and it credits Sean rather than the team. Fix: describe handover training and the team session, credited to Sean Dinwiddie's Webmastery.
- **suggestion**: L121 lists "meals" and "clothes" as low-return. Restaurants, food trucks and shops are the owners the site speaks to. Fix: cut them.
- **suggestion**: redundant wording:
  - L96 "simpler, less complex and complicated"
  - L97 "unnecessary and excess processing"
  - L100 "designed to take the guesswork out of designing"
  - L93 "refine and improve"
- **suggestion**: L95 points owners to "the community" without saying that membership is paid ($1,000 or $4,000 a month) or in free beta.
- **suggestion**: AWeber details in the form:
  - The form doesn't say what the list sends.
  - L168 "We respect your email privacy" links to AWeber's `permission.htm` with `title="Privacy Policy"`, which isn't this site's policy (L147 already links to `/privacy/`).
  - L170 "Powered by AWeber" is an exit link.
  - L153 `meta_adtracking` still holds the default value "My_Web_Form".
  - L152 redirects to AWeber's generic thank-you page.
- **suggestion**: small mismatches in names and links:
  - The title "Software and Web Training" doesn't match the H1 "Training".
  - The JSON-LD breadcrumb skips Services.
  - The L128 link "Landing pages" leads to an H1 that reads "Pages".
  - L142 FRP doesn't link to the community's FRP module (`/community/module-3-functional-reactive-programming-frp/`).

## /service/training/frp/

- **error**: the page is unfinished. It has an H1, a YouTube embed (L93) and the email form, with no text saying what the video is, whose it is or who it's for. Fix: one or two lines of context, plus a link to the community FRP module.
- **error**: the same AWeber form problems as the hub:
  - L109 and L113 have no `autocomplete`, and the email field is `type="text"`
  - L115 "Join my email list"
  - L117 links to AWeber's page with the title "Privacy Policy"
- **suggestion**: FRP is a developer topic. Say it's for webmasters and developers, since the site's copy speaks either to owners or to webmasters.
- **suggestion**: L93 the iframe title "External content from YouTube" is generic. Name the video.
- **suggestion**: the meta description ("Training resources for… applying event-driven data flow") promises more than one video.
- **suggestion**: breadcrumb and image metadata:
  - The JSON-LD breadcrumb reads "Functional Reactive Programming Training", which doesn't match the title and H1, and it skips Training.
  - The og:image alt and caption read "Sean Dinwiddie's technical archive covering Redux, BDD, and…". The page covers only FRP, and "technical archive" reads as retired.

## /service/training/pages/

- **error**: L94 the link "Setup walkthrough: template, checklist, and tutorial" leads to a page with no template, checklist or tutorial. Fix: rename the link, or build them.
- **error**: L95–96 "Ranking optimization: template, checklist, and tutorial" and "Copywriting work order: template, checklist, and tutorial" are placeholders with no links and no pages. Fix: remove them until they exist.
- **error**: L86 the H1 "Pages" doesn't match the title and breadcrumb "Landing Page Training" or the hub's link "Landing pages". Fix: H1 "Landing pages".
- **error**: the same AWeber form problems (L115, L119, L121, L123).
- **suggestion**: there is no intro line. The meta description ("planning and assembling clear landing pages with purposeful content, structure, and calls to action") overpromises, and the breadcrumb skips Training.

## /service/training/pages/page-setup/

- **error**: L101 "you need the page infrastructure!<br/>The best solution is to use WordPress." This contradicts the service pages:
  - `/development/sites/` says "No page builder you pay for forever".
  - `/development/` says "built on widely supported tools" and names no platform.
  - The site itself isn't WordPress, "best" is unsupported, and the exclamation mark is hype.
  - Fix: cut it.
- **error**: the page is unfinished. It stops at L101 with no steps, although the parent link promises "template, checklist, and tutorial" and the meta description promises "organizing its content, and preparing the page for implementation". Fix: add the steps, or trim the promises.
- **error**: L100 "Once you have a location for your page, then you can provide your message and offer to your client avatar."
  - "Once…, then" doesn't need the "then".
  - "location" is unclear.
  - "client avatar" is jargon. Fix: "the customers you want".
- **error**: L96–97 "Second:" / "How to contact you" is a fragment split across two paragraphs, with no punctuation, and it isn't parallel with the first priority. Fix: "Second: how customers reach you." Or make both priorities an `<ol>`.
- **error**: the same AWeber form problems (L118, L122, L124, L126).
- **suggestion**: L98 "The best way to be reached is through your own domain." A domain doesn't reach anyone. Fix: "an email address and website on your own domain".
- **suggestion**: the H1 "Page setup" doesn't match the title "Landing Page Setup Guide". L101 uses `<br/>` between two sentences; use two `<p>`. The breadcrumb skips Training and Pages.

## /prices/

- **error**: L112 "Sean Dinwiddie produces software…" doesn't use the brand name. Fix: "Sean Dinwiddie's Webmastery builds software". The sentence also switches from third person to "us".
- **error**: L112 "inexpensive" sits beside $6,000 a month and $120,000 a year. It contradicts the published figures and the high-end standard. Fix: cut it.
- **error**: L113 "small service businesses in Shasta County". The service area is Klamath Falls, Redding and the towns in between.
- **error**: L96–97 `<h3>6k/mo</h3><h3>120k/annu</h3>`:
  - "annu" isn't a word
  - there are no dollar signs
  - neither figure is tied to "the monthly engagement" or "the annual engagement", which every other page names
  - Fix: "$6,000 a month, the monthly engagement" and "$120,000 a year, the annual engagement".
- **error**: L101 "Our unique value proposition." is leftover template text, with `<strong>` and `<br/><br/>` inside the h2.
- **error**: heading order and misused headings:
  - The order runs H1 → h3 (L96–97) → h2 (L101) → h3 (L103, L106).
  - The Vision and Mission sentences are marked up as h3, with a leading `<br/>`.
  - Fix: h2 for sections; prices and statements in `<p>` or a `<dl>`.
- **error**: L112 has four problems:
  - comma splice: "…mindless scam offerings, you can literally depend on us." Fix: end the sentence with a period
  - a comma is missing before "effectively"
  - "advertises promotions" is odd. Fix: "runs advertising"
  - "mindless scam offerings" and "literally" are hype
- **error**: L114 has two missing commas and a run-on:
  - "For each problem that we solve for our clients[,] we get"
  - "the harder they strive[,] the more people"
  - Run-on: "…a niche we love and believe in, we get to change the world…" Fix: split it into two sentences.
- **error**: L114 "wonderful, deep, restful, dramatically improved sleep" and "change the world" are an unsupported result claim and hype. The writing rules forbid invented results and loud copy.
- **error**: L115–116 "If our vision resonates with you..." / "Then contact us immediately!" is one sentence split across two paragraphs. It adds urgency the terms don't allow (the ADA Title II dates are the only urgency), and it gives no phone number, email or link.
- **error**: the meta description, og and twitter tags and the JSON-LD (L8, L12, L22) read "…then contact Sean Dinwiddie for a scope and price". The prices are public, and this names Sean rather than the agency.
- **suggestion**: L104 "your small business problems" (hyphenate as "small-business" if kept), L113 "small service businesses" and L114 "one small business at a time" leave out the public offices and firms that the annual engagement serves.
- **suggestion**: L114 "It's no longer just about the money" implies it once was. "at our company" should read "agency".
- **suggestion**: L109–111 the "Inquiry" / "Insight" labels, and L110's answer is a fragment.
- **suggestion**: the page doesn't match the rest of the site:
  - It never explains shares.
  - It shows none of the figures that the homepage, service and contact pages quote: $600, $1,500, $3,000, Care at $300 or $600 a month, the $24,000 Year Share.
  - It omits the written-scope rule and the payment terms in `docs/terms.md`.
- **suggestion**: L119 the YouTube embed has no caption and a generic iframe title.
- **suggestion**: the title "Project Pricing and Scope" doesn't match the H1 "Prices". `dateModified` on this cornerstone page is 2022-09-12. The L87 button sits above the prices.

## /tools/

- **error**: L100 "surcui". Fix: "Sucuri".
- **error**: L96 "gsuite". G Suite was renamed Google Workspace in October 2020.
- **error**: L100 wrong product names:
  - "updraft" → "UpdraftPlus"
  - "google site kit" → "Site Kit by Google"
  - "yoast" → "Yoast SEO"
- **error**: L96–100 product names in lowercase. Corrected: Notion, Porkbun, RamNode, Sublime Text, Dank Mono, Redux, Relay, GraphQL, Haskell, PostgreSQL, Jetpack, WP AutoTerms, Simple Sitemap, Hotjar, Flamingo, EWWW Image Optimizer, WP-Optimize, WP Super Cache.
- **error**: L99–100 the labels "app prog-" and "sites-" are truncated and use a hyphen as a colon. Fix: "App development:" and "Sites:".
- **error**: L100 "vc starter child" appears to be a child theme of Visual Composer's Starter theme, which is a page builder. That contradicts `/development/sites/` ("No page builder you pay for forever"). The whole "sites-" list is a WordPress plugin stack, and the service pages don't offer WordPress. Fix: cut it, or list the tools the team uses now.
- **error**: L107 "Great minds discuss ideas… small minds discuss people." attributed to Eleanor Roosevelt is a known misattribution (Quote Investigator traces it to earlier sources). Fix: cut it.
- **error**: L106 the Jillian Michaels quote has no source, and I couldn't confirm she said it. Fix: cut it or source it.
- **error**: L106–107 mix curly double quotes with straight apostrophes, and use " - " before each attribution. Fix: curly apostrophes and an em dash "—".
- **suggestion**: L108 "Sam Ovens Quotes" links to millyuns.com (unverified). The get-rich tone is off-brand, and the quotes card has nothing to do with tools. Fix: cut the card.
- **suggestion**: the lists are `<p>` with `<br/>`, and the groups at L96 and L98 have no labels. There are no links. L102 is a stray non-breaking space.
- **suggestion**: the list doesn't reflect current practice: no AI tools (the terms say the team are advanced AI and software users), `dateModified` is 2021-07-08, and the title "Agency Tools" doesn't match the H1 "Tools".

## /resources/

- **error**: L96 "fiverr / freelancer" read as sourcing work from marketplaces. The positioning says the brand never reads as a marketplace. They are also lowercase: Fiverr, Freelancer. Fix: cut them.
- **error**: L97 "adobe stock / unsplash / vecteezy". Fix: Adobe Stock, Unsplash, Vecteezy.
- **error**: L95 "FunFunFunction". Fix: "Fun Fun Function". The channel appears inactive for years; confirm.
- **error**: the page is unfinished: bare names with no links, no labels and no intro.
- **error**: L99 `allowfullscreen="true"` is an invalid value for a boolean attribute. Fix: `allowfullscreen`.
- **error**: the meta description ("A maintained collection of web design, software development, SEO, hosting, and business tools") doesn't match the page. There are no hosting or design tools, and `dateModified` is 2021-07-15.
- **suggestion**: L99 the Vimeo iframe has no width or height (layout shift), uses `//player.vimeo.com` where `https://` is safer, and has a generic title.
- **suggestion**: L95 "Consulting.com" has a hustle tone.
- **suggestion**: the title "Web and Software Resources" doesn't match the H1 "Resources".

## Shared on all seven pages (header, footer, schema)

- **error**: `aria-current="page"` marks the wrong link. It sits on "Services" (L48 on the Training pages) and on "About" (L58 on Prices, Tools and Resources), so screen readers announce the wrong link as the current page. Fix: put it on the actual submenu link, and use `aria-current="true"` (or nothing) on the parent. The same pattern runs across the whole site.
- **suggestion**: L71 Twitter has been X since 2023.
- **suggestion**: footer and brand details:
  - "Copyright Sean Paul Payne Dinwiddie" has no year or ©, and isn't the brand name.
  - The mail link's aria-label reads "Email Sean".
  - The `sameAs` field in the JSON-LD lists personal Freelancer, Upwork and Contra profiles.
  - The "Book a free call" button differs from "Call or email" on the service pages.

## Errors per page

| Page | Errors | Suggestions |
|---|---|---|
| `/service/training/` | 15 | 5 |
| `/service/training/frp/` | 2 | 4 |
| `/service/training/pages/` | 4 | 1 |
| `/service/training/pages/page-setup/` | 5 | 2 |
| `/prices/` | 11 | 6 |
| `/tools/` | 9 | 3 |
| `/resources/` | 6 | 3 |
| Shared header, footer and schema | 1 | 2 |

The AWeber form problems are counted once per Training page. It's the same block on all four, so one fix covers them all.
