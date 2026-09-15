#!/usr/bin/env node

/** Keep repeated, content-bearing page components synchronized across the static site. */

import { readFileSync, writeFileSync } from "node:fs";
import { publicPageFiles, relativePath } from "./static-site.mjs";

const FEATURED_SERVICES = `  <!-- featured-services:start -->
  <section class="service-cards" aria-label="Featured services">
    <div class="wrap">
      <div class="cards">
        <article class="card">
          <a class="card__link" href="/marketing/">
            <div class="card__media" style="background-image:url('/assets/img/AdobeStock_135407660-scaled.jpeg');"></div>
            <div class="card__body">
              <h2>Marketing</h2>
              <p>Our world class SEO services will send your site soaring up the search results. Marketing – On-site SEO &amp; Off-site SEO + Ads</p>
            </div>
          </a>
        </article>
        <article class="card">
          <a class="card__link" href="/design/">
            <div class="card__media" style="background-image:url('/assets/img/AdobeStock_207254886-scaled.jpeg');"></div>
            <div class="card__body">
              <h2>Design</h2>
              <p>Elegant, attractive design that makes your customers and clients sit up and say, WOW! Design – New &amp; CRO</p>
            </div>
          </a>
        </article>
        <article class="card">
          <a class="card__link" href="/development/">
            <div class="card__media" style="background-image:url('/assets/img/AdobeStock_180105378-scaled.jpeg');"></div>
            <div class="card__body">
              <h2>Development</h2>
              <p>Fast, flawless and robust development that puts you ahead of the pack. Development – Sites &amp; Apps</p>
            </div>
          </a>
        </article>
      </div>
    </div>
  </section>
  <!-- featured-services:end -->`;

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
const NEXT_STEPS = [["/examples/", "Work I have built"], ["/prices/", "Prices"]];

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

const withRelatedServices = (name, html) => {
  if (/class="related-services"/.test(html)) return html;
  const snippet = relatedServices(routeForPage(name));
  return snippet ? insertBeforeContentEnd(html, snippet) : html;
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

const withFeaturedServices = (name, html) => {
  if (name === "index.html") {
    if (!/class="[^"]*\bhome-cards\b/.test(html)) throw new Error("index.html: missing service cards");
    return html;
  }
  if (/aria-label="Featured services"/.test(html)) return html;
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
  const shared = withSocialIcons(name, html);
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
