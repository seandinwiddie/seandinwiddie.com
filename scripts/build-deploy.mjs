#!/usr/bin/env node

/** Build an explicit public artifact instead of publishing the repository root. */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, relative, resolve, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUTPUT = resolve(ROOT, "_site");
const PUBLIC_ENTRIES = Object.freeze([
  "404.html",
  "CNAME",
  "about",
  "assets",
  "automation",
  "blog",
  "community",
  "community-sitemap.xml",
  "contact",
  "design",
  "development",
  "favicon.ico",
  "google7e1b8911384e19a7.html",
  "index.html",
  "local",
  "main-sitemap.xsl",
  "marketing",
  "page-sitemap.xml",
  "pinterest-9af13.html",
  "post-sitemap.xml",
  "prices",
  "privacy",
  "resources",
  "robots.txt",
  "sean-dinwiddie.jpg",
  "sean-dinwiddie.png",
  "service",
  "sitemap",
  "sitemap_index.xml",
  "sms-terms.html",
  "store",
  "terms",
  "tools",
  "wp-content",
]);
const DENIED_NAMES = new Set([
  ".DS_Store",
  "Thumbs.db",
  "feed",
  "node_modules",
  "test-tracking.html",
  "todo.md",
  "wlwmanifest.xml",
  "wp-json",
]);
const DENIED_EXTENSIONS = [".code-workspace", ".sublime-workspace"];

const shouldCopy = (source) => {
  const name = basename(source);
  return !DENIED_NAMES.has(name) && !DENIED_EXTENSIONS.some((extension) => name.endsWith(extension));
};

rmSync(OUTPUT, { recursive: true, force: true });
mkdirSync(OUTPUT, { recursive: true });
for (const entry of PUBLIC_ENTRIES) {
  const source = resolve(ROOT, entry);
  if (!existsSync(source)) throw new Error(`Missing allowlisted deploy entry: ${entry}`);
  cpSync(source, resolve(OUTPUT, entry), {
    recursive: true,
    filter: shouldCopy,
  });
}
writeFileSync(resolve(OUTPUT, ".nojekyll"), "");

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });

const failures = [];
const files = walk(OUTPUT);

// Runtime assets should work on previews and alternate static hosts. Canonical
// identity stays absolute in HTML metadata, while legacy CSS becomes local.
for (const file of files.filter((candidate) => candidate.endsWith(".css"))) {
  const css = readFileSync(file, "utf8");
  const portableCss = css.replace(
    /https?:\/\/(?:www\.)?seandinwiddie\.com(?=\/)/gi,
    "",
  );
  if (portableCss !== css) writeFileSync(file, portableCss);
}

for (const file of files) {
  const path = relative(OUTPUT, file).split(sep).join("/");
  if (
    path.split("/").some((part) => DENIED_NAMES.has(part)) ||
    DENIED_EXTENSIONS.some((extension) => path.endsWith(extension)) ||
    /(?:^|\/)\.github(?:\/|$)|(?:^|\/)scripts(?:\/|$)|(?:^|\/)\.cursor(?:\/|$)/.test(path)
  ) {
    failures.push(`${path}: denied deployment artifact`);
  }
  if (!file.endsWith(".html")) continue;
  const html = readFileSync(file, "utf8");
  if (/wp-admin|wp-json|wlwmanifest|\.code-workspace|\.sublime-workspace|todo\.md/i.test(html)) {
    failures.push(`${path}: references a denied deployment artifact`);
  }
  for (const match of html.matchAll(/(?:href|src)=["']\/(?!\/|#)([^"'?#]+)/gi)) {
    const target = decodeURIComponent(match[1]);
    if (!target || /^(?:mailto|tel):/i.test(target)) continue;
    const direct = resolve(OUTPUT, target);
    const index = resolve(OUTPUT, target, "index.html");
    if (!existsSync(direct) && !existsSync(index)) {
      failures.push(`${path}: missing artifact target /${target}`);
    }
  }
}

for (const file of files.filter((candidate) => candidate.endsWith(".css"))) {
  if (/https?:\/\/(?:www\.)?seandinwiddie\.com(?=\/)/i.test(readFileSync(file, "utf8"))) {
    failures.push(`${relative(OUTPUT, file)}: same-origin CSS URL is not portable`);
  }
}

if (failures.length > 0) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Built allowlisted deployment artifact with ${files.length} files.\n`);
}
