// Turns src/data/posts.json into what the pages need.
//   getPosts()   all visible posts, newest first
//   getLatest()  the 10 newest, for the home page carousel
//
// posts.json is the source of truth (scripts/sync-medium.mjs adds Medium
// posts to it). Every entry is checked when the site builds, so a typo stops
// `npm run build` with a clear message instead of publishing a broken card.

import rawPosts from "../data/posts.json";
import { getDeckCover } from "./decks.js";

const LATEST_COUNT = 10;

const REQUIRED = {
  deck: ["slug", "title", "date", "slideCount"],
  article: ["slug", "title", "date", "readingMinutes"],
  external: ["title", "date", "url", "platform"],
};

function validate(post, i) {
  const where = `src/data/posts.json[${i}] "${post.title ?? "untitled"}"`;
  const required = REQUIRED[post.type];
  if (!required) throw new Error(`${where}: unknown type "${post.type}"`);
  const missing = required.filter((key) => post[key] === undefined || post[key] === "");
  if (missing.length) throw new Error(`${where}: missing ${missing.join(", ")}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) throw new Error(`${where}: date must be YYYY-MM-DD`);
}

// Where a card links to, and the small label on it
function cardInfo(post) {
  switch (post.type) {
    case "deck":
      return {
        href: `/writing/${post.slug}/`,
        label: `${post.slideCount} slides`,
        external: false,
        coverImage: getDeckCover(post.slug), // slide 1, made into WebP by Astro
      };
    case "article":
      return { href: `/writing/${post.slug}/`, label: `${post.readingMinutes} min read`, external: false };
    case "external":
      return { href: post.url, label: `On ${post.platform} ↗`, external: true };
  }
}

rawPosts.forEach(validate);

const posts = rawPosts
  .filter((post) => !post.hidden) // "hidden": true keeps a post off the site
  .toSorted((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({ ...post, ...cardInfo(post) }));

export const getPosts = () => posts;
export const getLatest = () => posts.slice(0, LATEST_COUNT);

// "2025-01-26" -> "26 Jan 2025"
export const readableDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
