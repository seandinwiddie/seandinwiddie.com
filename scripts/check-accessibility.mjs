#!/usr/bin/env node

/** Dependency-free accessibility invariants for the generated static pages. */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { relative, resolve, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const EXCLUDED = new Set([".git", "node_modules", "scripts", "wp-content", "wp-includes", "wp-json", "_site"]);
const failures = [];

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (EXCLUDED.has(entry.name)) return [];
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory()
      ? walk(absolute)
      : entry.name.endsWith(".html") && entry.name !== "pinterest-9af13.html"
        ? [absolute]
        : [];
  });

const count = (value, pattern) => [...value.matchAll(pattern)].length;
const text = (value) =>
  value
    .replace(/<(?:script|style|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|svg)>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

for (const file of walk(ROOT)) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) continue;
  const name = relative(ROOT, file).split(sep).join("/");
  if (count(html, /<main\b/gi) !== 1) failures.push(`${name}: expected one main landmark`);
  if (count(html, /<h1\b/gi) !== 1) failures.push(`${name}: expected one h1`);
  if (!/<a\b[^>]*class=["'][^"']*agency-skip-link[^"']*["'][^>]*href=["']#main-content["']/i.test(html)) {
    failures.push(`${name}: missing shared skip link`);
  }
  if (!/<main\b[^>]*\bid=["']main-content["'][^>]*\btabindex=["']-1["']/i.test(html)) {
    failures.push(`${name}: skip-link target must be programmatically focusable`);
  }
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  const firstHeading = main.match(/<h([1-6])\b/i)?.[1];
  if (firstHeading !== "1") failures.push(`${name}: first main heading is not h1`);
  let previous = 0;
  for (const match of main.matchAll(/<h([1-6])\b/gi)) {
    const level = Number(match[1]);
    if (previous && level > previous + 1) failures.push(`${name}: heading level jumps from h${previous} to h${level}`);
    previous = level;
  }
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attributes = match[1];
    if (!/\balt=["'][^"']*["']/i.test(attributes)) failures.push(`${name}: image missing alt`);
    const source = attributes.match(/\bsrc=["']([^"']+)/i)?.[1] || "";
    if (/^(?:https?:\/\/seandinwiddie\.com)?\//i.test(source)) {
      const path = source.replace(/^https?:\/\/seandinwiddie\.com/i, "").split(/[?#]/)[0];
      if (existsSync(resolve(ROOT, path.replace(/^\/+/, ""))) && (!/\bwidth=["']/i.test(attributes) || !/\bheight=["']/i.test(attributes))) {
        failures.push(`${name}: local image missing intrinsic dimensions (${source})`);
      }
    }
  }
  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attributes = match[1];
    const label = text(match[2]);
    if (!label && !/\baria-label=["'][^"']+|\baria-labelledby=["'][^"']+/i.test(attributes)) {
      failures.push(`${name}: button has no accessible name`);
    }
    if (/menu-trigger|sandwich-menu|navigation-icon/i.test(attributes) && !/\baria-label=["'][^"']+/i.test(attributes)) {
      failures.push(`${name}: navigation button needs an explicit label`);
    }
  }
  for (const match of html.matchAll(/<iframe\b([^>]*)>/gi)) {
    if (!/\btitle=["'][^"']+/i.test(match[1])) failures.push(`${name}: iframe missing title`);
    const source = match[1].match(/(?:^|\s)src=["']([^"']+)/i)?.[1];
    if (source && /^(?:https?:)?\/\//i.test(source) && !source.includes("seandinwiddie.com")) {
      failures.push(`${name}: external iframe loads without an explicit action`);
    }
  }
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    if (text(match[2])) continue;
    const imageAlt = match[2].match(/<img\b[^>]*alt=["']([^"']+)["']/i)?.[1];
    if (!imageAlt && !/\baria-label=["'][^"']+|\btitle=["'][^"']+/i.test(match[1])) {
      failures.push(`${name}: empty link has no accessible name`);
    }
  }
}

const sharedCss = readFileSync(resolve(ROOT, "assets/agency-static.css"), "utf8");
if (!/:focus-visible[\s\S]*outline:/i.test(sharedCss)) failures.push("assets/agency-static.css: missing visible focus treatment");
if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)/i.test(sharedCss)) failures.push("assets/agency-static.css: missing reduced-motion treatment");

if (failures.length > 0) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Accessibility invariants passed.\n");
}
