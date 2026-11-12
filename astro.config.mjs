// Astro turns src/pages/ into plain static HTML in dist/.
// No framework is sent to readers: the browser gets HTML, CSS, and the small
// vanilla scripts in src/scripts/ (bundled by Astro).
import { defineConfig } from "astro/config";

// `yarn build:readable` sets READABLE=1: same site, but not minified,
// with HTML kept on separate lines and each script in its own .js file,
// written to dist-readable/ for reading. Netlify always uses the normal build.
const readable = process.env.READABLE === "1";

export default defineConfig({
  site: "https://armanlalani.com",
  trailingSlash: "always",
  build: {
    format: "directory", // /writing/ -> dist/writing/index.html
  },
  devToolbar: {
    enabled: false,
  },

  ...(readable && {
    outDir: "dist-readable",
    compressHTML: false, // keep the HTML's line breaks and indentation
    vite: {
      build: {
        minify: false, // keep variable names and formatting in JS and CSS
        assetsInlineLimit: 0, // put each script in its own file instead of inlining it
      },
    },
  }),
});
