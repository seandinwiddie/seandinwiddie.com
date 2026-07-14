#!/usr/bin/env node

/** Dependency-free structural checks for the static export. */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { serviceTypesForRoute } from "./site-config.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const ORIGIN = "https://seandinwiddie.com";
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const ALLOWED_PHONE_DIGITS = new Set(["5306383238", "15306383238"]);
const ALLOWED_RUNTIME_HOSTS = new Set([
  "seandinwiddie.com",
  "www.googletagmanager.com",
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "sean-dinwiddie.smblogin.com",
  "forms.aweber.com",
]);
const ALLOWED_FORM_HOSTS = new Set([
  "seandinwiddie.com",
  "www.aweber.com",
  "www.google.com",
]);
const failures = [];
let ratingNodes = 0;
let googleSearchForms = 0;
const indexableCanonicals = new Set();
const declaredDates = new Map();
const fragmentTargetCache = new Map();

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules", "scripts", "wp-content", "wp-includes", "wp-json", "_site"].includes(entry.name)) return [];
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory()
      ? walk(absolute)
      : entry.name.endsWith(".html")
        ? [absolute]
        : [];
  });

const routeFor = (file) => relative(ROOT, file).split(sep).join("/");
const publicRouteFor = (name) => {
  if (name === "index.html") return "/";
  if (name === "404.html") return "/404.html";
  return `/${name.replace(/index\.html$/, "")}`;
};
const fileForPathname = (pathname) => {
  const decoded = decodeURI(pathname).replace(/^\/+/, "");
  if (!decoded) return resolve(ROOT, "index.html");
  return /\.[a-z0-9]+$/i.test(decoded)
    ? resolve(ROOT, decoded)
    : resolve(ROOT, decoded, "index.html");
};
const fragmentTargetsFor = (file) => {
  if (fragmentTargetCache.has(file)) return fragmentTargetCache.get(file);
  const source = readFileSync(file, "utf8");
  const targets = new Set(
    [...source.matchAll(/\b(?:id|name)=["']([^"']+)["']/gi)].map((match) => match[1]),
  );
  fragmentTargetCache.set(file, targets);
  return targets;
};
const count = (html, pattern) => [...html.matchAll(pattern)].length;
const assertAllowedPhone = (name, value) => {
  const digits = value.replace(/\D/g, "");
  if (digits && !ALLOWED_PHONE_DIGITS.has(digits)) {
    failures.push(`${name}: unexpected public phone number ${value}`);
  }
};
const assertAllowedHost = (name, value, allowlist, kind) => {
  try {
    const host = new URL(value, `${ORIGIN}/`).hostname;
    if (!allowlist.has(host)) {
      failures.push(`${name}: unexpected ${kind} host ${host}`);
    }
  } catch {
    failures.push(`${name}: invalid ${kind} URL ${value}`);
  }
};

