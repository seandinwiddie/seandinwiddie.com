#!/usr/bin/env node

/**
 * Capture full-page screenshots from the local static-site preview.
 *
 * Windows/WSL usage:
 *   node.exe scripts/capture-pages.mjs /marketing/ /automation/
 *   node.exe scripts/capture-pages.mjs --width=390 --height=844 /marketing/
 *   node.exe scripts/capture-pages.mjs --width=1920 --height=993 --viewport-only /automation/
 *
 * Environment overrides:
 *   PREVIEW_ORIGIN=http://127.0.0.1:8765
 *   CAPTURE_WIDTH=1366
 *   CAPTURE_HEIGHT=900
 *   CAPTURE_DIR=C:\\Users\\Sean Dinwiddie\\AppData\\Local\\Temp\\webmastery-review
 *   CHROME_PATH=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe
 */

import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const argumentsList = process.argv.slice(2);
const option = (name, fallback) =>
  argumentsList.find((argument) => argument.startsWith(`--${name}=`))?.split("=")[1] ||
  fallback;
const origin = option("origin", process.env.PREVIEW_ORIGIN || "http://127.0.0.1:8765");
const width = Number(option("width", process.env.CAPTURE_WIDTH || 1366));
const height = Number(option("height", process.env.CAPTURE_HEIGHT || 900));
const viewportOnly = argumentsList.includes("--viewport-only");
const outputDirectory =
  process.env.CAPTURE_DIR || join(tmpdir(), "webmastery-review");
const routes = argumentsList.filter((argument) => !argument.startsWith("--"));
const chromeCandidates = Object.freeze(
  [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean),
);

if (!routes.length) {
  throw new Error("Pass at least one route, such as /marketing/.");
}
if (!Number.isFinite(width) || !Number.isFinite(height)) {
  throw new Error("CAPTURE_WIDTH and CAPTURE_HEIGHT must be numbers.");
}

const chromePath = chromeCandidates.find(existsSync);
if (!chromePath) {
  throw new Error("Chrome/Chromium was not found. Set CHROME_PATH to its executable.");
}

const routeName = (route) =>
  (route === "/" ? "home" : route.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-")) ||
  "page";

const waitForFile = async (file, attempts = 100) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (existsSync(file)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for ${file}`);
};

const connect = async (url) => {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  const eventWaiters = new Map();

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const waiter = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
      return;
    }
    const waiters = eventWaiters.get(message.method) || [];
    eventWaiters.delete(message.method);
    waiters.forEach((resolve) => resolve(message.params));
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  const once = (event) =>
    new Promise((resolve) => {
      eventWaiters.set(event, [...(eventWaiters.get(event) || []), resolve]);
    });

  return Object.freeze({ once, send, socket });
};

mkdirSync(outputDirectory, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "webmastery-capture-"));
const browser = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let connection;
try {
  const activePort = join(profile, "DevToolsActivePort");
  await waitForFile(activePort);
  const port = Number(readFileSync(activePort, "utf8").split(/\r?\n/)[0]);
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  }).then((response) => response.json());

  connection = await connect(target.webSocketDebuggerUrl);
  await connection.send("Page.enable");
  await connection.send("Runtime.enable");
  await connection.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `try { localStorage.setItem("sd-agency-analytics-consent", "denied"); } catch {}`,
  });
  await connection.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 480,
  });

  for (const route of routes) {
    const loaded = connection.once("Page.loadEventFired");
    await connection.send("Page.navigate", { url: new URL(route, origin).href });
    await loaded;
    await connection.send("Runtime.evaluate", {
      expression: "document.fonts.ready",
      awaitPromise: true,
    });
    const { data } = await connection.send("Page.captureScreenshot", {
      captureBeyondViewport: !viewportOnly,
      fromSurface: true,
      format: "png",
    });
    const file = join(outputDirectory, `${routeName(route)}-${width}.png`);
    writeFileSync(file, Buffer.from(data, "base64"));
    console.log(file);
  }
} finally {
  try {
    connection?.socket.close();
  } catch {
    // Chrome may already have closed the target.
  }
  browser.kill();
  await delay(100);
  rmSync(profile, { recursive: true, force: true });
}
