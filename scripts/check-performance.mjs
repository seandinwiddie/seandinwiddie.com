#!/usr/bin/env node

/** Conservative budgets that prevent the legacy export from regaining dead weight. */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const EXCLUDED = new Set([".git", "node_modules", "scripts", "wp-content", "wp-includes", "wp-json", "_site"]);
const MAX_HTML_BYTES = 220_000;
const MAX_TOTAL_HTML_BYTES = 10_000_000;
const MAX_INLINE_STYLE_BYTES = 60_000;
const MAX_SCRIPTS_PER_PAGE = 19;
const failures = [];
let total = 0;

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

for (const file of walk(ROOT)) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) continue;
  const name = relative(ROOT, file).split(sep).join("/");
  const bytes = statSync(file).size;
  total += bytes;
  if (bytes > MAX_HTML_BYTES) failures.push(`${name}: ${bytes} HTML bytes exceeds ${MAX_HTML_BYTES}`);
  const inlineStyleBytes = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .reduce((sum, match) => sum + Buffer.byteLength(match[1]), 0);
  if (inlineStyleBytes > MAX_INLINE_STYLE_BYTES) {
    failures.push(`${name}: ${inlineStyleBytes} inline CSS bytes exceeds ${MAX_INLINE_STYLE_BYTES}`);
  }
  const scripts = [...html.matchAll(/<script\b/gi)].length;
  if (scripts > MAX_SCRIPTS_PER_PAGE) failures.push(`${name}: ${scripts} scripts exceeds ${MAX_SCRIPTS_PER_PAGE}`);
  if (/googletagmanager\.com\/gtag\/js|gtag\(["']config["']|wp-admin\/admin-ajax|forms\.aweber\.com\/form\/displays\.htm/i.test(html)) {
    failures.push(`${name}: immediate analytics or dead WordPress/AWeber runtime remains`);
  }
}

if (total > MAX_TOTAL_HTML_BYTES) failures.push(`HTML total ${total} exceeds ${MAX_TOTAL_HTML_BYTES}`);

if (failures.length > 0) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Performance budgets passed (${total} HTML bytes).\n`);
}