for (const file of walk(ROOT)) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) continue;
  const name = routeFor(file);
  const publicRoute = publicRouteFor(name);
  if (name === "pinterest-9af13.html") continue;
  const noindex = /<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  if (!noindex && name !== "404.html") {
    if (count(html, /<title\b/gi) !== 1) failures.push(`${name}: expected one title`);
    if (count(html, /<link\s+[^>]*rel=["']canonical["']/gi) !== 1) failures.push(`${name}: expected one canonical`);
    if (count(html, /<meta\s+[^>]*name=["']description["']/gi) !== 1) failures.push(`${name}: expected one description`);
    const description = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content="([^"]*)/i)?.[1] || "";
    if (description.length < 50 || description.length > 170 || /&(?:amp;)?nbsp;|Privacy PolicyYour/i.test(description)) {
      failures.push(`${name}: description is not reviewed, readable metadata`);
    }
    for (const pattern of [
      /<meta\s+[^>]*property=["']og:image:alt["'][^>]*content=["'][^"']+["']/i,
      /<meta\s+[^>]*name=["']twitter:image:alt["'][^>]*content=["'][^"']+["']/i,
    ]) {
      if (!pattern.test(html)) failures.push(`${name}: social image is missing alternative text`);
    }
    if (!/\/assets\/social\/(?:agency|local|services|technical-archive)\.png/i.test(html)) {
      failures.push(`${name}: social image is not a branded 1200 x 630 variant`);
    }
    const canonicalTag = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
    const canonical = canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (canonical) indexableCanonicals.add(decodeURI(canonical));
  }
  if (count(html, /<h1\b/gi) !== 1) failures.push(`${name}: expected one h1`);
  if (!/<main\b/i.test(html)) failures.push(`${name}: missing main landmark`);
  if (/sdin\.dev|logo-61192|wp-json|xmlrpc\.php|SearchAction|CommentAction|google-adsense|googlesyndication|adsbygoogle/i.test(html)) {
    failures.push(`${name}: contains a retired cross-site, advertising, or WordPress reference`);
  }
  const bodyHtml = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
  if (/\b(?:href|src|action|poster|data-external-src|srcset)=["'][^"']*https?:\/\/(?:www\.)?seandinwiddie\.com/i.test(bodyHtml)) {
    failures.push(`${name}: same-origin body URLs must be root-relative for portable previews`);
  }
  if (
    /rel=["'](?:shortlink|wlwmanifest)["']|<meta[^>]*name=["']generator["']|wp-comments-post\.php/i.test(
      html,
    )
  ) {
    failures.push(`${name}: contains obsolete WordPress discovery or form markup`);
  }
  if (/(?:\+?1[- .]?)?541[- .)]*488[- .]*4653|tel:\+15414884653/i.test(html)) {
    failures.push(`${name}: contains the retired 541 phone number`);
  }
  for (const match of html.matchAll(/tel:([^"'?#\s>]+)/gi)) {
    assertAllowedPhone(name, match[1]);
  }
  for (const match of html.matchAll(/["']telephone["']\s*:\s*["']([^"']+)["']/gi)) {
    assertAllowedPhone(name, match[1]);
  }
  for (const match of html.matchAll(/(?:\+?1[ .-]+)?\(?\d{3}\)?[ .-]+\d{3}[ .-]+\d{4}/g)) {
    assertAllowedPhone(name, match[0]);
  }
  if (
    /fonts\.(?:googleapis|gstatic)\.com|images\.unsplash\.com|https?:\/\/(?:sdin\.dev|c0\.wp\.com|(?:test|cdn)\.simplecss\.org|2\.gravatar\.com)/i.test(
      html,
    )
  ) {
    failures.push(`${name}: contains a retired external runtime dependency`);
  }

  for (const match of html.matchAll(/<(script|img|iframe|source|video|audio|link)\b([^>]*)>/gi)) {
    const tag = match[1].toLowerCase();
    const attributes = match[2];
    if (tag === "link") {
      const rel = attributes.match(/\brel=["']([^"']+)["']/i)?.[1] || "";
      if (!/(?:stylesheet|icon|preload|modulepreload|manifest)/i.test(rel)) continue;
    }
    const attribute = tag === "link" ? "href" : "src";
    const value = attributes.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"))?.[1];
    if (value && /^(?:https?:)?\/\//i.test(value)) {
      assertAllowedHost(name, value, ALLOWED_RUNTIME_HOSTS, "runtime asset");
    }
    const srcset = attributes.match(/\bsrcset=["']([^"']+)["']/i)?.[1];
    if (srcset) {
      for (const candidate of srcset.split(",")) {
        const url = candidate.trim().split(/\s+/)[0];
        if (/^(?:https?:)?\/\//i.test(url)) {
          assertAllowedHost(name, url, ALLOWED_RUNTIME_HOSTS, "runtime asset");
        }
      }
    }
  }
  for (const match of html.matchAll(/url\(\s*["']?(https?:\/\/[^"')\s]+)/gi)) {
    assertAllowedHost(name, match[1], ALLOWED_RUNTIME_HOSTS, "CSS asset");
  }
  for (const match of html.matchAll(/<form\b[^>]*\baction=["']([^"']+)["']/gi)) {
    assertAllowedHost(name, match[1], ALLOWED_FORM_HOSTS, "form action");
  }

  for (const match of html.matchAll(/<form\b[^>]*action=["']https:\/\/www\.google\.com\/search["'][^>]*>[\s\S]*?<\/form>/gi)) {
    googleSearchForms += 1;
    if (!/\bname=["']q["']/i.test(match[0])) {
      failures.push(`${name}: Google site-search form has no q input`);
    }
  }

  const schemas = [];
  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const schema = JSON.parse(match[1]);
      schemas.push(schema);
      const inspect = (value) => {
        if (Array.isArray(value)) return value.forEach(inspect);
        if (!value || typeof value !== "object") return;
        if (value.aggregateRating) {
          ratingNodes += 1;
          if (
            value.aggregateRating.ratingValue !== "5.0" ||
            value.aggregateRating.reviewCount !== "25"
          ) {
            failures.push(`${name}: review rating values changed`);
          }
        }
        Object.values(value).forEach(inspect);
      };
      inspect(schema);
    } catch {
      failures.push(`${name}: invalid JSON-LD`);
    }
  }

  if (name !== "404.html" && schemas.length !== 1) {
    failures.push(`${name}: expected one consolidated JSON-LD graph; found ${schemas.length}`);
  }
  const flattened = schemas.flatMap((schema) =>
    Array.isArray(schema?.["@graph"]) ? schema["@graph"] : [schema],
  );
  const organizations = flattened.filter(
    (node) =>
      node?.["@id"] === ORGANIZATION_ID &&
      [node?.["@type"]].flat().includes("Organization"),
  );
  if (name !== "404.html" && organizations.length !== 1) {
    failures.push(`${name}: expected one truthful Organization definition`);
  }
  const forbiddenTypes = new Set([
    "LocalBusiness",
    "ProfessionalService",
    "PostalAddress",
    "GeoCoordinates",
  ]);
  const inspectForbiddenSchema = (value) => {
    if (Array.isArray(value)) return value.forEach(inspectForbiddenSchema);
    if (!value || typeof value !== "object") return;
    for (const type of [value["@type"]].flat().filter(Boolean)) {
      if (forbiddenTypes.has(type)) failures.push(`${name}: contains unverified schema type ${type}`);
    }
    for (const key of ["address", "geo", "hasMap"]) {
      if (key in value) failures.push(`${name}: contains unverified schema property ${key}`);
    }
    Object.values(value).forEach(inspectForbiddenSchema);
  };
  schemas.forEach(inspectForbiddenSchema);
  const expectedServices = serviceTypesForRoute(publicRoute);
  const services = flattened.filter((node) =>
    [node?.["@type"]].flat().includes("Service"),
  );
  if (expectedServices && services.length !== 1) {
    failures.push(`${name}: expected one Service definition`);
  }
  if (!expectedServices && services.length > 0) {
    failures.push(`${name}: unexpected Service definition`);
  }
  const pageNode = flattened.find((node) =>
    [node?.["@type"]].flat().some((type) =>
      ["WebPage", "CollectionPage", "ProfilePage"].includes(type),
    ),
  );
  const declared = pageNode?.dateModified || pageNode?.datePublished;
  if (typeof declared === "string" && /^\d{4}-\d{2}-\d{2}/.test(declared)) {
    declaredDates.set(`${ORIGIN}${publicRoute}`, declared.slice(0, 10));
  }

  const definitions = new Set();
  const references = new Set();
  const inspectGraph = (value) => {
    if (Array.isArray(value)) return value.forEach(inspectGraph);
    if (!value || typeof value !== "object") return;
    if (typeof value["@id"] === "string") {
      const types = [value["@type"]].flat().filter(Boolean);
      if (types.length > 0) definitions.add(value["@id"]);
      else references.add(value["@id"]);
    }
    Object.values(value).forEach(inspectGraph);
  };
  schemas.forEach(inspectGraph);
  for (const reference of references) {
    if (reference.startsWith(`${ORIGIN}/`) && !definitions.has(reference)) {
      failures.push(`${name}: unresolved JSON-LD @id reference ${reference}`);
    }
  }
  if (references.has(ORGANIZATION_ID) && !definitions.has(ORGANIZATION_ID)) {
    failures.push(`${name}: missing graph-local organization definition`);
  }
  if (references.has(WEBSITE_ID) && !definitions.has(WEBSITE_ID)) {
    failures.push(`${name}: missing graph-local website definition`);
  }

  for (const match of html.matchAll(/href=["']\/(?!\/|#)([^"'?#]*)/gi)) {
    const target = decodeURIComponent(match[1]);
    if (!target) continue;
    const candidate = /\.[a-z0-9]+$/i.test(target)
      ? resolve(ROOT, target)
      : resolve(ROOT, target, "index.html");
    if (!existsSync(candidate)) failures.push(`${name}: missing internal route /${target}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.includes("#")) continue;
    try {
      const targetUrl = new URL(href, `${ORIGIN}${publicRoute}`);
      if (targetUrl.origin !== ORIGIN || !targetUrl.hash) continue;
      const fragment = decodeURIComponent(targetUrl.hash.slice(1));
      if (!fragment || fragment.startsWith(":~:text=")) continue;
      const targetFile = fileForPathname(targetUrl.pathname);
      if (existsSync(targetFile) && !fragmentTargetsFor(targetFile).has(fragment)) {
        failures.push(`${name}: missing fragment target ${targetUrl.pathname}#${fragment}`);
      }
    } catch {
      failures.push(`${name}: invalid internal fragment link ${href}`);
    }
  }

  for (const match of html.matchAll(/src=["']\/(?!\/)([^"'?#]+)[^"']*["']/gi)) {
    const target = decodeURIComponent(match[1]);
    if (!existsSync(resolve(ROOT, target))) failures.push(`${name}: missing local asset /${target}`);
  }
}

if (ratingNodes !== 5) {
  failures.push(`expected the five existing aggregate rating nodes; found ${ratingNodes}`);
}

if (googleSearchForms === 0) {
  failures.push("expected preserved community Google site-search forms");
}

for (const sitemap of [
  "sitemap_index.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "community-sitemap.xml",
]) {
  if (!existsSync(resolve(ROOT, sitemap))) failures.push(`${sitemap}: missing`);
}

const intendedSitemaps = new Set([
  "sitemap_index.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "community-sitemap.xml",
]);
const walkSitemapFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules", "_site"].includes(entry.name)) return [];
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) return walkSitemapFiles(absolute);
    return /sitemap.*\.xml$|.*-sitemap\.xml$/i.test(entry.name)
      ? [relative(ROOT, absolute).split(sep).join("/")]
      : [];
  });
for (const sitemap of walkSitemapFiles(ROOT)) {
  if (!intendedSitemaps.has(sitemap)) {
    failures.push(`${sitemap}: stale sitemap artifact`);
  }
}

const sitemapMembership = new Map();
const sitemapDates = new Map();
for (const sitemap of ["page-sitemap.xml", "post-sitemap.xml", "community-sitemap.xml"]) {
  if (!existsSync(resolve(ROOT, sitemap))) continue;
  const xml = readFileSync(resolve(ROOT, sitemap), "utf8");
  for (const match of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/gi)) {
    const url = decodeURI(match[1].replaceAll("&amp;", "&"));
    sitemapMembership.set(url, (sitemapMembership.get(url) || 0) + 1);
    sitemapDates.set(url, match[2]);
  }
}
for (const canonical of indexableCanonicals) {
  const membership = sitemapMembership.get(canonical) || 0;
  if (membership !== 1) {
    failures.push(`${canonical}: expected one sitemap membership; found ${membership}`);
  }
}
for (const [url, membership] of sitemapMembership) {
  if (!indexableCanonicals.has(url)) {
    failures.push(`${url}: sitemap URL is not an indexable canonical route`);
  }
  if (membership !== 1) {
    failures.push(`${url}: duplicated across generated sitemaps`);
  }
}
for (const [url, declared] of declaredDates) {
  if (sitemapDates.has(url) && sitemapDates.get(url) !== declared) {
    failures.push(`${url}: sitemap lastmod ${sitemapDates.get(url)} disagrees with schema date ${declared}`);
  }
}

for (const required of [
  "assets/privacy-controls.js",
  "assets/social/agency.png",
  "assets/social/local.png",
  "assets/social/services.png",
  "assets/social/technical-archive.png",
  "privacy/data-events.json",
]) {
  if (!existsSync(resolve(ROOT, required))) failures.push(`${required}: missing required generated asset`);
}

try {
  const manifest = JSON.parse(readFileSync(resolve(ROOT, "privacy/data-events.json"), "utf8"));
  const events = new Set(manifest.events?.map((event) => event.name));
  for (const event of [
    "page_view",
    "contact_page_view",
    "email_click",
    "phone_click",
    "privacy_preference",
    "aweber_form_submission",
    "external_embed_load",
  ]) {
    if (!events.has(event)) failures.push(`privacy/data-events.json: missing ${event}`);
  }
  const processors = new Set(manifest.processors?.map((processor) => processor.name));
  for (const processor of ["GitHub Pages", "Google Analytics 4", "AWeber"]) {
    if (!processors.has(processor)) failures.push(`privacy/data-events.json: missing ${processor}`);
  }
} catch {
  failures.push("privacy/data-events.json: invalid JSON manifest");
}

if (failures.length > 0) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Static-site checks passed.\n");
}
