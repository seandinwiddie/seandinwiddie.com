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
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve, sep } from "node:path";
import {
  SERVICE_AREAS,
  SITE,
  metadataForRoute,
  organizationId,
  serviceTypesForRoute,
  socialImageForRoute,
  websiteId,
} from "./site-config.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const ORIGIN = SITE.origin;
const SITE_NAME = SITE.name;
const CONTACT_EMAIL = SITE.email;
const CONTACT_PHONE = SITE.phone;
const ORGANIZATION_ID = organizationId;
const DEFAULT_IMAGE = `${ORIGIN}/wp-content/uploads/2019/10/AdobeStock_138021007-e1571312681920-scaled.jpeg`;
const NOINDEX_ROUTES = new Set([
  "/sitemap/",
  "/community/sitemap/",
  "/test-tracking.html",
]);

const EXCLUDED_DIRECTORIES = new Set([
  ".git",
  "_site",
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
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&hellip;/gi, "…")
    .replace(/&amp;/gi, "&")
    .replace(/&(?:nbsp|#160);/gi, " ")
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
  metadataForRoute(route).title ||
  matchContent(html, /<title[^>]*>([\s\S]*?)<\/title>/i) ||
  SITE_NAME;

const descriptionFor = (html, route, title) => {
  const reviewed = metadataForRoute(route).description;
  if (reviewed) {
    return reviewed;
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
    normalized["@type"] = "Organization";
    normalized["@id"] = ORGANIZATION_ID;
    normalized.name = SITE_NAME;
    normalized.url = `${ORIGIN}/`;
    normalized.description =
      "Independent web design, development, local SEO, and business automation agency serving Klamath Falls, Oregon, and Redding, California.";
    delete normalized.telephone;
    normalized.email = CONTACT_EMAIL;
    normalized.areaServed = SERVICE_AREAS;
    normalized.contactPoint = CONTACT_POINTS;
    delete normalized.address;
    delete normalized.geo;
    delete normalized.hasMap;
    delete normalized.openingHours;
    delete normalized.openingHoursSpecification;
    delete normalized.paymentAccepted;
    delete normalized.priceRange;
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
  "@type": "Organization",
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

const schemaNodes = (html) => {
  const nodes = [];
  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed?.["@graph"])) nodes.push(...parsed["@graph"]);
      else nodes.push(parsed);
    } catch {
      // Invalid source schemas are replaced by the canonical graph below.
    }
  }
  return nodes;
};

const firstSchemaValue = (nodes, key) => {
  let result;
  const visit = (value) => {
    if (result !== undefined) return;
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    if (value[key] !== undefined) {
      result = value[key];
      return;
    }
    Object.values(value).forEach(visit);
  };
  nodes.forEach(visit);
  return result;
};

const subjectFor = (title) =>
  title.replace(/\s*[|—-]\s*Sean Dinwiddie(?:'s Webmastery)?\s*$/i, "");

const breadcrumbItems = (context) => {
  const home = { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` };
  if (context.route === "/") return [home];
  const parent = context.route.startsWith("/community/") && context.route !== "/community/"
    ? { name: "Technical Archive", item: `${ORIGIN}/community/` }
    : context.route.startsWith("/blog/") && context.route !== "/blog/"
      ? { name: "Agency Notes", item: `${ORIGIN}/blog/` }
      : context.route.startsWith("/local/") && context.route !== "/local/"
        ? { name: "Service Areas", item: `${ORIGIN}/local/` }
        : null;
  const items = [home];
  if (parent) items.push({ "@type": "ListItem", position: 2, ...parent });
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: subjectFor(context.title),
    item: context.canonical,
  });
  return items;
};

const consolidateSchema = (html, context) => {
  if (context.route === "/404.html") return html;
  const existing = schemaNodes(html);
  const aggregateRating = firstSchemaValue(existing, "aggregateRating");
  const reviewed = metadataForRoute(context.route);
  const datePublished = reviewed.published || firstSchemaValue(existing, "datePublished");
  const dateModified = reviewed.modified || firstSchemaValue(existing, "dateModified");
  const image = socialImageForRoute(context.route);
  const serviceTypes = serviceTypesForRoute(context.route);
  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: `${ORIGIN}/`,
    email: CONTACT_EMAIL,
    description:
      "Independent web design, development, local SEO, and business automation agency serving Klamath Falls, Oregon, and Redding, California.",
    logo: {
      "@type": "ImageObject",
      url: `${ORIGIN}/assets/social/agency.png`,
      width: 1200,
      height: 630,
    },
    areaServed: SERVICE_AREAS,
    contactPoint: CONTACT_POINTS,
    ...(aggregateRating ? { aggregateRating } : {}),
  };
  const webPage = {
    "@type": context.isCollection ? "CollectionPage" : "WebPage",
    "@id": `${context.canonical}#webpage`,
    url: context.canonical,
    name: context.title,
    description: context.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    primaryImageOfPage: { "@id": `${context.canonical}#primaryimage` },
    breadcrumb: { "@id": `${context.canonical}#breadcrumb` },
    inLanguage: "en-US",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
  const graph = [
    organization,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${ORIGIN}/`,
      name: SITE_NAME,
      publisher: { "@id": organizationId },
      inLanguage: "en-US",
    },
    {
      "@type": "ImageObject",
      "@id": `${context.canonical}#primaryimage`,
      url: image.url,
      contentUrl: image.url,
      width: image.width,
      height: image.height,
      caption: image.alt,
      inLanguage: "en-US",
    },
    webPage,
    {
      "@type": "BreadcrumbList",
      "@id": `${context.canonical}#breadcrumb`,
      itemListElement: breadcrumbItems(context),
    },
  ];
  if (serviceTypes) {
    graph.push({
      "@type": "Service",
      "@id": `${context.canonical}#service`,
      name: subjectFor(context.title),
      url: context.canonical,
      serviceType: serviceTypes,
      provider: { "@id": organizationId },
      areaServed: serviceAreasForRoute(context.route),
    });
  }
  if (context.isArticle) {
    graph.push({
      "@type": "Article",
      "@id": `${context.canonical}#article`,
      headline: subjectFor(context.title),
      description: context.description,
      mainEntityOfPage: { "@id": `${context.canonical}#webpage` },
      image: { "@id": `${context.canonical}#primaryimage` },
      author: { "@type": "Person", name: "Sean Dinwiddie" },
      publisher: { "@id": organizationId },
      inLanguage: "en-US",
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
    });
  }
  const cleaned = html.replace(
    /\s*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
    "\n",
  );
  const schema = { "@context": "https://schema.org", "@graph": graph };
  return cleaned.replace(
    /<\/head>/i,
    `\n<script type="application/ld+json" data-agency-schema>${JSON.stringify(schema)}</script>\n</head>`,
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
  html
    .replace(
      /<a\b[^>]*href=["'][^"']*#respond["'][^>]*>[\s\S]*?<\/a>/gi,
      '<a href="/contact/">Contact Sean about this article</a>',
    )
    .replace(
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

const removeLegacyRuntime = (html) =>
  html
    .replace(
      /\s*<!-- Google AdSense snippet added by Site Kit -->[\s\S]*?<!-- End Google AdSense snippet added by Site Kit -->\s*/gi,
      "\n",
    )
    .replace(/\s*<!-- Google tag \(gtag\.js\) -->\s*/gi, "\n")
    .replace(
      /\s*<script\b[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-4CWP5L8TMC["'][^>]*><\/script>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<script\b[^>]*>[\s\S]*?gtag\(["']config["']\s*,\s*["']G-4CWP5L8TMC["'][\s\S]*?<\/script>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<!-- Conversion Tracking Code -->\s*<script>[\s\S]*?initializeContactPageTracking[\s\S]*?<\/script>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<script\b[^>]*id=["'](?:visualcomposerstarter-script-js-extra|material-front-end-js-js-extra)["'][^>]*>[\s\S]*?<\/script>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<script\b[^>]*src=["'][^"']*comment-reply(?:\.min)?\.js[^"']*["'][^>]*><\/script>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<script\b[^>]*src=["'][^"']*\/visualcomposer-assets\/addons\/pluginVersionCheck\/[^"']*["'][^>]*><\/script>\s*/gi,
      "\n",
    )
    .replace(
      /\s*<div\b[^>]*style=["'][^"']*display\s*:\s*none[^"']*["'][^>]*>\s*<img\b[^>]*forms\.aweber\.com\/form\/displays\.htm[^>]*>\s*<\/div>\s*/gi,
      "\n",
    );

const normalizeAweberDisclosure = (html) => {
  html = html.replace(
    /\s*<p\b[^>]*class=["']aweber-data-notice["'][^>]*>[\s\S]*?<\/p>\s*/gi,
    "\n",
  );
  return html.replace(
    /(<form\b[^>]*action=["']https:\/\/www\.aweber\.com\/scripts\/addlead\.pl["'][^>]*>)/gi,
    '<p class="aweber-data-notice" id="aweber-data-notice">Submitting this form sends the name, email address, and form details you enter to AWeber. See the <a href="/privacy/">privacy policy</a>.</p>\n$1',
  );
};

const ensureSharedAssets = (html) => {
  html = html
    .replace(/\s*<link\b[^>]*href=["']\/assets\/agency-static\.css["'][^>]*>\s*/gi, "\n")
    .replace(/\s*<script\b[^>]*src=["']\/assets\/privacy-controls\.js["'][^>]*><\/script>\s*/gi, "\n");
  return html.replace(
    /<\/head>/i,
    '\n<link rel="stylesheet" href="/assets/agency-static.css">\n<script defer src="/assets/privacy-controls.js"></script>\n</head>',
  );
};

const currentPageAttribute = (route, prefix, exact = false) =>
  route === prefix || (!exact && prefix !== "/" && route.startsWith(prefix))
    ? ' aria-current="page"'
    : "";

const sharedShell = (route) => `
<a class="agency-skip-link" href="#main-content">Skip to content</a>
<header class="agency-shell">
  <nav class="agency-shell__inner" aria-label="Agency navigation">
    <a class="agency-shell__brand" href="/"${currentPageAttribute(route, "/")}>Sean Dinwiddie's Webmastery</a>
    <ul>
      <li><a href="/service/"${currentPageAttribute(route, "/service/")}>Services</a></li>
      <li><a href="/local/"${currentPageAttribute(route, "/local/", true)}>Locations</a></li>
      <li><a href="/local/oregon/klamath-falls/"${currentPageAttribute(route, "/local/oregon/klamath-falls/")}>Klamath Falls</a></li>
      <li><a href="/local/california/redding/"${currentPageAttribute(route, "/local/california/redding/")}>Redding</a></li>
      <li><a href="/community/"${currentPageAttribute(route, "/community/")}>Technical archive</a></li>
      <li><a href="/contact/"${currentPageAttribute(route, "/contact/")}>Contact</a></li>
    </ul>
  </nav>
</header>`;

const normalizeSharedShell = (html, context) => {
  html = html
    .replace(/\s*<a\b[^>]*class=["'][^"']*(?:agency-skip-link|skip-link)[^"']*["'][^>]*>\s*Skip to content\s*<\/a>\s*/gi, "\n")
    .replace(/\s*<header class=["']agency-shell["']>[\s\S]*?<\/header>\s*/gi, "\n")
    .replace(/<main\b([^>]*)>/i, (_, attributes) => {
      const normalizedAttributes = attributes
        .replace(/\s+id=["'][^"']*["']/i, "")
        .replace(/\s+tabindex=["'][^"']*["']/i, "");
      return `<main id="main-content" tabindex="-1"${normalizedAttributes}>`;
    });
  if (context.route.startsWith("/community/")) {
    html = html.replace(/<body\b([^>]*)>/i, (source, attributes) => {
      if (/\bagency-archive\b/.test(attributes)) return source;
      if (/\bclass=["']/.test(attributes)) {
        return source.replace(/class=["']([^"']*)["']/i, 'class="$1 agency-archive"');
      }
      return `<body${attributes} class="agency-archive">`;
    });
  }
  return html.replace(/<body\b[^>]*>/i, (body) => `${body}${sharedShell(context.route)}`);
};

const normalizeCommunityContext = (html, context) => {
  if (!context.route.startsWith("/community/")) return html;
  html = html
    .replace(
      /(<div\b[^>]*class=["'][^"']*site-tagline[^"']*["'][^>]*>)\s*Software Development\s*(<\/div>)/gi,
      "$1Agency Technical Archive$2",
    )
    .replace(/\s*<aside class=["']agency-archive-context["']>[\s\S]*?<\/aside>\s*/gi, "\n");
  return html.replace(
    /(<main\b[^>]*>)/i,
    '$1\n<aside class="agency-archive-context"><strong>Agency technical archive.</strong> These Redux, BDD, user-story, and functional-reactive-programming articles remain part of the agency site. <a href="/service/">View agency services</a> or <a href="/contact/">contact Sean</a>.</aside>',
  );
};

const normalizePrimaryHeading = (html, context) => {
  const opening = html.match(/<main\b[^>]*>/i);
  if (!opening || opening.index === undefined) return html;
  const start = opening.index;
  const contentStart = start + opening[0].length;
  const closingIndex = html.indexOf("</main>", contentStart);
  if (closingIndex < 0) return html;
  const before = html
    .slice(0, start)
    .replace(/<h1(\b[^>]*)>/gi, "<p$1>")
    .replace(/<\/h1>/gi, "</p>");
  const after = html
    .slice(closingIndex + 7)
    .replace(/<h1(\b[^>]*)>/gi, "<p$1>")
    .replace(/<\/h1>/gi, "</p>");
  let main = html.slice(start, closingIndex + 7);
  if (context.isCollection) {
    main = main
      .replace(/\s*<h[12]\b[^>]*class=["'][^"']*visually-hidden[^"']*["'][^>]*>[\s\S]*?<\/h[12]>\s*/gi, "\n")
      .replace(/<h1(\b[^>]*)>/gi, "<h2$1>")
      .replace(/<\/h1>/gi, "</h2>")
      .replace(
        /(<main\b[^>]*>)/i,
        `$1\n<h1 class="visually-hidden">${escapeAttribute(subjectFor(context.title))}</h1>`,
      );
    return `${before}${main}${after}`;
  }
  const headings = [...main.matchAll(/<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h\1>/gi)];
  if (headings.length === 0) {
    main = main.replace(
      /(<main\b[^>]*>)/i,
      `$1\n<h1 class="visually-hidden">${escapeAttribute(subjectFor(context.title))}</h1>`,
    );
  } else {
    let position = 0;
    main = main.replace(
      /<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h\1>/gi,
      (source, level, attributes, content) => {
        position += 1;
        if (position === 1) return `<h1${attributes}>${content}</h1>`;
        return level === "1" ? `<h2${attributes}>${content}</h2>` : source;
      },
    );
  }
  return `${before}${main}${after}`;
};

const imageDimensions = (source) => {
  try {
    const url = new URL(source, `${ORIGIN}/`);
    if (url.hostname !== new URL(ORIGIN).hostname) return null;
    const path = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const file = resolve(ROOT, path);
    if (!file.startsWith(ROOT) || !existsSync(file)) return null;
    const data = readFileSync(file);
    if (data.subarray(1, 4).toString() === "PNG") {
      return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
    }
    if (data.subarray(0, 3).toString() === "GIF") {
      return { width: data.readUInt16LE(6), height: data.readUInt16LE(8) };
    }
    if (data[0] === 0xff && data[1] === 0xd8) {
      let offset = 2;
      while (offset + 9 < data.length) {
        if (data[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = data[offset + 1];
        if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
          return { height: data.readUInt16BE(offset + 5), width: data.readUInt16BE(offset + 7) };
        }
        const length = data.readUInt16BE(offset + 2);
        if (length < 2) break;
        offset += length + 2;
      }
    }
    if (path.endsWith(".svg")) {
      const svg = data.toString("utf8");
      const width = Number(svg.match(/\bwidth=["']([\d.]+)/i)?.[1]);
      const height = Number(svg.match(/\bheight=["']([\d.]+)/i)?.[1]);
      if (width > 0 && height > 0) return { width, height };
      const viewBox = svg.match(/\bviewBox=["'][^"']*?([\d.]+)\s+([\d.]+)["']/i);
      if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
    }
  } catch {
    return null;
  }
  return null;
};

const normalizeImages = (html) =>
  html.replace(/<img\b([^>]*)>/gi, (source, attributes) => {
    let next = attributes;
    if (!/\balt=["']/i.test(next)) {
      const sourceValue = next.match(/\bsrc=["']([^"']+)/i)?.[1] || "";
      const meaningful = /custom-logo|sean-dinwiddie\.(?:jpe?g|png)/i.test(`${next} ${sourceValue}`);
      next += ` alt="${meaningful ? "Sean Dinwiddie" : ""}"`;
    }
    const sourceValue = next.match(/\bsrc=["']([^"']+)/i)?.[1];
    if (sourceValue && (!/\bwidth=["']/i.test(next) || !/\bheight=["']/i.test(next))) {
      const dimensions = imageDimensions(sourceValue.replaceAll("&amp;", "&"));
      if (dimensions) {
        if (!/\bwidth=["']/i.test(next)) next += ` width="${dimensions.width}"`;
        if (!/\bheight=["']/i.test(next)) next += ` height="${dimensions.height}"`;
      }
    }
    if (!/\bdecoding=["']/i.test(next)) next += ' decoding="async"';
    return `<img${next}>`;
  });

const accessibleLabelForUrl = (value) => {
  try {
    const path = new URL(value, `${ORIGIN}/`).pathname;
    const slug = path.split("/").filter(Boolean).at(-1) || "home";
    return `Open ${slug.replace(/[-_]+/g, " ")}`;
  } catch {
    return "Open related page";
  }
};

const normalizeControls = (html) =>
  html
    .replace(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi, (source, attributes, content) => {
      const visibleText = textOnly(content);
      const iconOnly = /^(?:menu|close|search|dark_mode)$/i.test(visibleText);
      if (/\baria-label=["']|\baria-labelledby=["']/i.test(attributes) || (visibleText && !iconOnly)) return source;
      const label = /close/i.test(attributes)
        ? "Close navigation menu"
        : /menu|navigation|drawer/i.test(attributes)
          ? "Open navigation menu"
          : /search/i.test(attributes)
            ? "Search"
            : "Activate control";
      return `<button${attributes} aria-label="${label}">${content}</button>`;
    })
    .replace(
      /<a\b([^>]*class=["'][^"']*vce-post-slider-block-item-link[^"']*["'][^>]*)><\/a>/gi,
      (source, attributes) => {
        if (/\baria-label=["']/i.test(attributes)) return source;
        const href = attributes.match(/\bhref=["']([^"']+)/i)?.[1] || "/";
        return `<a${attributes} aria-label="${escapeAttribute(accessibleLabelForUrl(href))}"></a>`;
      },
    )
    .replace(/<a\b([^>]*)>\s*<\/a>/gi, (source, attributes) => {
      if (/\baria-label=["'][^"']+/i.test(attributes)) return source;
      const href = attributes.match(/\bhref=["']([^"']+)/i)?.[1];
      if (!href) return source;
      const label = href.startsWith("mailto:")
        ? "Email Sean Dinwiddie"
        : href.startsWith("tel:")
          ? "Call Sean Dinwiddie"
          : accessibleLabelForUrl(href);
      return `<a${attributes} aria-label="${escapeAttribute(label)}"></a>`;
    })
    .replace(
      /<i(\b[^>]*role=["']button["'][^>]*)(>\s*search\s*<\/i>)/gi,
      (source, attributes, rest) =>
        /\baria-label=["']/i.test(attributes) ? source : `<i${attributes} aria-label="Search"${rest}`,
    );

const normalizeExternalEmbeds = (html) => {
  html = html.replace(/data-external-src="([^"]+)"/gi, (_, value) =>
    `data-external-src="${escapeAttribute(decodeEntities(decodeEntities(value)))}"`,
  );
  return html.replace(/<iframe\b([^>]*)>([\s\S]*?)<\/iframe>/gi, (source, attributes, content) => {
    const sourceUrl = attributes.match(/(?:^|\s)src=["']((?:https?:)?\/\/[^"']+)["']/i)?.[1];
    if (!sourceUrl) return source;
    let host;
    try {
      host = new URL(sourceUrl.replaceAll("&amp;", "&"), `${ORIGIN}/`).hostname;
    } catch {
      return source;
    }
    if (host === new URL(ORIGIN).hostname) return source;
    const provider = host.includes("youtube")
      ? "YouTube"
      : host.includes("vimeo")
        ? "Vimeo"
        : host.includes("smblogin")
          ? "the external store"
          : host;
    const nextAttributes = attributes
      .replace(/\s+src=["'][^"']+["']/i, ` data-external-src="${escapeAttribute(decodeEntities(sourceUrl))}"`)
      .replace(/\s+title=["'][^"']*["']/i, "")
      .replace(/\s+loading=["'][^"']*["']/i, "");
    return `<div class="external-embed" data-provider="${escapeAttribute(provider)}"><div><p>This content is provided by ${escapeAttribute(provider)}.</p><button type="button" data-load-external-embed>Load external content</button></div><iframe${nextAttributes} title="External content from ${escapeAttribute(provider)}" loading="lazy">${content}</iframe></div>`;
  });
};

const removeDraftAndLegacyPrivacyText = (html, context) => {
  html = html.replace(/<span\b[^>]*style=["'][^"']*display\s*:\s*none[^"']*["'][^>]*>[\s\S]*?<\/span>/gi, "");
  if (context.route === "/service/training/") {
    html = html.replace(/(<h1\b[^>]*>)\s*Training[\s\S]*?<\/h1>/i, "$1Training</h1>");
  }
  if (context.route !== "/privacy/") return html;
  return html.replace(
    /<ul>\s*<li>Before or at the time of collecting personal information[\s\S]*?<\/ul>\s*<p>We are committed to conducting our business[\s\S]*?<\/p>/i,
    "",
  );
};

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

const relativizeSameOriginAttributes = (html) =>
  html
    .replace(
      /\b(href|src|action|poster|data-external-src)=(["'])https?:\/\/(?:www\.)?seandinwiddie\.com([^"']*)\2/gi,
      (_source, attribute, quote, suffix) => {
        const path = suffix || "/";
        const relativePath = path.startsWith("/") ? path : `/${path}`;
        return `${attribute}=${quote}${relativePath}${quote}`;
      },
    )
    .replace(/\bsrcset=(["'])([^"']*)\1/gi, (_source, quote, value) =>
      `srcset=${quote}${value.replace(/https?:\/\/(?:www\.)?seandinwiddie\.com(?=\/)/gi, "")}${quote}`,
    );

const normalizeMetadata = (html, context) => {
  if (context.route === "/404.html") return html;
  html = html.replace(
    /\s*<meta\s+[^>]*name=["']twitter:(?:label|data)\d+["'][^>]*>\s*/gi,
    "\n",
  );
  if (!context.isArticle) {
    html = html.replace(
      /\s*<meta\s+[^>]*property=["']article:(?:published|modified)_time["'][^>]*>\s*/gi,
      "\n",
    );
  }
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(context.title)}</title>`);
  html = setMetaName(html, "description", context.description);
  html = setCanonical(html, context.canonical);
  html = setMetaProperty(html, "og:type", context.isArticle ? "article" : "website");
  html = setMetaProperty(html, "og:title", context.title);
  html = setMetaProperty(html, "og:description", context.description);
  html = setMetaProperty(html, "og:url", context.canonical);
  html = setMetaProperty(html, "og:site_name", SITE_NAME);
  const socialImage = socialImageForRoute(context.route);
  html = setMetaProperty(html, "og:image", socialImage.url);
  html = setMetaProperty(html, "og:image:width", String(socialImage.width));
  html = setMetaProperty(html, "og:image:height", String(socialImage.height));
  html = setMetaProperty(html, "og:image:type", socialImage.type);
  html = setMetaProperty(html, "og:image:alt", socialImage.alt);
  html = setMetaName(html, "twitter:card", "summary_large_image");
  html = setMetaName(html, "twitter:title", context.title);
  html = setMetaName(html, "twitter:description", context.description);
  html = setMetaName(html, "twitter:image", socialImage.url);
  html = setMetaName(html, "twitter:image:alt", socialImage.alt);
  return html;
};

const normalizeFile = (file) => {
  const route = routeFor(file);
  let html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) return false;

  html = normalizeLinksAndIdentity(html);
  html = relativizeSameOriginAttributes(html);
  html = removeLegacyRuntime(html);
  html = normalizeAweberDisclosure(html);
  html = removeObsoleteDiscovery(html);
  html = normalizeValidity(html);
  html = closeUnbalancedArticleDivs(html);
  html = normalizeSearchForms(html);
  html = normalizeDeadCommentForms(html);
  html = normalizeLandmarks(html);
  html = normalizeDuplicateSiteTitle(html);
  html = normalizeUtilityHeadings(html);
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
    isCollection:
      ["/blog/", "/community/"].includes(route) ||
      /(?:\/page\/|\/author\/|\/category\/)/.test(route),
  });

  html = removeDraftAndLegacyPrivacyText(html, context);
  html = normalizeCommunityContext(html, context);
  html = normalizeSharedShell(html, context);
  html = normalizePrimaryHeading(html, context);
  html = normalizeHeadingOrder(html);
  html = normalizeControls(html);
  html = normalizeImages(html);
  html = normalizeExternalEmbeds(html);
  html = ensureSharedAssets(html);
  html = normalizeMetadata(html, context);
  html = consolidateSchema(html, context);
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
