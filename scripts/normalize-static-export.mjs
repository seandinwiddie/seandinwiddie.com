#!/usr/bin/env node

/**
 * Normalize the legacy WordPress static export without requiring WordPress.
 *
 * The transform is intentionally deterministic and dependency-free so this
 * repository can be moved to any static host. Run it after importing or
 * editing exported HTML:
 *
 *   node scripts/normalize-static-export.mjs
 */

import {
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const ORIGIN = "https://seandinwiddie.com";
const SITE_NAME = "Sean Dinwiddie's Webmastery";
const CONTACT_EMAIL = "hello@seandinwiddie.com";
const CONTACT_PHONE = "+1-530-638-3238";
const DEFAULT_IMAGE = `${ORIGIN}/wp-content/uploads/2019/10/AdobeStock_138021007-e1571312681920-scaled.jpeg`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const NOINDEX_ROUTES = new Set(["/sitemap/", "/community/sitemap/"]);

const PAGE_METADATA = Object.freeze({
  "/": {
    title: "Web Design for Klamath Falls & Redding | Sean Dinwiddie",
    description:
      "Web design, development, local SEO, and business automation for organizations in Klamath Falls, Oregon, and Redding, California.",
  },
  "/about/": {
    description:
      "Meet Sean Dinwiddie, the developer behind an independent web, software, SEO, and automation agency serving Klamath Falls and Redding.",
  },
  "/contact/": {
    description:
      "Contact Sean Dinwiddie's Webmastery about web design, development, local SEO, or business automation in Klamath Falls and Redding.",
  },
  "/local/oregon/klamath-falls/": {
    title: "Klamath Falls Web Design & Local SEO | Sean Dinwiddie",
    description:
      "Practical web design, development, and local SEO for Klamath Falls businesses, with clear plans and long-term technical support.",
  },
  "/local/california/redding/": {
    title: "Redding Web Design & Local SEO | Sean Dinwiddie",
    description:
      "Practical web design, development, and local SEO for Redding businesses, with clear plans and long-term technical support.",
  },
  "/automation/": {
    description:
      "AI and workflow automation for small businesses in Klamath Falls, Redding, and nearby communities, built around the tools your team already uses.",
  },
  "/blog/": {
    title: "Agency Notes | Sean Dinwiddie's Webmastery",
    description:
      "Practical notes from Sean Dinwiddie on web development, Redux Toolkit, automation, and maintaining useful software for small organizations.",
  },
  "/blog/rtk-promt-example/": {
    title:
      "Building a Redux Toolkit CLI App with Prompt and JSON Persistence | Sean Dinwiddie",
    description:
      "Build a small command-line app with Redux Toolkit, prompt-driven input, and JSON state persistence.",
  },
});

const EXCLUDED_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  "scripts",
  "wp-content",
  "wp-includes",
  "wp-json",
]);
const EXCLUDED_FILES = new Set(["pinterest-9af13.html"]);

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      return EXCLUDED_DIRECTORIES.has(entry.name) ? [] : walk(absolute);
    }
    return entry.name.endsWith(".html") && !EXCLUDED_FILES.has(entry.name)
      ? [absolute]
      : [];
  });

const routeFor = (file) => {
  const path = relative(ROOT, file).split(sep).join("/");
  if (path === "index.html") return "/";
  if (path === "404.html") return "/404.html";
  return `/${path.replace(/index\.html$/, "")}`;
};

