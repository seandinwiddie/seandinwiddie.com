#!/usr/bin/env node

/** Keep repeated, content-bearing page components synchronized across the static site. */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT, fileForPathname, isNoindex, publicPageFiles, read, relativePath } from "./static-site.mjs";

// The five service cards existed as three hand-maintained copies of the same
// words: this shared block, the set inside /service/, and the set on the home
// page. Editing one left the other two behind, and nothing could see the drift
// because each copy was "correct" on its own terms. They are one list now, and
// the three renderers differ only in heading level and indentation.
const SERVICE_CARDS = [
  ["/marketing/", "Marketing", "AdobeStock_135407660-scaled.jpeg",
    "Turn up when someone nearby searches for what you sell. Ads only where they pay for themselves."],
  ["/design/", "Design", "AdobeStock_207254886-scaled.jpeg",
    "A look that is yours, on pages built for one job each. Readable in one hand on a phone."],
  ["/development/", "Development", "AdobeStock_180105378-scaled.jpeg",
    "The site, and the software behind it when a site is not enough. Yours to run afterwards."],
  ["/automation/", "Automation", "AdobeStock_138021007-e1571312681920-scaled.jpeg",
    "Stop paying someone to retype the same order into a second system."],
  ["/local/", "Local", "AdobeStock_104183460_111672862-1-scaled.jpeg",
    "Web help in Klamath Falls, Redding, and the towns in between."],
];

const serviceCards = ({ indent, heading }) => {
  const pad = " ".repeat(indent);
  return SERVICE_CARDS.map(([href, title, image, blurb]) => `${pad}    <article class="card">
${pad}      <a class="card__link" href="${href}">
${pad}        <div class="card__media" style="background-image:url('/assets/img/${image}');"></div>
${pad}        <div class="card__body"><${heading}>${title}</${heading}><p>${blurb}</p></div>
${pad}      </a>
${pad}    </article>`).join("\n");
};

const serviceCardsSection = ({ indent, heading, sectionClass, label }) => {
  const pad = " ".repeat(indent);
  return `${pad}<section class="${sectionClass}"${label}>
${pad}  <div class="wrap">
${pad}    <div class="cards">
${serviceCards({ indent: indent + 4, heading })}
${pad}    </div>
${pad}  </div>
${pad}</section>`;
};

const FEATURED_SERVICES = `  <!-- featured-services:start -->
${serviceCardsSection({ indent: 2, heading: "h2", sectionClass: "service-cards", label: ' aria-label="Featured services"' })}
  <!-- featured-services:end -->`;

const SERVICE_HUB_CARDS = serviceCardsSection({
  indent: 4,
  heading: "h2",
  sectionClass: "service-cards",
  label: ' aria-label="Featured services"',
});

const HOME_CARDS = serviceCardsSection({
  indent: 4,
  heading: "h3",
  sectionClass: "section home-cards",
  label: "",
});

const SERVICE_HUB_CARDS_PATTERN =
  /    <section class="service-cards" aria-label="Featured services">[\s\S]*?\n    <\/section>/;
const HOME_CARDS_PATTERN = /    <section class="section home-cards">[\s\S]*?\n    <\/section>/;

// The community banner said "technical archive" and "remain part of the agency
// site", which read as retired while Training sends learners here for guides and
// a curriculum. It names what the lessons teach and where to start. It is
// replaced by pattern, like the footer-about block: the insert-once version
// looked only for the old literal sentence, so editing these words changed
// nothing on the pages that already had a banner, and --check passed without
// seeing the drift.
//
// It sent every learner to the course outline while the lessons began at the
// Introduction, so the community had two front doors. The Introduction is where
// every level starts (docs/copy-review.md, Focus), and the outline is the
// course's map. On a lesson, the banner also names its place in the course.
const INTRODUCTION = "community/introduction/index.html";
const COURSE_OUTLINE = "community/user-story_bdd_frp-workflow/index.html";

const archiveContext = (name) => {
  const start =
    name === INTRODUCTION
      ? "Every level starts here"
      : 'Every level starts with the <a href="/community/introduction/">Introduction</a>';
  const map =
    name === COURSE_OUTLINE
      ? "this outline maps the course"
      : 'the <a href="/community/user-story_bdd_frp-workflow/">Course Outline</a> maps the course';
  const index = lessonIndex(name);
  return `<aside class="notice archive-context" aria-label="About these lessons">
<p><strong>Agency lessons.</strong> How the Sean Dinwiddie&rsquo;s Webmastery team builds custom software: user stories, behavior-driven development and functional programming. ${start}, and ${map}.</p>${index === -1 ? "" : `\n${lessonPlace(index)}`}
</aside>`;
};

const ARCHIVE_CONTEXT_PATTERN = /\n<aside class="notice archive-context"[\s\S]*?<\/aside>/;

// Two community pages are not lessons: the team's terms and the membership
// offer. A lessons banner made live terms read like an old post, so it comes off.
const NOT_LESSONS = new Set([
  "community/staff/index.html",
  "community/our-community-unveiling-our-offer-and-prices/index.html",
]);

// The cut-sheet is Sean's: a concept he builds out himself. The banner and the
// notice below leave it exactly as it is.
const SEANS_COMMUNITY_PAGES = new Set(["community/from-marketing-to-development/index.html"]);

// "Comments are archived on this static site" described an archive that does
// not exist: no page carries comment markup. The notice says what is true, and
// it is replaced by pattern for the same reason as the banner. "Questions about
// this page?" invited free consulting, and the team does no free work
// (docs/terms.md): a lesson points to the work itself, and only the team's terms
// and the membership offer keep a questions line.
const QUESTIONS_NOTICE = `<aside aria-label="Questions" class="notice">
<p>Questions about this page? <a href="/contact/">Call or email</a> Sean Dinwiddie&rsquo;s Webmastery.</p>
</aside>`;

const WORK_NOTICE = `<aside aria-label="Working with the team" class="notice">
<p>For work built this way, <a href="/contact/">call or email</a> Sean Dinwiddie&rsquo;s Webmastery; each job starts with a written scope and fee.</p>
</aside>`;

const commentsNotice = (name) => (NOT_LESSONS.has(name) ? QUESTIONS_NOTICE : WORK_NOTICE);

const COMMENTS_NOTICE_PATTERN =
  /<aside aria-label="(?:Comments|Questions|Working with the team)" class="notice">[\s\S]*?<\/aside>/;

