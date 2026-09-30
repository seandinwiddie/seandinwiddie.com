#!/usr/bin/env node

/** Keep repeated, content-bearing page components synchronized across the static site. */

import { readFileSync, writeFileSync } from "node:fs";
import { publicPageFiles, relativePath } from "./static-site.mjs";

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
const ARCHIVE_CONTEXT = `<aside class="notice archive-context" aria-label="About these lessons">
<p><strong>Agency lessons.</strong> How the Sean Dinwiddie&rsquo;s Webmastery team builds custom software: user stories, behavior-driven development and functional programming. Start with the <a href="/community/user-story_bdd_frp-workflow/">course outline</a>, or <a href="/service/">view agency services</a>.</p>
</aside>`;

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
// it is replaced by pattern for the same reason as the banner.
const COMMENTS_NOTICE = `<aside aria-label="Questions" class="notice">
<p>Questions about this page? <a href="/contact/">Call or email</a> Sean Dinwiddie&rsquo;s Webmastery.</p>
</aside>`;

const COMMENTS_NOTICE_PATTERN = /<aside aria-label="(?:Comments|Questions)" class="notice">[\s\S]*?<\/aside>/;

// The lessons in teaching order (docs/copy-review.md, Focus): an introduction
// before the lessons that build on it, never publication order. The previous and
// next links were hand-kept copies of the WordPress publication order, so 29 of
// them sent a learner backwards, sideways or out of the course (into the fee
// split, the membership offer and a note about Sublime Text), and nothing could
// see it. Every lesson's links now come from this one list and are replaced by
// pattern: moving a lesson here re-points both of its neighbours, and --check
// sees any page that drifts. Each entry is [slug, the title its links show].
const LESSONS = [
  // The course: every level enters here.
  ["introduction", "Introduction"],
  ["user-stories", "User Stories"],
  ["behavior-driven-development-bdd", "Behavior-Driven Development (BDD)"],
  ["functional-reactive-programming-frp", "Functional Reactive Programming (FRP)"],
  ["curriculum", "Curriculum"],
  ["user-story_bdd_frp-workflow", "User-Story_BDD_FRP Workflow"],
  // Module 1: why, what, finding, capturing, translating, writing well, practice, review.
  ["welcome-to-module-1-understanding-user-stories", "Welcome to Module 1: Understanding User Stories"],
  ["understanding-the-importance-of-user-centric-design", "Understanding the Importance of User-Centric Design"],
  ["defining-user-stories", "Defining User Stories"],
  ["identifying-user-needs", "Identifying User Needs"],
  ["capturing-user-requirements-effectively", "Capturing User Requirements Effectively"],
  ["translating-user-needs-into-user-stories", "Translating User Needs into User Stories"],
  ["writing-clear-and-concise-user-stories", "Writing Clear and Concise User Stories"],
  ["practical-exercises-in-creating-user-stories", "Practical Exercises in Creating User Stories"],
  ["collaborative-sessions-to-review-and-refine-user-stories", "Collaborative Sessions to Review and Refine User Stories"],
  // Module 2: the introduction first, then Gherkin, writing, review and testing.
  ["module-2-behavior-driven-development-bdd", "Module 2: Behavior-Driven Development (BDD)"],
  ["introduction-to-behavior-driven-development-bdd", "Introduction to Behavior-Driven Development (BDD)"],
  ["principles-of-behavior-driven-development-bdd", "Principles of Behavior-Driven Development (BDD)"],
  ["how-bdd-aligns-development-with-user-expectations", "How BDD Aligns Development with User Expectations"],
  ["given-when-then-gherkin-syntax-in-bdd", "Given-When-Then (Gherkin) Syntax in BDD"],
  ["writing-bdd-scenarios", "Writing BDD Scenarios"],
  ["writing-bdd-scenarios-for-software-modules", "Writing BDD Scenarios for Software Modules"],
  ["creating-bdd-scenarios-for-real-world-cases", "Creating BDD Scenarios for Real-World Cases"],
  ["reviewing-and-enhancing-bdd-scenarios-as-a-group", "Reviewing and Enhancing BDD Scenarios as a Group"],
  ["bdd-and-unit-testing", "BDD and Unit Testing"],
  ["bdd-testing-framework", "BDD Testing Framework"],
  // Module 3: the introduction first; Apply FRP ends the course.
  ["module-3-functional-reactive-programming-frp", "Module 3: Functional Reactive Programming (FRP)"],
  ["introduction-to-functional-reactive-programming-frp", "Introduction to Functional Reactive Programming (FRP)"],
  ["event-streams-and-reactive-programming", "Event streams and reactive programming"],
  ["master-the-fundamentals-of-frp-in-software-development", "FRP Fundamentals in Software Development"],
  ["discover-how-frp-enhances-user-interaction-and-responsiveness", "Discover how FRP enhances user interaction and responsiveness"],
  ["apply-frp-concepts-to-software-modules", "Apply FRP concepts to software modules"],
];

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
  const index = LESSONS.findIndex(([slug]) => name === `community/${slug}/index.html`);
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

