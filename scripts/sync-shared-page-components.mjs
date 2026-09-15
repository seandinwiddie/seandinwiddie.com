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
    "Turn up when someone nearby searches for what you sell. Ads only where they pay for themselves. Marketing – On-site SEO &amp; Off-site SEO + Ads"],
  ["/design/", "Design", "AdobeStock_207254886-scaled.jpeg",
    "A look that is yours, on pages built for one job each. Readable in one hand on a phone. Design – New &amp; CRO"],
  ["/development/", "Development", "AdobeStock_180105378-scaled.jpeg",
    "The site, and the software behind it when a site is not enough. Yours to run afterwards. Development – Sites &amp; Apps"],
  ["/automation/", "Automation", "AdobeStock_138021007-e1571312681920-scaled.jpeg",
    "Stop paying someone to retype the same order into a second system. Automation &ndash; Process audit, custom build &amp; integration"],
  ["/local/", "Local", "AdobeStock_104183460_111672862-1-scaled.jpeg",
    "Turning up when someone nearby searches for what you sell. Local &ndash; Klamath Falls &amp; Redding"],
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

const ARCHIVE_CONTEXT = `<aside class="notice archive-context" aria-label="Archive context">
<p><strong>Agency technical archive.</strong> These Redux, BDD, user-story, and functional-reactive-programming articles remain part of the agency site. <a href="/service/">View agency services</a> or <a href="/contact/">contact Sean</a>.</p>
</aside>`;

const COMMENTS_NOTICE = `<aside aria-label="Comments" class="notice">
<p>Comments are archived on this static site. <a href="/contact/">Contact Sean Dinwiddie</a> to continue the conversation.</p>
</aside>`;

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

// The two pages a prospect wants next, and the two that nothing linked to from
// inside a page before now.
const NEXT_STEPS = [["/examples/", "Work we have built"], ["/prices/", "Prices"]];

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
const CTA_LABELS = [
  [(name) => name === "about/index.html", null],
  [(name) => name === "contact/index.html", "Send a message"],
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
  if (!name.startsWith("community/") || html.includes("Agency technical archive.")) return html;
  return insertAfterContentStart(html, ARCHIVE_CONTEXT);
};

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
  return withHero.includes("Comments are archived on this static site.")
    ? withHero
    : insertBeforeContentEnd(withHero, COMMENTS_NOTICE);
};

const routeTransforms = Object.freeze([
  withArchiveContext,
  withArchivePagination,
  withCargoPostRepairs,
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