// The lessons in teaching order (docs/copy-review.md, Focus): an introduction
// before the lessons that build on it, never publication order. The previous and
// next links were hand-kept copies of the WordPress publication order, so 29 of
// them sent a learner backwards, sideways or out of the course (into the fee
// split, the membership offer and a note about Sublime Text), and nothing could
// see it. Every lesson's links now come from this one list and are replaced by
// pattern: moving a lesson here re-points both of its neighbours, and --check
// sees any page that drifts. Each entry is [slug, the title its links show,
// its part of the course]. The banner, the module lists and the community
// sitemap render from it, and each lesson's JSON-LD headline and breadcrumb
// follow its title.
//
// No lesson is gated by level (docs/copy-review.md, Focus): every lesson is a
// reference for every level of practice, and a more practiced reader takes
// more depth from the same page. So the list names places, never levels.
const PARTS = Object.freeze({
  course: { name: "Course overview", opener: "introduction" },
  m1: { name: "Module 1: Understanding User Stories", opener: "welcome-to-module-1-understanding-user-stories" },
  m2: { name: "Module 2: Behavior-Driven Development (BDD)", opener: "module-2-behavior-driven-development-bdd" },
  m3: { name: "Module 3: Functional Reactive Programming (FRP)", opener: "module-3-functional-reactive-programming-frp" },
  m4: { name: "Module 4: The Chain End to End", opener: "the-api-haskell-servant-and-nile" },
});

const LESSONS = [
  // The course overview: every level enters at the Introduction.
  ["introduction", "Introduction", "course"],
  ["user-stories", "User Stories", "course"],
  ["behavior-driven-development-bdd", "Behavior-Driven Development (BDD)", "course"],
  ["functional-reactive-programming-frp", "Functional Reactive Programming (FRP)", "course"],
  ["curriculum", "Curriculum", "course"],
  ["user-story_bdd_frp-workflow", "Course Outline", "course"],
  // Module 1: why, what, finding, capturing, translating, writing well, practice, review.
  ["welcome-to-module-1-understanding-user-stories", "Welcome to Module 1: Understanding User Stories", "m1"],
  ["understanding-the-importance-of-user-centric-design", "Understanding the Importance of User-Centric Design", "m1"],
  ["defining-user-stories", "Defining User Stories", "m1"],
  ["identifying-user-needs", "Identifying User Needs", "m1"],
  ["capturing-user-requirements-effectively", "Capturing User Requirements Effectively", "m1"],
  ["translating-user-needs-into-user-stories", "Translating User Needs into User Stories", "m1"],
  ["writing-clear-and-concise-user-stories", "Writing Clear and Concise User Stories", "m1"],
  ["practical-exercises-in-creating-user-stories", "Practical Exercises in Creating User Stories", "m1"],
  ["collaborative-sessions-to-review-and-refine-user-stories", "Collaborative Sessions to Review and Refine User Stories", "m1"],
  // Module 2: the introduction first, then Gherkin, writing, review and testing.
  ["module-2-behavior-driven-development-bdd", "Module 2: Behavior-Driven Development (BDD)", "m2"],
  ["introduction-to-behavior-driven-development-bdd", "Introduction to Behavior-Driven Development (BDD)", "m2"],
  ["principles-of-behavior-driven-development-bdd", "Principles of Behavior-Driven Development (BDD)", "m2"],
  ["how-bdd-aligns-development-with-user-expectations", "How BDD Aligns Development with User Expectations", "m2"],
  ["given-when-then-gherkin-syntax-in-bdd", "Given-When-Then (Gherkin) Syntax in BDD", "m2"],
  ["writing-bdd-scenarios", "Writing BDD Scenarios", "m2"],
  ["writing-bdd-scenarios-for-software-modules", "Writing BDD Scenarios for Software Modules", "m2"],
  ["creating-bdd-scenarios-for-real-world-cases", "Creating BDD Scenarios for Real-World Cases", "m2"],
  ["reviewing-and-enhancing-bdd-scenarios-as-a-group", "Reviewing and Enhancing BDD Scenarios as a Group", "m2"],
  ["bdd-and-unit-testing", "BDD and Unit Testing", "m2"],
  ["bdd-testing-framework", "BDD Testing Framework", "m2"],
  // Module 3: the introduction first; Apply FRP ends the course.
  ["module-3-functional-reactive-programming-frp", "Module 3: Functional Reactive Programming (FRP)", "m3"],
  ["introduction-to-functional-reactive-programming-frp", "Introduction to Functional Reactive Programming (FRP)", "m3"],
  ["event-streams-and-reactive-programming", "Event streams and reactive programming", "m3"],
  ["master-the-fundamentals-of-frp-in-software-development", "FRP Fundamentals in Software Development", "m3"],
  ["discover-how-frp-enhances-user-interaction-and-responsiveness", "Discover how FRP enhances user interaction and responsiveness", "m3"],
  ["apply-frp-concepts-to-software-modules", "Apply FRP concepts to software modules", "m3"],
  // Module 4: the chain end to end, from the API behind the app.
  ["the-api-haskell-servant-and-nile", "The API: Haskell Servant and Nile", "m4"],
  ["from-scenario-to-slice", "From Scenario to Slice", "m4"],
  ["endpoints-at-the-boundary", "Endpoints at the Boundary", "m4"],
  ["the-view-stays-minimal", "The View Stays Minimal", "m4"],
  ["one-feature-scope-to-launch", "One Feature, Scope to Launch", "m4"],
];

const partOf = (key) => LESSONS.filter(([, , part]) => part === key);
for (const [slug, , part] of LESSONS) {
  if (!PARTS[part]) throw new Error(`LESSONS: ${slug} has an unknown part`);
}
for (const [key, { opener }] of Object.entries(PARTS)) {
  const lessons = partOf(key);
  const first = LESSONS.indexOf(lessons[0]);
  if (lessons[0]?.[0] !== opener) throw new Error(`LESSONS: ${key} must open with ${opener}`);
  if (LESSONS.slice(first, first + lessons.length).some((lesson) => lesson[2] !== key)) {
    throw new Error(`LESSONS: the lessons of ${key} must run together`);
  }
}

const lessonIndex = (name) => LESSONS.findIndex(([slug]) => name === `community/${slug}/index.html`);
const lessonPlace = (index) => {
  const [, , part] = LESSONS[index];
  const lessons = partOf(part);
  const where = part === "course" ? "the course overview" : PARTS[part].name.split(":")[0];
  return `<p class="lesson-place">Lesson ${lessons.indexOf(LESSONS[index]) + 1} of ${lessons.length} in ${where}</p>`;
};