const PAGINATED_ARCHIVES = new Map([
  ["community/author/seandinwiddie/index.html", ["/community/author/seandinwiddie/", 1]],
  ["community/author/seandinwiddie/page/2/index.html", ["/community/author/seandinwiddie/", 2]],
  ["community/author/seandinwiddie/page/3/index.html", ["/community/author/seandinwiddie/", 3]],
  ["community/author/seandinwiddie/page/4/index.html", ["/community/author/seandinwiddie/", 4]],
  ["community/category/development/index.html", ["/community/category/development/", 1]],
  ["community/category/development/page/2/index.html", ["/community/category/development/", 2]],
  ["community/category/development/page/3/index.html", ["/community/category/development/", 3]],
  ["community/category/development/page/4/index.html", ["/community/category/development/", 4]],
]);

const pageHref = (base, page) => (page === 1 ? base : `${base}page/${page}/`);
const paginationLink = (base, page, label, rel = "") =>
  `<a href="${pageHref(base, page)}"${rel ? ` rel="${rel}"` : ""}>${label}</a>`;

const archivePagination = (base, page) => {
  const links = [
    ...(page > 1 ? [paginationLink(base, 1, "First page")]: []),
    ...(page > 1 ? [paginationLink(base, page - 1, "Previous page", "prev")]: []),
    ...(page < 4 ? [paginationLink(base, page + 1, "Next page", "next")]: []),
    ...(page < 4 ? [paginationLink(base, 4, "Last page")]: []),
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
// nothing about what happens next. The promise is unchanged (a free call); the
// wording now matches who is reading the page. /about/ is Sean's own page and
// is left exactly as it is.
//
// "Book a free call" promised a booking the site doesn't have: /contact/ offers a
// phone number and an email address. The pages the copy review owns (the homepage,
// the service pages, /contact/ and two community pages) now name exactly that.
// Training, /prices/, /tools/ and /resources/ are Sean's pages and keep their
// label, as do the pages the review hasn't reached.
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
  [(name) => name === "about/index.html", null],
  [isFocusPage, "Call or email"],
  [(name) => name.startsWith("community/") || name.startsWith("blog/"), "Work with Sean"],
  [() => true, "Book a free call"],
];

const ctaLabel = (name) => CTA_LABELS.find(([match]) => match(name))[1];

const CTA_PATTERN = /(<a class="hero__cta" href="[^"]*">)([^<]*)(<\/a>)/;

const withHeroCta = (name, html) => {
  const label = ctaLabel(name);
  if (label === null || !CTA_PATTERN.test(html)) return html;
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
    return html.replace(ARCHIVE_CONTEXT_PATTERN, () => `\n${ARCHIVE_CONTEXT}`);
  }
  return insertAfterContentStart(html, ARCHIVE_CONTEXT);
};

const withCommentsNotice = (name, html) =>
  SEANS_COMMUNITY_PAGES.has(name) || !COMMENTS_NOTICE_PATTERN.test(html)
    ? html
    : html.replace(COMMENTS_NOTICE_PATTERN, () => COMMENTS_NOTICE);

const withArchivePagination = (name, html) => {
  const config = PAGINATED_ARCHIVES.get(name);
  if (!config || /class="pagination"/.test(html)) return html;
  return insertBeforeContentEnd(html, archivePagination(...config));
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
    : insertBeforeContentEnd(withHero, COMMENTS_NOTICE);
};

const routeTransforms = Object.freeze([
  withArchiveContext,
  withArchivePagination,
  withCargoPostRepairs,
  withCommentsNotice,
  withLessonNav,
  withRelatedServices,
  withFeaturedServices,
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