const decodeEntities = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&(?:#0?39|apos);/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const textOnly = (value) =>
  decodeEntities(
    value
      .replace(/<(script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\[(?:&hellip;|…|\.\.\.)\]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

const truncate = (value, maximum = 155) => {
  if (value.length <= maximum) return value;
  const shortened = value.slice(0, maximum - 1).replace(/\s+\S*$/, "");
  return `${shortened}…`;
};

const matchContent = (html, pattern) => {
  const match = html.match(pattern);
  return match ? textOnly(match[1]) : "";
};

const titleFor = (html, route) =>
  PAGE_METADATA[route]?.title ||
  matchContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i) ||
  SITE_NAME;

const descriptionFor = (html, route, title) => {
  if (PAGE_METADATA[route]?.description) {
    return PAGE_METADATA[route].description;
  }

  const existing = matchContent(
    html,
    /<meta\s+[^>]*(?:name=["']description["']|property=["']og:description["'])[^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  if (existing.length >= 60) return truncate(existing);

  const content =
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ||
    html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ||
    html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ||
    html;
  const paragraphs = [...content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => textOnly(match[1]))
    .filter((text) => text.length >= 60);
  if (paragraphs.length > 0) return truncate(paragraphs[0]);

  const subject = title.replace(/\s*[-|—]\s*Sean Dinwiddie(?:'s Webmastery)?\s*$/i, "");
  return truncate(`Explore ${subject} from ${SITE_NAME}.`);
};

const replaceOrInsert = (html, pattern, replacement) => {
  if (pattern.test(html)) return html.replace(pattern, `\n\t${replacement}`);
  return html.replace(/<\/head>/i, `\n\t${replacement}\n</head>`);
};

const setMetaName = (html, name, content) =>
  replaceOrInsert(
    html,
    new RegExp(`\\s*<meta\\s+[^>]*name=["']${name}["'][^>]*>`, "i"),
    `<meta name="${name}" content="${escapeAttribute(content)}">`,
  );

const setMetaProperty = (html, property, content) =>
  replaceOrInsert(
    html,
    new RegExp(`\\s*<meta\\s+[^>]*property=["']${property}["'][^>]*>`, "i"),
    `<meta property="${property}" content="${escapeAttribute(content)}">`,
  );

const setCanonical = (html, canonical) =>
  replaceOrInsert(
    html,
    /\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}">`,
  );

const removeSearchActions = (value) => {
  if (Array.isArray(value)) {
    return value
      .map(removeSearchActions)
      .filter((item) => item !== undefined);
  }
  if (!value || typeof value !== "object") return value;

  const types = Array.isArray(value["@type"])
    ? value["@type"]
    : [value["@type"]];
  if (types.includes("SearchAction") || types.includes("CommentAction")) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, child]) => [key, removeSearchActions(child)])
      .filter(([, child]) => child !== undefined),
  );
};

const place = (city, state) => ({
  "@type": "City",
  name: city,
  containedInPlace: { "@type": "State", name: state },
});

const SERVICE_AREAS = Object.freeze([
  place("Klamath Falls", "Oregon"),
  place("Redding", "California"),
]);

const CONTACT_POINTS = Object.freeze([
  {
    "@type": "ContactPoint",
    telephone: CONTACT_PHONE,
    contactType: "customer service",
    areaServed: SERVICE_AREAS,
    availableLanguage: "English",
  },
]);

const serviceAreasForRoute = (route) => {
  if (route === "/local/oregon/klamath-falls/") return [SERVICE_AREAS[0]];
  if (route === "/local/california/redding/") return [SERVICE_AREAS[1]];
  return SERVICE_AREAS;
};

const hasType = (node, expected) => {
  const types = Array.isArray(node?.["@type"])
    ? node["@type"]
    : [node?.["@type"]];
  return types.includes(expected);
};

const normalizeNode = (node, context) => {
  if (Array.isArray(node)) return node.map((item) => normalizeNode(item, context));
  if (!node || typeof node !== "object") return node;

  const normalized = Object.fromEntries(
    Object.entries(node).map(([key, value]) => [
      key,
      normalizeNode(value, context),
    ]),
  );

  if (normalized["@id"] === `${ORIGIN}/community/#organization`) {
    normalized["@id"] = ORGANIZATION_ID;
  }
  if (normalized["@id"] === `${ORIGIN}/community/#website`) {
    normalized["@id"] = `${ORIGIN}/#website`;
  }
  if (String(normalized["@id"] || "").endsWith("#primaryimage")) {
    normalized["@id"] = `${context.canonical}#primaryimage`;
  }
  if (String(normalized["@id"] || "").endsWith("#breadcrumb")) {
    normalized["@id"] = `${context.canonical}#breadcrumb`;
  }

  if (hasType(normalized, "WebPage")) {
    normalized["@id"] = `${context.canonical}#webpage`;
    normalized.url = context.canonical;
    normalized.name = context.title;
    normalized.isPartOf = { "@id": `${ORIGIN}/#website` };
    if (normalized.primaryImageOfPage) {
      normalized.primaryImageOfPage = {
        "@id": `${context.canonical}#primaryimage`,
      };
      normalized.image = { "@id": `${context.canonical}#primaryimage` };
      if (!context.isArticle) normalized.thumbnailUrl = DEFAULT_IMAGE;
    }
    if (normalized.breadcrumb) {
      normalized.breadcrumb = { "@id": `${context.canonical}#breadcrumb` };
    }
    if (normalized.potentialAction) {
      normalized.potentialAction = [
        { "@type": "ReadAction", target: [context.canonical] },
      ];
    }
  }

  if (
    context.isArticle &&
    ["Article", "BlogPosting", "NewsArticle"].some((type) =>
      hasType(normalized, type),
    )
  ) {
    normalized.isPartOf = { "@id": `${context.canonical}#webpage` };
    normalized.mainEntityOfPage = { "@id": `${context.canonical}#webpage` };
  }

  if (
    hasType(normalized, "ImageObject") &&
    String(normalized["@id"] || "").endsWith("#primaryimage")
  ) {
    normalized["@id"] = `${context.canonical}#primaryimage`;
    if (context.isArticle) {
      if (typeof normalized.url === "string") normalized.url = normalized.url.replace(/^http:/, "https:");
      if (typeof normalized.contentUrl === "string") normalized.contentUrl = normalized.contentUrl.replace(/^http:/, "https:");
    } else {
      normalized.url = DEFAULT_IMAGE;
      normalized.contentUrl = DEFAULT_IMAGE;
      normalized.width = 2560;
      normalized.height = 1707;
      normalized.caption = context.title;
    }
  }

  if (hasType(normalized, "BreadcrumbList")) {
    normalized["@id"] = `${context.canonical}#breadcrumb`;
    normalized.itemListElement =
      context.route === "/"
        ? [{ "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` }]
        : [
            { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: context.title.replace(/\s*[|—-]\s*Sean Dinwiddie(?:'s Webmastery)?\s*$/i, ""),
              item: context.canonical,
            },
          ];
  }

  if (hasType(normalized, "WebSite")) {
    normalized["@id"] = `${ORIGIN}/#website`;
    normalized.url = `${ORIGIN}/`;
    normalized.name = SITE_NAME;
    delete normalized.potentialAction;
  }

  if (
    hasType(normalized, "LocalBusiness") ||
    hasType(normalized, "ProfessionalService") ||
    hasType(normalized, "Organization")
  ) {
    normalized["@id"] = ORGANIZATION_ID;
    normalized.name = SITE_NAME;
    normalized.url = `${ORIGIN}/`;
    normalized.description =
      "Independent web design, development, local SEO, and business automation agency serving Klamath Falls, Oregon, and Redding, California.";
    delete normalized.telephone;
    normalized.email = CONTACT_EMAIL;
    normalized.areaServed = SERVICE_AREAS;
    normalized.contactPoint = CONTACT_POINTS;
    if (Array.isArray(normalized.sameAs)) {
      normalized.sameAs = normalized.sameAs.filter(
        (url) => !String(url).includes("instagram.com/sdin.dev"),
      );
    }
  }

  if (hasType(normalized, "Service")) {
    normalized.provider = { "@id": ORGANIZATION_ID };
    normalized.areaServed = serviceAreasForRoute(context.route);
  }

  return normalized;
};

const normalizeJsonLd = (html, context) =>
  html.replace(
    /<script([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi,
    (source, attributes, json) => {
      try {
        const parsed = JSON.parse(json);
        const withoutSearch = removeSearchActions(parsed);
        const normalized = normalizeNode(withoutSearch, context);
        return `<script${attributes}>${JSON.stringify(normalized)}</script>`;
      } catch {
        process.stderr.write(`Skipped invalid JSON-LD on ${context.route}\n`);
        return source;
      }
    },
  );

const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${ORIGIN}/`,
  email: CONTACT_EMAIL,
  description:
    "Independent web design, development, local SEO, and business automation agency serving Klamath Falls, Oregon, and Redding, California.",
  areaServed: SERVICE_AREAS,
  contactPoint: CONTACT_POINTS,
});

const ensureOrganizationDefinition = (html) => {
  let referenced = false;
  let defined = false;
  const visit = (value) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    if (value.provider?.["@id"] === ORGANIZATION_ID) referenced = true;
    if (
      value["@id"] === ORGANIZATION_ID &&
      ["LocalBusiness", "ProfessionalService", "Organization"].some((type) =>
        [value["@type"]].flat().includes(type),
      )
    ) {
      defined = true;
    }
    Object.values(value).forEach(visit);
  };

  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      visit(JSON.parse(match[1]));
    } catch {
      // Invalid JSON-LD is reported by the checker; do not mask it here.
    }
  }

  if (!referenced || defined) return html;
  return html.replace(
    /<\/head>/i,
    `\n<script type="application/ld+json">${JSON.stringify(organizationSchema())}</script>\n</head>`,
  );
};

const removeObsoleteDiscovery = (html) =>
  html
    .replace(
      /^\s*<link[^>]*(?:api\.w\.org|wp-json|xmlrpc\.php|application\/(?:json|rsd\+xml)|oembed|rel=["']pingback["'])[^>]*>\s*$/gim,
      "",
    )
    .replace(
      /^\s*<link[^>]*rel=["'](?:shortlink|wlwmanifest)["'][^>]*>\s*$/gim,
      "",
    )
    .replace(/^\s*<meta[^>]*name=["']generator["'][^>]*>\s*$/gim, "")
    .replace(
      /^\s*<meta[^>]*name=["']material-design-(?:plugin|google-theme)["'][^>]*>\s*$/gim,
      "",
    )
    .replace(/^\s*<link[^>]*type=["']application\/rss\+xml["'][^>]*>\s*$/gim, "")
    .replace(/^\s*<link[^>]*(?:href=["'](?:https?:)?\/\/fonts\.googleapis\.com|rel=["']dns-prefetch["'][^>]*fonts\.googleapis\.com)[^>]*>\s*$/gim, "")
    .replace(
      /\s*<script type="text\/javascript">\s*window\._wpemojiSettings[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(
      /\s*<style type="text\/css">\s*img\.wp-smiley,[\s\S]*?<\/style>/gi,
      "",
    )
    .replace(/^\s*<link rel="dns-prefetch" href="\/\/c0\.wp\.com">\s*$/gim, "");

const normalizeValidity = (html) => {
  html = html
    .replaceAll("border-radius:false", "border-radius:0")
    .replaceAll("background-color:none", "background-color:transparent")
    .replace(/\s+vce-box-shadow=["'][^"']*["']/gi, "")
    .replace(
      /\s*<div id="fb-root"><\/div>\s*<script>[\s\S]*?facebook-jssdk[\s\S]*?<\/script>\s*<div class="fb-customerchat"[^>]*><\/div>/gi,
      "",
    )
    .replace(/\sattribution=["']([^"']*)["']/gi, ' data-attribution="$1"')
    .replace(/\spage_id=["']([^"']*)["']/gi, ' data-page-id="$1"')
    .replace(
      /(<style\b[^>]*id=["']wp-custom-css["'][^>]*>)([\s\S]*?)@import\s+url\(\s*["']([^"']+)["']\s*\);([\s\S]*?<\/style>)/gi,
      '<link rel="stylesheet" href="$3">\n$1$2$4',
    )
    .replace(
      /<label(\s+class=["'][^"']*mdc-text-field--with-trailing-icon[^"']*["'][^>]*)>([\s\S]*?)<\/label>/gi,
      "<div$1>$2</div>",
    )
    .replace(
      /<nav([^>]*\bclass=["'][^"']*mdc-drawer__list[^"']*["'][^>]*)\s+role=["']listbox["']([^>]*)>/gi,
      '<nav$1$2 aria-label="Community navigation">',
    )
    .replace(
      /<span(\s+class=["'][^"']*mdc-top-app-bar__title[^"']*["'][^>]*)>([\s\S]*?)<\/span>(\s*<\/section>)/gi,
      "<div$1>$2</div>$3",
    )
    .replace(/\s+role=["']toolbar["']/gi, "")
    .replace(
      /<div(\s+class=["'][^"']*mdc-button__ripple[^"']*["'][^>]*)><\/div>/gi,
      "<span$1></span>",
    )
    .replace(
      /<p>\s*<span[^>]*>\s*(?=<div\s+id=["']simple-sitemap-container-)/gi,
      "",
    )
    .replace(/\s*<br\s+style=["']clear:\s*both;?["']>\s*<\/span>\s*<\/p>/gi, "");

  const bodyStart = html.search(/<body\b/i);
  if (bodyStart < 0) return html;
  const head = html.slice(0, bodyStart);
  let body = html.slice(bodyStart);
  const styles = [...body.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)].map(
    (match) => match[0],
  );
  if (styles.length === 0) return html;
  body = body.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  return `${head.replace(/<\/head>/i, `${styles.join("\n")}\n</head>`)}${body}`;
};

const closeUnbalancedArticleDivs = (html) =>
  html.replace(/<article\b[^>]*>[\s\S]*?<\/article>/gi, (article) => {
    // The legacy cargo-cult post nests an empty article inside its layout
    // article. A non-greedy regex stops at the inner closing tag, so leave
    // nested articles alone rather than adding layout-closing divs too early.
    if ([...article.matchAll(/<article\b/gi)].length > 1) return article;
    const opened = [...article.matchAll(/<div\b/gi)].length;
    const closed = [...article.matchAll(/<\/div>/gi)].length;
    if (opened <= closed) return article;
    return article.replace(
      /<\/article>$/i,
      `${"</div>\n".repeat(opened - closed)}</article>`,
    );
  });

const normalizeSearchForms = (html) =>
  html
    .replace(
      /<form class="search-form" action="https:\/\/seandinwiddie\.com\/community\/" method="get"/gi,
      '<form class="search-form" action="https://www.google.com/search" method="get" onsubmit="const field=this.elements.q; field.value=\'site:seandinwiddie.com/community/ \'+field.value"',
    )
    .replace(
      /<form\b[^>]*action=["']https:\/\/www\.google\.com\/search["'][^>]*>[\s\S]*?<\/form>/gi,
      (form) =>
        form
          .replace(/\bname=["']s["']/gi, 'name="q"')
          .replace(
            /onsubmit=["']const field=this\.querySelector\(\'\[name=q\]\'\); field\.value=\'site:seandinwiddie\.com\/community\/ \'\+field\.value["']/gi,
            'onsubmit="const field=this.elements.q; field.value=\'site:seandinwiddie.com/community/ \'+field.value"',
          ),
    );

const normalizeDeadCommentForms = (html) =>
  html.replace(
    /<div id=["']comments["'] class=["']comments-area(?: section-inner)?["']>[\s\S]*?<!-- (?:#comments|\.comments-area) -->/gi,
    `<aside class="comments-area section-inner" aria-label="Comments">
  <p>Comments are archived on this static site. <a href="/contact/">Contact Sean Dinwiddie</a> to continue the conversation.</p>
</aside>
<!-- #comments -->`,
  );

const normalizeLandmarks = (html) => {
  if (html.includes('<section class="vcv-content ')) {
    return html
      .replace(
        '<section class="vcv-content ',
        '<main id="main-content" class="vcv-content ',
      )
      .replace(
        /<\/section>\s*(<footer class="vcv-footer")/i,
        "</main>\n            $1",
      );
  }
  if (!/<main\b/i.test(html) && /<\/header>\s*<div class="container">/i.test(html)) {
    const withMain = html
      .replace(
        /<\/header>\s*<div class="container">/i,
        '</header>\n\t<main id="main-content" class="container">',
      );
    return withMain
      .replace(
        /<\/div>\s*<!--\.container-->\s*(?=<aside\b[^>]*class=["'][^"']*comments-area)/i,
        "</main>\n<!--.container-->\n\n",
      )
      .replace(
        /<\/div>\s*<!--\.container-->\s*(<footer class="vcv-footer")/i,
        "</main>\n<!--.container-->\n\n    $1",
      );
  }
  return html;
};

const normalizeDuplicateSiteTitle = (html) => {
  const matches = [...html.matchAll(/<h1 class="site-title title-large">/gi)];
  if (matches.length < 2) return html;
  let count = 0;
  return html.replace(
    /<h1 class="site-title title-large">([\s\S]*?)<\/h1>/gi,
    (source, content) => {
      count += 1;
      return count === 1
        ? source
        : `<p class="site-title title-large">${content}</p>`;
    },
  );
};

const normalizeUtilityHeadings = (html) =>
  html
    .replace(
      /<h2(\s+class="vce-google-fonts-heading-inner"[^>]*)>(\s*(?:\(?(?:530|541)\)?[\s-](?:638-3238|488-4653)|hello@seandinwiddie\.com)\s*)<\/h2>/gi,
      "<p$1>$2</p>",
    )
    .replace(
      /<h3(\s+class="vce-post-slider-block-item-title"[^>]*)>([\s\S]*?)<\/h3>/gi,
      "<h2$1>$2</h2>",
    );

const normalizeHeadingOrder = (html) =>
  html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/gi, (main) => {
    let previousLevel = 0;
    return main.replace(
      /<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h\1>/gi,
      (source, rawLevel, attributes, content) => {
        const level = Number(rawLevel);
        const normalizedLevel =
          previousLevel > 0 && level > previousLevel + 1
            ? previousLevel + 1
            : level;
        previousLevel = normalizedLevel;
        return normalizedLevel === level
          ? source
          : `<h${normalizedLevel}${attributes}>${content}</h${normalizedLevel}>`;
      },
    );
  });

const normalizeLinksAndIdentity = (html) =>
  html
    .replaceAll(
      "https://c0.wp.com/c/6.1.1/wp-includes/css/classic-themes.min.css",
      "/assets/vendor/wordpress/classic-themes.min.css",
    )
    .replaceAll(
      "https://c0.wp.com/c/6.1.1/wp-includes/blocks/paragraph/style.min.css",
      "/assets/vendor/wordpress/paragraph-style.min.css",
    )
    .replaceAll(
      "https://c0.wp.com/c/6.1.1/wp-includes/js/jquery/jquery.min.js",
      "/assets/vendor/wordpress/jquery.min.js",
    )
    .replaceAll(
      "https://c0.wp.com/c/6.1.1/wp-includes/js/jquery/jquery-migrate.min.js",
      "/assets/vendor/wordpress/jquery-migrate.min.js",
    )
    .replaceAll(
      "https://c0.wp.com/c/6.1.1/wp-includes/js/comment-reply.min.js",
      "/assets/vendor/wordpress/comment-reply.min.js",
    )
    .replaceAll("https://cdn.simplecss.org/simple.css", "/assets/vendor/simple.css")
    .replaceAll("https://test.simplecss.org/simple.css", "/assets/vendor/simple.css")
    .replace(
      /^\s*<!--\s*<link[^>]*unpkg\.com[^>]*>\s*-->\s*$/gim,
      "",
    )
    .replaceAll("https://sdin.dev/profile.png", `${ORIGIN}/sean-dinwiddie.jpg`)
    .replaceAll("sean@sdin.dev", CONTACT_EMAIL)
    .replaceAll("seandinwiddie@gmail.com", CONTACT_EMAIL)
    .replaceAll("+15414884653", "+15306383238")
    .replaceAll("+1-541-488-4653", CONTACT_PHONE)
    .replaceAll("(541) 488-4653", "(530) 638-3238")
    .replaceAll("541-488-4653", "530-638-3238")
    .replace(/https:\/\/images\.unsplash\.com\/[^"'()\s<>]+/gi, DEFAULT_IMAGE)
    .replace(
      /https?:\/\/2\.gravatar\.com\/avatar\/[^"'\s<]+/gi,
      `${ORIGIN}/sean-dinwiddie.jpg`,
    )
    .replaceAll(
      "Sean Dinwiddie — Web Design & Development Agency",
      SITE_NAME,
    )
    .replaceAll(
      "https://seandinwiddie.com/wp-content/uploads/2021/07/logo-61192cf7c75904d495e7ad69695fbf0bffd965bc3e17ac60f6c6b475304db09d.svg",
      `${ORIGIN}/assets/logo.svg`,
    )
    .replaceAll("https://seandinwiddie.com/design-portfolio/", `${ORIGIN}/design/`)
    .replaceAll("https://seandinwiddie.com/pages/", `${ORIGIN}/service/training/pages/`)
    .replaceAll(
      "https://seandinwiddie.com/page-setup/",
      `${ORIGIN}/service/training/pages/page-setup/`,
    )
    .replaceAll('xmlns="https://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg"')
    .replace(
      /<a\b([^>]*target=["']_blank["'][^>]*)>/gi,
      (source, attributes) =>
        /\brel=["'][^"']*["']/i.test(attributes)
          ? source.replace(
              /rel=["']([^"']*)["']/i,
              (_, value) => `rel="${[...new Set(`${value} noopener noreferrer`.split(/\s+/))].join(" ")}"`,
            )
          : `<a${attributes} rel="noopener noreferrer">`,
    );

const normalizeMetadata = (html, context) => {
  if (context.route === "/404.html") return html;
  const robots = matchContent(
    html,
    /<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const indexable = !robots.toLowerCase().includes("noindex");
  if (!indexable) return html;

  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(context.title)}</title>`);
  html = setMetaName(html, "description", context.description);
  html = setCanonical(html, context.canonical);
  html = setMetaProperty(html, "og:type", context.isArticle ? "article" : "website");
  html = setMetaProperty(html, "og:title", context.title);
  html = setMetaProperty(html, "og:description", context.description);
  html = setMetaProperty(html, "og:url", context.canonical);
  html = setMetaProperty(html, "og:site_name", SITE_NAME);
  const existingImage = matchContent(
    html,
    /<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  ).replace(/^http:/, "https:");
  const socialImage = existingImage || DEFAULT_IMAGE;
  html = setMetaProperty(html, "og:image", socialImage);
  if (socialImage === DEFAULT_IMAGE) {
    html = setMetaProperty(html, "og:image:width", "2560");
    html = setMetaProperty(html, "og:image:height", "1707");
    html = setMetaProperty(html, "og:image:type", "image/jpeg");
  }
  html = setMetaName(html, "twitter:card", "summary_large_image");
  html = setMetaName(html, "twitter:title", context.title);
  html = setMetaName(html, "twitter:description", context.description);
  html = setMetaName(html, "twitter:image", socialImage);
  return html;
};

const normalizeFile = (file) => {
  const route = routeFor(file);
  let html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) return false;

  html = normalizeLinksAndIdentity(html);
  html = removeObsoleteDiscovery(html);
  html = normalizeValidity(html);
  html = closeUnbalancedArticleDivs(html);
  html = normalizeSearchForms(html);
  html = normalizeDeadCommentForms(html);
  html = normalizeLandmarks(html);
  html = normalizeDuplicateSiteTitle(html);
  html = normalizeUtilityHeadings(html);
  html = normalizeHeadingOrder(html);
  if (NOINDEX_ROUTES.has(route)) {
    html = setMetaName(html, "robots", "noindex, follow");
  }
  const title = titleFor(html, route);
  const context = Object.freeze({
    route,
    canonical: `${ORIGIN}${route}`,
    title,
    description: descriptionFor(html, route, title),
    isArticle:
      /^\/(?:community|blog)\//.test(route) &&
      !["/blog/", "/community/", "/community/sitemap/"].includes(route) &&
      !/(?:\/page\/|\/author\/|\/category\/)/.test(route),
  });

  html = normalizeMetadata(html, context);
  html = normalizeJsonLd(html, context);
  html = ensureOrganizationDefinition(html);
  html = html
    .replace(/^[ \t]+/gm, (indentation) =>
      / \t/.test(indentation) ? indentation.replace(/\t/g, "  ") : indentation,
    )
    .replace(/[ \t]+$/gm, "");

  const original = readFileSync(file, "utf8");
  if (html === original) return false;
  writeFileSync(file, html);
  return true;
};

const files = walk(ROOT).filter((file) => statSync(file).isFile());
const changed = files.filter(normalizeFile);
process.stdout.write(`Normalized ${changed.length} of ${files.length} HTML files.\n`);