// Community pages that are not lessons: the team's terms, the membership offer
// and Sean's Redux note. Inside the chain, a learner's "next" landed on a fee
// split. Each links back to the community instead.
const OFF_THE_PATH = new Set([
  "community/staff/index.html",
  "community/our-community-unveiling-our-offer-and-prices/index.html",
  "community/p-s-did-i-mention-my-fondness-for-coding-redux-js-apps-and-that-i-also-love-sublime-text-\u270c\ud83c\udffb/index.html",
]);

const PAGE_NAV_PATTERN = /<(div|nav) class="page-nav"[^>]*>[\s\S]*?<\/\1>/;

const lessonLink = ([slug, title], rel, label) =>
  `<a href="/community/${slug}/" rel="${rel}">${label}: ${title}</a>`;

const lessonNav = (name) => {
  const index = lessonIndex(name);
  if (index === -1) {
    return OFF_THE_PATH.has(name)
      ? '<nav class="page-nav" aria-label="Community">\n<a href="/community/">Back to the community</a>\n</nav>'
      : null;
  }
  const links = [
    index > 0 && lessonLink(LESSONS[index - 1], "prev", "Previous lesson"),
    index < LESSONS.length - 1 && lessonLink(LESSONS[index + 1], "next", "Next lesson"),
  ].filter(Boolean);
  return `<nav class="page-nav" aria-label="Lessons">\n${links.join("\n")}\n</nav>`;
};

const withLessonNav = (name, html) => {
  if (!name.startsWith("community/") || SEANS_COMMUNITY_PAGES.has(name)) return html;
  const nav = lessonNav(name);
  if (nav === null) {
    // Lesson links on a page in neither list mean a lesson LESSONS is missing:
    // fail rather than leave it on the old chain.
    if (PAGE_NAV_PATTERN.test(html)) throw new Error(`${name}: lesson links on a page missing from LESSONS`);
    return html;
  }
  if (!PAGE_NAV_PATTERN.test(html)) throw new Error(`${name}: missing lesson links`);
  return html.replace(PAGE_NAV_PATTERN, () => nav);
};

const SOCIAL_ICONS = `      <div class="nav__social">
        <a href="https://www.facebook.com/seanpaulpaynedinwiddie/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook" aria-hidden="true"></i></a>
        <a href="https://twitter.com/seandinwiddie" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a>
        <a href="https://linkedin.com/in/seandinwiddie" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
        <a href="https://github.com/seandinwiddie" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
        <a href="https://www.instagram.com/seanpaulpaynedinwiddie/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
      </div>`;

const SOCIAL_ICONS_PATTERN = /      <div class="nav__social">[\s\S]*?\n      <\/div>/;

// The footer "About us" block is on all 86 pages and was byte-identical on
// every one of them, but nothing kept it that way — it was copied by hand, so
// any edit would have had to land 86 times or silently fork. Sharing it here
// gives it --check coverage like the masthead and the service cards.
//
// The copy it replaced sold to the wrong people. "From startups launching their
// first digital presence to established companies upgrading legacy systems" is
// sdin.dev's audience, not this one, and the rest was filler: "extensive
// experience", "expertise spanning", "comprehensive technology solutions",
// "strategic insight", "competitive digital landscape". The mission line comes
// from /prices/, which is the client's own wording.
const FOOTER_ABOUT = `      <div class="footer__about">
        <h2>About us</h2>
        <p><strong>Sean Dinwiddie&rsquo;s Webmastery</strong> is a local webmastery agency working across Jefferson State &mdash; Klamath Falls, Redding, and the towns in between. Shops, restaurants, food trucks, salons, kiosks, contractors, clinics. Whether that is one person or fifty.</p>
        <p>We build the site, get you found by the people searching nearby, and hand it over so you can run it yourself. When something breaks, you call someone who already knows your site.</p>
        <p class="footer__tag">Founded by Sean Paul Payne Dinwiddie &bull; Strengthening the service industry of Jefferson State</p>
      </div>`;

const FOOTER_ABOUT_PATTERN = /      <div class="footer__about">[\s\S]*?\n      <\/div>/;


const pageHref = (base, page) => (page === 1 ? base : `${base}page/${page}/`);
const paginationLink = (base, page, label, rel = "") =>
  `<a href="${pageHref(base, page)}"${rel ? ` rel="${rel}"` : ""}>${label}</a>`;

const archivePagination = (base, page) => {
  const links = [
    ...(page > 1 ? [paginationLink(base, 1, "First page")]: []),
    ...(page > 1 ? [paginationLink(base, page - 1, "Previous page", "prev")]: []),
    ...(page < ARCHIVE_PAGE_COUNT ? [paginationLink(base, page + 1, "Next page", "next")]: []),
    ...(page < ARCHIVE_PAGE_COUNT ? [paginationLink(base, ARCHIVE_PAGE_COUNT, "Last page")]: []),
  ];
  return `<nav class="pagination" aria-label="Archive pagination">\n${links.join("\n")}\n</nav>`;
};

/**
 * Every service leaf reached the rest of the site through one link — "Get a
 * Free Consultation" — so a visitor arriving from search at /design/cro/ could
 * not find its sibling, its parent, the work, or the prices without going back
 * to the menu. The hierarchy below is the one the hubs already describe; these
 * links just make it work in both directions.
 */
const SERVICE_TREE = [
  ["/design/", "Design", [
    ["/design/new/", "Website design"],
    ["/design/cro/", "Conversion rate optimization"],
  ]],
  ["/development/", "Development", [
    ["/development/sites/", "Website development"],
    ["/development/apps/", "Custom app development"],
  ]],
  ["/marketing/", "Marketing", [
    ["/marketing/on-site-seo/", "On-site SEO"],
    ["/marketing/off-site-seo-and-ads/", "Off-site SEO and ads"],
  ]],
  ["/local/", "Local web support", [
    ["/local/oregon/klamath-falls/", "Klamath Falls, Oregon"],
    ["/local/california/redding/", "Redding, California"],
  ]],
];

// The page a prospect wants next. Prices stay out of these links: Sean is
// reworking the prices page, so links to it are kept to the menu and footer.
const NEXT_STEPS = [["/examples/", "Sites Sean has built"]];

const routeForPage = (name) => (name === "index.html" ? "/" : `/${name.replace(/index\.html$/, "")}`);

