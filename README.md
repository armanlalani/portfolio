# portfolio
My portfolio website. Readers get plain HTML, CSS and a little hand-written JavaScript.
No framework is sent to the browser. [Astro](https://astro.build/) builds the pages
from components when the site is deployed.

## Run it locally

```bash
corepack enable   # once per machine: makes the `yarn` command available
yarn install      # once, and after pulling dependency changes
yarn dev          # http://localhost:4321, reloads as you edit
```

The Yarn version is pinned in `package.json` (`packageManager`), so Corepack
gives you, Netlify and GitHub Actions the same one.

To stop the dev server, press Ctrl+C. If Astro started it in the background instead,
run `yarn astro dev stop`; `yarn astro dev status` shows whether one is running.

- `yarn build` writes the finished site to `dist/`.
- `yarn preview` serves that `dist/` folder, exactly as Netlify will.
- `yarn build:readable` writes the same site to `dist-readable/` without minifying:
  HTML keeps its line breaks, and each script is a separate, readable `.js` file in
  `dist-readable/_astro/`. For learning and debugging only; Netlify uses the normal build.

Uses Node 24 (from `.nvmrc`; run `nvm use` in this folder). Netlify and the GitHub Action
read the same file. Astro needs at least Node 22.23.4.

## Where things are

| Path | What it is |
|---|---|
| `src/pages/index.astro` | Home page (each file in `src/pages/` is one page) |
| `src/pages/writing/index.astro` | `/writing/`, all posts |
| `src/layouts/Base.astro` | Shared `<head>`, header and footer around every page |
| `src/components/` | Header, Footer, PostCard, LatestWriting (carousel), Contact |
| `src/scripts/` | Browser JavaScript: menu, carousel, copy email, footer year |
| `src/styles/` | All CSS |
| `src/data/site.js` | Site name, URLs, menu items, social links |
| `src/data/posts.json` | Every post (source of truth) |
| `src/lib/writing.js` | Checks `posts.json` and prepares it for the pages |
| `src/pages/writing/[slug].astro` | One page per slide deck: viewer, text version, sources |
| `src/components/DeckViewer.astro`, `src/scripts/deck.js` | The slide viewer |
| `src/data/decks/` | Each deck's slide text (alt text + text version) and sources |
| `src/assets/decks/<slug>/` | Each deck's slides as PNG (Astro makes the WebP versions) |
| `public/assets/` | Images and icons, copied to the site as-is |

### How an `.astro` file works

```astro
---
// 1. Runs at build time only (like a server component): imports, data, logic
import PostCard from "../components/PostCard.astro";
const posts = getLatest();
---

<!-- 2. HTML with {expressions}, like JSX. Becomes static HTML. -->
<ul>{posts.map((post) => <li><PostCard post={post} /></li>)}</ul>

<script>
  // 3. Runs in the browser. Plain JS, bundled and inlined by Astro.
  import { initCarousel } from "../scripts/carousel.js";
</script>
```

## Writing

All posts live in [`src/data/posts.json`](src/data/posts.json). The home page shows the
10 newest in a carousel, followed by a "See all writing" card that links to `/writing/`.

| type       | required fields                               | card label           |
|------------|-----------------------------------------------|----------------------|
| `external` | `title`, `date`, `url`, `platform`            | "On Medium ↗"        |
| `deck`     | `slug`, `title`, `date`, `slideCount`         | "14 slides"          |
| `article`  | `slug`, `title`, `date`, `readingMinutes`     | "6 min read"         |

Optional for all: `summary`, `tags`, `cover`, `hidden`. Dates are `YYYY-MM-DD`.
A typo (unknown type, missing field, bad date) stops the build with a message saying which post.

### Adding a slide deck

1. Export the slides as PNG, 1080×1350, named `01.png`, `02.png`, … and put them in
   `src/assets/decks/<slug>/`. Astro converts them to WebP (540px and 1080px wide) when it builds.
2. Write the text of every slide in `src/data/decks/<slug>.js` (copy
   `ai-bubble-explained.js`): a heading per slide, the text, a short `alt`, and the sources.
3. Add the post to `src/data/posts.json` with `"type": "deck"`, the same `slug`, and `slideCount`.
   Optional: `"pdf"` (a download link) and `"coverPosition"` (which part of slide 1 the card shows).

The page appears at `/writing/<slug>/`. The build stops with a message if the number of
images and slides don't match. `/writing/<slug>/#7` opens slide 7.

### Medium posts are added automatically

Once a day, a GitHub Action ([`sync-medium.yml`](.github/workflows/sync-medium.yml))
runs [`scripts/sync-medium.mjs`](scripts/sync-medium.mjs). It reads the Medium RSS feed,
adds any new posts to `posts.json` and commits. That push makes Netlify redeploy.

- It only **adds** posts. Edits you make to existing entries (summary, cover, tags) are kept.
- To hide a post, add `"hidden": true` to its entry. Don't delete Medium entries: the
  sync would add them back while they're still in Medium's latest-10 feed.
- To sync right away: GitHub → Actions → "Sync Medium posts" → Run workflow,
  or locally with `yarn sync:medium`.
