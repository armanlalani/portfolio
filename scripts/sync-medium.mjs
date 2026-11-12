#!/usr/bin/env node
// Adds new Medium posts to src/data/posts.json.
//
// Medium's RSS feed only lists the latest 10 posts, so posts.json is the
// permanent record: this script only ever ADDS posts it hasn't seen (matched
// by URL). It never changes or removes existing entries, so you can safely
// edit a summary, add a cover, or hide a post with "hidden": true.
//
// Run: yarn sync:medium
// Runs daily on GitHub Actions (.github/workflows/sync-medium.yml).
// No packages needed: plain Node 18+.

import { readFile, writeFile } from "node:fs/promises";

const FEED_URL = "https://medium.com/feed/@armanlalani5";
const POSTS_FILE = new URL("../src/data/posts.json", import.meta.url);
const SUMMARY_MAX = 200;

// ---------- tiny XML/HTML helpers (the feed format is simple and stable) ----------

const unCdata = (s = "") => s.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1").trim();

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? unCdata(m[1]) : "";
}

function tags(xml, name) {
  return [...xml.matchAll(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "g"))].map(
    (m) => unCdata(m[1])
  );
}

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

const stripTags = (html) =>
  decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?)])/g, "$1") // "framework ." -> "framework."
    .trim();

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

// First real paragraph of the post (skips headings, code and one-liners).
function summaryFrom(html) {
  for (const m of html.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = stripTags(m[1]);
    if (text.length >= 40) return truncate(text, SUMMARY_MAX);
  }
  return "";
}

const slugify = (title) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ---------- main ----------

const res = await fetch(FEED_URL, {
  headers: { "User-Agent": "Mozilla/5.0 (compatible; personal-site-feed-sync)" },
});
if (!res.ok) {
  console.error(`Could not fetch ${FEED_URL}: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
if (items.length === 0) {
  console.error("The Medium feed had no posts. Not touching posts.json.");
  process.exit(1);
}

const posts = JSON.parse(await readFile(POSTS_FILE, "utf8"));
const knownUrls = new Set(posts.map((p) => p.url).filter(Boolean));

const added = [];
for (const item of items) {
  const url = tag(item, "link").split("?")[0]; // drop Medium's ?source= tracking
  if (!url || knownUrls.has(url)) continue;

  const title = decodeEntities(tag(item, "title")).replace(/\s+/g, " ").trim();
  const post = {
    slug: slugify(title),
    type: "external",
    title,
    summary: summaryFrom(tag(item, "content:encoded")),
    date: new Date(tag(item, "pubDate")).toISOString().slice(0, 10),
    tags: tags(item, "category"),
    url,
    platform: "Medium",
  };
  posts.push(post);
  knownUrls.add(url);
  added.push(post);
}

if (added.length === 0) {
  console.log("No new Medium posts.");
  process.exit(0);
}

// Newest first; same-day posts keep their existing order.
posts.sort((a, b) => b.date.localeCompare(a.date));
await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2) + "\n");

console.log(`Added ${added.length} Medium post(s):`);
for (const p of added) {
  console.log(`  ${p.date}  ${p.title}${p.summary ? "" : "  (no summary found; add one by hand)"}`);
}