const relatedServices = (route) => {
  const entry = SERVICE_TREE.find(([, , leaves]) => leaves.some(([href]) => href === route));
  if (!entry) return null;
  const [hub, hubLabel, leaves] = entry;
  const links = [
    ...leaves.filter(([href]) => href !== route),
    [hub, `All ${hubLabel.toLowerCase()} services`],
    ...NEXT_STEPS,
  ];
  const items = links.map(([href, label]) => `        <li><a href="${href}">${label}</a></li>`).join("\n");
  return `      <nav class="related-services" aria-labelledby="related-services">
        <h2 id="related-services">Related</h2>
        <ul>
${items}
        </ul>
      </nav>`;
};

// Matched so the block is *replaced*, not skipped when already present. The
// insert-once version froze the labels at whatever shipped first: editing
// SERVICE_TREE or NEXT_STEPS changed nothing on the eight pages that already
// had a nav, and --check could not see the drift. Same trap as
// FEATURED_SERVICES_PATTERN below.
const RELATED_SERVICES_PATTERN =
  /      <nav class="related-services"[\s\S]*?<\/nav>/;

const withRelatedServices = (name, html) => {
  const snippet = relatedServices(routeForPage(name));
  if (!snippet) return html;
  if (RELATED_SERVICES_PATTERN.test(html)) return html.replace(RELATED_SERVICES_PATTERN, snippet);
  return insertBeforeContentEnd(html, snippet);
};

const insertAfterContentStart = (html, snippet) => {
  const marker = '<div class="wrap content content-page">';
  if (!html.includes(marker)) throw new Error("missing shared content wrapper");
  return html.replace(marker, `${marker}\n${snippet}`);
};

const insertBeforeContentEnd = (html, snippet) => {
  const marker = "\n      </div>\n    </section>\n  </main>";
  if (!html.includes(marker)) throw new Error("missing shared content closing marker");
  return html.replace(marker, `\n${snippet}${marker}`);
};

const FEATURED_SERVICES_PATTERN =
  /  <!-- featured-services:start -->[\s\S]*?<!-- featured-services:end -->/;

const withFeaturedServices = (name, html) => {
  // Two pages carry their own list of services and must not also receive the
  // shared block: the home page, and the services hub itself, which was
  // showing Design, Development and Marketing twice.
  // These two render the same five cards themselves, so they take the card list
  // rather than the block: the hub inside <main>, the home page with h3s. They
  // must not also receive the shared block — the hub was showing Design,
  // Development and Marketing twice.
  if (name === "service/index.html") {
    if (!SERVICE_HUB_CARDS_PATTERN.test(html)) throw new Error("service/index.html: missing service cards");
    return html
      .replace(SERVICE_HUB_CARDS_PATTERN, SERVICE_HUB_CARDS)
      .replace(FEATURED_SERVICES_PATTERN, "")
      .replace(/\n\n(  <footer)/, "\n$1");
  }
  if (name === "index.html") {
    if (!HOME_CARDS_PATTERN.test(html)) throw new Error("index.html: missing service cards");
    return html.replace(HOME_CARDS_PATTERN, HOME_CARDS);
  }
  // Replace an existing block rather than skipping the page. Insert-once meant
  // the "shared" cards froze at whatever shipped first: editing FEATURED_SERVICES
  // changed the pages that lacked it and silently left the rest behind.
  if (FEATURED_SERVICES_PATTERN.test(html)) {
    return html.replace(FEATURED_SERVICES_PATTERN, FEATURED_SERVICES);
  }
  const marker = '  <footer class="footer">';
  if (!html.includes(marker)) throw new Error(`${name}: missing shared footer marker`);
  return html.replace(marker, `${FEATURED_SERVICES}\n${marker}`);
};

const withSocialIcons = (name, html) => {
  if (!SOCIAL_ICONS_PATTERN.test(html)) {
    throw new Error(`${name}: missing shared social-icons marker`);
  }
  return html.replace(SOCIAL_ICONS_PATTERN, SOCIAL_ICONS);
};

// One button, "Get a Free Consultation", appeared identically on 82 pages —
// on the Redux tutorials and the privacy policy as readily as on /design/.
// "Consultation" is agency-speak that a shop owner hears as a sales meeting,
// and the same words on an archive article as on a service page tell the reader
// nothing about what happens next. The wording now matches who is reading
// the page.
//
// "Book a free call" promised a booking the site doesn't have: /contact/ offers a
// phone number and an email address, so the button names exactly that. The team
// does no free work, consulting included (docs/terms.md), so no button offers a
// free call or a free consultation anywhere, Sean's own pages and /about/
// included, at his direction. The lessons and blog posts keep "Work with Sean":
// owners meet Sean, who stands behind every job.
const FOCUS_PREFIXES = ["design/", "development/", "marketing/", "automation/", "local/"];
const FOCUS_PAGES = new Set([
  "index.html",
  "service/index.html",
  "contact/index.html",
  "community/staff/index.html",
  "community/our-community-unveiling-our-offer-and-prices/index.html",
]);
const isFocusPage = (name) =>
  FOCUS_PAGES.has(name) || FOCUS_PREFIXES.some((prefix) => name.startsWith(prefix));

const CTA_LABELS = [
  [isFocusPage, "Call or email"],
  [(name) => name.startsWith("community/") || name.startsWith("blog/"), "Work with Sean"],
  [() => true, "Call or email"],
];

const ctaLabel = (name) => CTA_LABELS.find(([match]) => match(name))[1];

const CTA_PATTERN = /(<a class="hero__cta" href="[^"]*">)([^<]*)(<\/a>)/;

const withHeroCta = (name, html) => {
  const label = ctaLabel(name);
  if (!CTA_PATTERN.test(html)) return html;
  return html.replace(CTA_PATTERN, `$1${label}$3`);
};

const withFooterAbout = (name, html) => {
  if (!FOOTER_ABOUT_PATTERN.test(html)) {
    throw new Error(`${name}: missing shared footer-about marker`);
  }
  return html.replace(FOOTER_ABOUT_PATTERN, FOOTER_ABOUT);
};

const withArchiveContext = (name, html) => {
  if (!name.startsWith("community/") || SEANS_COMMUNITY_PAGES.has(name)) return html;
  if (NOT_LESSONS.has(name)) return html.replace(ARCHIVE_CONTEXT_PATTERN, "");
  if (ARCHIVE_CONTEXT_PATTERN.test(html)) {
    return html.replace(ARCHIVE_CONTEXT_PATTERN, () => `\n${archiveContext(name)}`);
  }
  return insertAfterContentStart(html, archiveContext(name));
};

const withCommentsNotice = (name, html) =>
  SEANS_COMMUNITY_PAGES.has(name) || !COMMENTS_NOTICE_PATTERN.test(html)
    ? html
    : html.replace(COMMENTS_NOTICE_PATTERN, () => commentsNotice(name));

// Replaced by pattern, never inserted once: the insert-once version skipped any
// page that already had pagination, so the hub kept WordPress's list, with tabs
// in its link titles, and a change here reached no page that had one.
const PAGINATION_PATTERN = /<(ul|nav) class="pagination"[^>]*>[\s\S]*?<\/\1>/;

const withArchivePagination = (name, html) => {
  const config = PAGINATED_ARCHIVES.get(name);
  if (!config) return html;
  const nav = archivePagination(...config);
  return PAGINATION_PATTERN.test(html)
    ? html.replace(PAGINATION_PATTERN, () => nav)
    : insertBeforeContentEnd(html, nav);
};

const withCargoPostRepairs = (name, html) => {
  if (name !== "blog/2021/07/14/https-en-wikipedia-org-wiki-cargo_cult_programming/index.html") {
    return html;
  }
  const withHero = html.replace(
    "background-image:url('/assets/img/sean-dinwiddie.jpg')",
    "background-image:url('/assets/img/AdobeStock_138021007-e1571312681920-scaled.jpeg')",
  );
  return COMMENTS_NOTICE_PATTERN.test(withHero)
    ? withHero
    : insertBeforeContentEnd(withHero, commentsNotice(name));
};

// Each lesson's JSON-LD headline and last breadcrumb follow its LESSONS title,
// so a retitle lands everywhere at once. No lesson carries an educationalLevel:
// every lesson serves every level.
const SCHEMA_PATTERN = /(<script type="application\/ld\+json" data-agency-schema>)([\s\S]*?)(<\/script>)/;

const withLessonSchema = (name, html) => {
  const index = lessonIndex(name);
  if (index === -1) return html;
  const [slug, title] = LESSONS[index];
  const match = html.match(SCHEMA_PATTERN);
  if (!match) throw new Error(`${name}: missing the agency schema`);
  const schema = JSON.parse(match[2]);
  const article = schema["@graph"].find((node) => node["@type"] === "Article");
  if (!article) throw new Error(`${name}: the schema has no Article`);
  article.headline = title;
  delete article.educationalLevel;
  const breadcrumbs = schema["@graph"].find((node) => node["@type"] === "BreadcrumbList");
  if (breadcrumbs) breadcrumbs.itemListElement.at(-1).name = title;
  const page = schema["@graph"].find((node) => node["@type"] === "WebPage");
  if (page) page.name = headTitle(slug, title);
  return html.replace(SCHEMA_PATTERN, (_, open, _json, close) => `${open}${JSON.stringify(schema)}${close}`);
};

// The Introduction is where every level starts. No lesson is gated by level:
// every lesson serves every level, and more practice takes more from it, so the
// block says how each level reads the course, never where to skip to.
const LEVEL_PATHS = `<div class="level-paths">
<p><strong>Every lesson is for every level.</strong> Read the course in order, and come back to it as your practice grows; the same lesson goes deeper each time:</p>
<ul>
<li><strong>Apprentice</strong> (beginner): learn what each lesson names, and try it once on a small example.</li>
<li><strong>Journeyman</strong> (intermediate): use each lesson on real work, and find the rule behind its examples.</li>
<li><strong>Master</strong> (advanced): read each lesson for its edges, where it bends and where it breaks, and for how to teach it.</li>
</ul>
<p>Some lessons carry short passages that go deeper, headed <em>The rule behind the examples</em> and <em>Where it bends</em>. They are part of the lesson, for every reader. Sean&rsquo;s <a href="https://seandinwiddie.github.io/lectures/">Functional Programming Lectures</a> run beneath the course, from Beginner to Advanced.</p>
</div>`;

const LEVEL_PATHS_PATTERN = /\n<(ul|div) class="level-paths"[\s\S]*?<\/\1>/;
const FIRST_PARAGRAPH_PATTERN = /(<\/header><!-- \.entry-header -->\s*<p>[\s\S]*?<\/p>)/;

const withLevelPaths = (name, html) => {
  if (name !== INTRODUCTION) return html;
  if (LEVEL_PATHS_PATTERN.test(html)) return html.replace(LEVEL_PATHS_PATTERN, () => `\n${LEVEL_PATHS}`);
  if (!FIRST_PARAGRAPH_PATTERN.test(html)) throw new Error(`${name}: no first paragraph for the level paths`);
  return html.replace(FIRST_PARAGRAPH_PATTERN, (paragraph) => `${paragraph}\n${LEVEL_PATHS}`);
};

// Each module's opening page lists the module's lessons in order.
const moduleLessons = (part) => `<nav class="module-lessons" aria-labelledby="module-lessons">
<h2 id="module-lessons">Lessons in this module</h2>
<ol>
${partOf(part).slice(1).map(([slug, title]) => `<li><a href="/community/${slug}/">${title}</a></li>`).join("\n")}
</ol>
</nav>`;

const MODULE_LESSONS_PATTERN = /\n<nav class="module-lessons"[\s\S]*?<\/nav>/;
const ENTRY_HEADER_END = "</header><!-- .entry-header -->";

const withModuleLessons = (name, html) => {
  const part = Object.keys(PARTS).find((key) => key !== "course" && name === `community/${PARTS[key].opener}/index.html`);
  if (!part || partOf(part).length < 2) return html.replace(MODULE_LESSONS_PATTERN, "");
  if (MODULE_LESSONS_PATTERN.test(html)) return html.replace(MODULE_LESSONS_PATTERN, () => `\n${moduleLessons(part)}`);
  if (html.split(ENTRY_HEADER_END).length !== 2) throw new Error(`${name}: expected one entry header`);
  return html.replace(ENTRY_HEADER_END, () => `${ENTRY_HEADER_END}\n${moduleLessons(part)}`);
};

// The Course Outline's Module 4 list was kept by hand, so each new lesson had
// to be typed into it. It renders from LESSONS, like the module's own list; the
// objectives, topics and activities below it stay as written.
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const OUTLINE_M4_PATTERN = new RegExp(
  `(<p><strong><a href="/community/${PARTS.m4.opener}/">${escapeRegExp(PARTS.m4.name)}</a></strong></p>\\n<ul>\\n)[\\s\\S]*?(\\n<li><em>Objectives:</em></li>)`,
);
const withOutlineModule4 = (name, html) => {
  if (name !== COURSE_OUTLINE) return html;
  if (!OUTLINE_M4_PATTERN.test(html)) throw new Error(`${name}: missing Module 4's lesson list`);
  const items = partOf("m4").map(([slug, title]) => `<li><a href="/community/${slug}/">${title}.</a></li>`);
  return html.replace(OUTLINE_M4_PATTERN, (_, open, close) => `${open}${items.join("\n")}${close}`);
};

// The community sitemap listed pages in WordPress publication order, with the
// last lesson before the first. It renders from LESSONS, part by part, and the
// pages off the path follow.
const COMMUNITY_SITEMAP = "community/sitemap/index.html";
const SITEMAP_LIST_PATTERN = /<div class="sitemap-list"[^>]*>[\s\S]*?\n<\/div>/;
const ALSO_IN_THE_COMMUNITY = [
  ["/community/", "Community home"],
  ["/community/staff/", "Joining the team"],
  ["/community/our-community-unveiling-our-offer-and-prices/", "Our Community: Unveiling Our Offer and Prices"],
  ["/community/p-s-did-i-mention-my-fondness-for-coding-redux-js-apps-and-that-i-also-love-sublime-text-%e2%9c%8c%f0%9f%8f%bb/", "P.S. Did I mention my fondness for coding Redux.js apps? And that I also love Sublime Text! \u270c\ud83c\udffb"],
  ["/community/from-marketing-to-development/", "From marketing to development"],
];

const communitySitemap = () => `<div class="sitemap-list">
${Object.entries(PARTS).map(([key, { name }]) => `<h2>${name}</h2>
<ol>
${partOf(key).map(([slug, title]) => `<li><a href="/community/${slug}/">${title}</a></li>`).join("\n")}
</ol>`).join("\n")}
<h2>Also in the community</h2>
<ul>
${ALSO_IN_THE_COMMUNITY.map(([href, title]) => `<li><a href="${href}">${title}</a></li>`).join("\n")}
</ul>
</div>`;

const withCommunitySitemap = (name, html) => {
  if (name !== COMMUNITY_SITEMAP) return html;
  if (!SITEMAP_LIST_PATTERN.test(html)) throw new Error(`${name}: missing the sitemap list`);
  return html.replace(SITEMAP_LIST_PATTERN, communitySitemap);
};

// The archives list the course in teaching order (docs/copy-review.md, Focus).
// They carried WordPress order, newest first, and each card's excerpt was a hand
// copy of a lesson's opening, so fixing an opener left three stale copies behind.
// Cards render from LESSONS, then the pages off the path, twelve to a page. Each
// card keeps its image, its title follows LESSONS, and its excerpt is its page's
// meta description. A new lesson needs one card, added by hand to any archive
// page, before the sync can place it. Sean's cut-sheet page itself is untouched.
const ARCHIVE_BASES = ["/community/", "/community/author/seandinwiddie/", "/community/category/development/"];
const CARDS_PER_PAGE = 12;
const CARD_ORDER = [
  ...LESSONS.map(([slug, title]) => [`/community/${slug}/`, title]),
  ...ALSO_IN_THE_COMMUNITY.filter(([href]) => href !== "/community/"),
];
const ARCHIVE_PAGE_COUNT = Math.ceil(CARD_ORDER.length / CARDS_PER_PAGE);
const archiveFile = (base, page) => `${pageHref(base, page).slice(1)}index.html`;
const PAGINATED_ARCHIVES = new Map(
  ARCHIVE_BASES.flatMap((base) =>
    Array.from({ length: ARCHIVE_PAGE_COUNT }, (_, index) => [archiveFile(base, index + 1), [base, index + 1]]),
  ),
);

const CARD_PATTERN = /<div class="post-card__container">[\s\S]*?<\/a>\n<\/div>\n<\/div>/g;
const ARCHIVE_CARDS_PATTERN = /<div class="archive-cards">\n[\s\S]*?<\/a>\n<\/div>\n<\/div>\n<\/div>/;
const cardHref = (card) => card.match(/class="post-card__link" href="([^"]*)"/)[1];

// Read once, before any page is rewritten, so every run starts from the same cards.
const HARVESTED_CARDS = new Map(
  [...PAGINATED_ARCHIVES.keys()].flatMap((file) =>
    (read(resolve(ROOT, file)).match(CARD_PATTERN) ?? []).map((card) => [cardHref(card), card]),
  ),
);

const archiveCard = ([href, title]) => {
  const card = HARVESTED_CARDS.get(href);
  if (!card) throw new Error(`archives: no card for ${href}; add one to an archive page by hand`);
  const description = read(fileForPathname(href)).match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!description) throw new Error(`${href}: no meta description for its card`);
  return card
    .replace(/(<h2 class="post-card__title">)[\s\S]*?(<\/h2>)/, (_, open, close) => `${open}${title}${close}`)
    .replace(/(<div class="post-card__secondary">\n<p>)[\s\S]*?(<\/p>)/, (_, open, close) => `${open}${description}${close}`);
};

const withArchiveCards = (name, html) => {
  const config = PAGINATED_ARCHIVES.get(name);
  if (!config) return html;
  if (!ARCHIVE_CARDS_PATTERN.test(html)) throw new Error(`${name}: missing the archive cards`);
  const cards = CARD_ORDER.slice((config[1] - 1) * CARDS_PER_PAGE, config[1] * CARDS_PER_PAGE).map(archiveCard);
  return html.replace(ARCHIVE_CARDS_PATTERN, () => `<div class="archive-cards">\n${cards.join("\n")}\n</div>`);
};

// The note to webmasters on the owner pages was one sentence kept by hand on 15
// pages. It is one constant, replaced by pattern, so --check sees drift; each
// page keeps its own wrapper.
const WEBMASTER_NOTE =
  "on the Sean Dinwiddie&rsquo;s Webmastery team, a webmaster at any stage of the craft keeps their own practice while the name brings in the work, with a published fee and a written scope; the team&rsquo;s lessons teach the practice, and every launch is reviewed before it goes live.";
const WEBMASTER_NOTE_PATTERN =
  /(<strong>For webmasters:<\/strong> )[\s\S]*?( <a href="\/contact\/#for-webmasters">How joining works<\/a>\.)/;

const withWebmasterNote = (name, html) =>
  isFocusPage(name) && WEBMASTER_NOTE_PATTERN.test(html)
    ? html.replace(WEBMASTER_NOTE_PATTERN, (_, open, close) => `${open}${WEBMASTER_NOTE}${close}`)
    : html;

// Each lesson's page title is its LESSONS title with the site's suffix, or a
// shorter head title here when that would pass the 65 characters a search result
// shows. The <title>, og:title, twitter:title and the WebPage name stay in step.
const SITE_SUFFIX = " | Sean Dinwiddie's Webmastery";
const HEAD_TITLES = new Map([
  ["introduction", "Course Introduction"],
  ["functional-reactive-programming-frp", "Functional Reactive Programming"],
  ["welcome-to-module-1-understanding-user-stories", "Module 1: User Stories"],
  ["understanding-the-importance-of-user-centric-design", "Why User-Centric Design Matters"],
  ["capturing-user-requirements-effectively", "Capturing User Requirements"],
  ["translating-user-needs-into-user-stories", "From User Needs to User Stories"],
  ["writing-clear-and-concise-user-stories", "Writing Clear User Stories"],
  ["practical-exercises-in-creating-user-stories", "Practical User Story Exercises"],
  ["collaborative-sessions-to-review-and-refine-user-stories", "Reviewing and Refining User Stories"],
  ["module-2-behavior-driven-development-bdd", "Module 2: BDD"],
  ["introduction-to-behavior-driven-development-bdd", "Introduction to BDD"],
  ["principles-of-behavior-driven-development-bdd", "Principles of BDD"],
  ["how-bdd-aligns-development-with-user-expectations", "How BDD Aligns Work with Users"],
  ["given-when-then-gherkin-syntax-in-bdd", "Gherkin: Given-When-Then Syntax"],
  ["writing-bdd-scenarios-for-software-modules", "BDD Scenarios for Software Modules"],
  ["creating-bdd-scenarios-for-real-world-cases", "BDD Scenarios for Real-World Cases"],
  ["reviewing-and-enhancing-bdd-scenarios-as-a-group", "Reviewing BDD Scenarios as a Group"],
  ["module-3-functional-reactive-programming-frp", "Module 3: FRP"],
  ["introduction-to-functional-reactive-programming-frp", "Introduction to FRP"],
  ["event-streams-and-reactive-programming", "Event Streams in FRP"],
  ["master-the-fundamentals-of-frp-in-software-development", "FRP Fundamentals"],
  ["discover-how-frp-enhances-user-interaction-and-responsiveness", "How FRP Improves User Interaction"],
  ["apply-frp-concepts-to-software-modules", "Applying FRP to Software Modules"],
]);
const headTitle = (slug, title) => `${HEAD_TITLES.get(slug) ?? title}${SITE_SUFFIX}`;
const TITLE_PATTERNS = [
  /(<title>)[^<]*(<\/title>)/,
  /(<meta property="og:title" content=")[^"]*(">)/,
  /(<meta name="twitter:title" content=")[^"]*(">)/,
];

const withLessonTitle = (name, html) => {
  const index = lessonIndex(name);
  if (index === -1) return html;
  const [slug, title] = LESSONS[index];
  const full = headTitle(slug, title);
  if (full.length > 65) throw new Error(`${name}: "${full}" passes 65 characters; add a HEAD_TITLES entry`);
  const escaped = full.replaceAll("'", "&#x27;");
  return TITLE_PATTERNS.reduce(
    (page, pattern) => page.replace(pattern, (_, open, close) => `${open}${escaped}${close}`),
    html,
  );
};

// The main sitemap's community list was alphabetical and kept by hand, so a new
// lesson landed wherever it was typed. It renders from LESSONS, in teaching order.
const MAIN_SITEMAP = "sitemap/index.html";
const MAIN_SITEMAP_COMMUNITY_PATTERN = /(<h3>Community<\/h3>\n<ul>\n)[\s\S]*?(\n<\/ul>)/;
const MAIN_SITEMAP_OFF_PATH = [
  ["/community/staff/", "Joining the Team"],
  ["/community/our-community-unveiling-our-offer-and-prices/", "Our Community: Offer and Prices"],
  ["/community/p-s-did-i-mention-my-fondness-for-coding-redux-js-apps-and-that-i-also-love-sublime-text-%E2%9C%8C%F0%9F%8F%BB/", "P.S. Coding Redux JS Apps + Sublime Text"],
  ["/community/from-marketing-to-development/", "From Marketing to Development"],
  ["/community/category/development/", "Software Development (category)"],
  ["/community/author/seandinwiddie/", "Technical Articles by Sean Dinwiddie (author)"],
  ["/community/sitemap/", "Community Sitemap"],
];
const mainSitemapCommunity = () =>
  [["/community/", "Community Home"], ...LESSONS.map(([slug, title]) => [`/community/${slug}/`, title]), ...MAIN_SITEMAP_OFF_PATH]
    .map(([href, title]) => `<li><a href="${href}">${title}</a></li>`)
    .join("\n");

const withMainSitemap = (name, html) => {
  if (name !== MAIN_SITEMAP) return html;
  if (!MAIN_SITEMAP_COMMUNITY_PATTERN.test(html)) throw new Error(`${name}: missing the community list`);
  return html.replace(MAIN_SITEMAP_COMMUNITY_PATTERN, (_, open, close) => `${open}${mainSitemapCommunity()}${close}`);
};

// Accessibility, swept through the sync so every page stays in step.
// A wide code block scrolls sideways; where a browser doesn't make a scroller
// focusable, a keyboard can't reach it (WCAG 2.1.1).
const CODE_BLOCK_PATTERN = /<pre class="code-block"(?: tabindex="0")?>/g;
const withFocusableCode = (name, html) => html.replace(CODE_BLOCK_PATTERN, '<pre class="code-block" tabindex="0">');

// WordPress wrapped the category link's label and text in a newline and tabs,
// which a screen reader reads out as pauses.
const CATEGORY_LINK_PATTERN =
  /<a aria-label="\s*Category: ([^"]*?)\s*" href="([^"]+)" rel="category">\s*([^<]*?)\s*<\/a>/g;
const withTrimmedCategory = (name, html) =>
  html.replace(
    CATEGORY_LINK_PATTERN,
    (_, label, href, text) => `<a aria-label="Category: ${label}" href="${href}" rel="category">${text}</a>`,
  );

// Lesson subheads typed as a bold paragraph read as body text to a screen
// reader's heading list. On the pages converted so far, a line that is one
// plain bold phrase becomes an h2; a bold lead-in with text after it is left
// alone. Pages join this list a few at a time.
const HEADING_PAGES = new Set([
  "community/collaborative-sessions-to-review-and-refine-user-stories/index.html",
  "community/creating-bdd-scenarios-for-real-world-cases/index.html",
  "community/reviewing-and-enhancing-bdd-scenarios-as-a-group/index.html",
  "community/writing-bdd-scenarios-for-software-modules/index.html",
  "community/capturing-user-requirements-effectively/index.html",
  "community/translating-user-needs-into-user-stories/index.html",
  "community/writing-clear-and-concise-user-stories/index.html",
  "community/understanding-the-importance-of-user-centric-design/index.html",
]);
const SUBHEAD_PATTERN = /^<p><strong>([^<]+?):?<\/strong><\/p>$/gm;
const ARTICLE_BODY_PATTERN = /(<\/header><!-- \.entry-header -->)([\s\S]*?)(<!-- \.entry-content -->)/;
const withLessonHeadings = (name, html) => {
  if (!HEADING_PAGES.has(name)) return html;
  if (!ARTICLE_BODY_PATTERN.test(html)) throw new Error(`${name}: no article body for headings`);
  return html.replace(ARTICLE_BODY_PATTERN, (_, open, body, close) => {
    const converted = body.replace(SUBHEAD_PATTERN, (_m, title) => `<h2>${title}</h2>`);
    if (/^<p><strong>[^<]*<\/strong><\/p>$/m.test(converted)) throw new Error(`${name}: a subhead is still a bold paragraph`);
    return `${open}${converted}${close}`;
  });
};

// Depth passages open with their title ("The rule behind the examples", "Where it
// bends"), which the Introduction names; as a labelled aside each is named where
// it sits.
const DEPTH_PATTERN = /<(div|aside) class="notice depth"[^>]*>([\s\S]*?)<\/\1>/g;
const withDepthPassages = (name, html) =>
  html.replace(DEPTH_PATTERN, (_, _tag, body) => {
    const title = body.match(/^\s*<p><strong>([^<]+?)\.?<\/strong>/)?.[1];
    if (!title) throw new Error(`${name}: a depth passage must open with its title in <strong>`);
    return `<aside class="notice depth" aria-label="${title}">${body}</aside>`;
  });

// The avatar sits beside the author's name, so it is decorative, and the link
// shows the name rather than the WordPress username.
const BYLINE_PATTERN =
  /<img alt="[^"]*"(?: class="byline-avatar")?( decoding="async" height="36" loading="lazy" src="\/assets\/img\/sean-dinwiddie\.jpg" width="36"\/>)<a href="\/community\/author\/seandinwiddie\/">[^<]*<\/a>/g;
const withByline = (name, html) =>
  name.startsWith("community/") && !SEANS_COMMUNITY_PAGES.has(name)
    ? html.replace(
        BYLINE_PATTERN,
        (_, rest) => `<img alt="" class="byline-avatar"${rest}<a href="/community/author/seandinwiddie/">Sean Dinwiddie</a>`,
      )
    : html;

// Guards, not transforms: a focus page that names a retired offer or free work,
// or a lesson that teaches Rx vocabulary, fails the sync (docs/packages.md,
// docs/terms.md, docs/positioning.md). The one Rx word a lesson may carry is the
// history line that sets observable libraries apart from FRP.
const RETIRED_OFFERS =
  /tenth share|quarter share|Care Contract|Standing Share|Year Share|free (?:call|consultation|conversation|audit)|at no charge|makes good/i;
const RX_WORDS = /\b(?:observables?|RxJS|RxJava|ReactiveX|multicasting)\b/i;
const RX_HISTORY = "Observable libraries often borrow the name";
const mainText = (html) => (html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "").replace(/<[^>]+>/g, " ");

const withGuards = (name, html) => {
  const text = mainText(html);
  if (isFocusPage(name) && RETIRED_OFFERS.test(text)) throw new Error(`${name}: names a retired offer or free work`);
  // The archives repeat the same cards in the same order on three bases, so only
  // /community/ itself is indexed; every other archive page is noindex, follow and
  // keeps its own canonical, which check-site requires.
  if (PAGINATED_ARCHIVES.has(name) && name !== "community/index.html" && !isNoindex(html)) {
    throw new Error(`${name}: a repeated archive page must be noindex`);
  }
  // The Rx check reads the whole main element, images and alt text included, on
  // the lessons and on the archives that show their cards.
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "";
  if ((lessonIndex(name) !== -1 || PAGINATED_ARCHIVES.has(name)) && RX_WORDS.test(main.replaceAll(RX_HISTORY, ""))) {
    throw new Error(`${name}: teaches Rx vocabulary in its text, images or alt text`);
  }
  return html;
};

const routeTransforms = Object.freeze([
  withArchiveContext,
  withArchiveCards,
  withArchivePagination,
  withCargoPostRepairs,
  withCommentsNotice,
  withLessonNav,
  withLessonSchema,
  withLevelPaths,
  withModuleLessons,
  withOutlineModule4,
  withCommunitySitemap,
  withWebmasterNote,
  withMainSitemap,
  withRelatedServices,
  withFeaturedServices,
  withLessonTitle,
  withFocusableCode,
  withTrimmedCategory,
  withLessonHeadings,
  withDepthPassages,
  withByline,
  withGuards,
]);

const normalizePage = (name, html) => {
  const shared = withHeroCta(name, withFooterAbout(name, withSocialIcons(name, html)));
  return name.endsWith("index.html")
    ? routeTransforms.reduce((current, transform) => transform(name, current), shared)
    : shared;
};

const checkOnly = process.argv.includes("--check");
const routePages = publicPageFiles();
const changed = [];

for (const file of routePages) {
  const name = relativePath(file);
  const before = readFileSync(file, "utf8");
  const after = normalizePage(name, before);
  if (after === before) continue;
  changed.push(name);
  if (!checkOnly) writeFileSync(file, after);
}

if (checkOnly && changed.length) {
  console.error(`Shared page components are out of sync:\n${changed.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(
    changed.length
      ? `Synchronized shared components in ${changed.length} pages.`
      : "Shared page components are synchronized.",
  );
}
